/**
 * GeoWave Presentation - Interactive Controllers
 * NASA Space Apps Challenge Málaga 2026
 * 
 * Handles Language Switching (ES/EN), Fullscreen, Case Study Tab Switching,
 * Interactive Before/After Split Slider, Community Upvoting, and Shortcut Dialogs.
 */

import { CONFIG } from './config.js';
import { I18N } from './content.js';

export class InteractionsController {
    constructor() {
        this.currentCaseId = 'valencia';
        this.currentLang = localStorage.getItem('geowave_lang') || CONFIG.defaultLanguage || 'es';
    }

    init() {
        this.setupLanguageToggle();
        this.setupExternalLinks();
        this.setupPdfExport();
        this.setupFullscreen();
        this.setupShortcutsModal();
        this.setupCaseStudiesSwitcher();
        this.setupSplitSlider();
        this.setupDualModeToggle();
        this.setupUpvoteButtons();

        // Apply saved or default language
        this.applyLanguage(this.currentLang);
    }

    setupLanguageToggle() {
        const langBtn = document.getElementById('lang-toggle-btn');
        if (langBtn) {
            langBtn.addEventListener('click', () => {
                const newLang = this.currentLang === 'es' ? 'en' : 'es';
                this.setLanguage(newLang);
            });
        }

        // Keyboard shortcut 'l' or 'L' to toggle language
        window.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            if (e.key.toLowerCase() === 'l' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                const newLang = this.currentLang === 'es' ? 'en' : 'es';
                this.setLanguage(newLang);
            }
        });
    }

    setLanguage(lang) {
        if (!I18N[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('geowave_lang', lang);
        this.applyLanguage(lang);
    }

    applyLanguage(lang) {
        const t = I18N[lang];
        if (!t) return;

        document.documentElement.lang = lang;
        document.title = t.meta.title;

        // Meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', t.meta.desc);

        // Language toggle button UI
        const langCodes = document.querySelectorAll('.lang-toggle-btn .lang-code');
        langCodes.forEach(code => {
            code.classList.toggle('active', code.getAttribute('data-lang') === lang);
        });

        // Top Header
        const headerSub = document.querySelector('.brand-subtitle');
        if (headerSub) headerSub.textContent = t.header.subtitle;

        const missionTagText = document.querySelector('.mission-tag span:last-child');
        if (missionTagText) missionTagText.textContent = t.header.missionTag;

        const headerDemo = document.getElementById('header-demo-btn');
        if (headerDemo) {
            const span = headerDemo.querySelector('span');
            if (span) span.textContent = t.header.liveDemo;
        }

        // Slide 01
        const s1Badge = document.querySelector('#slide-01 .hero-event-tag span');
        if (s1Badge) s1Badge.textContent = t.slide1.badge;

        const s1Title = document.querySelector('#slide-01 .hero-title');
        if (s1Title) {
            s1Title.innerHTML = `${t.slide1.titlePrefix}<br><span class="gradient-text">${t.slide1.titleHighlight}</span>`;
        }

        const s1Motto = document.querySelector('#slide-01 .hero-motto');
        if (s1Motto) s1Motto.textContent = t.slide1.motto;

        const s1Desc = document.querySelector('#slide-01 .hero-description');
        if (s1Desc) s1Desc.textContent = t.slide1.description;

        const orbitMarker = document.querySelector('.satellite-track-marker span:last-child');
        if (orbitMarker) orbitMarker.textContent = t.slide1.orbitTag;

        const statPills = document.querySelectorAll('#slide-01 .stat-pill');
        if (statPills.length >= 4) {
            t.slide1.quickFacts.forEach((fact, i) => {
                const label = statPills[i].querySelector('.stat-label');
                const val = statPills[i].querySelector('.stat-value');
                if (label) label.textContent = fact.label;
                if (val) val.textContent = fact.value;
            });
        }

        const scrollPrompt = document.querySelector('.scroll-indicator-prompt span');
        if (scrollPrompt && t.slide1.scrollPrompt) scrollPrompt.textContent = t.slide1.scrollPrompt;

        // Slide 02
        const s2Badge = document.querySelector('#slide-02 .slide-badge');
        if (s2Badge) s2Badge.textContent = t.slide2.badge;

        const s2Title = document.querySelector('#slide-02 .slide-title');
        if (s2Title) {
            s2Title.innerHTML = `${t.slide2.titlePrefix} <span class="gradient-text">${t.slide2.titleHighlight}</span>`;
        }

        const s2Sub = document.querySelector('#slide-02 .slide-subtitle');
        if (s2Sub) s2Sub.textContent = t.slide2.subtitle;

        const challengeCards = document.querySelectorAll('#slide-02 .challenge-card');
        if (challengeCards.length >= 3) {
            t.slide2.pillars.forEach((p, i) => {
                const tag = challengeCards[i].querySelector('.card-step-num');
                const title = challengeCards[i].querySelector('.card-title');
                const text = challengeCards[i].querySelector('.card-text');
                if (tag) tag.textContent = p.tag;
                if (title) title.textContent = p.title;
                if (text) text.textContent = p.text;
            });
        }

        const s2Quote = document.querySelector('#slide-02 .quote-text');
        if (s2Quote) s2Quote.textContent = t.slide2.quote;

        // Slide 03
        const s3Badge = document.querySelector('#slide-03 .slide-badge');
        if (s3Badge) s3Badge.textContent = t.slide3.badge;

        const s3Title = document.querySelector('#slide-03 .slide-title');
        if (s3Title) {
            s3Title.innerHTML = `${t.slide3.titlePrefix} <span class="gradient-text">${t.slide3.titleHighlight}</span>`;
        }

        const s3Sub = document.querySelector('#slide-03 .slide-subtitle');
        if (s3Sub) s3Sub.textContent = t.slide3.subtitle;

        const capCards = document.querySelectorAll('#slide-03 .solution-feature-card');
        if (capCards.length >= 4) {
            t.slide3.capabilities.forEach((c, i) => {
                const title = capCards[i].querySelector('.feature-title');
                const badge = capCards[i].querySelector('.feature-badge');
                const desc = capCards[i].querySelector('.feature-desc');
                if (title) title.textContent = c.title;
                if (badge) badge.textContent = c.status;
                if (desc) desc.textContent = c.desc;
            });
        }

        const layerTop = document.querySelector('.stack-layer.layer-top .layer-title-tag span:last-child');
        const layerTopDesc = document.querySelector('.stack-layer.layer-top .layer-legend-row span');
        if (layerTop) layerTop.textContent = t.slide3.layers.topTag;
        if (layerTopDesc) layerTopDesc.textContent = t.slide3.layers.topDesc;

        const layerMid = document.querySelector('.stack-layer.layer-middle .layer-title-tag span:last-child');
        const layerMidDesc = document.querySelector('.stack-layer.layer-middle .layer-legend-row span');
        if (layerMid) layerMid.textContent = t.slide3.layers.midTag;
        if (layerMidDesc) layerMidDesc.textContent = t.slide3.layers.midDesc;

        const layerBase = document.querySelector('.stack-layer.layer-base .layer-title-tag span:last-child');
        const layerBaseDesc = document.querySelector('.stack-layer.layer-base .layer-legend-row span');
        if (layerBase) layerBase.textContent = t.slide3.layers.baseTag;
        if (layerBaseDesc) layerBaseDesc.textContent = t.slide3.layers.baseDesc;

        // Slide 04
        const s4Badge = document.querySelector('#slide-04 .slide-badge');
        if (s4Badge) s4Badge.textContent = t.slide4.badge;

        const s4Title = document.querySelector('#slide-04 .slide-title');
        if (s4Title) {
            s4Title.innerHTML = `${t.slide4.titlePrefix} <span class="gradient-text">${t.slide4.titleHighlight}</span>`;
        }

        const s4Sub = document.querySelector('#slide-04 .slide-subtitle');
        if (s4Sub) s4Sub.textContent = t.slide4.subtitle;

        const pipelineCards = document.querySelectorAll('#slide-04 .pipeline-step-card');
        if (pipelineCards.length >= 4) {
            t.slide4.steps.forEach((s, i) => {
                const tag = pipelineCards[i].querySelector('.step-header-tag');
                const title = pipelineCards[i].querySelector('.step-card-title');
                const desc = pipelineCards[i].querySelector('.step-card-desc');
                if (tag) tag.textContent = s.tag;
                if (title) title.textContent = s.title;
                if (desc) desc.textContent = s.desc;
            });
        }

        const rigorTitle = document.querySelector('.rigor-title');
        const rigorDesc = document.querySelector('.rigor-desc');
        if (rigorTitle) rigorTitle.textContent = t.slide4.rigor.title;
        if (rigorDesc) rigorDesc.textContent = t.slide4.rigor.desc;

        // Slide 05 Header & Tabs
        const s5Badge = document.querySelector('#slide-05 .slide-badge');
        if (s5Badge) s5Badge.textContent = t.slide5.badge;

        const s5Title = document.querySelector('#slide-05 .slide-title');
        if (s5Title) {
            s5Title.innerHTML = `${t.slide5.titlePrefix} <span class="gradient-text">${t.slide5.titleHighlight}</span>`;
        }

        const tabValenciaTitle = document.querySelector('.case-tab-btn[data-case="valencia"] .tab-btn-title');
        const tabValenciaMeta = document.querySelector('.case-tab-btn[data-case="valencia"] .tab-btn-meta');
        if (tabValenciaTitle) tabValenciaTitle.textContent = t.slide5.tabTitles.valencia;
        if (tabValenciaMeta) tabValenciaMeta.textContent = t.slide5.tabTitles.valenciaMeta;

        const tabLaPalmaTitle = document.querySelector('.case-tab-btn[data-case="lapalma"] .tab-btn-title');
        const tabLaPalmaMeta = document.querySelector('.case-tab-btn[data-case="lapalma"] .tab-btn-meta');
        if (tabLaPalmaTitle) tabLaPalmaTitle.textContent = t.slide5.tabTitles.lapalma;
        if (tabLaPalmaMeta) tabLaPalmaMeta.textContent = t.slide5.tabTitles.lapalmaMeta;

        const tabTurkiyeTitle = document.querySelector('.case-tab-btn[data-case="turkiye"] .tab-btn-title');
        const tabTurkiyeMeta = document.querySelector('.case-tab-btn[data-case="turkiye"] .tab-btn-meta');
        if (tabTurkiyeTitle) tabTurkiyeTitle.textContent = t.slide5.tabTitles.turkiye;
        if (tabTurkiyeMeta) tabTurkiyeMeta.textContent = t.slide5.tabTitles.turkiyeMeta;

        const metricAreaDesc = document.querySelector('#metric-affected-area + .metric-desc');
        const metricPctDesc = document.querySelector('#metric-territory-pct + .metric-desc');
        const infraRiskTitle = document.querySelector('.infra-risk-title');
        const provenanceLabel = document.querySelector('.sensor-provenance-box .provenance-item');
        if (metricAreaDesc) metricAreaDesc.textContent = t.slide5.metricLabels.area;
        if (metricPctDesc) metricPctDesc.textContent = t.slide5.metricLabels.territory;
        if (infraRiskTitle) infraRiskTitle.textContent = t.slide5.metricLabels.infraTitle;
        if (provenanceLabel) {
            provenanceLabel.childNodes[0].textContent = `${t.slide5.metricLabels.sensorsLabel} `;
        }

        // Render current case in current language
        this.renderCaseStudy(this.currentCaseId);

        // Slide 06
        const s6Badge = document.querySelector('#slide-06 .slide-badge');
        if (s6Badge) s6Badge.textContent = t.slide6.badge;

        const s6Title = document.querySelector('#slide-06 .slide-title');
        if (s6Title) {
            s6Title.innerHTML = `${t.slide6.titlePrefix} <span class="gradient-text">${t.slide6.titleHighlight}</span>`;
        }

        const s6Sub = document.querySelector('#slide-06 .slide-subtitle');
        if (s6Sub) s6Sub.textContent = t.slide6.subtitle;

        const commFeatItems = document.querySelectorAll('.community-feat-item');
        if (commFeatItems.length >= 3) {
            t.slide6.features.forEach((f, i) => {
                const title = commFeatItems[i].querySelector('h4');
                const desc = commFeatItems[i].querySelector('p');
                if (title) title.textContent = f.title;
                if (desc) desc.textContent = f.desc;
            });
        }

        const explorerTitle = document.querySelector('.explorer-title span');
        if (explorerTitle) explorerTitle.textContent = t.slide6.explorerTitle;

        const modeSimpleBtn = document.getElementById('mode-simple-btn');
        const modeSciBtn = document.getElementById('mode-scientific-btn');
        if (modeSimpleBtn) modeSimpleBtn.textContent = t.slide6.modeSimple;
        if (modeSciBtn) modeSciBtn.textContent = t.slide6.modeScientific;

        const studyCards = document.querySelectorAll('.study-item-card');
        if (studyCards.length >= 3) {
            t.slide6.studies.forEach((s, i) => {
                const title = studyCards[i].querySelector('.study-name');
                const verified = studyCards[i].querySelector('.verified-badge');
                const author = studyCards[i].querySelector('.study-author-line');
                if (title) title.textContent = s.title;
                if (verified) verified.textContent = s.verified;
                if (author) author.textContent = s.author;
            });
        }

        // Slide 07
        const s7Badge = document.querySelector('#slide-07 .slide-badge');
        if (s7Badge) s7Badge.textContent = t.slide7.badge;

        const s7Title = document.querySelector('#slide-07 .slide-title');
        if (s7Title) {
            s7Title.innerHTML = `${t.slide7.titlePrefix} <span class="gradient-text">${t.slide7.titleHighlight}</span>`;
        }

        const visionCards = document.querySelectorAll('.vision-card');
        if (visionCards.length >= 3) {
            t.slide7.visionPillars.forEach((p, i) => {
                const title = visionCards[i].querySelector('.vision-card-title');
                const desc = visionCards[i].querySelector('.vision-card-text');
                if (title) title.textContent = p.title;
                if (desc) desc.textContent = p.desc;
            });
        }

        const actionMotto = document.querySelector('.action-banner-motto');
        if (actionMotto) {
            actionMotto.innerHTML = `${t.slide7.actionMotto}<br><span class="gradient-text">${t.slide7.actionMottoSub}</span>`;
        }

        const actionSub = document.querySelector('.action-banner-sub');
        if (actionSub) actionSub.textContent = t.slide7.actionSub;

        const openBtnSpan = document.querySelector('#open-demo-btn span');
        if (openBtnSpan) openBtnSpan.textContent = t.slide7.openBtn;

        const sourceBtnSpan = document.querySelector('#github-repo-btn span');
        if (sourceBtnSpan) sourceBtnSpan.textContent = t.slide7.sourceBtn;

        const aiTag = document.querySelector('.ai-disclosure-tag');
        const aiText = document.querySelector('.ai-disclosure-text');
        if (aiTag) aiTag.textContent = t.slide7.aiTag;
        if (aiText) aiText.textContent = t.slide7.aiText;

        // Bottom Nav Controls
        const prevBtnSpan = document.querySelector('#prev-btn span');
        const nextBtnSpan = document.querySelector('#next-btn span');
        if (prevBtnSpan) prevBtnSpan.textContent = t.nav.prev;
        if (nextBtnSpan) nextBtnSpan.textContent = t.nav.next;

        // Modal
        const modalTitle = document.getElementById('modal-title');
        if (modalTitle) modalTitle.textContent = t.modal.title;

        const shortcutItems = document.querySelectorAll('.shortcut-item');
        if (shortcutItems.length >= 6) {
            shortcutItems[0].querySelector('.shortcut-label').textContent = t.modal.next;
            shortcutItems[0].querySelector('.shortcut-key').textContent = t.modal.nextKey;

            shortcutItems[1].querySelector('.shortcut-label').textContent = t.modal.prev;
            shortcutItems[1].querySelector('.shortcut-key').textContent = t.modal.prevKey;

            shortcutItems[2].querySelector('.shortcut-label').textContent = t.modal.homeEnd;
            shortcutItems[2].querySelector('.shortcut-key').textContent = t.modal.homeEndKey;

            shortcutItems[3].querySelector('.shortcut-label').textContent = t.modal.jump;
            shortcutItems[3].querySelector('.shortcut-key').textContent = t.modal.jumpKey;

            shortcutItems[4].querySelector('.shortcut-label').textContent = t.modal.exportPdf;
            shortcutItems[4].querySelector('.shortcut-key').textContent = t.modal.exportPdfKey;

            shortcutItems[5].querySelector('.shortcut-label').textContent = t.modal.fullscreen;
            shortcutItems[5].querySelector('.shortcut-key').textContent = t.modal.fullscreenKey;
        }

        const touchTip = document.querySelector('.modal-card p');
        if (touchTip) touchTip.textContent = t.modal.touchTip;
    }

    setupPdfExport() {
        const pdfBtn = document.getElementById('export-pdf-btn');
        if (pdfBtn) {
            pdfBtn.addEventListener('click', () => {
                window.print();
            });
        }

        window.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            if (e.key.toLowerCase() === 'p' && !e.ctrlKey && !e.metaKey) {
                e.preventDefault();
                window.print();
            }
        });
    }

    setupExternalLinks() {
        const demoButtons = document.querySelectorAll('.bind-demo-url');
        demoButtons.forEach(btn => {
            btn.setAttribute('href', CONFIG.demoUrl);
            btn.setAttribute('target', '_blank');
            btn.setAttribute('rel', 'noopener noreferrer');
        });

        const repoButtons = document.querySelectorAll('.bind-repo-url');
        repoButtons.forEach(btn => {
            btn.setAttribute('href', CONFIG.repositoryUrl);
            btn.setAttribute('target', '_blank');
            btn.setAttribute('rel', 'noopener noreferrer');
        });
    }

    setupFullscreen() {
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (!fullscreenBtn) return;

        const updateIcon = () => {
            const isFull = !!document.fullscreenElement;
            const titleEn = isFull ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)';
            const titleEs = isFull ? 'Salir de Pantalla Completa (F)' : 'Pantalla Completa (F)';
            fullscreenBtn.setAttribute('title', this.currentLang === 'es' ? titleEs : titleEn);
        };

        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(err => {
                    console.warn(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen().catch(err => {
                    console.warn(`Error attempting to exit fullscreen: ${err.message}`);
                });
            }
        });

        document.addEventListener('fullscreenchange', updateIcon);

        window.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            if (e.key.toLowerCase() === 'f') {
                e.preventDefault();
                fullscreenBtn.click();
            }
        });
    }

    setupShortcutsModal() {
        const helpBtn = document.getElementById('help-btn');
        const modal = document.getElementById('shortcuts-modal');
        const closeBtn = document.getElementById('close-modal-btn');

        if (!modal) return;

        const openModal = () => modal.classList.add('active');
        const closeModal = () => modal.classList.remove('active');

        if (helpBtn) helpBtn.addEventListener('click', openModal);
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        window.addEventListener('keydown', (e) => {
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
            if (e.key === '?' || e.key.toLowerCase() === 'h') {
                e.preventDefault();
                modal.classList.contains('active') ? closeModal() : openModal();
            } else if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    setupCaseStudiesSwitcher() {
        const tabBtns = document.querySelectorAll('.case-tab-btn');
        if (!tabBtns.length) return;

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const caseId = btn.getAttribute('data-case');
                if (!caseId || caseId === this.currentCaseId) return;

                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.currentCaseId = caseId;
                this.renderCaseStudy(caseId);
            });
        });
    }

    renderCaseStudy(caseId) {
        const t = I18N[this.currentLang] || I18N.es;
        const caseData = t.slide5.cases.find(c => c.id === caseId);
        if (!caseData) return;

        const titleEl = document.getElementById('case-title');
        const dateEl = document.getElementById('case-date');
        const summaryEl = document.getElementById('case-summary');
        const beforeLabelEl = document.getElementById('split-label-before');
        const afterLabelEl = document.getElementById('split-label-after');
        const metricAreaEl = document.getElementById('metric-affected-area');
        const metricPctEl = document.getElementById('metric-territory-pct');
        const infraRiskEl = document.getElementById('case-infra-risk');
        const sensorProvEl = document.getElementById('case-sensors');
        const nisarNoteEl = document.getElementById('case-nisar-note');

        if (titleEl) titleEl.textContent = caseData.title;
        if (dateEl) dateEl.textContent = `${caseData.eventDate} · ${caseData.phenomenon}`;
        if (summaryEl) summaryEl.textContent = caseData.summary;
        if (beforeLabelEl) beforeLabelEl.textContent = caseData.beforeLabel;
        if (afterLabelEl) afterLabelEl.textContent = caseData.afterLabel;

        if (metricAreaEl) {
            metricAreaEl.setAttribute('data-value', caseData.stats.affectedArea);
            metricAreaEl.textContent = caseData.stats.affectedArea;
        }
        if (metricPctEl) {
            metricPctEl.setAttribute('data-value', caseData.stats.territoryPct);
            metricPctEl.textContent = caseData.stats.territoryPct;
        }
        if (infraRiskEl) infraRiskEl.textContent = caseData.stats.infraRisk;
        if (sensorProvEl) sensorProvEl.textContent = caseData.sensors;
        if (nisarNoteEl) nisarNoteEl.textContent = caseData.nisarNote;

        // Update Legend
        const legendContainer = document.getElementById('case-legend');
        if (legendContainer) {
            legendContainer.innerHTML = '';
            caseData.legend.forEach(item => {
                const div = document.createElement('div');
                div.className = 'legend-item';
                div.innerHTML = `<span class="legend-color-dot" style="background-color: ${item.color}"></span><span>${item.label}</span>`;
                legendContainer.appendChild(div);
            });
        }

        // Update Graphic
        this.updateSplitViewerGraphic(caseId);
    }

    updateSplitViewerGraphic(caseId) {
        const beforeLayer = document.querySelector('.viewer-layer.layer-before');
        const afterLayer = document.querySelector('.viewer-layer.layer-after');
        if (!beforeLayer || !afterLayer) return;

        if (caseId === 'valencia') {
            beforeLayer.innerHTML = this.getValenciaBeforeSVG();
            afterLayer.innerHTML = this.getValenciaAfterSVG();
        } else if (caseId === 'lapalma') {
            beforeLayer.innerHTML = this.getLaPalmaBeforeSVG();
            afterLayer.innerHTML = this.getLaPalmaAfterSVG();
        } else if (caseId === 'turkiye') {
            beforeLayer.innerHTML = this.getTurkiyeBeforeSVG();
            afterLayer.innerHTML = this.getTurkiyeAfterSVG();
        }
    }

    setupSplitSlider() {
        const stage = document.querySelector('.viewer-interactive-stage');
        const divider = document.querySelector('.viewer-split-divider');
        const afterLayer = document.querySelector('.viewer-layer.layer-after');

        if (!stage || !divider || !afterLayer) return;

        let isDragging = false;

        const setPosition = (clientX) => {
            const rect = stage.getBoundingClientRect();
            let x = clientX - rect.left;
            x = Math.max(0, Math.min(x, rect.width));
            const percentage = (x / rect.width) * 100;

            divider.style.left = `${percentage}%`;
            afterLayer.style.clipPath = `inset(0 0 0 ${percentage}%)`;
        };

        stage.addEventListener('mousedown', (e) => {
            isDragging = true;
            setPosition(e.clientX);
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            setPosition(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
        });

        stage.addEventListener('touchstart', (e) => {
            isDragging = true;
            setPosition(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            setPosition(e.touches[0].clientX);
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isDragging = false;
        });
    }

    setupDualModeToggle() {
        const simpleBtn = document.getElementById('mode-simple-btn');
        const scientificBtn = document.getElementById('mode-scientific-btn');
        const feed = document.querySelector('.studies-feed');

        if (!simpleBtn || !scientificBtn || !feed) return;

        simpleBtn.addEventListener('click', () => {
            simpleBtn.classList.add('active');
            scientificBtn.classList.remove('active');
            feed.classList.remove('scientific-mode');
            feed.classList.add('simple-mode');
            this.toggleAudienceModeText('simple');
        });

        scientificBtn.addEventListener('click', () => {
            scientificBtn.classList.add('active');
            simpleBtn.classList.remove('active');
            feed.classList.remove('simple-mode');
            feed.classList.add('scientific-mode');
            this.toggleAudienceModeText('scientific');
        });
    }

    toggleAudienceModeText(mode) {
        const cards = document.querySelectorAll('.study-item-card');
        cards.forEach(card => {
            const extra = card.querySelector('.scientific-meta-tag');
            if (extra) {
                extra.style.display = (mode === 'scientific') ? 'inline-block' : 'none';
            }
        });
    }

    setupUpvoteButtons() {
        const likeBtns = document.querySelectorAll('.action-counter-btn.like-action');
        likeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const countSpan = btn.querySelector('.like-count');
                if (!countSpan) return;

                let count = parseInt(countSpan.textContent, 10);
                if (btn.classList.contains('liked')) {
                    btn.classList.remove('liked');
                    countSpan.textContent = count - 1;
                } else {
                    btn.classList.add('liked');
                    countSpan.textContent = count + 1;
                }
            });
        });
    }

    getValenciaBeforeSVG() {
        return `
        <svg viewBox="0 0 600 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="valenciaBasin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#142845"/>
                    <stop offset="100%" stop-color="#0a1628"/>
                </linearGradient>
            </defs>
            <rect width="600" height="360" fill="url(#valenciaBasin)"/>
            <path d="M 50,40 Q 180,90 280,60 T 520,110" fill="none" stroke="#223d68" stroke-width="2"/>
            <path d="M 30,120 Q 160,180 310,140 T 560,190" fill="none" stroke="#223d68" stroke-width="2"/>
            <path d="M 40,240 Q 220,290 380,250 T 580,290" fill="none" stroke="#223d68" stroke-width="2"/>
            <path d="M 80,60 Q 220,150 290,210 T 490,280" fill="none" stroke="#318bff" stroke-width="3" opacity="0.6"/>
            <path d="M 40,160 L 520,160" fill="none" stroke="#5e718d" stroke-width="2" stroke-dasharray="6,4"/>
            <path d="M 320,40 L 320,320" fill="none" stroke="#5e718d" stroke-width="2" stroke-dasharray="6,4"/>
            <circle cx="320" cy="160" r="5" fill="#f4f7fc"/>
            <text x="330" y="155" fill="#98a8bd" font-size="11" font-family="Space Grotesk">Paiporta / Sedaví</text>
            <circle cx="210" cy="130" r="4" fill="#f4f7fc"/>
            <text x="145" y="125" fill="#98a8bd" font-size="10" font-family="Space Grotesk">Chiva</text>
        </svg>`;
    }

    getValenciaAfterSVG() {
        return `
        <svg viewBox="0 0 600 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="floodGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0e2340"/>
                    <stop offset="100%" stop-color="#061224"/>
                </linearGradient>
            </defs>
            <rect width="600" height="360" fill="url(#floodGlow)"/>
            <path d="M 50,40 Q 180,90 280,60 T 520,110" fill="none" stroke="#1f365c" stroke-width="2"/>
            <path d="M 30,120 Q 160,180 310,140 T 560,190" fill="none" stroke="#1f365c" stroke-width="2"/>
            <path d="M 120,80 Q 240,120 280,180 T 420,290 L 490,270 Q 360,200 310,130 T 160,70 Z" fill="rgba(50, 213, 230, 0.45)" stroke="#32d5e6" stroke-width="2.5"/>
            <path d="M 140,110 Q 260,140 300,190 T 450,300 L 480,285 Q 350,210 290,140 T 170,90 Z" fill="rgba(245, 158, 11, 0.25)" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4,2"/>
            <path d="M 40,160 L 520,160" fill="none" stroke="#ff5d65" stroke-width="2.5" stroke-dasharray="6,4"/>
            <path d="M 320,40 L 320,320" fill="none" stroke="#ff5d65" stroke-width="2.5" stroke-dasharray="6,4"/>
            <circle cx="320" cy="160" r="7" fill="#ff5d65" stroke="#fff" stroke-width="2"/>
            <circle cx="210" cy="130" r="6" fill="#ff5d65" stroke="#fff" stroke-width="2"/>
            <rect x="20" y="20" width="180" height="24" rx="4" fill="rgba(10,20,37,0.85)" stroke="#32d5e6"/>
            <text x="30" y="36" fill="#32d5e6" font-size="10" font-family="JetBrains Mono">Sentinel-1 C-SAR Flood Mask</text>
        </svg>`;
    }

    getLaPalmaBeforeSVG() {
        return `
        <svg viewBox="0 0 600 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="360" fill="#0b1a2e"/>
            <path d="M 500,0 L 500,360 L 600,360 L 600,0 Z" fill="#061833"/>
            <text x="515" y="180" fill="#318bff" font-size="11" font-family="Space Grotesk">Atlantic Ocean</text>
            <path d="M 80,60 Q 250,140 490,120" fill="none" stroke="#1c3d69" stroke-width="2"/>
            <path d="M 60,190 Q 280,240 490,220" fill="none" stroke="#1c3d69" stroke-width="2"/>
            <ellipse cx="260" cy="160" rx="90" ry="50" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="1.5"/>
            <text x="210" y="165" fill="#10b981" font-size="11" font-family="Space Grotesk">Todoque & Crops</text>
        </svg>`;
    }

    getLaPalmaAfterSVG() {
        return `
        <svg viewBox="0 0 600 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="360" fill="#0b1a2e"/>
            <path d="M 500,0 L 500,360 L 600,360 L 600,0 Z" fill="#061833"/>
            <circle cx="120" cy="180" r="22" fill="#ff5d65" stroke="#f59e0b" stroke-width="3"/>
            <text x="80" y="225" fill="#f59e0b" font-size="10" font-family="JetBrains Mono">Tajogaite Vent</text>
            <path d="M 140,175 Q 260,140 370,180 T 500,200 L 530,220 Q 520,245 490,250 T 360,220 Q 240,210 140,195 Z" fill="rgba(255, 93, 101, 0.55)" stroke="#ff5d65" stroke-width="2"/>
            <path d="M 500,200 Q 545,215 530,240 L 490,250 Z" fill="rgba(239, 68, 68, 0.85)" stroke="#fff" stroke-width="2"/>
            <text x="440" y="275" fill="#ef4444" font-size="10" font-family="Space Grotesk">+48ha Fajana</text>
        </svg>`;
    }

    getTurkiyeBeforeSVG() {
        return `
        <svg viewBox="0 0 600 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="360" fill="#091426"/>
            <line x1="60" y1="320" x2="540" y2="40" stroke="#5e718d" stroke-width="2" stroke-dasharray="8,4"/>
            <text x="180" y="210" fill="#98a8bd" font-size="11" font-family="JetBrains Mono">East Anatolian Fault (EAF)</text>
            <text x="120" y="100" fill="#318bff" font-size="12" font-family="Space Grotesk">Anatolian Block ↖</text>
            <text x="380" y="280" fill="#32d5e6" font-size="12" font-family="Space Grotesk">↘ Arabian Plate</text>
        </svg>`;
    }

    getTurkiyeAfterSVG() {
        return `
        <svg viewBox="0 0 600 360" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="360" fill="#091426"/>
            <line x1="60" y1="320" x2="540" y2="40" stroke="#f59e0b" stroke-width="3"/>
            <ellipse cx="260" cy="180" rx="90" ry="45" fill="none" stroke="#8b5cf6" stroke-width="2.5" opacity="0.8"/>
            <ellipse cx="260" cy="180" rx="140" ry="70" fill="none" stroke="#ec4899" stroke-width="2" opacity="0.65"/>
            <ellipse cx="380" cy="110" rx="70" ry="35" fill="none" stroke="#8b5cf6" stroke-width="2.5" opacity="0.8"/>
            <ellipse cx="380" cy="110" rx="120" ry="60" fill="none" stroke="#ec4899" stroke-width="2" opacity="0.65"/>
            <circle cx="260" cy="180" r="9" fill="#ff5d65" stroke="#fff" stroke-width="2.5"/>
            <text x="280" y="185" fill="#fff" font-size="12" font-family="Space Grotesk" font-weight="700">Mw 7.8 Pazarcık</text>
            <text x="70" y="50" fill="#8b5cf6" font-size="10" font-family="JetBrains Mono">InSAR Line-Of-Sight (LOS) 5.5m Slip</text>
        </svg>`;
    }
}
