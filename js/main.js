/* ============================================================
   Norrapat Portfolio — Main JavaScript (Complete Rewrite)
   Vanilla JS, IntersectionObserver, RequestAnimationFrame
   No external libraries
   ============================================================ */

/* ==================== LIGHTBOX (global scope for onclick) ==================== */
function openLightbox(imgEl) {
    var lb = document.getElementById('lightbox');
    var lbImg = document.getElementById('lightbox-img');
    lbImg.src = imgEl.src;
    lbImg.alt = imgEl.alt || 'Photo';
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    var lb = document.getElementById('lightbox');
    lb.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
});

(function () {
    'use strict';

    /* ==================== FIREFLY PARTICLES ==================== */
    function initParticles() {
        const container = document.getElementById('particlesContainer');
        if (!container) return;

        const particleCount = 30;
        const particles = [];

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = (Math.random() * 2 + 3) + 'px';
            particle.style.height = particle.style.width;
            particle.style.position = 'fixed';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';

            container.appendChild(particle);

            // Particle object with physics
            particles.push({
                el: particle,
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                opacityPhase: Math.random() * Math.PI * 2,
                opacitySpeed: (Math.random() * 0.04 + 0.02),
                pulseDuration: Math.random() * 4000 + 2000
            });
        }

        // Animation loop
        function animateParticles() {
            const now = Date.now();

            particles.forEach((p) => {
                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
                if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

                // Keep in bounds
                p.x = Math.max(0, Math.min(window.innerWidth, p.x));
                p.y = Math.max(0, Math.min(window.innerHeight, p.y));

                // Update DOM
                p.el.style.left = p.x + 'px';
                p.el.style.top = p.y + 'px';

                // Firefly pulse effect
                const pulse = Math.sin(now / p.pulseDuration * Math.PI * 2) * 0.5 + 0.5;
                p.el.style.opacity = pulse * 0.8;
            });

            requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    /* ==================== BRICK-BLOCK SCROLL REVEAL ==================== */
    function initBrickReveal() {
        const brickElements = document.querySelectorAll('.brick-reveal');
        if (brickElements.length === 0) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        brickElements.forEach((el) => {
            observer.observe(el);
        });
    }

    /* ==================== SKILLS SPOTLIGHT CAROUSEL ==================== */
    function initSkillSpotlight() {
        const container = document.getElementById('skillSpotlight');
        if (!container) return;

        // Skills data structure
        const skillsData = {
            frontend: [
                { icon: '⚛️', name: 'React', desc: 'Built the MediTrack clinic UI with React components, state management via hooks, and dynamic form rendering for patient booking and diagnosis records.' },
                { icon: '📄', name: 'JavaScript', desc: 'Primary language for all frontend work. Wrote vanilla JS for this portfolio (animations, carousel, accordion), plus DOM manipulation in MediTrack and car rental projects.' },
                { icon: '🎨', name: 'HTML/CSS', desc: 'Responsive layouts with CSS Grid and Flexbox. Built this portfolio from scratch with CSS custom properties, keyframe animations, and mobile-first breakpoints.' },
                { icon: '🔧', name: 'Bootstrap', desc: 'Used in MediTrack for rapid UI prototyping: responsive navbars, modal dialogs for appointment management, card layouts for patient records.' },
                { icon: '🖌️', name: 'Tailwind', desc: 'Applied in personal projects for utility-first styling. Prefer it for quick iteration on component designs without writing custom CSS files.' }
            ],
            backend: [
                { icon: '🐍', name: 'Python', desc: 'Built the Long-Range Car Rental backend: booking logic, date validation, cancellation handling, and database queries. Also used for scripting and automation tasks.' },
                { icon: '⚡', name: 'FastAPI', desc: 'Developed RESTful API endpoints for MediTrack: patient CRUD, appointment scheduling, diagnosis records. Async request handling with automatic OpenAPI documentation.' },
                { icon: '🔷', name: '.NET', desc: 'Studied enterprise patterns during MSE. Familiar with ASP.NET MVC architecture, dependency injection, and Entity Framework for database access.' },
                { icon: '🗄️', name: 'SQL', desc: 'Designed relational schemas for car rental (vehicles, bookings, customers) and MediTrack (patients, appointments, diagnoses). Wrote complex joins and stored procedures.' },
                { icon: '☕', name: 'Java', desc: 'Used in the SOLNZ QA capstone: Spring Boot application with JUnit/Mockito tests, H2 test profiles, and mock beans for isolated integration testing.' }
            ],
            qa: [
                { icon: '✅', name: 'Test Automation', desc: 'Built 6 automated tests for SOLNZ CRM: integration tests, unit tests, and context load tests using JUnit + Mockito. Proposed Jenkinsfile.qa with test/QA/smoke stages.' },
                { icon: '🐛', name: 'Bug Tracking', desc: 'At Arcelik Hitachi: tracked defects across production lines, categorised by severity, assigned root causes, and verified corrective actions before closure.' },
                { icon: '📋', name: 'Test Planning', desc: 'Wrote test strategies for the SOLNZ capstone: defined scope, test profiles (H2 vs production DB), entry/exit criteria, and risk-based prioritisation.' },
                { icon: '🔍', name: 'QA Process', desc: '4.5 years at Hitachi: incoming inspection, in-process checks, final quality gates. Designed visual inspection standards for door-gap alignment and colour matching.' },
                { icon: '🧪', name: 'JUnit', desc: 'Wrote JUnit 5 test suites with @SpringBootTest, @MockBean, and test profile isolation. Achieved 0 failures across 6 automated tests in the SOLNZ pipeline.' },
                { icon: '⚙️', name: 'CI/CD', desc: 'Set up GitHub Actions CI pipeline for SOLNZ: auto-run tests on push, report results. Proposed Jenkins pipeline additions with dedicated QA and smoke stages.' }
            ],
            engineering: [
                { icon: '💻', name: 'C++', desc: 'Programmed PID control algorithms for the drone quadrotor project: 3-axis stabilisation, motor speed calculation, and sensor fusion on Arduino boards.' },
                { icon: '🎮', name: 'Unity', desc: 'Explored for interactive 3D visualisations during university. Familiar with scene management, physics systems, and C# scripting for game objects.' },
                { icon: '📐', name: 'AutoCAD / Inventor', desc: 'Designed full mechanical structures: drone quadrotor airframe, battle robot chassis and weapon systems. 3D modelling with stress analysis and assembly constraints.' },
                { icon: '🔩', name: 'SolidWorks', desc: 'Used for mechanical simulations and FEA analysis during engineering courses. Modelled parts with tolerances for CNC machining and 3D printing.' },
                { icon: '🤖', name: 'Arduino', desc: 'Core platform for drone and robot projects: sensor integration (gyroscope, accelerometer), PWM motor control, serial communication, and real-time control loops.' }
            ],
            tools: [
                { icon: '🐙', name: 'GitHub', desc: 'All projects version-controlled: SOLNZ QA, MediTrack, car rental, this portfolio. Used branches, PRs, and GitHub Actions for CI automation.' },
                { icon: '📊', name: 'MATLAB', desc: 'Used in engineering courses for signal processing, control system simulation (PID tuning), and data visualisation of sensor outputs from robot projects.' },
                { icon: '📝', name: 'LaTeX', desc: 'Wrote all MSE research papers in LaTeX: literature reviews, WIP paper on SOLNZ QA environment, and final capstone presentation with proper academic formatting.' },
                { icon: '🐳', name: 'Docker', desc: 'Containerised the SOLNZ test environment: H2 database + Spring Boot app in isolated containers. Used docker-compose for multi-service local development.' },
                { icon: '🔧', name: 'Jenkins', desc: 'Analysed existing SOLNZ Jenkins pipeline (no tests!). Proposed Jenkinsfile.qa adding test execution, QA gate, and smoke test stages before production deploy.' }
            ]
        };

        let currentCategory = 'frontend';
        let currentSkillIndex = 0;
        let autoRotateTimer = null;

        // Create HTML structure
        function render() {
            container.innerHTML = `
                <div class="skill-spotlight-list">
                    ${skillsData[currentCategory].map((skill, idx) =>
                        `<div class="skill-spotlight-item ${idx === currentSkillIndex ? 'active' : ''}" data-index="${idx}">
                            <span class="skill-item-icon">${skill.icon}</span>
                            <span class="skill-item-name">${skill.name}</span>
                        </div>`
                    ).join('')}
                </div>
                <div class="skill-spotlight-main">
                    <div class="spotlight-icon">${skillsData[currentCategory][currentSkillIndex].icon}</div>
                    <h3 class="spotlight-name">${skillsData[currentCategory][currentSkillIndex].name}</h3>
                    <p class="spotlight-desc">${skillsData[currentCategory][currentSkillIndex].desc}</p>
                </div>
            `;

            // Attach click handlers to list items
            container.querySelectorAll('.skill-spotlight-item').forEach((item, idx) => {
                item.addEventListener('click', () => {
                    currentSkillIndex = idx;
                    render();
                });
            });
        }

        // Handle category tabs
        function initTabs() {
            const tabs = document.querySelectorAll('.skill-tab[data-category]');
            tabs.forEach((tab) => {
                tab.addEventListener('click', () => {
                    tabs.forEach((t) => t.classList.remove('active'));
                    tab.classList.add('active');
                    currentCategory = tab.getAttribute('data-category');
                    currentSkillIndex = 0;
                    render();
                });
            });

            // Set initial active tab
            const initialTab = document.querySelector('.skill-tab[data-category="frontend"]');
            if (initialTab) {
                initialTab.classList.add('active');
            }
        }

        // Initialize
        render();
        initTabs();
    }

    /* ==================== AWARD ACCORDION ==================== */
    function initAwardAccordion() {
        const headers = document.querySelectorAll('.award-accordion-header');
        if (headers.length === 0) return;

        headers.forEach((header) => {
            header.addEventListener('click', () => {
                const item = header.closest('.award-accordion-item');
                if (!item) return;

                const isOpen = item.classList.contains('open');

                // Close all items
                document.querySelectorAll('.award-accordion-item').forEach((el) => {
                    el.classList.remove('open');
                });

                // Open clicked item if it wasn't open
                if (!isOpen) {
                    item.classList.add('open');
                }
            });
        });
    }

    /* ==================== SMOOTH SCROLL ==================== */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach((link) => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                e.preventDefault();

                const headerOffset = 100;
                const targetPosition = target.offsetTop - headerOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }

    /* ==================== NAVBAR SHRINK ON SCROLL ==================== */
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || window.pageYOffset;

            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    /* ==================== ACTIVE NAV LINK HIGHLIGHTING ==================== */
    function initActiveNavLink() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');

        if (navLinks.length === 0 || sections.length === 0) return;

        function updateActiveLink() {
            const scrollY = window.scrollY || window.pageYOffset;
            let current = '';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink(); // Initial call
    }

    /* ==================== MOBILE MENU TOGGLE ==================== */
    function initMobileMenu() {
        const toggle = document.querySelector('.nav-toggle');
        const menu = document.querySelector('.nav-menu');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
        });

        // Close menu when a link is clicked
        menu.querySelectorAll('.nav-link').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
            });
        });

        // Close menu on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                menu.classList.remove('active');
            }
        });
    }

    /* ==================== PROFILE AVATAR MORPH ==================== */
    function initAvatarMorph() {
        const avatar = document.querySelector('.hero-avatar');
        if (!avatar) return;

        const borderRadiusShapes = [
            '60% 40% 55% 45% / 45% 55% 40% 60%',
            '50% 50% 50% 50% / 50% 50% 50% 50%',
            '45% 55% 40% 60% / 60% 40% 55% 45%',
            '55% 45% 60% 40% / 40% 60% 45% 55%',
            '40% 60% 45% 55% / 55% 45% 60% 40%',
            '65% 35% 60% 40% / 35% 65% 40% 60%',
            '50% 50% 55% 45% / 50% 50% 45% 55%',
            '48% 52% 52% 48% / 52% 48% 48% 52%'
        ];

        let currentShapeIndex = 0;

        setInterval(() => {
            currentShapeIndex = (currentShapeIndex + 1) % borderRadiusShapes.length;
            avatar.style.borderRadius = borderRadiusShapes[currentShapeIndex];
            avatar.style.transition = 'border-radius 3s ease-in-out';
        }, 3000);
    }

    /* ==================== SECTION TITLE ANIMATION ==================== */
    function initSectionTitleAnimation() {
        const titles = document.querySelectorAll('.section-title');
        if (titles.length === 0) return;

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        titles.forEach((title) => {
            observer.observe(title);
        });
    }

    /* ==================== PARALLAX ON HERO ==================== */
    function initHeroParallax() {
        const heroVisual = document.querySelector('.hero-visual');
        if (!heroVisual) return;

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const offset = scrollY * 0.3;
            heroVisual.style.transform = `translateY(${offset}px)`;
        }, { passive: true });
    }

    /* ==================== INITIALIZATION ==================== */
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize all features
        initParticles();
        initBrickReveal();
        initSkillSpotlight();
        initAwardAccordion();
        initSmoothScroll();
        initNavbarScroll();
        initActiveNavLink();
        initMobileMenu();
        initAvatarMorph();
        initSectionTitleAnimation();
        initHeroParallax();

        console.log('Portfolio loaded');
    });

    /* ==================== WINDOW RESIZE HANDLER ==================== */
    window.addEventListener('resize', () => {
        const menu = document.querySelector('.nav-menu');
        if (menu && window.innerWidth > 768) {
            menu.classList.remove('active');
        }
    }, { passive: true });

})();
