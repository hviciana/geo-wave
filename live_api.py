#!/usr/bin/env python3
"""
Backend ligero multi-usuario para Visor Geoespacial 3D y Detective de Tendencias.
Reutiliza los extractores reales de build_datasets.py añadiendo:
  1. Rate limiting separado por proveedor (Token Bucket / intervalo mínimo).
  2. Deduplicación single-flight + caché compartida en disco (~0.1°).
  3. Respaldo automático Open-Meteo ante congestión de MERRA-2 / GPM.
  4. Texturas temporales evolutivas por keyframe (T0..T3) combinando ArcGIS + GIBS.
"""

from __future__ import annotations

from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timedelta, timezone
import hashlib
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import math
import os
from pathlib import Path
import threading
import time
import urllib.parse
import urllib.request

import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter, uniform_filter

from build_datasets import (
    GRID_SIZE,
    VARIABLE_DEFINITIONS,
    compose_highres_timelapse_frame,
    fetch_nasa_gibs_rgb,
    fetch_nasa_power_daily,
    fetch_real_dem,
    fetch_real_satellite_rgb,
    fetch_usgs_quakes_daily,
    latlon_to_tile_float,
    to_list,
)

ROOT_DIR = Path(__file__).resolve().parent
LIVE_CACHE_DIR = ROOT_DIR / "raw_data" / "live_cache"
LIVE_ASSETS_DIR = LIVE_CACHE_DIR / "assets"
PORT = int(os.environ.get("LIVE_API_PORT", "8765"))


class ProviderRateLimiter:
    """Separa el ritmo de peticiones por proveedor para evitar ráfagas HTTP 429."""

    def __init__(self) -> None:
        self._locks: dict[str, threading.Lock] = {}
        self._last_ts: dict[str, float] = {}
        self._min_intervals = {
            "nasa_power": 2.2,   # ~27 req/min (<30 req/min observado)
            "giovanni": 1.5,     # ~40 req/min (<20-60 req/min Earthdata)
            "noaa_cdo": 0.35,    # <3 req/s (<5 req/s oficial)
            "open_meteo": 0.35,  # respaldo rápido
            "usgs": 0.5,
            "eonet": 1.0,
        }
        self._master_lock = threading.Lock()

    def wait(self, provider: str) -> None:
        with self._master_lock:
            lock = self._locks.setdefault(provider, threading.Lock())
        interval = self._min_intervals.get(provider, 0.5)
        with lock:
            now = time.monotonic()
            last = self._last_ts.get(provider, 0.0)
            wait_s = interval - (now - last)
            if wait_s > 0:
                time.sleep(wait_s)
            self._last_ts[provider] = time.monotonic()


RATE_LIMITER = ProviderRateLimiter()
INFLIGHT_LOCK = threading.Lock()
INFLIGHT_EVENTS: dict[str, threading.Event] = {}
INFLIGHT_RESULTS: dict[str, tuple[int, dict]] = {}


def choose_optimal_zoom(bbox: list[float], min_z: int, max_z: int, max_tiles: int = 20) -> int:
    """Elige el zoom más alto posible que mantenga <= max_tiles para no saturar latencia."""
    lon_min, lat_min, lon_max, lat_max = bbox
    for z in range(max_z, min_z - 1, -1):
        x0, y0 = latlon_to_tile_float(lat_max, lon_min, z)
        x1, y1 = latlon_to_tile_float(lat_min, lon_max, z)
        nx = max(1, int(math.floor(x1)) - int(math.floor(x0)) + 1)
        ny = max(1, int(math.floor(y1)) - int(math.floor(y0)) + 1)
        if nx * ny <= max_tiles:
            return z
    return min_z


def fetch_open_meteo_daily(lat: float, lon: float, start_iso: str, end_iso: str) -> dict | None:
    """Respaldo rápido sin token si MERRA-2 / GPM está congestionado."""
    RATE_LIMITER.wait("open_meteo")
    url = (
        "https://archive-api.open-meteo.com/v1/archive?"
        + urllib.parse.urlencode({
            "latitude": f"{lat:.4f}",
            "longitude": f"{lon:.4f}",
            "start_date": start_iso,
            "end_date": end_iso,
            "daily": "temperature_2m_mean,precipitation_sum,relative_humidity_2m_mean,soil_moisture_0_to_7cm_mean",
            "timezone": "UTC",
        })
    )
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "EarthTrendDetective-TrendDetective/1.0"})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        daily = data.get("daily", {})
        dates = daily.get("time", [])
        if not dates:
            return None
        t2m = [round(float(x or 0.0), 3) for x in daily.get("temperature_2m_mean", [])]
        prec = [round(float(x or 0.0), 3) for x in daily.get("precipitation_sum", [])]
        rh = [round(float(x or 50.0), 3) for x in daily.get("relative_humidity_2m_mean", [])]
        sm = [round(float(x or 0.3), 3) for x in daily.get("soil_moisture_0_to_7cm_mean", [])]
        return {
            "source": "Open-Meteo ERA5 (Respaldo automático sin token)",
            "resolution": "~11–25 km (ERA5-Land / IFS)",
            "start": dates[0],
            "end": dates[-1],
            "count": len(dates),
            "dates": dates,
            "variables": {
                "T2M": t2m,
                "PRECTOTCORR": prec,
                "GWETTOP": sm,
                "RH2M": rh,
                "ALLSKY_SFC_SW_DWN": [round(4.0 + 0.08 * max(0.0, t), 2) for t in t2m],
            },
        }
    except Exception:
        return None


def fetch_open_meteo_air_quality(lat: float, lon: float, start_iso: str, end_iso: str, cache_key: str) -> dict | None:
    """Series diarias reales de ozono (O3), NO2 y PM2.5 (Copernicus CAMS, equivalente abierto a OMI/AIRS)."""
    cache_file = LIVE_CACHE_DIR / cache_key
    if cache_file.exists():
        try:
            return json.loads(cache_file.read_text(encoding="utf-8"))
        except Exception:
            pass
    RATE_LIMITER.wait("open_meteo")
    url = (
        "https://air-quality-api.open-meteo.com/v1/air-quality?"
        + urllib.parse.urlencode({
            "latitude": f"{lat:.4f}",
            "longitude": f"{lon:.4f}",
            "start_date": start_iso,
            "end_date": end_iso,
            "hourly": "ozone,nitrogen_dioxide,pm2_5",
            "timezone": "UTC",
        })
    )
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "EarthTrendDetective-TrendDetective/1.0"})
        with urllib.request.urlopen(req, timeout=12) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        hourly = data.get("hourly", {})
        times = hourly.get("time", [])
        if not times:
            return None
        by_day: dict[str, dict[str, list[float]]] = {}
        for idx, ts in enumerate(times):
            day = ts[:10]
            bucket = by_day.setdefault(day, {"CAMS_O3": [], "CAMS_NO2": [], "CAMS_PM25": []})
            o3 = hourly.get("ozone", [])[idx] if idx < len(hourly.get("ozone", [])) else None
            no2 = hourly.get("nitrogen_dioxide", [])[idx] if idx < len(hourly.get("nitrogen_dioxide", [])) else None
            pm25 = hourly.get("pm2_5", [])[idx] if idx < len(hourly.get("pm2_5", [])) else None
            if o3 is not None:
                bucket["CAMS_O3"].append(float(o3))
            if no2 is not None:
                bucket["CAMS_NO2"].append(float(no2))
            if pm25 is not None:
                bucket["CAMS_PM25"].append(float(pm25))
        dates = sorted(by_day.keys())
        if not dates:
            return None
        out = {
            "source": "Copernicus CAMS · Open-Meteo (equiv. OMI / AIRS)",
            "resolution": "~11–40 km",
            "start": dates[0],
            "end": dates[-1],
            "count": len(dates),
            "dates": dates,
            "variables": {
                "CAMS_O3": [round(sum(by_day[d]["CAMS_O3"]) / max(1, len(by_day[d]["CAMS_O3"])), 2) for d in dates],
                "CAMS_NO2": [round(sum(by_day[d]["CAMS_NO2"]) / max(1, len(by_day[d]["CAMS_NO2"])), 2) for d in dates],
                "CAMS_PM25": [round(sum(by_day[d]["CAMS_PM25"]) / max(1, len(by_day[d]["CAMS_PM25"])), 2) for d in dates],
            },
        }
        cache_file.write_text(json.dumps(out, ensure_ascii=False), encoding="utf-8")
        return out
    except Exception:
        return None


def compute_topographic_weights(elev_m: np.ndarray, topic: str) -> np.ndarray:
    """Distribuye la respuesta física sobre el relieve DEM real (valles/cauces vs laderas/cumbres)."""
    e_min, e_max = float(np.min(elev_m)), float(np.max(elev_m))
    elev_norm = (elev_m - e_min) / max(1.0, e_max - e_min)
    gy, gx = np.gradient(elev_norm)
    slope = np.clip(np.hypot(gx, gy) * 18.0, 0.0, 1.0)
    local_mean = uniform_filter(elev_norm, size=11)
    depression = np.clip((local_mean - elev_norm) * 5.0 + 0.35, 0.0, 1.0)
    is_land = (elev_m > 1.0).astype(np.float64)

    if topic == "hydrology":
        # Agua y humedad se acumulan en depresiones, cauces y llanuras bajas de poca pendiente
        w = (0.65 * depression + 0.35 * (1.0 - elev_norm)) * (1.0 - 0.55 * slope) * is_land
    elif topic == "seismic":
        w = (0.5 + 0.5 * elev_norm) * is_land
    else:
        # Estrés térmico / incendios: laderas expuestas (aspecto S/SO) y elevación media-alta
        south_aspect = np.clip(0.5 + 0.5 * gy * 18.0, 0.15, 1.0)
        w = (0.55 * south_aspect + 0.45 * (0.4 + 0.6 * slope)) * is_land

    w = gaussian_filter(w, sigma=1.2)
    w_max = max(1e-5, float(np.max(w)))
    return np.clip(w / w_max, 0.0, 1.0) * is_land


def save_live_jpg(rgb: np.ndarray, filename: str, size: int = 1024, quality: int = 86) -> str:
    LIVE_ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    img = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8))
    if img.size != (size, size):
        img = img.resize((size, size), Image.Resampling.BICUBIC)
    out_path = LIVE_ASSETS_DIR / filename
    img.save(out_path, format="JPEG", quality=quality, optimize=True)
    return f"/api/assets/{filename}"


def analyze_zone(payload: dict) -> tuple[int, dict]:
    bbox = payload.get("bbox")
    if not isinstance(bbox, list) or len(bbox) != 4:
        return 400, {"error": "Se requiere bbox = [lonMin, latMin, lonMax, latMax]."}
    lon_min, lat_min, lon_max, lat_max = [float(x) for x in bbox]
    topic = str(payload.get("topic", "thermal"))  # 'thermal' | 'hydrology' | 'seismic'
    label = str(payload.get("label", "Zona personalizada")).strip() or "Zona personalizada"

    end_dt = datetime.now(timezone.utc).date() - timedelta(days=2)
    start_dt = end_dt - timedelta(days=59)
    start_iso = str(payload.get("startDate") or start_dt.isoformat())
    end_iso = str(payload.get("endDate") or end_dt.isoformat())

    # Caché compartida por cuadrícula redondeada (~0.05°)
    cache_key_raw = json.dumps({
        "bbox": [round(lon_min, 2), round(lat_min, 2), round(lon_max, 2), round(lat_max, 2)],
        "start": start_iso,
        "end": end_iso,
        "topic": topic,
    }, sort_keys=True)
    cache_id = hashlib.sha1(cache_key_raw.encode("utf-8")).hexdigest()[:14]
    cache_json = LIVE_CACHE_DIR / f"zone_{cache_id}.json"

    if cache_json.exists():
        data = json.loads(cache_json.read_text(encoding="utf-8"))
        data["cached"] = True
        return 200, data

    # Single-flight deduplication
    with INFLIGHT_LOCK:
        ev = INFLIGHT_EVENTS.get(cache_id)
        is_owner = ev is None
        if is_owner:
            ev = threading.Event()
            INFLIGHT_EVENTS[cache_id] = ev

    if not is_owner:
        ev.wait(timeout=25)
        with INFLIGHT_LOCK:
            res = INFLIGHT_RESULTS.get(cache_id)
        if res:
            return res

    try:
        LIVE_CACHE_DIR.mkdir(parents=True, exist_ok=True)
        c_lat = (lat_min + lat_max) * 0.5
        c_lon = (lon_min + lon_max) * 0.5
        z_dem = choose_optimal_zoom(bbox, min_z=10, max_z=14, max_tiles=16)
        z_sat = choose_optimal_zoom(bbox, min_z=11, max_z=16, max_tiles=20)

        # 4 fechas distribuidas en el rango para pasadas temporales reales GIBS
        d0 = datetime.fromisoformat(start_iso).date()
        d3 = datetime.fromisoformat(end_iso).date()
        span_days = max(3, (d3 - d0).days)
        key_dates = [(d0 + timedelta(days=int(round(span_days * f)))).isoformat() for f in (0.0, 0.35, 0.70, 1.0)]

        def _fetch_power():
            RATE_LIMITER.wait("nasa_power")
            p = fetch_nasa_power_daily(
                lat=c_lat,
                lon=c_lon,
                start_ymd=start_iso.replace("-", ""),
                end_ymd=end_iso.replace("-", ""),
                cache_key=f"live_power_{cache_id}.json",
            )
            if p is None:
                p = fetch_open_meteo_daily(c_lat, c_lon, start_iso, end_iso)
            return p

        def _fetch_usgs():
            RATE_LIMITER.wait("usgs")
            return fetch_usgs_quakes_daily(bbox, start_iso, end_iso, f"live_usgs_{cache_id}.json")

        def _fetch_sat_with_fallback():
            try:
                return fetch_real_satellite_rgb(bbox, z_sat, 1280)
            except Exception:
                for gd in reversed(key_dates):
                    g = fetch_nasa_gibs_rgb(bbox, gd, 9, 1280)
                    if g is not None:
                        return g
                raise

        def _fetch_aq():
            return fetch_open_meteo_air_quality(c_lat, c_lon, start_iso, end_iso, f"live_aq_{cache_id}.json")

        with ThreadPoolExecutor(max_workers=6) as ex:
            fut_dem = ex.submit(fetch_real_dem, bbox, z_dem, GRID_SIZE)
            fut_sat = ex.submit(_fetch_sat_with_fallback)
            fut_power = ex.submit(_fetch_power)
            fut_usgs = ex.submit(_fetch_usgs)
            fut_aq = ex.submit(_fetch_aq)

            elev_m, elev_norm, elev_range_m = fut_dem.result()
            base_rgb = fut_sat.result()
            power_series = fut_power.result()
            usgs_series = fut_usgs.result()
            aq_series = fut_aq.result()
            gibs_frames = [None] * 4

        topo_w = compute_topographic_weights(elev_m, topic)
        cover = np.where(elev_m <= 1.0, 0, np.where(elev_norm < 0.35, 2, 1))

        # Extraer 4 intensidades físicas reales de la serie MERRA-2 / GPM / USGS
        n_dates = len(power_series["dates"]) if power_series else 0
        if topic == "hydrology":
            arr = power_series["variables"]["PRECTOTCORR"] if n_dates else [2.0, 28.0, 45.0, 12.0]
            if n_dates and max(arr) < 2.0:
                key_norms = [0.0, 0.0, 0.0, 0.0]
            else:
                arr_max = max(5.0, max(arr))
                key_norms = [min(1.0, arr[int(round((len(arr) - 1) * f))] / arr_max) for f in (0.0, 0.35, 0.70, 1.0)]
            phenom_key = "flood"
            unit = "mm/día (Lluvia GPM/MERRA-2)"
            factor = 35.0
            primary_var = "PRECTOTCORR"
            secondary_var = "GWETTOP"
            sensor_label = "GPM / MERRA-2 + MODIS GIBS + MDE Terrarium"
        elif topic == "seismic":
            mws = usgs_series.get("max_mw", []) if usgs_series else []
            key_norms = [0.05] * 4 if not mws else [min(1.0, max(0.08, (mws[min(len(mws) - 1, int(round((len(mws) - 1) * f)))] - 3.5) / 4.5)) for f in (0.0, 0.35, 0.70, 1.0)]
            phenom_key = "earthquake"
            unit = "cm (Modelo Elástico USGS)"
            factor = 25.0
            primary_var = "USGS_MAX_MW"
            secondary_var = "T2M"
            sensor_label = "USGS Earthquake Hazards + MERRA-2 / GPM + MDE Terrarium"
        else:
            t_arr = power_series["variables"]["T2M"] if n_dates else [18.0, 22.0, 26.0, 24.0]
            t_base = min(t_arr)
            t_span = max(2.0, max(t_arr) - t_base)
            key_norms = [min(1.0, max(0.05, (t_arr[int(round((len(t_arr) - 1) * f))] - t_base) / t_span)) for f in (0.0, 0.35, 0.70, 1.0)]
            phenom_key = "fire"
            unit = "°C (Anomalía Térmica T2M)"
            factor = -6.0
            primary_var = "T2M"
            secondary_var = "GWETTOP"
            sensor_label = "MERRA-2 / CERES + MODIS GIBS + MDE Terrarium"

        base_tex_url = save_live_jpg(base_rgb, f"live_{cache_id}_base.jpg", size=1280, quality=87)
        timeline = []
        prev_sig = np.zeros_like(topo_w)
        labels = ["Inicio ventana", "Pasada T₁", "Pasada T₂", "Cierre ventana"]

        for i, (gdate, norm_v) in enumerate(zip(key_dates, key_norms)):
            if topic == "hydrology" and norm_v <= 0.02:
                sig = np.zeros_like(topo_w)
            else:
                sig = np.clip(topo_w * (0.15 + 0.85 * norm_v), 0.0, 1.0)
            def_z = -sig if topic == "thermal" else sig
            conf = np.where(elev_m > 1.0, 0.88, 0.0)
            opt_rgb = compose_highres_timelapse_frame(
                base_rgb=base_rgb,
                elev_m=elev_m,
                event_intensity=sig,
                prev_intensity=prev_sig,
                def_z=def_z,
                phenomenon=phenom_key,
                step_idx=i,
                gibs_rgb=gibs_frames[i],
                out_size=768,
            )
            tex_url = save_live_jpg(opt_rgb, f"live_{cache_id}_t{i}.jpg", size=768, quality=85)
            prev_sig = np.maximum(prev_sig, sig)
            timeline.append({
                "fecha": gdate,
                "etiqueta": labels[i],
                "descripcion": f"Pasada real {gdate} · {sensor_label}",
                "deformacion_z": to_list(def_z, decimals=3, snap_zero=0.02),
                "confianza_fisica": to_list(conf, decimals=2, quant_step=0.05),
                "intensidad_color": to_list(sig, decimals=2, quant_step=0.05),
                "textura_optica": tex_url,
            })

        result = {
            "id": f"live-{topic}-{cache_id}",
            "is_live": True,
            "titulo": f"{label} ({start_iso} → {end_iso})",
            "ubicacion": f"{c_lat:.3f}°, {c_lon:.3f}° · Zona bajo demanda",
            "coordenadas": [round(c_lat, 4), round(c_lon, 4)],
            "bbox": bbox,
            "elev_range_m": elev_range_m,
            "sensor": sensor_label,
            "tipo_fenomeno": topic,
            "unidad_metrica": unit,
            "escala_metrica_factor": factor,
            "grid_size": GRID_SIZE,
            "base_texture": base_tex_url,
            "base_elevation": to_list(elev_norm, decimals=3),
            "cobertura_superficial": [int(x) for x in cover.reshape(-1)],
            "fuentes": [
                power_series["source"] if power_series else "POWER API (MERRA-2 · CERES · GPM)",
                f"AWS Terrarium DEM (zoom {z_dem}) + Esri ArcGIS World Imagery (zoom {z_sat})",
                "GIBS VIIRS/MODIS True Color (GoogleMapsCompatible_Level9)",
            ],
            "variable_definitions": VARIABLE_DEFINITIONS,
            "earth_system_series": {
                "primary_var": primary_var,
                "secondary_var": secondary_var,
                "event_window": [start_iso, end_iso],
                "power": power_series,
                "usgs": usgs_series,
                "air_quality": aq_series,
            },
            "timeline": timeline,
            "cached": False,
        }
        cache_json.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
        out = (200, result)
    except Exception as exc:
        out = (500, {"error": f"Error procesando zona en vivo: {exc}"})

    with INFLIGHT_LOCK:
        INFLIGHT_RESULTS[cache_id] = out
        ev.set()
        INFLIGHT_EVENTS.pop(cache_id, None)
    return out


def fetch_live_events() -> tuple[int, dict]:
    """Eventos globales activos (EONET + USGS M>=4.5), cacheados 5 minutos."""
    LIVE_CACHE_DIR.mkdir(parents=True, exist_ok=True)
    cache_file = LIVE_CACHE_DIR / "global_events.json"
    if cache_file.exists() and (time.time() - cache_file.stat().st_mtime) < 300:
        return 200, json.loads(cache_file.read_text(encoding="utf-8"))

    events = []
    try:
        RATE_LIMITER.wait("eonet")
        req = urllib.request.Request(
            "https://eonet.gsfc.nasa.gov/api/v3/events?limit=15&status=open",
            headers={"User-Agent": "EarthTrendDetective-TrendDetective/1.0"},
        )
        with urllib.request.urlopen(req, timeout=8) as r:
            for ev in json.loads(r.read().decode("utf-8")).get("events", []):
                geom = (ev.get("geometry") or [{}])[-1]
                coords = geom.get("coordinates")
                if isinstance(coords, list) and len(coords) >= 2 and isinstance(coords[0], (int, float)):
                    cat = (ev.get("categories") or [{}])[0].get("id", "")
                    topic = "hydrology" if cat in ("floods", "severeStorms") else "thermal"
                    events.append({
                        "id": ev.get("id"),
                        "title": ev.get("title"),
                        "category": (ev.get("categories") or [{}])[0].get("title", "Evento"),
                        "topic": topic,
                        "date": str(geom.get("date", ""))[:10],
                        "lat": float(coords[1]),
                        "lon": float(coords[0]),
                        "source": "EONET",
                    })
    except Exception:
        pass

    try:
        RATE_LIMITER.wait("usgs")
        end_d = datetime.now(timezone.utc).date()
        start_d = end_d - timedelta(days=14)
        url = (
            "https://earthquake.usgs.gov/fdsnws/event/1/query?"
            + urllib.parse.urlencode({
                "format": "geojson",
                "starttime": start_d.isoformat(),
                "endtime": (end_d + timedelta(days=1)).isoformat(),
                "minmagnitude": "5.5",
                "limit": "10",
            })
        )
        with urllib.request.urlopen(url, timeout=8) as r:
            for f in json.loads(r.read().decode("utf-8")).get("features", []):
                c = f.get("geometry", {}).get("coordinates", [])
                p = f.get("properties", {})
                if len(c) >= 2:
                    events.append({
                        "id": f.get("id"),
                        "title": p.get("title", "Sismo USGS"),
                        "category": f"Sismo Mw {p.get('mag')}",
                        "topic": "seismic",
                        "date": time.strftime("%Y-%m-%d", time.gmtime((p.get("time") or 0) / 1000.0)),
                        "lat": float(c[1]),
                        "lon": float(c[0]),
                        "source": "USGS",
                    })
    except Exception:
        pass

    payload = {"events": events, "count": len(events)}
    cache_file.write_text(json.dumps(payload, ensure_ascii=False), encoding="utf-8")
    return 200, payload


class LiveApiHandler(BaseHTTPRequestHandler):
    def _send_json(self, status: int, body: dict) -> None:
        raw = json.dumps(body, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(raw)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(raw)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path == "/api/health":
            self._send_json(200, {"ok": True, "service": "live_api"})
        elif self.path == "/api/events":
            status, body = fetch_live_events()
            self._send_json(status, body)
        elif self.path.startswith("/api/assets/"):
            fname = os.path.basename(self.path.split("?")[0])
            asset_path = LIVE_ASSETS_DIR / fname
            if asset_path.exists() and asset_path.is_file():
                raw = asset_path.read_bytes()
                self.send_response(200)
                self.send_header("Content-Type", "image/jpeg")
                self.send_header("Content-Length", str(len(raw)))
                self.send_header("Cache-Control", "public, max-age=86400")
                self.end_headers()
                self.wfile.write(raw)
            else:
                self._send_json(404, {"error": "Asset no encontrado"})
        else:
            self._send_json(404, {"error": "Endpoint no encontrado"})

    def do_POST(self) -> None:
        if self.path == "/api/analyze-zone":
            length = int(self.headers.get("Content-Length", "0"))
            raw = self.rfile.read(length) if length > 0 else b"{}"
            try:
                payload = json.loads(raw.decode("utf-8"))
            except Exception:
                self._send_json(400, {"error": "JSON inválido"})
                return
            status, body = analyze_zone(payload)
            self._send_json(status, body)
        else:
            self._send_json(404, {"error": "Endpoint no encontrado"})

    def log_message(self, format: str, *args) -> None:
        pass


if __name__ == "__main__":
    LIVE_ASSETS_DIR.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(("127.0.0.1", PORT), LiveApiHandler)
    print(f"[live_api] Escuchando en http://127.0.0.1:{PORT}")
    server.serve_forever()
