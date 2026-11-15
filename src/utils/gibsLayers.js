// Capas satelitales reales GIBS (WMTS EPSG:3857) cargadas directamente en el navegador.
// Identificadores y niveles máximos verificados contra WMTSCapabilities.xml de GIBS.

const GIBS_BASE = 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best';

export const GIBS_LAYERS = [
  {
    id: 'truecolor',
    label: 'Color real (MODIS Terra)',
    short: 'Color real',
    layer: 'MODIS_Terra_CorrectedReflectance_TrueColor',
    maxLevel: 9,
    ext: 'jpg',
    overlay: false,
    resolution: '~250 m',
    description: 'Imagen diaria real: nubes, humo, nieve y cicatrices visibles tal cual las vio el satélite.',
    legend: null,
  },
  {
    id: 'truecolor_viirs',
    label: 'Color real (VIIRS Suomi-NPP)',
    short: 'VIIRS',
    layer: 'VIIRS_SNPP_CorrectedReflectance_TrueColor',
    maxLevel: 9,
    ext: 'jpg',
    overlay: false,
    resolution: '~375 m',
    description: 'Segunda pasada diaria (tarde) con otro satélite: útil cuando MODIS tiene nubes.',
    legend: null,
  },
  {
    id: 'bands721',
    label: 'Falso color 7-2-1 (fuego / quemado)',
    short: 'Falso color',
    layer: 'MODIS_Terra_CorrectedReflectance_Bands721',
    maxLevel: 9,
    ext: 'jpg',
    overlay: false,
    resolution: '~500 m',
    description: 'Infrarrojo de onda corta: el área quemada aparece rojiza/marrón, los fuegos activos naranja brillante, el agua negra y la vegetación verde.',
    legend: { grad: 'from-green-600 via-amber-700 to-orange-400', left: 'Vegetación', right: 'Quemado / fuego' },
  },
  {
    id: 'precip',
    label: 'Precipitación IMERG (GPM)',
    short: 'Lluvia',
    layer: 'IMERG_Precipitation_Rate',
    maxLevel: 6,
    ext: 'png',
    overlay: true,
    resolution: '~10 km',
    description: 'Tasa de precipitación diaria de la constelación GPM.',
    legend: { grad: 'from-sky-300 via-blue-600 to-fuchsia-600', left: 'Lluvia débil', right: 'Intensa (mm/h)' },
  },
  {
    id: 'lst',
    label: 'Temperatura de superficie (MODIS LST)',
    short: 'Temp. suelo',
    layer: 'MODIS_Terra_Land_Surface_Temp_Day',
    maxLevel: 7,
    ext: 'png',
    overlay: true,
    resolution: '~1 km',
    description: 'Temperatura diurna de la superficie terrestre (no del aire). Huecos = nubes.',
    legend: { grad: 'from-indigo-600 via-yellow-400 to-red-600', left: 'Frío', right: 'Caliente (K)' },
  },
  {
    id: 'ndvi',
    label: 'Vegetación NDVI (MODIS 8 días)',
    short: 'Vegetación',
    layer: 'MODIS_Terra_NDVI_8Day',
    maxLevel: 9,
    ext: 'png',
    overlay: true,
    resolution: '~250 m',
    description: 'Índice de vegetación: verde intenso = vegetación densa y sana.',
    legend: { grad: 'from-amber-700 via-yellow-300 to-green-700', left: 'Suelo / sin veg.', right: 'Vegetación densa' },
  },
  {
    id: 'soil',
    label: 'Humedad de suelo (SMAP L4)',
    short: 'Humedad suelo',
    layer: 'SMAP_L4_Analyzed_Root_Zone_Soil_Moisture',
    maxLevel: 6,
    ext: 'png',
    overlay: true,
    resolution: '~9 km',
    description: 'Humedad en la zona de raíces (0–100 cm) del satélite SMAP asimilada.',
    legend: { grad: 'from-amber-600 via-lime-400 to-blue-700', left: 'Seco', right: 'Húmedo' },
  },
  {
    id: 'aod',
    label: 'Aerosoles / humo AOD (MODIS)',
    short: 'Aerosoles',
    layer: 'MODIS_Terra_AOD_Deep_Blue_Combined',
    maxLevel: 6,
    ext: 'png',
    overlay: true,
    resolution: '~10 km',
    description: 'Espesor óptico de aerosoles (Deep Blue Combined): humo, polvo y contaminación en la columna atmosférica.',
    legend: { grad: 'from-yellow-200 via-orange-500 to-red-800', left: 'Aire limpio', right: 'Humo / polvo' },
  },
  {
    id: 'co',
    label: 'Monóxido de carbono (AIRS)',
    short: 'CO',
    layer: 'AIRS_L3_Carbon_Monoxide_500hPa_Volume_Mixing_Ratio_Daily_Day',
    maxLevel: 6,
    ext: 'png',
    overlay: true,
    resolution: '~100 km',
    description: 'CO a 500 hPa: trazador de combustión (incendios, industria).',
    legend: { grad: 'from-blue-500 via-yellow-400 to-red-600', left: 'Bajo', right: 'Alto (ppbv)' },
  },
  {
    id: 'co2',
    label: 'CO₂ columna total (OCO-2)',
    short: 'CO₂',
    layer: 'OCO-2_Carbon_Dioxide_Total_Column_Average',
    maxLevel: 8,
    ext: 'png',
    overlay: true,
    resolution: 'franjas orbitales ~2 km',
    description: 'OCO-2 mide en franjas estrechas: muchos días no pasa por la zona (sin datos ≠ error).',
    legend: { grad: 'from-blue-600 via-emerald-400 to-red-600', left: 'Menor', right: 'Mayor (ppm)' },
  },
  {
    id: 'no2',
    label: 'Dióxido de nitrógeno NO₂ (OMI)',
    short: 'NO₂',
    layer: 'OMI_Nitrogen_Dioxide_Tropo_Column',
    maxLevel: 6,
    ext: 'png',
    overlay: true,
    resolution: '~13×24 km',
    description: 'Columna troposférica de NO₂ (emisiones urbanas, tráfico e incendios).',
    legend: { grad: 'from-sky-300 via-amber-400 to-red-700', left: 'Bajo', right: 'Alto (molec/cm²)' },
  },
  {
    id: 'o3',
    label: 'Ozono columna total O₃ (OMI)',
    short: 'Ozono O₃',
    layer: 'OMI_Ozone_DOAS_Total_Column',
    maxLevel: 6,
    ext: 'png',
    overlay: true,
    resolution: '~25 km',
    description: 'Columna total de ozono atmosférico medida por el sensor OMI (Aura).',
    legend: { grad: 'from-indigo-600 via-cyan-400 to-amber-400', left: '200 DU', right: '500 DU' },
  },
  {
    id: 'snow',
    label: 'Cobertura de nieve (MODIS NDSI)',
    short: 'Nieve',
    layer: 'MODIS_Terra_NDSI_Snow_Cover',
    maxLevel: 8,
    ext: 'png',
    overlay: true,
    resolution: '~500 m',
    description: 'Fracción de nieve detectada en el día.',
    legend: { grad: 'from-sky-200 via-sky-400 to-white', left: 'Poca', right: 'Nieve total' },
  },
];

export const getGibsLayer = (id) => GIBS_LAYERS.find((l) => l.id === id) || GIBS_LAYERS[0];

const toIso = (d) => d.toISOString().slice(0, 10);

/** Fechas diarias del periodo del dataset (limitadas a maxFrames muestreadas uniformemente). */
export function getDatasetDailyDates(dataset, maxFrames = 36) {
  if (!dataset) return [];
  const tl = dataset.timeline || [];
  const powerDates = dataset.earth_system_series?.power?.dates;
  let start = tl[0]?.fecha;
  let end = tl[tl.length - 1]?.fecha;
  if (dataset.is_live && Array.isArray(powerDates) && powerDates.length) {
    start = powerDates[0];
    end = powerDates[powerDates.length - 1];
  }
  if (!start || !end) return [];
  const s = new Date(`${start}T00:00:00Z`);
  const e = new Date(`${end}T00:00:00Z`);
  if (!(s <= e)) return [start];
  const all = [];
  for (let d = new Date(s); d <= e; d.setUTCDate(d.getUTCDate() + 1)) all.push(toIso(d));
  if (all.length <= maxFrames) return all;
  const out = [];
  for (let k = 0; k < maxFrames; k++) out.push(all[Math.round((k * (all.length - 1)) / (maxFrames - 1))]);
  return Array.from(new Set(out));
}

const lonToPx = (lon, z) => ((lon + 180) / 360) * 256 * 2 ** z;
const latToPx = (lat, z) => {
  const r = (Math.max(-85.05, Math.min(85.05, lat)) * Math.PI) / 180;
  return ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * 256 * 2 ** z;
};

function chooseZoom(bbox, maxLevel, targetPx = 900) {
  const dLon = Math.max(1e-4, bbox[2] - bbox[0]);
  const z = Math.floor(Math.log2((targetPx * 360) / (256 * dLon)));
  return Math.max(1, Math.min(maxLevel, z));
}

const loadImage = (url, signal) =>
  new Promise((resolve) => {
    if (signal?.aborted) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });

function snapTo16DayComposite(isoDate) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return isoDate;
  const year = d.getUTCFullYear();
  const jan1 = Date.UTC(year, 0, 1);
  const doy = Math.floor((d.getTime() - jan1) / 86400000);
  const snapDoy = Math.max(0, Math.floor(doy / 16) * 16);
  return toIso(new Date(Date.UTC(year, 0, 1 + snapDoy)));
}

/**
 * Descarga y recorta una capa GIBS a la caja bbox [w,s,e,n] para una fecha.
 * Devuelve { canvas, nativePx, zoom } o null.
 */
export async function fetchGibsFrame(layerDef, bbox, date, { outSize = 1024, signal } = {}) {
  let layerName = layerDef.layer;
  let effectiveDate = date;
  if (layerDef.id === 'ndvi' && date < '2025-02-12') {
    layerName = 'MODIS_Terra_L3_NDVI_16Day';
    effectiveDate = snapTo16DayComposite(date);
  }

  let effectiveBbox = bbox;
  if (layerDef.id === 'co2' && (bbox[2] - bbox[0] < 2.0 || bbox[3] - bbox[1] < 2.0)) {
    const cLon = (bbox[0] + bbox[2]) * 0.5;
    const cLat = (bbox[1] + bbox[3]) * 0.5;
    effectiveBbox = [
      Math.max(-180, cLon - 1.0),
      Math.max(-82, cLat - 1.0),
      Math.min(180, cLon + 1.0),
      Math.min(82, cLat + 1.0),
    ];
  }

  const z = chooseZoom(effectiveBbox, layerDef.maxLevel);
  const x0 = lonToPx(effectiveBbox[0], z);
  const x1 = lonToPx(effectiveBbox[2], z);
  const y0 = latToPx(effectiveBbox[3], z);
  const y1 = latToPx(effectiveBbox[1], z);
  const tx0 = Math.floor(x0 / 256);
  const tx1 = Math.floor((x1 - 1e-6) / 256);
  const ty0 = Math.floor(y0 / 256);
  const ty1 = Math.floor((y1 - 1e-6) / 256);
  const nTiles = 2 ** z;

  const mosaic = document.createElement('canvas');
  mosaic.width = (tx1 - tx0 + 1) * 256;
  mosaic.height = (ty1 - ty0 + 1) * 256;
  const mctx = mosaic.getContext('2d');

  const jobs = [];
  for (let ty = ty0; ty <= ty1; ty++) {
    for (let tx = tx0; tx <= tx1; tx++) {
      const wrapX = ((tx % nTiles) + nTiles) % nTiles;
      const url = `${GIBS_BASE}/${layerName}/default/${effectiveDate}/GoogleMapsCompatible_Level${layerDef.maxLevel}/${z}/${ty}/${wrapX}.${layerDef.ext}`;
      jobs.push(
        loadImage(url, signal).then((img) => {
          if (img) mctx.drawImage(img, (tx - tx0) * 256, (ty - ty0) * 256);
          return Boolean(img);
        })
      );
    }
  }
  const results = await Promise.all(jobs);
  if (signal?.aborted || !results.some(Boolean)) return null;

  const out = document.createElement('canvas');
  out.width = outSize;
  out.height = outSize;
  const octx = out.getContext('2d');
  octx.imageSmoothingEnabled = true;
  octx.imageSmoothingQuality = 'high';
  octx.drawImage(mosaic, x0 - tx0 * 256, y0 - ty0 * 256, x1 - x0, y1 - y0, 0, 0, outSize, outSize);

  if (layerDef.overlay) {
    const imgData = octx.getImageData(0, 0, outSize, outSize).data;
    let totalSamples = 0;
    let visibleSamples = 0;
    for (let i = 0; i < imgData.length; i += 64) {
      totalSamples += 1;
      if (imgData[i + 3] > 15 && imgData[i] + imgData[i + 1] + imgData[i + 2] > 10) {
        visibleSamples += 1;
      }
    }
    if (totalSamples > 0 && visibleSamples / totalSamples < 0.005) {
      return null;
    }
  }

  return { canvas: out, nativePx: Math.round(x1 - x0), zoom: z };
}

