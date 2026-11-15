import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Compass, Loader2 } from 'lucide-react';
import OrbitalGlobe from './components/OrbitalGlobe';
import TerrainViewer3D from './components/TerrainViewer3D';
import TimelineControl from './components/TimelineControl';
import ExaggerationPanel from './components/ExaggerationPanel';
import StoryModeTour from './components/StoryModeTour';
import { computeInterpolatedBuffers } from './utils/sarMath';

const SCENARIOS = [
  {
    id: 'la_fires',
    file: '/data/la_fires.json',
    label: 'Incendio Pacific Palisades (Los Ángeles · 2025)',
    shortLabel: 'Los Ángeles · Incendio',
    regionDate: 'Incendio forestal · California, EE. UU. · Enero 2025',
    subtitle: 'Perímetro oficial NIFC 23.448 acres sobre MDE real (Santa Monica Mountains)',
    mechanismTag: 'Polarización VH/HV',
    coords: [34.072, -118.585],
    beaconColor: '#f97316',
    defaultExag: 2,
    defaultVertex: 60 * 128 + 64,
  },
  {
    id: 'earthquake',
    file: '/data/earthquake.json',
    label: 'Terremoto Kamchatka Mw 8.8 (Etapa NISAR)',
    shortLabel: 'Kamchatka · Sismo NISAR',
    regionDate: 'Megaterremoto InSAR · Kamchatka, Pacífico · Jul–Nov 2025',
    subtitle: 'Bahía de Avacha & Shipunsky · Hipocentros USGS ±170 cm InSAR (Jul–Nov 2025)',
    mechanismTag: 'Fase InSAR NISAR L-Band',
    coords: [52.95, 159.25],
    beaconColor: '#f59e0b',
    defaultExag: 2.5,
    defaultVertex: 54 * 128 + 86,
  },
  {
    id: 'malaga_flood',
    file: '/data/malaga_flood.json',
    label: 'DANA Málaga — Valle del Guadalhorce (2024)',
    shortLabel: 'Málaga · DANA Agua',
    regionDate: 'Inundación por DANA · Málaga, España · Noviembre 2024',
    subtitle: 'Desbordamiento delimitado sobre cotas reales en metros y GIBS MODIS',
    mechanismTag: 'Backscatter Especular',
    coords: [36.695, -4.505],
    beaconColor: '#06b6d4',
    defaultExag: 2,
    defaultVertex: 68 * 128 + 66,
  },
];

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || 'Error inesperado de renderizado' };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary capturó un fallo en Visor SAR:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-screen h-screen bg-[#050508] text-zinc-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-zinc-400">
              Recuperación automática · Visor SAR 3D
            </div>
            <h2 className="text-lg font-semibold text-white">Se detuvo la escena interactiva</h2>
            <p className="text-xs font-mono text-zinc-300 bg-zinc-950 border border-zinc-800 rounded-xl p-3 break-words">
              {this.state.message}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, message: '' });
              }}
              className="w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-colors"
            >
              Reiniciar Visor SAR
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function AppContent() {
  const [viewMode, setViewMode] = useState('globe'); // 'globe' | 'terrain'
  const [activeScenarioId, setActiveScenarioId] = useState('la_fires');
  const [datasetCache, setDatasetCache] = useState({});
  const [loading, setLoading] = useState(false);

  const [tFloat, setTFloat] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [discreteOnly, setDiscreteOnly] = useState(false);
  const [renderMode, setRenderMode] = useState('hybrid'); // 'hybrid' | 'optical' | 'driver' | 'significance'
  const [compareMode, setCompareMode] = useState(false);
  const [splitX, setSplitX] = useState(0.5);
  const [exaggeration, setExaggeration] = useState(2);
  const [selectedVertex, setSelectedVertex] = useState(null);
  const [storyModeActive, setStoryModeActive] = useState(false);
  const [liveError, setLiveError] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [focusSubzone, setFocusSubzone] = useState({ id: 'all', lat: null, lon: null, nonce: 0 });

  const opticalMode = renderMode === 'optical';
  const setOpticalMode = (valOrFn) => {
    setRenderMode((prev) => {
      const prevBool = prev === 'optical';
      const nextBool = typeof valOrFn === 'function' ? valOrFn(prevBool) : Boolean(valOrFn);
      return nextBool ? 'optical' : 'hybrid';
    });
  };

  const tFloatRef = useRef(0);
  useEffect(() => {
    tFloatRef.current = tFloat;
  }, [tFloat]);

  const activeMeta = useMemo(
    () => SCENARIOS.find((s) => s.id === activeScenarioId) || SCENARIOS[0],
    [activeScenarioId]
  );

  const loadScenario = async (scenarioId) => {
    const meta = SCENARIOS.find((s) => s.id === scenarioId) || SCENARIOS[0];
    setActiveScenarioId(meta.id);
    setExaggeration(meta.defaultExag);
    setSelectedVertex(meta.defaultVertex);
    setTFloat(0);
    tFloatRef.current = 0;
    setIsPlaying(false);
    setRenderMode('hybrid');
    setCompareMode(false);
    setSplitX(0.5);
    setStoryModeActive(false);
    setActiveStep(1);
    setFocusSubzone((prev) => ({ id: 'all', lat: null, lon: null, nonce: prev.nonce + 1 }));

    if (datasetCache[meta.id]) {
      setViewMode('terrain');
      return;
    }

    setLoading(true);
    try {
      let res = await fetch(meta.file);
      if (!res.ok) {
        res = await fetch('/data/demo_fallback.json');
      }
      const data = await res.json();
      if (!Array.isArray(data?.timeline) || !Array.isArray(data?.base_elevation)) {
        throw new Error(`Dataset inválido o incompleto para ${meta.label}`);
      }
      setDatasetCache((prev) => ({ ...prev, [meta.id]: data }));
      setViewMode('terrain');
    } catch (err) {
      console.error('Error cargando dataset pre-horneado:', err);
    } finally {
      setLoading(false);
    }
  };

  const analyzeCustomZone = async (params) => {
    setLoading(true);
    setLiveError('');
    try {
      const res = await fetch('/api/analyze-zone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      const data = await res.json();
      if (!res.ok || !Array.isArray(data?.timeline) || !Array.isArray(data?.base_elevation)) {
        throw new Error(data?.error || 'No se pudo analizar la zona en vivo');
      }
      setDatasetCache((prev) => ({ ...prev, [data.id]: data }));
      setActiveScenarioId(data.id);
      setExaggeration(2);
      setSelectedVertex(64 * 128 + 64);
      setTFloat(0);
      tFloatRef.current = 0;
      setIsPlaying(false);
      setRenderMode('hybrid');
      setCompareMode(false);
      setSplitX(0.5);
      setStoryModeActive(false);
      setActiveStep(1);
      setFocusSubzone((prev) => ({ id: 'all', lat: null, lon: null, nonce: prev.nonce + 1 }));
      setViewMode('terrain');
    } catch (err) {
      setLiveError(err?.message || 'Error consultando Live API');
    } finally {
      setLoading(false);
    }
  };

  const dataset = datasetCache[activeScenarioId] || null;

  // Interpolación Catmull-Rom / Hermite para el instante T actual
  const buffers = useMemo(() => {
    if (!dataset?.timeline) return null;
    return computeInterpolatedBuffers(dataset.timeline, tFloat);
  }, [dataset, tFloat]);

  // Bucle limpio de reproducción continua o discreta (Solo pasadas reales) en Eje T
  useEffect(() => {
    if (!isPlaying || !dataset?.timeline) return;
    const maxIdx = Math.max(0, dataset.timeline.length - 1);
    const speed = Number.isFinite(Number(playbackSpeed)) ? Number(playbackSpeed) : 1;

    if (discreteOnly) {
      const intervalMs = Math.max(350, Math.round(1400 / Math.max(0.25, speed)));
      const timerId = setInterval(() => {
        const cur = Math.round(Number.isFinite(Number(tFloatRef.current)) ? Number(tFloatRef.current) : 0);
        const next = cur + 1;
        if (next > maxIdx) {
          if (isLooping) {
            tFloatRef.current = 0;
            setTFloat(0);
          } else {
            tFloatRef.current = maxIdx;
            setTFloat(maxIdx);
            setIsPlaying(false);
          }
          return;
        }
        tFloatRef.current = next;
        setTFloat(next);
      }, intervalMs);
      return () => clearInterval(timerId);
    }

    let lastTime = performance.now();
    let rafId;

    const tick = (now) => {
      const dt = Math.max(0, Math.min(0.1, (now - lastTime) / 1000));
      lastTime = now;
      const cur = Number.isFinite(Number(tFloatRef.current)) ? Math.max(0, Number(tFloatRef.current)) : 0;
      const next = Math.max(0, cur + dt * 0.42 * speed);

      if (next >= maxIdx) {
        if (isLooping) {
          tFloatRef.current = 0;
          setTFloat(0);
          rafId = requestAnimationFrame(tick);
        } else {
          tFloatRef.current = maxIdx;
          setTFloat(maxIdx);
          setIsPlaying(false);
        }
        return;
      }

      tFloatRef.current = next;
      setTFloat(next);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, isLooping, playbackSpeed, discreteOnly, dataset]);

  const handleTogglePlay = () => {
    if (!dataset?.timeline) return;
    setStoryModeActive(false);
    const maxIdx = Math.max(0, dataset.timeline.length - 1);
    if (!isPlaying && tFloatRef.current >= maxIdx - 0.02) {
      tFloatRef.current = 0;
      setTFloat(0);
    }
    setIsPlaying((p) => !p);
  };

  const handleManualSeek = (val) => {
    setStoryModeActive(false);
    setIsPlaying(false);
    const nextVal = discreteOnly ? Math.round(val) : val;
    tFloatRef.current = nextVal;
    setTFloat(nextVal);
  };

  const handleBackToGlobe = () => {
    setIsPlaying(false);
    setStoryModeActive(false);
    setViewMode('globe');
  };

  const handleSelectStep = (stepNum) => {
    setStoryModeActive(false);
    setIsPlaying(false);
    setActiveStep(stepNum);
    const maxIdx = Math.max(0, (dataset?.timeline?.length || 1) - 1);
    if (stepNum === 1) {
      setCompareMode(false);
      setRenderMode('hybrid');
    } else if (stepNum === 2) {
      setCompareMode(true);
      setRenderMode('hybrid');
      setSplitX(0.5);
      tFloatRef.current = maxIdx;
      setTFloat(maxIdx);
    } else if (stepNum === 3) {
      setCompareMode(false);
      setRenderMode('hybrid');
      tFloatRef.current = maxIdx;
      setTFloat(maxIdx);
    }
  };

  const handleSelectCompareDate = (idx) => {
    const maxIdx = Math.max(0, (dataset?.timeline?.length || 1) - 1);
    const clamped = Math.max(0, Math.min(maxIdx, idx));
    setStoryModeActive(false);
    setIsPlaying(false);
    setCompareMode(true);
    tFloatRef.current = clamped;
    setTFloat(clamped);
  };

  const handleFocusSubzone = (sz) => {
    setFocusSubzone((prev) => ({
      id: sz?.id || 'all',
      lat: sz?.lat ?? null,
      lon: sz?.lon ?? null,
      offset: sz?.offset || null,
      nonce: prev.nonce + 1,
    }));
  };

  if (viewMode === 'globe') {
    return (
      <div className="relative w-screen h-screen bg-[#050508]">
        <OrbitalGlobe
          scenarios={SCENARIOS}
          onEnterTerrain={loadScenario}
          onAnalyzeZone={analyzeCustomZone}
          liveError={liveError}
        />
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl px-5 py-3.5 flex items-center gap-3 text-sm font-medium text-zinc-100 shadow-2xl">
              <Loader2 className="w-4 h-4 animate-spin text-zinc-300" />
              Cargando relieve 3D y series NASA POWER / GIBS...
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#050508] flex flex-col overflow-hidden">
      {/* Cabecera Superior Minimalista */}
      <header className="min-h-[52px] bg-zinc-900/95 backdrop-blur-xl border-b border-zinc-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2 text-zinc-100 text-xs font-semibold tracking-tight">
            <Compass className="w-4 h-4 text-zinc-300" />
            <span>Dancing with the SAR&apos;s</span>
            <span className="hidden sm:inline text-zinc-500 font-mono font-normal text-[11px]">/ NASA</span>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            {SCENARIOS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => loadScenario(sc.id)}
                className={`px-3 py-1 rounded-lg text-xs transition-all ${
                  activeScenarioId === sc.id
                    ? 'bg-zinc-100 text-zinc-950 font-semibold shadow-sm'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {sc.shortLabel}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StoryModeTour
            dataset={dataset}
            storyModeActive={storyModeActive}
            setStoryModeActive={setStoryModeActive}
            tFloat={tFloat}
            setTFloat={setTFloat}
            setOpticalMode={setOpticalMode}
            setCompareMode={setCompareMode}
            setIsPlaying={setIsPlaying}
            setExaggeration={setExaggeration}
          />
        </div>
      </header>

      {/* Selector móvil */}
      <div className="flex md:hidden gap-1.5 px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 overflow-x-auto shrink-0">
        {SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => loadScenario(sc.id)}
            className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors ${
              activeScenarioId === sc.id ? 'bg-zinc-100 text-zinc-950 font-semibold' : 'bg-zinc-800 text-zinc-300'
            }`}
          >
            {sc.shortLabel}
          </button>
        ))}
      </div>

      {/* Área Principal: Lienzo 3D + Panel Lateral */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row">
        <main className="flex-1 min-h-0 relative">
          {loading || !dataset ? (
            <div className="w-full h-full flex items-center justify-center text-zinc-300 text-sm font-medium">
              <Loader2 className="w-4 h-4 animate-spin mr-2 text-zinc-400" />
              Cargando {activeMeta.label}...
            </div>
          ) : (
            <TerrainViewer3D
              dataset={dataset}
              tFloat={tFloat}
              isPlaying={isPlaying}
              onTogglePlay={handleTogglePlay}
              onManualSeek={handleManualSeek}
              playbackSpeed={playbackSpeed}
              setPlaybackSpeed={setPlaybackSpeed}
              renderMode={renderMode}
              setRenderMode={setRenderMode}
              opticalMode={opticalMode}
              setOpticalMode={setOpticalMode}
              compareMode={compareMode}
              setCompareMode={setCompareMode}
              splitX={splitX}
              setSplitX={setSplitX}
              exaggeration={exaggeration}
              selectedVertex={selectedVertex}
              onSelectVertex={setSelectedVertex}
              storyModeActive={storyModeActive}
              onBackToGlobe={handleBackToGlobe}
              buffers={buffers}
              activeStep={activeStep}
              focusSubzone={focusSubzone}
            />
          )}
        </main>

        {dataset && (
          <ExaggerationPanel
            dataset={dataset}
            tFloat={tFloat}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onManualSeek={handleManualSeek}
            exaggeration={exaggeration}
            setExaggeration={setExaggeration}
            selectedVertex={selectedVertex}
            buffers={buffers}
            renderMode={renderMode}
            setRenderMode={setRenderMode}
            opticalMode={opticalMode}
            setOpticalMode={setOpticalMode}
            activeStep={activeStep}
            onSelectStep={handleSelectStep}
            onSelectCompareDate={handleSelectCompareDate}
            activeSubzoneId={focusSubzone.id}
            onFocusSubzone={handleFocusSubzone}
            onBackToGlobe={handleBackToGlobe}
          />
        )}
      </div>

      {/* Controles Temporales Inferiores */}
      {dataset && (
        <TimelineControl
          dataset={dataset}
          tFloat={tFloat}
          setTFloat={setTFloat}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onTogglePlay={handleTogglePlay}
          onManualSeek={handleManualSeek}
          isLooping={isLooping}
          setIsLooping={setIsLooping}
          playbackSpeed={playbackSpeed}
          setPlaybackSpeed={setPlaybackSpeed}
          discreteOnly={discreteOnly}
          setDiscreteOnly={setDiscreteOnly}
          renderMode={renderMode}
          setRenderMode={setRenderMode}
          opticalMode={opticalMode}
          setOpticalMode={setOpticalMode}
          compareMode={compareMode}
          setCompareMode={setCompareMode}
          splitX={splitX}
          setSplitX={setSplitX}
          buffers={buffers}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <AppContent />
    </AppErrorBoundary>
  );
}
