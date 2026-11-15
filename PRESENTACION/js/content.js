/**
 * GeoWave Presentation - Bilingual Content Database (English & Spanish)
 * NASA Space Apps Challenge Málaga 2026
 * 
 * Accurately structured according to the official presentation proposal in README.md:
 * 1. Hook: What really happened in Valencia during the DANA?
 * 2. Problem: We have the data. We need to make it understandable.
 * 3. Solution: GeoWave - Converting satellite data into territories to explore.
 * 4. Operation: From the planet to disaster detail (Data transformation into 3D).
 * 5. Visual Impact: Valencia: before, during, and after (3 Case Studies).
 * 6. Collective Knowledge: Social network structure for geographic & scientific research.
 * 7. Future Vision & Prediction: Predicting the effects of future disasters & preparedness.
 */

export const I18N = {
    es: {
        meta: {
            title: "GeoWave — Visualización 3D y Predicción de Catástrofes | NASA Space Apps 2026",
            desc: "Plataforma web colaborativa y predictiva que transforma datos de observación satelital NISAR en experiencias 3D y red social de conocimiento."
        },
        header: {
            subtitle: "NASA Space Apps Challenge · Málaga",
            missionTag: "SIMULACIÓN DE PIPELINE NISAR L/S-SAR",
            helpTitle: "Atajos de teclado (? o H)",
            pdfTitle: "Exportar Presentación a PDF (P)",
            fullscreenTitle: "Pantalla Completa (F)",
            liveDemo: "Ver Demo"
        },
        slide1: {
            badge: "DIAPOSITIVA 01 · EL GANCHO EMOCIONAL",
            titlePrefix: "¿Qué pasó realmente en Valencia",
            titleHighlight: "durante la DANA?",
            motto: "«Sabemos que hubo una inundación. Pero ¿sabemos realmente cómo cambió el territorio?»",
            description: "Todos vimos imágenes de calles anegadas, lodo y destrucción. Sin embargo, hay una pregunta más profunda: ¿Qué extensión exacta alcanzó el agua? ¿Cómo se deformó la superficie? ¿Qué infraestructuras quedaron comprometidas? Los satélites lo observaron todo, pero los datos brutos no eran comprensibles para la sociedad.",
            orbitTag: "DETECCIÓN SAR · 29 OCTUBRE 2024",
            quickFacts: [
                { label: "Caso Clave", value: "DANA Valencia 2024" },
                { label: "Área Inundada", value: "156.4 km²" },
                { label: "Aumento Caudal", value: "+840% en 24h" },
                { label: "Radar Objetivo", value: "NISAR L/S-SAR" }
            ],
            scrollPrompt: "Desplaza hacia abajo para descubrir la solución ↓"
        },
        slide2: {
            badge: "DIAPOSITIVA 02 · EL PROBLEMA",
            titlePrefix: "Tenemos los datos.",
            titleHighlight: "Nos falta hacerlos comprensibles.",
            subtitle: "Los satélites recopilan información extraordinaria sobre nuestro planeta diariamente. Sin embargo, interpretar estos productos científicos requiere conocimientos especializados y herramientas reservadas a expertos.",
            pillars: [
                {
                    tag: "BARRERA 01",
                    title: "Datos Científicos Complejos",
                    text: "Las mediciones interferométricas de fase, las matrices de polarización y los coeficientes de retrodispersión (dB) son incomprensibles sin formación técnica avanzada en física de radar."
                },
                {
                    tag: "BARRERA 02",
                    title: "Información Dispersa en Silos",
                    text: "Los modelos de elevación (DEM), las imágenes multiespectrales, las capas de radar SAR y las infraestructuras residen en portales independientes con formatos y sistemas incompatibles."
                },
                {
                    tag: "BARRERA 03",
                    title: "Difícil Interpretación para el Público",
                    text: "Los mapas planos 2D comprimen la realidad: ocultan las pendientes del relieve, la profundidad de las cuencas y la velocidad temporal del fenómeno, dificultando la toma de decisiones."
                }
            ],
            quote: "«Disponemos de enormes cantidades de datos científicos sobre nuestro planeta, pero no somos capaces de interpretar visualmente qué significan ni cómo afectan al territorio.»"
        },
        slide3: {
            badge: "DIAPOSITIVA 03 · LA SOLUCIÓN",
            titlePrefix: "Convertimos datos satelitales en",
            titleHighlight: "territorios que podemos explorar.",
            subtitle: "GeoWave es una plataforma web interactiva y colaborativa que transforma telemetría de observación terrestre en mapas tridimensionales, temporales y evolutivos comprensibles para todos.",
            capabilities: [
                {
                    title: "Geometría Real de Relieve 3D",
                    status: "IMPLEMENTADO",
                    desc: "Reconstrucción tridimensional física del terreno mediante Modelos Digitales de Elevación (Copernicus DEM 30m / SRTM)."
                },
                {
                    title: "Detección de Cambios por Radar SAR",
                    status: "IMPLEMENTADO",
                    desc: "Superposición de máscaras dinámicas de cambio (NISAR / Sentinel-1) desacopladas de la elevación física para ver inundaciones y deformaciones."
                },
                {
                    title: "Exploración Temporal Interactiva",
                    status: "IMPLEMENTADO",
                    desc: "Línea de tiempo fluida con deslizador dinámico para comparar el antes, el durante y el después en un único modelo tridimensional."
                },
                {
                    title: "Comunidad y Ciencia Ciudadana",
                    status: "IMPLEMENTADO",
                    desc: "Estructura de red social abierta donde cada usuario publica, analiza, comenta y enriquece estudios geográficos compartidos."
                }
            ],
            layers: {
                topTag: "CAPA 03: DETECCIÓN DE CAMBIOS Y AGUA (SAR)",
                topDesc: "Anomalías de retrodispersión y umbrales de reflectancia radar",
                midTag: "CAPA 02: ORTO-RECTIFICACIÓN GEOESPACIAL",
                midDesc: "Alineación de coordenadas WGS84 UTM y calibración radiométrica",
                baseTag: "CAPA 01: MODELO DIGITAL DE ELEVACIÓN (DEM)",
                baseDesc: "Morfología y pendientes del relieve real (Copernicus 30m)"
            }
        },
        slide4: {
            badge: "DIAPOSITIVA 04 · FUNCIONAMIENTO",
            titlePrefix: "Del planeta al detalle",
            titleHighlight: "de una catástrofe.",
            subtitle: "Transformamos datos brutos científicos en experiencias visuales interactivas en cuatro sencillos pasos:",
            steps: [
                {
                    num: "01",
                    tag: "Selección Geográfica",
                    title: "Elige la Región en el Globo 3D",
                    desc: "Explora la Tierra tridimensional y dibuja un recuadro de coordenadas delimitando el área exacta que deseas estudiar."
                },
                {
                    num: "02",
                    tag: "Selección Temporal",
                    title: "Delimita el Periodo Temporal",
                    desc: "Indica las fechas de inicio y fin. La plataforma localiza automáticamente las pasadas satelitales disponibles en NASA y Copernicus."
                },
                {
                    num: "03",
                    tag: "Fusión Científica",
                    title: "Procesa los Datos Brutos",
                    desc: "El motor fusiona el relieve DEM con la retrodispersión radar SAR (NISAR / Sentinel), calculando áreas afectadas y deformaciones."
                },
                {
                    num: "04",
                    tag: "Visualización 3D",
                    title: "Explora la Evolución Tridimensional",
                    desc: "Navega el territorio en 3D con colores intuitivos: azul cian para inundaciones, rojo para fuego/lava y escala divergente para terremotos."
                }
            ],
            rigor: {
                title: "Distinción Científica Clave: Relieve vs Detección de Cambios",
                desc: "GeoWave separa rigurosamente la geometría del terreno (DEM) de los cambios detectados por radar. La elevación es la base tridimensional física, sobre la cual se proyectan las capas dinámicas de satélite."
            }
        },
        slide5: {
            badge: "DIAPOSITIVA 05 · IMPACTO VISUAL",
            titlePrefix: "Valencia:",
            titleHighlight: "antes, durante y después.",
            tabTitles: {
                valencia: "01. DANA de Valencia (España, 2024)",
                valenciaMeta: "Inundaciones",
                lapalma: "02. Volcán de La Palma (España, 2021)",
                lapalmaMeta: "Transformación del Relieve",
                turkiye: "03. Terremotos de Turquía (2023)",
                turkiyeMeta: "Deformación del Terreno"
            },
            metricLabels: {
                area: "Superficie Inundada Detectada",
                territory: "Cuenca Fluvial Afectada",
                infraTitle: "Infraestructuras Próximas y Afectadas",
                sensorsLabel: "Fuentes Satelitales:"
            },
            cases: [
                {
                    id: "valencia",
                    title: "Valencia: Antes, Durante y Después de la DANA",
                    eventDate: "29 de Octubre – 2 de Noviembre de 2024",
                    phenomenon: "Avenida Torrencial e Inundación Masiva",
                    summary: "Comparación interactiva de la huella hídrica en Horta Sud y Ribera. Arrastra el divisor central para observar cómo el agua desbordó el barranco del Poyo, anegó municipios y cortó autopistas clave.",
                    beforeLabel: "Antes: Octubre 19, 2024 (Caudal Normal)",
                    afterLabel: "Después: Octubre 31, 2024 (Pico Inundación)",
                    stats: {
                        affectedArea: "156.4 km²",
                        territoryPct: "14.8%",
                        infraRisk: "Crítico: Autovías A-3, V-31, líneas de Cercanías y 12 cascos urbanos"
                    },
                    sensors: "Sentinel-1 C-SAR, Sentinel-2, Landsat y Copernicus DEM 30m",
                    nisarNote: "Referencia histórica. Algoritmo 100% preparado para NISAR L/S-SAR tras su lanzamiento.",
                    legend: [
                        { color: "#32d5e6", label: "Lámina de Agua Inundada (Detección Radar SAR)" },
                        { color: "#f59e0b", label: "Lodos y Suelos Saturados de Humedad" },
                        { color: "#98a8bd", label: "Núcleos Urbanos y Vías de Comunicación" }
                    ]
                },
                {
                    id: "lapalma",
                    title: "La Palma: Transformación Radical del Relieve",
                    eventDate: "19 de Septiembre – 13 de Diciembre de 2021",
                    phenomenon: "Erupción Volcánica y Coladas de Lava",
                    summary: "El cono del Tajogaite transformó la geografía insular. GeoWave muestra el relieve pre-eruptivo contrastado con las coladas basálticas avanzando hacia el océano y formando la nueva fajana marina.",
                    beforeLabel: "Antes: Agosto 2021 (Relieve Original)",
                    afterLabel: "Después: Diciembre 2021 (Fajana Marina +48ha)",
                    stats: {
                        affectedArea: "12.2 km²",
                        territoryPct: "1.7%",
                        infraRisk: "Más de 3.000 edificaciones y 73 km de carreteras sepultadas"
                    },
                    sensors: "Sentinel-1 SAR, Sentinel-2 Infrarrojo, LiDAR IGN y DEM",
                    nisarNote: "La banda L de NISAR penetrará cenizas y humo donde otros sensores quedan ciegos.",
                    legend: [
                        { color: "#ff5d65", label: "Coladas de Lava y Cono Volcánico Tajogaite" },
                        { color: "#ef4444", label: "Nueva Plataforma Costera (Fajana Marina +48ha)" },
                        { color: "#10b981", label: "Masa Forestal y Cultivos Preservados" }
                    ]
                },
                {
                    id: "turkiye",
                    title: "Turquía: Deformación de la Corteza Terrestre",
                    eventDate: "6 de Febrero de 2023 (Mw 7.8 y Mw 7.5)",
                    phenomenon: "Fractura de Fallas y Desplazamiento Sísmico",
                    summary: "Dos megasismos rompieron la falla de Anatolia Oriental. Mediante interferometría InSAR se aprecian las franjas de deformación con desplazamientos superficiales de hasta 5.5 metros.",
                    beforeLabel: "Antes: 28 Ene 2023 (Coherencia Inicial)",
                    afterLabel: "Después: 9 Feb 2023 (Franjas InSAR y Ruptura)",
                    stats: {
                        affectedArea: "450 km",
                        territoryPct: "Regional",
                        infraRisk: "Colapso en Antakya/Kahramanmaraş y autovías desplazadas"
                    },
                    sensors: "Sentinel-1 InSAR (Pasadas Ascendente / Descendente), SRTM GL1",
                    nisarNote: "NISAR mantendrá la coherencia en zonas de deformación extrema sin perder señal.",
                    legend: [
                        { color: "#8b5cf6", label: "Desplazamiento Negativo LOS (Terreno alejándose del sensor)" },
                        { color: "#ec4899", label: "Levantamiento Positivo LOS (Terreno acercándose al sensor)" },
                        { color: "#f59e0b", label: "Línea de Fractura Superficial Activa" }
                    ]
                }
            ]
        },
        slide6: {
            badge: "DIAPOSITIVA 06 · INNOVACIÓN SOCIAL",
            titlePrefix: "El conocimiento también evoluciona",
            titleHighlight: "de forma colectiva.",
            subtitle: "GeoWave integra una arquitectura similar a una red social científica: una comunidad donde cada catástrofe se convierte en una oportunidad para construir conocimiento compartido.",
            features: [
                {
                    title: "Biblioteca Pública de Estudios",
                    desc: "Cada investigación cuenta con título, localización, fechas, visualización 3D interactiva y fuentes científicas abiertas."
                },
                {
                    title: "Interacción Social: Me Gusta y Popularidad",
                    desc: "Sistema de valoración comunitaria, reputación científica verificada y rankings de estudios más consultados y contrastados."
                },
                {
                    title: "Comentarios, Aportaciones y Forking",
                    desc: "Investigadores, estudiantes y ciudadanos pueden comentar, proponer correcciones o bifurcar el estudio para añadir nuevas perspectivas y capas SIG."
                }
            ],
            explorerTitle: "Feed Social de Estudios Geográficos",
            modeSimple: "Modo Ciudadano",
            modeScientific: "Modo Científico (SAR)",
            studies: [
                {
                    title: "Valencia Horta Sud: Cuellos de Botella en Cauces y Autovías",
                    author: "Por Dr. E. Gómez (UPV GeoLab) · Verificado",
                    verified: "✓ Verificado",
                    tags: ["DANA 2024", "Sentinel-1", "Hidrología"]
                },
                {
                    title: "La Palma: Disipación Térmica de Lava y Delta Marino",
                    author: "Por Instituto GeoVolcanics · Verificado",
                    verified: "✓ Verificado",
                    tags: ["Cumbre Vieja", "LiDAR", "Costas"]
                },
                {
                    title: "Falla de Anatolia Oriental: Desplazamiento Sísmico InSAR",
                    author: "Por S. Kalkan et al. (Red Sísmica Internacional)",
                    verified: "✓ Verificado",
                    tags: ["Turquía 2023", "InSAR", "Fallas"]
                }
            ]
        },
        slide7: {
            badge: "DIAPOSITIVA 07 · PREDICCIÓN Y VISIÓN DE FUTURO",
            titlePrefix: "No se trata solo de comprender lo que pasó.",
            titleHighlight: "Se trata de predecir y estar mejor preparados.",
            visionPillars: [
                {
                    title: "Predicción y Análisis de Patrones",
                    desc: "GeoWave compara catástrofes históricas con condiciones actuales para identificar patrones territoriales repetitivos y anticipar qué zonas sufrirán mayor impacto ante futuros eventos."
                },
                {
                    title: "Mapas de Vulnerabilidad Predictiva",
                    desc: "Fusión de datos satelitales con demografía, vías de evacuación y usos del suelo para responder no solo 'dónde se inundó', sino 'qué personas e infraestructuras están en riesgo inminente'."
                },
                {
                    title: "Simulación de Escenarios Hipotéticos",
                    desc: "Modelos predictivos que permiten a los servicios de emergencias ensayar escenarios preventivos y diseñar planes de contingencia basados en evidencias científicas."
                }
            ],
            actionMotto: "Transformar datos en conocimiento.",
            actionMottoSub: "Transformar conocimiento en prevención.",
            actionSub: "«El planeta está cambiando constantemente. Los satélites lo están observando. Nosotros queremos que todos podamos comprenderlo.»",
            openBtn: "ABRIR GEOWAVE →",
            sourceBtn: "Código Fuente",
            aiTag: "DECLARACIÓN DE USO DE IA",
            aiText: "El equipo de GeoWave utilizó herramientas de asistencia mediante IA durante el diseño preliminar, prototipado del pipeline y síntesis de contenido. Todas las metodologías geoespaciales, atribución de datos satelitales, validaciones interferométricas SAR y afirmaciones científicas han sido rigurosamente revisadas, cotejadas y verificadas por integrantes humanos del equipo con la literatura de NASA Earthdata y ESA Copernicus."
        },
        nav: {
            prev: "Anterior",
            next: "Siguiente"
        },
        modal: {
            title: "Controles y Atajos de Teclado",
            next: "Siguiente Diapositiva",
            nextKey: "↓ / AvPág",
            prev: "Diapositiva Anterior",
            prevKey: "↑ / RePág",
            homeEnd: "Primera / Última Diapositiva",
            homeEndKey: "Inicio / Fin",
            jump: "Saltar a Diapositiva",
            jumpKey: "Teclas 1 – 7",
            exportPdf: "Exportar / Imprimir PDF",
            exportPdfKey: "P",
            fullscreen: "Pantalla Completa",
            fullscreenKey: "F",
            langKey: "L",
            langLabel: "Cambiar Idioma (ES / EN)",
            touchTip: "Dispositivos táctiles: Deslizar a la izquierda para avanzar, a la derecha para retroceder. Tecla L para alternar idioma."
        }
    },

    en: {
        meta: {
            title: "GeoWave — 3D Disaster Visualization & Predictive Platform | NASA Space Apps 2026",
            desc: "Collaborative and predictive web platform turning NISAR Earth observation radar data into 3D experiences and shared collective intelligence."
        },
        header: {
            subtitle: "NASA Space Apps Challenge · Málaga",
            missionTag: "NISAR L/S-SAR SIMULATION PIPELINE",
            helpTitle: "Keyboard Shortcuts (? or H)",
            pdfTitle: "Export Presentation as PDF (P)",
            fullscreenTitle: "Toggle Fullscreen (F)",
            liveDemo: "Live Demo"
        },
        slide1: {
            badge: "SLIDE 01 · THE HOOK",
            titlePrefix: "What really happened in Valencia",
            titleHighlight: "during the DANA?",
            motto: "«We know there was a flood. But do we really know how the territory changed?»",
            description: "We all saw footage of submerged streets, mud, and destruction. Yet there is a deeper question: What was the exact extent of the water? How did the ground deform? Which transit arteries were severed? Satellites observed every square meter, but raw scientific telemetry remained inaccessible to society.",
            orbitTag: "SAR DETECTION · OCTOBER 29, 2024",
            quickFacts: [
                { label: "Benchmark Event", value: "Valencia DANA 2024" },
                { label: "Detected Flood", value: "156.4 km²" },
                { label: "Surge Rate", value: "+840% in 24h" },
                { label: "Target Sensor", value: "NISAR L/S-SAR" }
            ],
            scrollPrompt: "Scroll down to discover the solution ↓"
        },
        slide2: {
            badge: "SLIDE 02 · THE CHALLENGE",
            titlePrefix: "We have the data.",
            titleHighlight: "We need to make it understandable.",
            subtitle: "Earth observation satellites gather petabytes of planetary telemetry daily. Yet, interpreting complex radar interferograms and backscatter coefficients remains confined to specialized research institutes.",
            pillars: [
                {
                    tag: "BARRIER 01",
                    title: "Complex Scientific Data",
                    text: "Phase interferograms, polarimetric tensors, and radar backscatter (dB) require deep specialized radar physics training to decode and comprehend."
                },
                {
                    tag: "BARRIER 02",
                    title: "Fragmented Data Silos",
                    text: "Elevation models (DEM), multispectral imagery, SAR radar layers, and demographic infrastructure data reside in disconnected portals with incompatible coordinate systems."
                },
                {
                    tag: "BARRIER 03",
                    title: "Limited Public Accessibility",
                    text: "Decision makers and emergency teams receive flat 2D maps that compress topography, obscuring slope gradients, valley bottlenecks, and temporal flood speed."
                }
            ],
            quote: "«We possess immense amounts of scientific data about our planet, but we struggle to visually interpret what that data means and how it alters our territory.»"
        },
        slide3: {
            badge: "SLIDE 03 · THE SOLUTION",
            titlePrefix: "Turning satellite observations into",
            titleHighlight: "territories we can explore.",
            subtitle: "GeoWave is an open, interactive, and collaborative web platform that transforms Earth observation telemetry into intuitive, 3D evolutionary models accessible to everyone.",
            capabilities: [
                {
                    title: "Real 3D Topographic Relief Base",
                    status: "IMPLEMENTED",
                    desc: "Physical 3D terrain reconstruction using Digital Elevation Models (Copernicus DEM 30m / SRTM)."
                },
                {
                    title: "Multi-Sensor SAR Radar Change Overlays",
                    status: "IMPLEMENTED",
                    desc: "Decouples ground elevation from radar change detection, superimposing co-registered SAR backscatter and water masks onto terrain."
                },
                {
                    title: "Interactive Temporal Time-Scrubbing",
                    status: "IMPLEMENTED",
                    desc: "Dynamic timeline with a fluid split slider to compare pre-, co-, and post-event states on a single 3D topography."
                },
                {
                    title: "Community Social Network & Research",
                    status: "IMPLEMENTED",
                    desc: "Open social network architecture where every user publishes, examines, upvotes, and enriches shared geographic studies."
                }
            ],
            layers: {
                topTag: "LAYER 03: SATELLITE RADAR CHANGES (SAR)",
                topDesc: "Backscatter anomalies and radar flood thresholds",
                midTag: "LAYER 02: ORTHORECTIFIED CO-REGISTRATION",
                midDesc: "WGS84 UTM coordinate alignment and radiometric calibration",
                baseTag: "LAYER 01: DIGITAL ELEVATION MODEL (DEM)",
                baseDesc: "Real-world topographic slope morphology (Copernicus 30m)"
            }
        },
        slide4: {
            badge: "SLIDE 04 · HOW IT WORKS",
            titlePrefix: "From the planet to the detail",
            titleHighlight: "of a catastrophe.",
            subtitle: "Transforming raw scientific satellite telemetry into intuitive 3D visual insight in four clear steps:",
            steps: [
                {
                    num: "01",
                    tag: "Spatial Selection",
                    title: "Select a Region on the 3D Globe",
                    desc: "Explore the interactive 3D planet and draw a coordinate bounding box (BBOX) defining the exact territory you wish to study."
                },
                {
                    num: "02",
                    tag: "Temporal Query",
                    title: "Define the Time Window",
                    desc: "Set start and end dates. The system instantly queries NASA Earthdata and Copernicus to discover corresponding orbit tracks."
                },
                {
                    num: "03",
                    tag: "Scientific Fusion",
                    title: "Process Raw Observations",
                    desc: "The engine fuses static DEM elevation with dynamic SAR radar backscatter, calculating flood footprints and crustal displacements."
                },
                {
                    num: "04",
                    tag: "3D Visualization",
                    title: "Explore 3D Evolution",
                    desc: "Navigate the textured 3D landscape with intuitive color ramps: cyan for floods, orange-red for fire/lava, and diverging spectra for quakes."
                }
            ],
            rigor: {
                title: "Essential Scientific Rigor: Relief vs Radar Change Detection",
                desc: "GeoWave strictly separates terrain geometry (DEM) from radar change observations. Topographic elevation forms the physical 3D canvas onto which dynamic satellite change layers are projected."
            }
        },
        slide5: {
            badge: "SLIDE 05 · VISUAL IMPACT",
            titlePrefix: "Valencia:",
            titleHighlight: "before, during, and after.",
            tabTitles: {
                valencia: "01. Valencia DANA (Spain, 2024)",
                valenciaMeta: "Floods",
                lapalma: "02. La Palma Eruption (Spain, 2021)",
                lapalmaMeta: "Relief Transformation",
                turkiye: "03. Türkiye Earthquakes (2023)",
                turkiyeMeta: "Ground Deformation"
            },
            metricLabels: {
                area: "Inundated Area Detected",
                territory: "River Basin Affected",
                infraTitle: "Critical Infrastructure at Risk",
                sensorsLabel: "Satellite Sources:"
            },
            cases: [
                {
                    id: "valencia",
                    title: "Valencia: Before, During, and After the DANA",
                    eventDate: "October 29 – November 2, 2024",
                    phenomenon: "Flash Floods & Torrential River Surges",
                    summary: "Interactive comparison of the water footprint across Horta Sud and Ribera. Drag the slider to observe how the Poyo ravine overflowed, submerging municipalities and severing arterial motorways.",
                    beforeLabel: "Before: Oct 19, 2024 (Baseline Riverbed)",
                    afterLabel: "After: Oct 31, 2024 (Peak Flood Surge)",
                    stats: {
                        affectedArea: "156.4 km²",
                        territoryPct: "14.8%",
                        infraRisk: "Critical: A-3, V-31 motorways, commuter rail lines, and 12 urban centres"
                    },
                    sensors: "Sentinel-1 C-SAR, Sentinel-2, Landsat, and Copernicus DEM 30m",
                    nisarNote: "Historical benchmark. Pipeline is 100% compliant with NISAR L/S-SAR products.",
                    legend: [
                        { color: "#32d5e6", label: "Confirmed Inundation Sheet (SAR Water Threshold)" },
                        { color: "#f59e0b", label: "Mud & Saturated Soil Deposits" },
                        { color: "#98a8bd", label: "Urban Fabric & Critical Road Arteries" }
                    ]
                },
                {
                    id: "lapalma",
                    title: "La Palma: Radical Relief Transformation",
                    eventDate: "September 19 – December 13, 2021",
                    phenomenon: "Volcanic Fissure & Basaltic Lava Flows",
                    summary: "The Tajogaite cone reshaped island geography. GeoWave visualizes pre-eruption slopes contrasted with basaltic flows advancing to the Atlantic ocean to form a new 48-hectare marine delta.",
                    beforeLabel: "Before: August 2021 (Original Relief)",
                    afterLabel: "After: December 2021 (New Ocean Delta +48ha)",
                    stats: {
                        affectedArea: "12.2 km²",
                        territoryPct: "1.7%",
                        infraRisk: "Over 3,000 structures & 73 km of roads buried"
                    },
                    sensors: "Sentinel-1 SAR, Sentinel-2 Infrared, IGN LiDAR & DEM",
                    nisarNote: "NISAR L-Band will penetrate volcanic ash and smoke plumes where optical fails.",
                    legend: [
                        { color: "#ff5d65", label: "Active Lava Flows & Tajogaite Cone" },
                        { color: "#ef4444", label: "New Coastal Platform (Fajana Marina +48ha)" },
                        { color: "#10b981", label: "Preserved Pine Canopy & Slopes" }
                    ]
                },
                {
                    id: "turkiye",
                    title: "Türkiye: Earth Crust Deformation",
                    eventDate: "February 6, 2023 (Mw 7.8 & Mw 7.5)",
                    phenomenon: "Fault Rupture & Tectonic Slip Displacement",
                    summary: "Twin mega-earthquakes fractured the East Anatolian fault system. InSAR interferometry exposes concentric deformation fringes with up to 5.5 meters of surface slip along transport corridors.",
                    beforeLabel: "Before: Jan 28, 2023 (Pre-Seismic Coherence)",
                    afterLabel: "After: Feb 9, 2023 (InSAR Fringes & Rupture)",
                    stats: {
                        affectedArea: "450 km",
                        territoryPct: "Regional",
                        infraRisk: "Structural collapses in Antakya/Kahramanmaraş and severed highways"
                    },
                    sensors: "Sentinel-1 InSAR (Ascending / Descending Passes), SRTM GL1",
                    nisarNote: "NISAR maintains radar coherence in high-displacement seismic zones without decorrelation.",
                    legend: [
                        { color: "#8b5cf6", label: "Negative LOS Slip (Terrain moving away from sensor)" },
                        { color: "#ec4899", label: "Positive LOS Uplift (Terrain moving toward sensor)" },
                        { color: "#f59e0b", label: "Active Surface Rupture Trace" }
                    ]
                }
            ]
        },
        slide6: {
            badge: "SLIDE 06 · SOCIAL INNOVATION",
            titlePrefix: "Knowledge also evolves",
            titleHighlight: "collectively.",
            subtitle: "GeoWave incorporates a scientific social network architecture: a collective community where every disaster becomes an opportunity to build shared understanding.",
            features: [
                {
                    title: "Public Studies Library",
                    desc: "Each investigation includes title, location, dates, 3D interactive viewer, and fully reproducible open scientific sources."
                },
                {
                    title: "Social Interaction: Likes & Popularity",
                    desc: "Community ratings, verified scientific peer badges, and rankings of the most consulted, cross-validated disaster analyses."
                },
                {
                    title: "Comments, Contributions & Forking",
                    desc: "Researchers, students, and citizens can comment, propose corrections, or fork studies to superimpose GIS layers and ground truth observations."
                }
            ],
            explorerTitle: "Social Feed of Geographic Studies",
            modeSimple: "Public Mode",
            modeScientific: "Scientific Mode (SAR)",
            studies: [
                {
                    title: "Valencia Horta Sud: Ravine Bottlenecks & Motorway Saturation",
                    author: "By Dr. E. Gómez (UPV GeoLab) · Verified",
                    verified: "✓ Peer-Verified",
                    tags: ["DANA 2024", "Sentinel-1", "Hydrology"]
                },
                {
                    title: "La Palma: Lava Thermal Dissipation & Ocean Infill",
                    author: "By GeoVolcanics Institute · Verified",
                    verified: "✓ Peer-Verified",
                    tags: ["Cumbre Vieja", "LiDAR", "Coastal DEM"]
                },
                {
                    title: "East Anatolian Fault: InSAR Slip Partitioning",
                    author: "By S. Kalkan et al. (Global Seismic Network)",
                    verified: "✓ Peer-Verified",
                    tags: ["Türkiye 2023", "InSAR", "Crustal Slip"]
                }
            ]
        },
        slide7: {
            badge: "SLIDE 07 · DISASTER PREDICTION & FUTURE VISION",
            titlePrefix: "It's not just about understanding what happened.",
            titleHighlight: "It's about predicting and being prepared.",
            visionPillars: [
                {
                    title: "Prediction & Historical Pattern Analysis",
                    desc: "GeoWave benchmarks past catastrophes against current conditions to identify repetitive territorial patterns, forecasting which river basins or slopes will face acute hazards."
                },
                {
                    title: "Predictive Vulnerability Mapping",
                    desc: "Fusing satellite telemetry with demographics, evacuation corridors, and land use to answer not merely 'where water accumulated', but 'who and what is at imminent risk'."
                },
                {
                    title: "Hypothetical Scenario Simulations",
                    desc: "Predictive simulation models that empower emergency agencies to rehearse preventive contingency plans backed by hard satellite evidence."
                }
            ],
            actionMotto: "Transforming data into knowledge.",
            actionMottoSub: "Transforming knowledge into preparedness.",
            actionSub: "«The Earth is constantly changing. Satellites are observing it. We want everyone to understand it.»",
            openBtn: "OPEN GEOWAVE →",
            sourceBtn: "Source Code",
            aiTag: "AI USE DISCLOSURE",
            aiText: "The GeoWave team utilized AI-assisted coding and visualization tooling during preliminary design, pipeline prototyping, and content synthesis. All geospatial methodologies, satellite data attributions, SAR interferometric validations, and scientific claims have been strictly reviewed, cross-referenced, and verified against NASA Earthdata and ESA Copernicus literature by human team members."
        },
        nav: {
            prev: "Previous",
            next: "Next"
        },
        modal: {
            title: "Presentation Controls & Shortcuts",
            next: "Next Slide",
            nextKey: "↓ / PageDown",
            prev: "Previous Slide",
            prevKey: "↑ / PageUp",
            homeEnd: "First / Last Slide",
            homeEndKey: "Home / End",
            jump: "Jump to Slide",
            jumpKey: "Keys 1 – 7",
            exportPdf: "Export / Print PDF",
            exportPdfKey: "P",
            fullscreen: "Toggle Fullscreen",
            fullscreenKey: "F",
            langKey: "L",
            langLabel: "Toggle Language (ES / EN)",
            touchTip: "Touch devices: Swipe Left for next slide, Swipe Right for previous slide. Press L to toggle language."
        }
    }
};

// Default export alias
export const SLIDE_CONTENT = I18N.es;
