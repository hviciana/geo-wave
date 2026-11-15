import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Activity,
  Calendar,
  Compass,
  Flame,
  Globe2,
  Loader2,
  MapPin,
  Radio,
  Search,
  Waves,
} from 'lucide-react';

const TOPICS = [
  {
    id: 'thermal',
    label: 'Estrés térmico e incendios',
    vars: 'T2M · GWETTOP · MODIS',
    icon: Flame,
    accent: 'text-orange-300 border-orange-400/50 bg-orange-950/50',
  },
  {
    id: 'hydrology',
    label: 'Hidrología, lluvias y crecidas',
    vars: 'PRECTOTCORR · GWETTOP · GPM',
    icon: Waves,
    accent: 'text-cyan-300 border-cyan-400/50 bg-cyan-950/50',
  },
  {
    id: 'seismic',
    label: 'Actividad sísmica y corteza',
    vars: 'USGS Mw · T2M · InSAR',
    icon: Activity,
    accent: 'text-amber-300 border-amber-400/50 bg-amber-950/50',
  },
];

function formatDateOffset(daysAgo) {
  const d = new Date(Date.now() - daysAgo * 86400 * 1000);
  return d.toISOString().slice(0, 10);
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function buildRegionalBbox(lat, lon, widthKm = 36) {
  const halfLat = (widthKm / 2) / 111.32;
  const cosLat = Math.max(0.25, Math.cos((lat * Math.PI) / 180));
  const halfLon = (widthKm / 2) / (111.32 * cosLat);
  return [
    Number((lon - halfLon).toFixed(4)),
    Number(Math.max(-82, lat - halfLat).toFixed(4)),
    Number((lon + halfLon).toFixed(4)),
    Number(Math.min(82, lat + halfLat).toFixed(4)),
  ];
}

export default function OrbitalGlobe({
  scenarios = [],
  onEnterTerrain,
  onAnalyzeZone,
  liveError = '',
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const [topic] = useState('hydrology'); // la escena 3D muestra todas las capas; el tema solo guía la simulación secundaria
  const [searchQuery, setSearchQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [placeLabel, setPlaceLabel] = useState('Región seleccionada en el globo');
  const [viewInfo, setViewInfo] = useState({ lat: 39.4, lon: -0.35, zoom: 3.2, spanKm: 1800 });
  const [boxKm, setBoxKm] = useState(36);
  const [startDate, setStartDate] = useState(() => formatDateOffset(62));
  const [endDate, setEndDate] = useState(() => formatDateOffset(2));
  const [apiMode, setApiMode] = useState(null); // null | 'local' | 'web'

  // Comprueba si hay backend local/configurado; en producción estática (Netlify) opera en modo web directo
  useEffect(() => {
    let active = true;
    const apiBase = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
    if (!import.meta.env.DEV && !apiBase) {
      setApiMode('web');
      return () => {
        active = false;
      };
    }
    fetch(`${apiBase}/api/health`)
      .then(async (r) => {
        const ct = r.headers.get('content-type') || '';
        if (!r.ok || !ct.includes('application/json')) return null;
        return r.json();
      })
      .then((d) => {
        if (active) setApiMode(d?.ok ? 'local' : 'web');
      })
      .catch(() => {
        if (active) setApiMode('web');
      });

    return () => {
      active = false;
    };
  }, []);

  // Inicializa el globo 3D MapLibre GL JS v5 con Terrarium DEM + ArcGIS World Imagery
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      center: [-12, 34],
      zoom: 2.35,
      pitch: 24,
      bearing: 0,
      antialias: true,
      maxPitch: 75,
      style: {
        version: 8,
        projection: { type: 'globe' },
        sources: {
          arcgis: {
            type: 'raster',
            tiles: [
              'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            ],
            tileSize: 256,
            maxzoom: 18,
            attribution: 'Esri World Imagery',
          },
          terrarium: {
            type: 'raster-dem',
            tiles: ['https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'],
            encoding: 'terrarium',
            tileSize: 256,
            maxzoom: 15,
            attribution: 'AWS Open Data Terrain Tiles',
          },
        },
        layers: [
          {
            id: 'background-space',
            type: 'background',
            paint: { 'background-color': '#050508' },
          },
          {
            id: 'arcgis-satellite',
            type: 'raster',
            source: 'arcgis',
            paint: { 'raster-fade-duration': 150 },
          },
        ],
      },
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'bottom-right');

    // Activar MDE 3D Terrarium solo en vista regional (zoom >= 7.5) para evitar
    // artefactos de proyección esférica y pérdida de contexto WebGL en el globo.
    let terrainEnabled = false;
    const updateTerrainForZoom = () => {
      const z = map.getZoom();
      if (z >= 7.5 && !terrainEnabled) {
        terrainEnabled = true;
        map.setTerrain({ source: 'terrarium', exaggeration: 1.35 });
      } else if (z < 7.5 && terrainEnabled) {
        terrainEnabled = false;
        map.setTerrain(null);
      }
    };

    const syncView = () => {
      updateTerrainForZoom();
      const c = map.getCenter();
      const b = map.getBounds();
      const z = map.getZoom();
      const dLon = Math.abs(b.getEast() - b.getWest());
      const spanKm =
        dLon >= 170 || z < 3.5
          ? Math.round(40075 * Math.max(0.25, Math.cos((c.lat * Math.PI) / 180)) * Math.min(1, Math.max(0.25, dLon / 360)))
          : Math.round(haversineKm(c.lat, b.getWest(), c.lat, b.getEast()));
      setViewInfo({
        lat: Number(c.lat.toFixed(4)),
        lon: Number(c.lng.toFixed(4)),
        zoom: Number(z.toFixed(1)),
        spanKm: Math.max(1, spanKm),
      });
    };

    map.on('zoom', updateTerrainForZoom);
    map.on('moveend', syncView);
    map.on('load', syncView);
    map.on('webglcontextlost', (e) => {
      if (e?.originalEvent?.preventDefault) {
        e.originalEvent.preventDefault();
      }
    });
    mapRef.current = map;

    return () => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q || !mapRef.current) return;
    setSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
        { headers: { 'Accept-Language': 'es' } }
      );
      const list = await res.json();
      if (Array.isArray(list) && list[0]) {
        const lat = parseFloat(list[0].lat);
        const lon = parseFloat(list[0].lon);
        setPlaceLabel(list[0].display_name?.split(',').slice(0, 2).join(',') || q);
        setViewInfo((prev) => ({
          ...prev,
          lat: Number(lat.toFixed(4)),
          lon: Number(lon.toFixed(4)),
        }));
        mapRef.current.flyTo({ center: [lon, lat], zoom: 10.8, pitch: 54, duration: 1800 });
      }
    } catch {
      // Silencioso si Nominatim no responde
    } finally {
      setSearching(false);
    }
  };

  const scaleStatus = useMemo(() => {
    if (viewInfo.spanKm < 15) {
      return {
        tone: 'amber',
        text: `Zoom muy cercano (~${viewInfo.spanKm} km): supera resolución nativa GIBS (250–375 m) y MERRA-2 / GPM (~50 km). Se usará ventana regional de ${boxKm} km.`,
      };
    }
    if (viewInfo.spanKm > 120) {
      return {
        tone: 'zinc',
        text: `Vista continental (~${viewInfo.spanKm} km): al analizar se extraerá una ventana regional de ${boxKm} km centrada en la mira.`,
      };
    }
    return {
      tone: 'emerald',
      text: `Escala óptima (~${boxKm} km): DEM Terrarium (~30 m) + GIBS (250–375 m) + MERRA-2 / GPM.`,
    };
  }, [viewInfo.spanKm, boxKm]);

  const handleAnalyzeCurrent = () => {
    const c = mapRef.current?.getCenter();
    const targetLat = c ? Number(c.lat.toFixed(4)) : viewInfo.lat;
    const targetLon = c ? Number(c.lng.toFixed(4)) : viewInfo.lon;
    const bbox = buildRegionalBbox(targetLat, targetLon, boxKm);
    onAnalyzeZone?.({
      bbox,
      topic,
      label: placeLabel === 'Región seleccionada en el globo'
        ? `Zona ${targetLat.toFixed(2)}°, ${targetLon.toFixed(2)}°`
        : placeLabel,
      startDate,
      endDate,
    });
  };

  return (
    <div className="relative w-full h-full bg-[#050508] overflow-hidden select-none">
      {/* Mapa Globo 3D MapLibre GL JS v5 */}
      <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

      {/* Mira central para encuadrar la zona */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
        <div className="w-28 h-28 rounded-2xl border border-cyan-300/60 shadow-[0_0_25px_rgba(34,211,238,0.18)] flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-cyan-300 shadow" />
        </div>
      </div>

      {/* Cabecera flotante superior: Marca + Buscador + Estado API */}
      <div className="pointer-events-none absolute top-4 left-4 right-4 z-20 flex flex-wrap items-start justify-between gap-3">
        <div className="pointer-events-auto bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/80 rounded-2xl px-4 py-3 shadow-2xl max-w-md space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-zinc-100 text-xs font-semibold">
              <Globe2 className="w-4 h-4 text-cyan-300" />
              <span>Earth System Trend Detective · Globo 3D</span>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                apiMode
                  ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                  : 'bg-zinc-900 border-zinc-700 text-zinc-400'
              }`}
            >
              <Radio className="w-2.5 h-2.5" />
              {apiMode === null ? 'Conectando...' : apiMode === 'local' ? 'Live API activa' : 'Live Web directo'}
            </span>
          </div>

          <form onSubmit={handleSearch} className="flex items-center gap-1.5">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar ciudad, cuenca, volcán o región..."
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              disabled={searching}
              className="px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition-colors disabled:opacity-60"
            >
              {searching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Ir'}
            </button>
          </form>

        </div>

        {/* Panel derecho: Parámetros de ventana y botón Analizar en 3D */}
        <div className="pointer-events-auto bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/80 rounded-2xl px-4 py-3 shadow-2xl w-full sm:w-80 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono tabular-nums text-zinc-300">
            <span className="inline-flex items-center gap-1 text-zinc-100 font-semibold">
              <Compass className="w-3.5 h-3.5 text-cyan-300" />
              {viewInfo.lat}°, {viewInfo.lon}°
            </span>
            <span>z={viewInfo.zoom} · ~{viewInfo.spanKm} km</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <label className="space-y-1 text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Desde
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2 py-1 text-xs font-mono text-zinc-100"
              />
            </label>
            <label className="space-y-1 text-zinc-400">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Hasta
              </span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-2 py-1 text-xs font-mono text-zinc-100"
              />
            </label>
          </div>

          <div>
            <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
              <span>Tamaño de caja de análisis</span>
              <span className="font-mono text-zinc-200">{boxKm} × {boxKm} km</span>
            </div>
            <input
              type="range"
              min={20}
              max={60}
              step={5}
              value={boxKm}
              onChange={(e) => setBoxKm(parseInt(e.target.value, 10))}
              className="w-full cursor-pointer"
            />
          </div>

          <div
            className={`text-[10px] leading-snug rounded-xl px-2.5 py-2 border ${
              scaleStatus.tone === 'amber'
                ? 'bg-amber-950/50 border-amber-500/40 text-amber-200'
                : scaleStatus.tone === 'emerald'
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                : 'bg-zinc-950/80 border-zinc-800 text-zinc-300'
            }`}
          >
            {scaleStatus.text}
          </div>

          {liveError && (
            <div className="text-[11px] rounded-xl px-2.5 py-2 bg-rose-950/60 border border-rose-500/40 text-rose-200">
              {liveError}
            </div>
          )}

          <button
            type="button"
            onClick={handleAnalyzeCurrent}
            className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-zinc-950 font-semibold text-xs transition-colors shadow-lg"
          >
            Analizar esta zona en 3D
          </button>
        </div>
      </div>

      {/* Barra inferior: Casos demostrativos con fechas históricas exactas + leyenda eventos vivos */}
      <div className="pointer-events-none absolute bottom-4 left-4 right-14 z-20 flex flex-wrap items-center justify-between gap-2">
        <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/80 rounded-2xl px-3 py-2 shadow-xl">
          <span className="text-[11px] font-mono text-zinc-400 mr-1">Casos demostrativos:</span>
          {scenarios.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => onEnterTerrain?.(sc.id)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-950 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-100 transition-colors"
            >
              <MapPin className="w-3 h-3" style={{ color: sc.beaconColor }} />
              {sc.shortLabel}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
