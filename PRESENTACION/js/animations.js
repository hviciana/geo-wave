/**
 * GeoWave Presentation - Animations & Particle Effects Engine
 * NASA Space Apps Challenge Málaga 2026
 * 
 * Provides an authentic, high-performance canvas starfield with cosmic scintillation,
 * orbital tracking lines, and dynamic number increment transitions.
 */

export class AnimationController {
    constructor() {
        this.canvas = document.getElementById('starfield-canvas');
        this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
        this.stars = [];
        this.numStars = 120;
        this.animationFrameId = null;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    init() {
        if (!this.canvas || !this.ctx) return;

        this.resizeCanvas();
        this.createStars();
        this.bindEvents();

        if (!this.prefersReducedMotion) {
            this.animateStars();
        } else {
            this.renderStaticStars();
        }

        // Listen to slide changes to trigger targeted metric counter animations
        window.addEventListener('slidechange', (e) => {
            this.handleSlideTransition(e.detail);
        });
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createStars();
            if (this.prefersReducedMotion) {
                this.renderStaticStars();
            }
        });
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createStars() {
        this.stars = [];
        const width = this.canvas.width;
        const height = this.canvas.height;

        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.3,
                baseAlpha: Math.random() * 0.7 + 0.2,
                currentAlpha: Math.random() * 0.7 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleDir: Math.random() > 0.5 ? 1 : -1,
                // Subtle cosmic drift
                vx: (Math.random() - 0.5) * 0.08,
                vy: (Math.random() - 0.5) * 0.08,
                color: Math.random() > 0.8 ? '#32d5e6' : (Math.random() > 0.85 ? '#318bff' : '#f4f7fc')
            });
        }
    }

    animateStars() {
        const render = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            for (let i = 0; i < this.stars.length; i++) {
                const s = this.stars[i];

                // Twinkle modulation
                s.currentAlpha += s.twinkleSpeed * s.twinkleDir;
                if (s.currentAlpha > 0.95) {
                    s.currentAlpha = 0.95;
                    s.twinkleDir = -1;
                } else if (s.currentAlpha < 0.2) {
                    s.currentAlpha = 0.2;
                    s.twinkleDir = 1;
                }

                // Drift
                s.x += s.vx;
                s.y += s.vy;

                // Wrap around edges
                if (s.x < 0) s.x = this.canvas.width;
                if (s.x > this.canvas.width) s.x = 0;
                if (s.y < 0) s.y = this.canvas.height;
                if (s.y > this.canvas.height) s.y = 0;

                // Draw Star
                this.ctx.beginPath();
                this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = s.color;
                this.ctx.globalAlpha = s.currentAlpha;
                this.ctx.fill();
            }

            this.animationFrameId = requestAnimationFrame(render);
        };

        render();
    }

    renderStaticStars() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.stars.forEach(s => {
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = s.color;
            this.ctx.globalAlpha = s.baseAlpha;
            this.ctx.fill();
        });
    }

    handleSlideTransition(detail) {
        // Trigger counter animation on metrics when Slide 5 becomes active
        if (detail.currentSlideId === 'slide-05') {
            this.animateMetrics();
        }
    }

    animateMetrics() {
        const numbers = document.querySelectorAll('#slide-05 .metric-number');
        numbers.forEach(el => {
            const rawVal = el.getAttribute('data-value') || el.textContent;
            const numericPart = parseFloat(rawVal);
            if (isNaN(numericPart)) return;

            const suffix = rawVal.replace(/[0-9.]/g, '');
            let start = 0;
            const duration = 1200;
            const startTime = performance.now();

            const update = (now) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease-out cubic
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = (numericPart * ease).toFixed(1);

                el.textContent = `${current}${suffix}`;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = rawVal;
                }
            };

            requestAnimationFrame(update);
        });
    }
}
