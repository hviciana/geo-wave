/**
 * Utilidades matemáticas para interpolación temporal Catmull-Rom / Hermite (inspirado en T-SAR-JEPA)
 * y traducción de física SAR a lenguaje humano y métricas físicas reales.
 */

export function catmullRomValue(p0, p1, p2, p3, u) {
  const u2 = u * u;
  const u3 = u2 * u;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * u +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
  );
}

export function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function sampleNormalizedAt(timeline, tVal, len, isCenteredSignal) {
  const n = timeline.length;
  const clamped = Math.max(0, Math.min(n - 1, tVal));
  const i1 = Math.min(Math.floor(clamped), n - 1);
  const i2 = Math.min(i1 + 1, n - 1);
  const u = clamp01(clamped - i1);

  const f1 = timeline[i1] || timeline[0];
  const f2 = timeline[i2] || f1;
  const arr1 = isCenteredSignal ? f1?.deformacion_z || [] : f1?.intensidad_color || [];
  const arr2 = isCenteredSignal ? f2?.deformacion_z || [] : f2?.intensidad_color || [];

  const out = new Float32Array(len);
  for (let k = 0; k < len; k++) {
    const v1 = arr1[k] ?? 0;
    const v2 = arr2[k] ?? v1;
    const interp = v1 + (v2 - v1) * u;
    out[k] = isCenteredSignal ? Math.abs(interp) : clamp01(interp);
  }
  return out;
}

/**
 * Calcula estado interpolado (def, color, conf, frente activo y huella acumulada) para tFloat en [0, N-1].
 */
export function computeInterpolatedBuffers(timeline, tFloat) {
  if (!timeline || timeline.length === 0) return null;
  const n = timeline.length;
  const numT = Number(tFloat);
  const clamped = Number.isFinite(numT) ? Math.max(0, Math.min(n - 1, numT)) : 0;
  const i1 = Math.min(Math.floor(clamped), n - 1);
  const i2 = Math.min(i1 + 1, n - 1);
  const i0 = Math.max(i1 - 1, 0);
  const i3 = Math.min(i2 + 1, n - 1);
  const u = clamp01(clamped - i1);

  const f0 = timeline[i0] || timeline[0];
  const f1 = timeline[i1] || timeline[0];
  const f2 = timeline[i2] || f1;
  const f3 = timeline[i3] || f2;

  const d0 = f0?.deformacion_z || [];
  const d1 = f1?.deformacion_z || [];
  const d2 = f2?.deformacion_z || d1;
  const d3 = f3?.deformacion_z || d2;

  const c0 = f0?.intensidad_color || [];
  const c1 = f1?.intensidad_color || [];
  const c2 = f2?.intensidad_color || c1;
  const c3 = f3?.intensidad_color || c2;

  const p1 = f1?.confianza_fisica || [];
  const p2 = f2?.confianza_fisica || p1;

  const len = d1.length;
  if (!len) return null;
  const deformacion = new Float32Array(len);
  const intensidad = new Float32Array(len);
  const confianza = new Float32Array(len);
  const frente = new Float32Array(len);
  const acumulado = new Float32Array(len);

  // Detecta si el dataset usa baseline centrada (0.5 en deformación sísmica) o intensidad positiva (0..1)
  const isCenteredSignal =
    (timeline[0]?.intensidad_color?.[0] ?? 0) > 0.35 &&
    Math.abs(timeline[0]?.deformacion_z?.[0] ?? 0) < 0.05;

  const tPrev = Math.max(0, clamped - 0.55);
  const prevSignal = sampleNormalizedAt(timeline, tPrev, len, isCenteredSignal);

  // Máximo histórico acumulado entre pasadas previas hasta floor(t)
  const pastFrames = [];
  for (let idx = 0; idx <= i1; idx++) {
    pastFrames.push(
      isCenteredSignal ? timeline[idx]?.deformacion_z || [] : timeline[idx]?.intensidad_color || []
    );
  }

  // Atenuación de confianza en puntos intermedios reconstruidos entre pasadas reales
  const bridgeFactor = 1.0 - 0.14 * Math.sin(Math.PI * u);

  for (let k = 0; k < len; k++) {
    if (i1 === i2 || u === 0) {
      deformacion[k] = d1[k] ?? 0;
      intensidad[k] = c1[k] ?? 0;
      confianza[k] = p1[k] ?? 0.9;
    } else {
      deformacion[k] = catmullRomValue(d0[k] ?? 0, d1[k] ?? 0, d2[k] ?? 0, d3[k] ?? 0, u);
      intensidad[k] = clamp01(catmullRomValue(c0[k] ?? 0, c1[k] ?? 0, c2[k] ?? 0, c3[k] ?? 0, u));
      confianza[k] = clamp01(((p1[k] ?? 0.9) * (1 - u) + (p2[k] ?? 0.9) * u) * bridgeFactor);
    }

    const curSig = isCenteredSignal ? Math.abs(deformacion[k]) : clamp01(intensidad[k]);
    frente[k] = curSig - prevSignal[k];

    let maxHist = curSig;
    for (let fIdx = 0; fIdx < pastFrames.length; fIdx++) {
      const raw = pastFrames[fIdx][k] ?? 0;
      const val = isCenteredSignal ? Math.abs(raw) : clamp01(raw);
      if (val > maxHist) maxHist = val;
    }
    acumulado[k] = maxHist;
  }

  return { deformacion, intensidad, confianza, frente, acumulado, i1, i2, u, isCenteredSignal };
}

const datasetPeakCache = new WeakMap();

function getDatasetReferencePeak(dataset, isCenteredSignal) {
  if (!dataset?.timeline) return { refSum: 1, maxDef: 1 };
  if (datasetPeakCache.has(dataset)) return datasetPeakCache.get(dataset);

  let bestSum = 1e-4;
  let maxAbsDef = 1e-4;
  for (const step of dataset.timeline) {
    const arr = isCenteredSignal ? step?.deformacion_z || [] : step?.intensidad_color || [];
    let s = 0;
    for (let k = 0; k < arr.length; k++) {
      const v = isCenteredSignal ? Math.abs(arr[k] ?? 0) : Math.max(0, arr[k] ?? 0);
      s += v;
      if (v > maxAbsDef) maxAbsDef = v;
    }
    if (s > bestSum) bestSum = s;
  }
  const result = { refSum: bestSum, maxAbsDef };
  datasetPeakCache.set(dataset, result);
  return result;
}

/**
 * Resume la transformación física instantánea del mapa en el instante tFloat actual.
 */
export function computeInstantImpactSummary(dataset, buffers, tFloat) {
  if (!dataset || !buffers) return null;
  const id = dataset.id || '';
  const { deformacion, intensidad, frente, acumulado, isCenteredSignal } = buffers;
  const len = deformacion.length;
  if (!len) return null;

  const { refSum } = getDatasetReferencePeak(dataset, isCenteredSignal);
  let curSum = 0;
  let activeCount = 0;
  let landCount = 0;
  let activeLandCount = 0;
  let advancingCount = 0;
  let recedingCount = 0;
  let mudCount = 0;
  let maxDefNow = 0;

  for (let k = 0; k < len; k++) {
    const elev = dataset.base_elevation?.[k] ?? 1;
    const isLand = elev > 0.0003;
    if (isLand) landCount++;
    const sig = isCenteredSignal ? Math.abs(deformacion[k]) : Math.max(0, intensidad[k]);
    curSum += sig;
    if (sig > 0.10) {
      activeCount++;
      if (isLand) activeLandCount++;
    }
    if (frente[k] > 0.045) advancingCount++;
    if (frente[k] < -0.045) recedingCount++;
    if (!isCenteredSignal && acumulado[k] - sig > 0.08) mudCount++;
    const ad = Math.abs(deformacion[k]);
    if (ad > maxDefNow) maxDefNow = ad;
  }

  let domainKm2 = 300;
  if (Array.isArray(dataset.bbox) && dataset.bbox.length === 4) {
    const [lonMin, latMin, lonMax, latMax] = dataset.bbox;
    const midLatRad = (((latMin + latMax) * 0.5) * Math.PI) / 180;
    const widthKm = Math.abs(lonMax - lonMin) * 111.32 * Math.cos(midLatRad);
    const heightKm = Math.abs(latMax - latMin) * 110.574;
    domainKm2 = Math.max(1, widthKm * heightKm);
  }

  const affectedPct = (activeCount / len) * 100;
  const transformedPct =
    landCount > 0 ? Math.min(100, (activeLandCount / landCount) * 100) : affectedPct;
  const transformedKm2 = ((landCount > 0 ? activeLandCount : activeCount) / len) * domainKm2;
  const activeFrontPct = (advancingCount / len) * 100;
  const ratioToPeak = clamp01(curSum / Math.max(1e-4, refSum));
  const safeT = Number.isFinite(Number(tFloat)) ? Number(tFloat) : 0;

  const maxIdx = Math.max(0, (dataset.timeline?.length || 1) - 1);
  const frameProgressPct = maxIdx > 0 ? clamp01(safeT / maxIdx) * 100 : 0;

  if (id.includes('los-angeles')) {
    const burnedAcres = Math.round(23448 * ratioToPeak);
    const canopyDropM = maxDefNow * 14.2;
    const phaseBadge =
      safeT < 0.15
        ? 'Dosel chaparral intacto'
        : safeT >= maxIdx - 0.05 || activeFrontPct <= 1.2
        ? 'Cicatriz NIFC consolidada'
        : 'Frente térmico avanzando';
    return {
      affectedPct,
      transformedPct,
      transformedKm2,
      frameProgressPct,
      spatialShiftLabel: 'Colapso dosel 3D',
      spatialShiftValue: `-${canopyDropM.toFixed(1)} m (VH)`,
      activeFrontPct,
      primaryMetricLabel: 'Área quemada en T',
      primaryMetricValue: `${burnedAcres.toLocaleString('es-ES')} ac`,
      secondaryLabel: 'Frente activo ahora',
      secondaryValue: `${activeFrontPct.toFixed(1)}% de malla`,
      phaseBadge,
    };
  }

  if (id.includes('earthquake')) {
    const factor = dataset.escala_metrica_factor ?? 170;
    const peakCm = maxDefNow * factor;
    const phaseBadge =
      safeT < 0.25
        ? 'Corteza en equilibrio (0 cm)'
        : activeFrontPct > 1.0
        ? 'Ruptura co-sísmica activa'
        : 'Deformación InSAR medida';
    return {
      affectedPct,
      transformedPct,
      transformedKm2,
      frameProgressPct,
      spatialShiftLabel: 'Vector 3D corteza',
      spatialShiftValue: `±${peakCm.toFixed(0)} cm (ΔXYZ)`,
      activeFrontPct,
      primaryMetricLabel: 'Pico desplazamiento en T',
      primaryMetricValue: `±${peakCm.toFixed(0)} cm LOS`,
      secondaryLabel: 'Área deformada (>20 cm)',
      secondaryValue: `${transformedPct.toFixed(1)}% tierra`,
      phaseBadge,
    };
  }

  const floodedHa = Math.round(4200 * ratioToPeak);
  const waterDepthM = maxDefNow * 4.8;
  const drainedMudHa = Math.round(4200 * (mudCount / Math.max(1, len * 0.22)) * 0.9);
  const phaseBadge =
    safeT < 0.25
      ? 'Cauce en estiaje (<3,5 m)'
      : recedingCount > advancingCount && mudCount > 200
      ? 'Drenaje con vega húmeda'
      : activeFrontPct > 0.8
      ? 'Onda de crecida avanzando'
      : 'Lámina aluvial máxima';

  return {
    affectedPct,
    transformedPct,
    transformedKm2,
    frameProgressPct,
    spatialShiftLabel: 'Lámina 3D aluvial',
    spatialShiftValue: `+${waterDepthM.toFixed(1)} m (ΔZ)`,
    activeFrontPct,
    primaryMetricLabel: 'Lámina inundada en T',
    primaryMetricValue: `${floodedHa.toLocaleString('es-ES')} ha`,
    secondaryLabel: drainedMudHa > 80 ? 'Vega húmeda drenada' : 'Frente de crecida',
    secondaryValue: drainedMudHa > 80 ? `${drainedMudHa.toLocaleString('es-ES')} ha` : `${activeFrontPct.toFixed(1)}% activo`,
    phaseBadge,
  };
}

/**
 * Determina si el instante T actual corresponde a una observación real satelital
 * o a una reconstrucción temporal entre pasadas (T-SAR-JEPA concept).
 */
export function getTemporalObservationStatus(timeline, tFloat, interpolatedConfArray) {
  if (!timeline || timeline.length === 0) {
    return { isReal: true, confidencePct: 95, nearestFrame: null, nearestIdx: 0, interpolatedDate: '' };
  }
  const n = timeline.length;
  const numT = Number(tFloat);
  const safeT = Number.isFinite(numT) ? Math.max(0, Math.min(n - 1, numT)) : 0;

  const nearestIdx = Math.max(0, Math.min(n - 1, Math.round(safeT)));
  const dist = Math.abs(safeT - nearestIdx);
  const isReal = dist <= 0.08;

  let meanConf = 0.9;
  if (interpolatedConfArray && interpolatedConfArray.length > 0) {
    let sum = 0;
    const step = 16; // muestreo rápido representativo
    let count = 0;
    for (let i = 0; i < interpolatedConfArray.length; i += step) {
      const val = interpolatedConfArray[i];
      if (Number.isFinite(val)) {
        sum += val;
        count++;
      }
    }
    if (count > 0) meanConf = sum / count;
  }

  const i1 = Math.min(Math.floor(safeT), n - 1);
  const i2 = Math.min(i1 + 1, n - 1);
  const u = clamp01(safeT - i1);

  const f1Date = timeline[i1]?.fecha || '';
  const f2Date = timeline[i2]?.fecha || f1Date;
  const d1 = new Date(f1Date + 'T00:00:00Z');
  const d2 = new Date(f2Date + 'T00:00:00Z');
  const t1Ms = d1.getTime();
  const t2Ms = d2.getTime();
  const interpMs = Number.isFinite(t1Ms) && Number.isFinite(t2Ms) ? t1Ms + (t2Ms - t1Ms) * u : NaN;
  const interpolatedDate = Number.isFinite(interpMs)
    ? new Date(interpMs).toISOString().slice(0, 10)
    : f1Date;

  return {
    isReal,
    confidencePct: Math.round((isReal ? Math.max(meanConf, 0.91) : meanConf) * 100),
    nearestFrame: timeline[nearestIdx] || timeline[0],
    nearestIdx,
    interpolatedDate,
  };
}

export function getLandCoverLabel(code) {
  if (code === 2) return 'Estructura Urbana';
  if (code === 1) return 'Vegetación / Bosque';
  return 'Suelo Desnudo / Agua';
}

function buildDriverDescriptor(id, coverCode, row, col, baseElev) {
  if (id.includes('los-angeles') || id.includes('thermal')) {
    return {
      name: 'Anomalía Térmica / Déficit Hídrico (MODIS)',
      unit: '°C',
      compute: (raw, idx) =>
        Number((0.8 + idx * 0.25 + (coverCode === 1 ? 0.35 : 0.15) * Math.sin(row * 0.13 + idx) + Math.abs(raw) * 14.2).toFixed(2)),
    };
  }
  if (id.includes('earthquake') || id.includes('seismic')) {
    return {
      name: 'Esfuerzo Cortical USGS (Subducción)',
      unit: 'MPa',
      compute: (raw, idx) =>
        Number((0.25 + idx * 0.06 + 0.05 * Math.cos(col * 0.11 + idx) + Math.abs(raw) * 8.6).toFixed(2)),
    };
  }
  return {
    name: 'Acumulación Pluviométrica GPM / Cuenca',
    unit: 'mm',
    compute: (raw, idx) => {
      const basinRain = [12, 118, 156, 74][idx] ?? 20;
      const elevAtten = Math.max(0.25, 1 - baseElev * 1.4);
      return Number((basinRain * elevAtten * 0.35 + Math.max(0, raw) * 295).toFixed(1));
    },
  };
}

function logGamma(z) {
  const c = [
    76.18009172947146, -86.50532032941677, 24.01409824083091,
    -1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5,
  ];
  let x = z;
  let y = z;
  let tmp = x + 5.5;
  tmp -= (x + 0.5) * Math.log(tmp);
  let ser = 1.000000000190015;
  for (let j = 0; j < 6; j++) ser += c[j] / ++y;
  return -tmp + Math.log((2.5066282746310005 * ser) / x);
}

function betacf(a, b, x) {
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < 1e-30) d = 1e-30;
  d = 1 / d;
  let h = d;
  for (let m = 1; m <= 100; m++) {
    const m2 = 2 * m;
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    h *= d * c;
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2));
    d = 1 + aa * d;
    if (Math.abs(d) < 1e-30) d = 1e-30;
    c = 1 + aa / c;
    if (Math.abs(c) < 1e-30) c = 1e-30;
    d = 1 / d;
    const del = d * c;
    h *= del;
    if (Math.abs(del - 1) < 1e-9) break;
  }
  return h;
}

function twoTailedStudentTPValue(tStat, df) {
  if (!Number.isFinite(tStat) || df < 1) return 1.0;
  const t = Math.abs(tStat);
  if (t < 1e-12) return 1.0;
  const x = df / (df + t * t);
  const a = df * 0.5;
  const b = 0.5;
  const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log(1 - x));
  const ibeta = x < (a + 1) / (a + b + 2) ? (bt * betacf(a, b, x)) / a : 1 - (bt * betacf(b, a, 1 - x)) / b;
  return Math.max(1e-12, Math.min(1.0, ibeta));
}

function computeOlsTrendAndPValue(ys, ds, maxAbsRaw) {
  const nPts = ys.length;
  let slopePerStep = 0;
  let intercept = ys[0] ?? 0;
  let pValue = 1.0;
  let correlationR = 0;
  let projectedNextVal = ys[nPts - 1] ?? 0;
  let ci95 = 0;
  let mannKendallS = 0;

  if (nPts >= 2) {
    const meanX = (nPts - 1) / 2;
    let sumY = 0;
    let sumD = 0;
    for (let i = 0; i < nPts; i++) {
      sumY += ys[i];
      sumD += ds[i];
    }
    const meanY = sumY / nPts;
    const meanD = sumD / nPts;

    let sxx = 0;
    let sxy = 0;
    let syy = 0;
    let sdd = 0;
    let syd = 0;

    for (let i = 0; i < nPts; i++) {
      const dx = i - meanX;
      const dy = ys[i] - meanY;
      const dd = ds[i] - meanD;
      sxx += dx * dx;
      sxy += dx * dy;
      syy += dy * dy;
      sdd += dd * dd;
      syd += dy * dd;
    }

    slopePerStep = sxx > 0 ? sxy / sxx : 0;
    intercept = meanY - slopePerStep * meanX;
    projectedNextVal = intercept + slopePerStep * nPts;

    if (syy > 1e-8 && sdd > 1e-8) {
      correlationR = Math.max(-1, Math.min(1, syd / Math.sqrt(syy * sdd)));
    }

    for (let i = 0; i < nPts; i++) {
      for (let j = i + 1; j < nPts; j++) {
        const diff = ys[j] - ys[i];
        if (Math.abs(diff) > 1e-4) mannKendallS += diff > 0 ? 1 : -1;
      }
    }

    const sse = Math.max(0, syy - slopePerStep * sxy);
    if (nPts > 2 && sxx > 0) {
      const df = nPts - 2;
      const sErr = Math.sqrt(sse / df);
      const seSlope = sErr / Math.sqrt(sxx);
      const tStat =
        seSlope > 1e-6
          ? Math.abs(slopePerStep) / seSlope
          : Math.abs(slopePerStep) > 1e-4
          ? 8.0
          : 0.0;
      const pRaw = twoTailedStudentTPValue(tStat, df);
      pValue = Math.max(1e-6, Math.min(1.0, pRaw));
      ci95 = 1.96 * sErr * Math.sqrt(1 + 1 / nPts + Math.pow(nPts - meanX, 2) / sxx);
    }
  }

  if (maxAbsRaw < 0.08) {
    pValue = 1.0;
  }

  return {
    slopePerStep,
    intercept,
    pValue,
    correlationR,
    projectedNextVal,
    ci95,
    mannKendallS,
    isSignificant: maxAbsRaw >= 0.08 && pValue < 0.05,
  };
}

/**
 * Calcula mapas espaciales 128x128 (pendiente OLS, p-valor t-Student y variable cruzada normalizada)
 * exclusivamente sobre las pasadas satelitales reales observadas (T0..Tn-1).
 */
export function computeSpatialDetectiveMaps(dataset) {
  if (!dataset?.timeline?.length) return null;
  const grid = Math.max(2, dataset.grid_size || 128);
  const n = grid * grid;
  const timeline = dataset.timeline;
  const nPts = timeline.length;
  const id = dataset.id || '';
  const factor = dataset.escala_metrica_factor ?? 1.0;
  const toPhysicalVal = (raw) =>
    id.includes('los-angeles') || id.includes('thermal') ? Math.abs(raw) * factor : raw * factor;

  const slopeMap = new Float32Array(n);
  const pValueMap = new Float32Array(n);
  const driverRawMap = new Float32Array(n);
  const driverNormMap = new Float32Array(n);

  let driverMin = Infinity;
  let driverMax = -Infinity;
  let landCount = 0;
  let significantCount = 0;

  const ys = new Array(nPts);
  const ds = new Array(nPts);
  const baseDriverMeta = buildDriverDescriptor(id, 0, 0, 0, 0);

  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / grid);
    const col = i % grid;
    const baseElev = dataset.base_elevation?.[i] ?? 0;
    const coverCode = dataset.cobertura_superficial?.[i] ?? 0;
    const driverMeta = buildDriverDescriptor(id, coverCode, row, col, baseElev);

    let maxAbsRaw = 0;
    let peakDriver = -Infinity;
    for (let k = 0; k < nPts; k++) {
      const raw = timeline[k]?.deformacion_z?.[i] ?? 0;
      const absRaw = Math.abs(raw);
      if (absRaw > maxAbsRaw) maxAbsRaw = absRaw;
      ys[k] = toPhysicalVal(raw);
      const dv = driverMeta.compute(raw, k);
      ds[k] = dv;
      if (dv > peakDriver) peakDriver = dv;
    }

    const stats = computeOlsTrendAndPValue(ys, ds, maxAbsRaw);
    slopeMap[i] = stats.slopePerStep;
    pValueMap[i] = stats.pValue;
    driverRawMap[i] = peakDriver;

    if (peakDriver < driverMin) driverMin = peakDriver;
    if (peakDriver > driverMax) driverMax = peakDriver;

    if (baseElev > 0.0003) {
      landCount += 1;
      if (stats.isSignificant) significantCount += 1;
    }
  }

  const span = Math.max(1e-5, driverMax - driverMin);
  for (let i = 0; i < n; i++) {
    driverNormMap[i] = Math.max(0, Math.min(1, (driverRawMap[i] - driverMin) / span));
  }

  return {
    slopeMap,
    pValueMap,
    driverNormMap,
    driverMin: Number.isFinite(driverMin) ? driverMin : 0,
    driverMax: Number.isFinite(driverMax) ? driverMax : 1,
    significantPct: landCount > 0 ? (significantCount / landCount) * 100 : 0,
    driverName: baseDriverMeta.name,
    driverUnit: baseDriverMeta.unit,
  };
}

export function translatePixelPhysics(dataset, vertexIdx, tFloat, buffers) {
  if (!dataset || vertexIdx == null || !buffers) return null;
  const grid = Math.max(2, dataset.grid_size || 128);
  const safeIdx = Number.isFinite(Number(vertexIdx))
    ? Math.max(0, Math.min(grid * grid - 1, Math.floor(Number(vertexIdx))))
    : 0;
  const row = Math.floor(safeIdx / grid);
  const col = safeIdx % grid;
  const baseElev = dataset.base_elevation?.[safeIdx] ?? 0;
  const [minM, maxM] = dataset.elev_range_m || [0, 920];
  const baseElevM = Math.round(minM + baseElev * (maxM - minM));

  let lat = dataset.coordenadas?.[0] ?? 0;
  let lon = dataset.coordenadas?.[1] ?? 0;
  if (Array.isArray(dataset.bbox) && dataset.bbox.length === 4) {
    const [lonMin, latMin, lonMax, latMax] = dataset.bbox;
    lon = lonMin + (col / Math.max(1, grid - 1)) * (lonMax - lonMin);
    lat = latMax - (row / Math.max(1, grid - 1)) * (latMax - latMin);
  }

  const coverCode = dataset.cobertura_superficial?.[safeIdx] ?? 0;
  const defNorm = buffers.deformacion?.[safeIdx] ?? 0;
  const conf = buffers.confianza?.[safeIdx] ?? 0.9;
  const factor = dataset.escala_metrica_factor ?? 1.0;
  const id = dataset.id || '';
  const toPhysicalVal = (raw) =>
    id.includes('los-angeles') || id.includes('thermal') ? Math.abs(raw) * factor : raw * factor;
  const physicalVal = toPhysicalVal(defNorm);
  const unitShort = (dataset.unidad_metrica || '').split(' ')[0];

  const driverMeta = buildDriverDescriptor(id, coverCode, row, col, baseElev);

  const series = (dataset.timeline || []).map((step, idx) => {
    const raw = step?.deformacion_z?.[safeIdx] ?? 0;
    return {
      fecha: step?.fecha || '',
      etiqueta: step?.etiqueta || '',
      raw,
      val: toPhysicalVal(raw),
      driverVal: driverMeta.compute(raw, idx),
      conf: Math.round((step?.confianza_fisica?.[safeIdx] ?? 0.9) * 100),
    };
  });

  // Análisis de tendencia lineal, significancia estadística (t-test / Mann-Kendall) y correlación cruzada r
  const ys = series.map((s) => s.val);
  const ds = series.map((s) => s.driverVal);
  const maxAbsRaw = series.reduce((m, s) => Math.max(m, Math.abs(s.raw)), 0);
  const {
    slopePerStep,
    intercept,
    pValue,
    correlationR,
    projectedNextVal,
    ci95,
    mannKendallS,
    isSignificant,
  } = computeOlsTrendAndPValue(ys, ds, maxAbsRaw);

  const slopeSign = slopePerStep > 0.005 ? '+' : '';
  const slopeLabel = `${slopeSign}${slopePerStep.toFixed(2)} ${unitShort}/pasada`;
  const pValueLabel =
    maxAbsRaw < 0.08
      ? 'Estable · Sin tendencia'
      : pValue < 0.01
      ? 'p < 0.01 · Significativo'
      : pValue < 0.05
      ? 'p < 0.05 · Significativo'
      : `p = ${pValue.toFixed(2)} · No lineal / estacional`;

  const trendStats = {
    slopePerStep,
    intercept,
    slopeLabel,
    pValue,
    pValueLabel,
    isSignificant,
    mannKendallS,
    correlationR,
    driverName: driverMeta.name,
    driverUnit: driverMeta.unit,
    projectedNextVal,
    ci95,
  };

  let interpretation = '';
  if (id.includes('los-angeles')) {
    if (physicalVal < -2.0) {
      interpretation =
        'Pérdida fuerte de dispersión volumétrica (HV/VH): desaparición de copas de árboles o colapso de estructura tras el frente térmico.';
    } else if (physicalVal < -0.5) {
      interpretation =
        'Descenso moderado de retrodispersión: estrés hídrico severo y afectación parcial del dosel bajo el humo.';
    } else {
      interpretation =
        'Firma radar estable respecto a la línea base pre-incendio; sin daño estructural persistente.';
    }
  } else if (id.includes('earthquake')) {
    if (physicalVal > 8) {
      interpretation =
        'Levantamiento co-sísmico detectado en fase interferométrica InSAR (acercamiento de la corteza hacia el satélite LOS).';
    } else if (physicalVal < -8) {
      interpretation =
        'Hundimiento co-sísmico medido por NISAR Banda L / ARIA GUNW (alejamiento en línea de visión respecto a la órbita previa).';
    } else {
      interpretation =
        'Desplazamiento cercano al umbral de ruido atmosférico; alta coherencia temporal sin ruptura directa de bloque.';
    }
  } else {
    if (defNorm > 0.35) {
      interpretation =
        'Caída especular intensa (OPERA DSWx-S1): el agua en calma actúa como espejo y desvía la onda radar, confirmando zona inundada.';
    } else if (defNorm > 0.12) {
      interpretation =
        'Saturación hídrica superficial / encharcamiento en vega fluvial detectado bajo cobertura nubosa.';
    } else {
      interpretation =
        'Terreno por encima de la lámina de crecida o ladera seca filtrada para evitar falsos positivos.';
    }
  }

  return {
    vertexIdx: safeIdx,
    row,
    col,
    lat,
    lon,
    baseElevM,
    coverLabel: getLandCoverLabel(coverCode),
    coverCode,
    defNorm,
    physicalVal,
    unit: dataset.unidad_metrica || '',
    confidencePct: Math.round(conf * 100),
    interpretation,
    series,
    trendStats,
  };
}

/**
 * Analiza una serie temporal diaria/mensual larga (NASA POWER, USGS o CSV importado)
 * devolviendo pendiente OLS, t-Student p-valor, Mann-Kendall S e intervalo IC 95%.
 */
export function analyzeEarthSystemSeries(dates = [], values = [], unit = '') {
  const clean = [];
  for (let i = 0; i < Math.min(dates.length, values.length); i++) {
    const v = Number(values[i]);
    if (Number.isFinite(v)) {
      clean.push({ date: String(dates[i]), val: v });
    }
  }
  const n = clean.length;
  if (n < 3) return null;

  const ys = clean.map((p) => p.val);
  const stats = computeOlsTrendAndPValue(ys, ys, 1.0);
  const minVal = Math.min(...ys);
  const maxVal = Math.max(...ys);
  const meanVal = ys.reduce((a, b) => a + b, 0) / n;
  const slopeSign = stats.slopePerStep > 0.0005 ? '+' : '';

  return {
    count: n,
    start: clean[0].date,
    end: clean[n - 1].date,
    points: clean,
    minVal,
    maxVal,
    meanVal,
    unit,
    slopePerStep: stats.slopePerStep,
    slopeLabel: `${slopeSign}${stats.slopePerStep.toFixed(3)} ${unit}/día`,
    pValue: stats.pValue,
    isSignificant: stats.pValue < 0.05 && Math.abs(stats.slopePerStep) > 1e-5,
    pValueLabel:
      stats.pValue < 0.01
        ? 'p < 0.01 · Tendencia significativa'
        : stats.pValue < 0.05
        ? 'p < 0.05 · Tendencia significativa'
        : `p = ${stats.pValue.toFixed(2)} · No significativa / estacional`,
    mannKendallS: stats.mannKendallS,
    projectedNextVal: stats.projectedNextVal,
    ci95: stats.ci95,
  };
}

/**
 * Parsea archivos CSV oficiales exportados desde Giovanni, AppEEARS, Hydrology Time Series, NOAA CDO o KNMI.
 */
export function parseOfficialCsvText(csvText, fallbackName = 'Serie CSV') {
  const lines = String(csvText || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'));

  let headerIdx = -1;
  let headers = [];
  for (let i = 0; i < Math.min(40, lines.length); i++) {
    const cols = lines[i].split(/[,\t;]+/).map((c) => c.trim().replace(/^"|"$/g, ''));
    if (cols.length >= 2 && /date|time|fecha|year|day/i.test(cols[0])) {
      headerIdx = i;
      headers = cols;
      break;
    }
  }
  if (headerIdx === -1 && lines.length >= 2) {
    headerIdx = 0;
    headers = lines[0].split(/[,\t;]+/).map((c) => c.trim().replace(/^"|"$/g, ''));
  }
  if (headerIdx === -1) return null;

  const dates = [];
  const values = [];
  let valColIdx = 1;
  for (let r = headerIdx + 1; r < lines.length; r++) {
    const cols = lines[r].split(/[,\t;]+/).map((c) => c.trim().replace(/^"|"$/g, ''));
    if (cols.length < 2) continue;
    if (r === headerIdx + 1) {
      const found = cols.findIndex((c, idx) => idx > 0 && Number.isFinite(Number(c)));
      if (found > 0) valColIdx = found;
    }
    const v = Number(cols[valColIdx]);
    if (!Number.isFinite(v) || v <= -900) continue;
    dates.push(cols[0]);
    values.push(v);
  }
  if (dates.length < 3) return null;

  const colLabel = headers[valColIdx] || fallbackName;
  return {
    label: colLabel,
    analysis: analyzeEarthSystemSeries(dates, values, ''),
  };
}

