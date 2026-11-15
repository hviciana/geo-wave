/**
 * GeoWave Presentation - Main Application Entrypoint
 * NASA Space Apps Challenge Málaga 2026
 * 
 * Orchestrates navigation, animation engine, interaction listeners, and configuration.
 */

import { CONFIG } from './config.js';
import { PresentationNavigator } from './navigation.js';
import { AnimationController } from './animations.js';
import { InteractionsController } from './interactions.js';

class GeoWaveApp {
    constructor() {
        this.navigator = null;
        this.animator = null;
        this.interactions = null;
    }

    init() {
        console.log(
            `%c 🛰️ ${CONFIG.projectName} %c ${CONFIG.event} `,
            'background: #318bff; color: #fff; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
            'background: #0a1425; color: #32d5e6; padding: 4px 8px; border-radius: 0 4px 4px 0; border: 1px solid #318bff;'
        );
        console.log(`Mission Tagline: "${CONFIG.tagline}"`);
        console.log(`Target Demo: ${CONFIG.demoUrl}`);

        // Initialize Animation Engine
        this.animator = new AnimationController();
        this.animator.init();

        // Initialize Navigation Controller
        this.navigator = new PresentationNavigator();
        this.navigator.init();

        // Initialize Interactive Controls, Language & Tabs
        this.interactions = new InteractionsController();
        this.interactions.init();

        // Bind global app instance for debugging/presentation control
        window.GeoWave = {
            config: CONFIG,
            nav: this.navigator,
            anim: this.animator,
            interactions: this.interactions
        };
    }
}

// Bootstrap when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new GeoWaveApp();
    app.init();
});
