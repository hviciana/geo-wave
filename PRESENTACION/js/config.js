/**
 * GeoWave Presentation - Configuration File
 * NASA Space Apps Challenge Málaga 2026
 * 
 * Centralized configuration for URLs, metadata, and scientific references.
 */

export const CONFIG = {
    projectName: "GeoWave",
    tagline: "Making Earth Changes Visible",
    taglineEs: "Haciendo visibles los cambios en la Tierra",
    subTagline: "Turning satellite observations into interactive 3D experiences",
    subTaglineEs: "Transformando observaciones satelitales en experiencias 3D interactivas",
    event: "NASA Space Apps Challenge · Málaga 2026",
    edition: "Málaga 2026",
    maxSlides: 7,
    defaultLanguage: "es", // Spanish by default, switchable to English

    // External links (update with production endpoints when deployed)
    demoUrl: "https://geowave-demo.spaceapps-malaga.org",
    repositoryUrl: "https://github.com/NASA-SpaceApps-Malaga-2026/geowave-presentation",
    docUrl: "https://github.com/NASA-SpaceApps-Malaga-2026/geowave-presentation#readme",

    // Presentation Settings
    autoPlayInterval: 12000,
    enableSound: false,

    // Scientific Data Provenance
    scientificFramework: {
        radarMission: "NISAR (NASA-ISRO SAR, L & S Band) - Operational post July 2025",
        historicalSAR: "Copernicus Sentinel-1 (C-Band SAR)",
        opticalReference: "Copernicus Sentinel-2 & Landsat 8/9",
        elevationSource: "Copernicus 30m DEM / SRTM GL1",
        interferometry: "InSAR Line-of-Sight (LOS) Surface Deformation Analysis"
    },

    // AI Disclosure compliant with NASA Space Apps rules
    aiDisclosure: {
        en: {
            title: "AI USE DISCLOSURE",
            statement: "The GeoWave team utilized AI-assisted coding and visualization tooling during preliminary design, pipeline prototyping, and content synthesis. All geospatial methodologies, satellite data attributions, SAR interferometric validations, and scientific claims have been strictly reviewed, cross-referenced, and verified against NASA Earthdata and ESA Copernicus literature by human team members."
        },
        es: {
            title: "DECLARACIÓN DE USO DE IA",
            statement: "El equipo de GeoWave utilizó herramientas de asistencia mediante IA durante el diseño preliminar, prototipado del pipeline y síntesis de contenido. Todas las metodologías geoespaciales, atribución de datos satelitales, validaciones interferométricas SAR y afirmaciones científicas han sido rigurosamente revisadas, cotejadas y verificadas por integrantes humanos del equipo con la literatura de NASA Earthdata y ESA Copernicus."
        }
    }
};
