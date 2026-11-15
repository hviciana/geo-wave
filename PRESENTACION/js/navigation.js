/**
 * GeoWave Presentation - Navigation Module (Vertical Scroll & Export Architecture)
 * NASA Space Apps Challenge Málaga 2026
 * 
 * Handles continuous vertical scrolling, IntersectionObserver for viewport tracking,
 * smooth snap navigation, keyboard controls, and PDF export preparation.
 */

import { CONFIG } from './config.js';

export class PresentationNavigator {
    constructor() {
        this.slides = Array.from(document.querySelectorAll('.slide'));
        this.totalSlides = this.slides.length || CONFIG.maxSlides;
        this.currentIndex = 0;
        this.isProgrammaticScroll = false;

        // Navigation UI Elements
        this.progressBar = document.getElementById('progress-bar');
        this.currentSlideEl = document.getElementById('current-slide-num');
        this.totalSlidesEl = document.getElementById('total-slides-num');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.dotsNav = document.getElementById('dots-nav');

        // Observer
        this.slideObserver = null;

        // Auto-play interval holder
        this.autoPlayTimer = null;
        this.isAutoPlaying = false;
    }

    init() {
        if (!this.slides.length) return;

        // Initialize total slides counter
        if (this.totalSlidesEl) {
            this.totalSlidesEl.textContent = String(this.totalSlides).padStart(2, '0');
        }

        this.setupDotsNavigation();
        this.setupIntersectionObserver();
        this.bindEvents();

        // Check URL Hash for deep linking (#slide-3, etc.)
        const initialIndex = this.getSlideIndexFromHash();
        if (initialIndex > 0) {
            setTimeout(() => {
                this.goToSlide(initialIndex, false);
            }, 100);
        } else {
            this.updateActiveUI(0);
        }
    }

    setupDotsNavigation() {
        if (!this.dotsNav) return;
        this.dotsNav.innerHTML = '';

        this.slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.className = 'dot-btn';
            dot.setAttribute('aria-label', `Go to Slide ${index + 1}`);
            
            const badge = slide.querySelector('.slide-badge')?.textContent || `Slide ${index + 1}`;
            dot.setAttribute('data-title', badge.trim());

            dot.addEventListener('click', (e) => {
                e.preventDefault();
                this.goToSlide(index);
            });

            this.dotsNav.appendChild(dot);
        });
    }

    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-10% 0px -40% 0px',
            threshold: [0.1, 0.4, 0.7]
        };

        this.slideObserver = new IntersectionObserver((entries) => {
            if (this.isProgrammaticScroll) return;

            let mostVisibleSlide = null;
            let maxRatio = 0;

            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    mostVisibleSlide = entry.target;
                }
            });

            if (mostVisibleSlide) {
                const index = this.slides.indexOf(mostVisibleSlide);
                if (index !== -1 && index !== this.currentIndex) {
                    this.currentIndex = index;
                    this.updateActiveUI(index);
                }
            }
        }, options);

        this.slides.forEach(slide => this.slideObserver.observe(slide));
    }

    bindEvents() {
        // Prev / Next button clicks
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        // Global Keyboard Navigation
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));

        // Smooth scroll progress bar calculation
        window.addEventListener('scroll', () => {
            this.updateScrollProgress();
        }, { passive: true });

        // Browser Back / Forward hash navigation
        window.addEventListener('hashchange', () => {
            const index = this.getSlideIndexFromHash();
            if (index !== this.currentIndex) {
                this.goToSlide(index, false);
            }
        });
    }

    updateScrollProgress() {
        if (!this.progressBar) return;
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        this.progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }

    handleKeyDown(e) {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        switch (e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                this.nextSlide();
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                this.prevSlide();
                break;
            case 'Home':
                e.preventDefault();
                this.goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                this.goToSlide(this.totalSlides - 1);
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
                const targetSlide = parseInt(e.key, 10) - 1;
                if (targetSlide >= 0 && targetSlide < this.totalSlides) {
                    this.goToSlide(targetSlide);
                }
                break;
        }
    }

    getSlideIndexFromHash() {
        const hash = window.location.hash.toLowerCase();
        const match = hash.match(/#slide-?(\d+)/);
        if (match) {
            const index = parseInt(match[1], 10) - 1;
            if (index >= 0 && index < this.totalSlides) {
                return index;
            }
        }
        return 0;
    }

    goToSlide(index, updateHash = true) {
        if (index < 0 || index >= this.totalSlides) return;

        this.currentIndex = index;
        const targetSlide = this.slides[index];

        this.isProgrammaticScroll = true;

        // Smooth scroll to target slide
        targetSlide.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        this.updateActiveUI(index, updateHash);

        setTimeout(() => {
            this.isProgrammaticScroll = false;
        }, 800);
    }

    updateActiveUI(index, updateHash = true) {
        // Update active class on slides
        this.slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active', 'in-view');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update URL hash gently
        if (updateHash && window.location.hash !== `#slide-${index + 1}`) {
            history.replaceState(null, '', `#slide-${index + 1}`);
        }

        // Update HUD counter (01 / 07)
        if (this.currentSlideEl) {
            this.currentSlideEl.textContent = String(index + 1).padStart(2, '0');
        }

        // Update dots state
        if (this.dotsNav) {
            const dots = this.dotsNav.querySelectorAll('.dot-btn');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        // Update prev / next button states
        if (this.prevBtn) {
            this.prevBtn.disabled = index === 0;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = index === this.totalSlides - 1;
        }

        // Dispatch slidechange event for metric animations
        window.dispatchEvent(new CustomEvent('slidechange', {
            detail: {
                currentIndex: this.currentIndex,
                currentSlideId: this.slides[index].id,
                totalSlides: this.totalSlides
            }
        }));
    }

    nextSlide() {
        if (this.currentIndex < this.totalSlides - 1) {
            this.goToSlide(this.currentIndex + 1);
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.goToSlide(this.currentIndex - 1);
        }
    }

    toggleAutoPlay() {
        this.isAutoPlaying = !this.isAutoPlaying;
        if (this.isAutoPlaying) {
            this.autoPlayTimer = setInterval(() => {
                if (this.currentIndex < this.totalSlides - 1) {
                    this.nextSlide();
                } else {
                    this.goToSlide(0);
                }
            }, CONFIG.autoPlayInterval);
        } else {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        return this.isAutoPlaying;
    }
}
