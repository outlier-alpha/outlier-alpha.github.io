// Professional Investment Advisory JavaScript - Outlier Alpha Ventures
(function() {
    'use strict';
    
    // Performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
        console.log('🚀 Performance metrics:', list.getEntries());
    });
    
    // DOM Elements Cache
    const elements = {
        mobileMenuToggle: document.querySelector('.mobile-menu-toggle'),
        sidebar: document.querySelector('.sidebar'),
        newsletterForms: document.querySelectorAll('.newsletter-form, .newsletter-inline-form'),
        navLinks: document.querySelectorAll('.nav-link'),
        resourceCards: document.querySelectorAll('.resource-card'),
        postPreviews: document.querySelectorAll('.post-preview'),
        heroHeading: document.querySelector('.hero-heading'),
        companyLogos: document.querySelectorAll('.company-logo'),
        subscribeButtons: document.querySelectorAll('.subscribe-btn')
    };
    
    // Configuration
    const config = {
        animationDuration: 300,
        scrollThreshold: 100,
        typingSpeed: 50,
        intersectionThreshold: 0.1
    };
    
    // Utility Functions
    const utils = {
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        throttle: (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            }
        },
        
        fadeIn: (el, duration = config.animationDuration) => {
            el.style.opacity = 0;
            el.style.display = 'block';
            
            const start = performance.now();
            function fade(timestamp) {
                const elapsed = timestamp - start;
                const progress = elapsed / duration;
                
                if (progress < 1) {
                    el.style.opacity = progress;
                    requestAnimationFrame(fade);
                } else {
                    el.style.opacity = 1;
                }
            }
            requestAnimationFrame(fade);
        },
        
        createElement: (tag, className, innerHTML) => {
            const el = document.createElement(tag);
            if (className) el.className = className;
            if (innerHTML) el.innerHTML = innerHTML;
            return el;
        }
    };
    
    // Analytics and Tracking
    const analytics = {
        events: [],
        
        track: (event, data = {}) => {
            const eventData = {
                event,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent,
                ...data
            };
            
            analytics.events.push(eventData);
            console.log('📊 Analytics Event:', eventData);
            
            // Send to analytics service (replace with your preferred service)
            if (typeof gtag !== 'undefined') {
                gtag('event', event, data);
            }
        },
        
        pageView: () => {
            analytics.track('page_view', {
                title: document.title,
                referrer: document.referrer
            });
        }
    };
    
    // Mobile Menu Functionality
    const mobileMenu = {
        init: () => {
            if (!elements.mobileMenuToggle || !elements.sidebar) return;
            
            elements.mobileMenuToggle.addEventListener('click', mobileMenu.toggle);
            document.addEventListener('click', mobileMenu.handleOutsideClick);
            document.addEventListener('keydown', mobileMenu.handleKeydown);
        },
        
        toggle: () => {
            const isOpen = elements.sidebar.classList.contains('open');
            
            if (isOpen) {
                mobileMenu.close();
            } else {
                mobileMenu.open();
            }
            
            analytics.track('mobile_menu_toggle', { action: isOpen ? 'close' : 'open' });
        },
        
        open: () => {
            elements.sidebar.classList.add('open');
            elements.mobileMenuToggle.querySelector('i').className = 'fas fa-times';
            elements.mobileMenuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        },
        
        close: () => {
            elements.sidebar.classList.remove('open');
            elements.mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            elements.mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        },
        
        handleOutsideClick: (e) => {
            if (!elements.sidebar.contains(e.target) && 
                !elements.mobileMenuToggle.contains(e.target) &&
                elements.sidebar.classList.contains('open')) {
                mobileMenu.close();
            }
        },
        
        handleKeydown: (e) => {
            if (e.key === 'Escape' && elements.sidebar.classList.contains('open')) {
                mobileMenu.close();
            }
        }
    };
    
    // Newsletter Functionality
    const newsletter = {
        init: () => {
            elements.newsletterForms.forEach(form => {
                form.addEventListener('submit', newsletter.handleSubmit);
            });
        },
        
        handleSubmit: async function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            if (!newsletter.validateEmail(email)) {
                newsletter.showError(button, 'Please enter a valid email address');
                return;
            }
            
            // Show loading state
            newsletter.setLoadingState(button);
            
            try {
                // Submit to Formspree (actual form submission)
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    newsletter.showSuccess(button, 'Subscribed successfully!');
                    this.reset();
                    analytics.track('newsletter_subscribe', { email_domain: email.split('@')[1] });
                } else {
                    throw new Error('Subscription failed');
                }
                
            } catch (error) {
                newsletter.showError(button, 'Subscription failed. Please try again.');
                console.error('Newsletter subscription error:', error);
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.classList.remove('loading', 'success', 'error');
            }, 3000);
        },
        
        validateEmail: (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },
        
        setLoadingState: (button) => {
            button.innerHTML = `
                <div class="loading-dots">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                Subscribing...
            `;
            button.disabled = true;
            button.classList.add('loading');
        },
        
        showSuccess: (button, message) => {
            button.innerHTML = `<i class="fas fa-check"></i> ${message}`;
            button.classList.remove('loading');
            button.classList.add('success');
        },
        
        showError: (button, message) => {
            button.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${message}`;
            button.classList.remove('loading');
            button.classList.add('error');
        }
    };
    
    // Intersection Observer for Animations
    const animationObserver = {
        init: () => {
            if (!('IntersectionObserver' in window)) return;
            
            const observer = new IntersectionObserver(
                animationObserver.handleIntersection,
                { threshold: config.intersectionThreshold, rootMargin: '50px' }
            );
            
            // Observe elements for animation
            elements.resourceCards.forEach(card => observer.observe(card));
            elements.postPreviews.forEach(post => observer.observe(post));
            elements.companyLogos.forEach(logo => observer.observe(logo));
        },
        
        handleIntersection: (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100); // Stagger animations
                }
            });
        }
    };
    
    // Typewriter Effect for Hero
    const typewriter = {
        init: () => {
            if (!elements.heroHeading) return;
            
            const text = elements.heroHeading.textContent;
            elements.heroHeading.textContent = '';
            elements.heroHeading.style.opacity = '1';
            
            typewriter.type(elements.heroHeading, text, 0);
        },
        
        type: (element, text, index) => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                setTimeout(() => {
                    typewriter.type(element, text, index + 1);
                }, config.typingSpeed);
            } else {
                // Add cursor blink effect
                const cursor = utils.createElement('span', 'cursor', '|');
                element.appendChild(cursor);
                
                setTimeout(() => {
                    if (cursor.parentNode) cursor.remove();
                }, 2000);
            }
        }
    };
    
    // Scroll Progress Indicator
    const scrollProgress = {
        init: () => {
            if (!document.querySelector('.post-content')) return;
            
            const progressBar = utils.createElement('div', 'scroll-progress');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(90deg, #2563eb, #7c3aed);
                z-index: 1000;
                transition: width 0.1s ease;
                box-shadow: 0 0 10px rgba(37, 99, 235, 0.3);
            `;
            document.body.appendChild(progressBar);
            
            window.addEventListener('scroll', utils.throttle(() => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                progressBar.style.width = scrolled + '%';
            }, 10));
        }
    };
    
    // Code Copy Functionality
    const codeCopy = {
        init: () => {
            document.querySelectorAll('pre code').forEach(codeBlock => {
                const pre = codeBlock.parentNode;
                const copyButton = utils.createElement('button', 'copy-code-button', 'Copy');
                
                copyButton.style.cssText = `
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    padding: 4px 8px;
                    font-size: 12px;
                    background: rgba(0,0,0,0.7);
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    opacity: 0;
                    transition: opacity 0.2s;
                    font-family: var(--font-primary);
                `;
                
                pre.style.position = 'relative';
                
                pre.addEventListener('mouseenter', () => {
                    copyButton.style.opacity = '1';
                });
                
                pre.addEventListener('mouseleave', () => {
                    copyButton.style.opacity = '0';
                });
                
                copyButton.addEventListener('click', async () => {
                    try {
                        await navigator.clipboard.writeText(codeBlock.textContent);
                        copyButton.innerHTML = '<i class="fas fa-check"></i> Copied';
                        
                        setTimeout(() => {
                            copyButton.innerHTML = 'Copy';
                        }, 2000);
                        
                        analytics.track('code_copy', { language: codeBlock.className });
                        
                    } catch (err) {
                        console.error('Failed to copy code:', err);
                        copyButton.innerHTML = 'Error';
                    }
                });
                
                pre.appendChild(copyButton);
            });
        }
    };
    
    // Enhanced Navigation
    const navigation = {
        init: () => {
            elements.navLinks.forEach(link => {
                link.addEventListener('click', navigation.handleClick);
            });
            
            navigation.setActiveLink();
            window.addEventListener('popstate', navigation.setActiveLink);
        },
        
        handleClick: function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    analytics.track('anchor_click', { target: href });
                }
            } else {
                analytics.track('navigation_click', { 
                    page: href,
                    text: this.textContent.trim()
                });
            }
        },
        
        setActiveLink: () => {
            const currentPath = window.location.pathname;
            elements.navLinks.forEach(link => {
                const href = link.getAttribute('href');
                link.classList.toggle('active', 
                    href === currentPath || 
                    (href === '/' && currentPath === '/') ||
                    (href !== '/' && currentPath.startsWith(href))
                );
            });
        }
    };
    
    // Market Data Updates
    const marketData = {
        init: () => {
            marketData.updateIndicators();
            // Update every 15 minutes
            setInterval(marketData.updateIndicators, 15 * 60 * 1000);
        },
        
        updateIndicators: () => {
            // Simulate market data updates (replace with real API)
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach(indicator => {
                const valueEl = indicator.querySelector('.indicator-value');
                const changeEl = indicator.querySelector('.indicator-change');
                
                if (valueEl && changeEl) {
                    // Simulate small price movements
                    const currentValue = parseFloat(valueEl.textContent.replace(/,/g, ''));
                    const change = (Math.random() - 0.5) * 2; // -1% to +1%
                    const newValue = currentValue * (1 + change / 100);
                    
                    valueEl.textContent = new Intl.NumberFormat().format(Math.round(newValue));
                    changeEl.textContent = `${change > 0 ? '+' : ''}${change.toFixed(2)}%`;
                    changeEl.className = `indicator-change ${change > 0 ? 'positive' : 'negative'}`;
                }
            });
        }
    };
    
    // Performance Optimizations
    const performance = {
        init: () => {
            performance.lazyLoadImages();
            performance.preloadCriticalResources();
            performance.optimizeScrolling();
        },
        
        lazyLoadImages: () => {
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.classList.remove('lazy');
                                imageObserver.unobserve(img);
                            }
                        }
                    });
                });
                
                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }
        },
        
        preloadCriticalResources: () => {
            // Preload important pages
            const importantLinks = ['/about/', '/contact/', '/posts/'];
            importantLinks.forEach(link => {
                const linkEl = document.createElement('link');
                linkEl.rel = 'prefetch';
                linkEl.href = link;
                document.head.appendChild(linkEl);
            });
        },
        
        optimizeScrolling: () => {
            let ticking = false;
            
            function updateScrollPosition() {
                // Add scroll-based effects here
                ticking = false;
            }
            
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    requestAnimationFrame(updateScrollPosition);
                    ticking = true;
                }
            });
        }
    };
    
    // Theme and Preferences
    const theme = {
        init: () => {
            theme.respectMotionPreferences();
            theme.respectColorSchemePreferences();
        },
        
        respectMotionPreferences: () => {
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
            
            if (prefersReducedMotion.matches) {
                document.documentElement.style.setProperty('--animation-duration', '0.01ms');
                config.animationDuration = 1;
                config.typingSpeed = 1;
            }
        },
        
        respectColorSchemePreferences: () => {
            const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
            
            if (prefersDarkMode.matches) {
                document.documentElement.classList.add('dark-mode');
            }
        }
    };
    
    // Error Handling
    const errorHandler = {
        init: () => {
            window.addEventListener('error', errorHandler.handleError);
            window.addEventListener('unhandledrejection', errorHandler.handlePromiseRejection);
        },
        
        handleError: (event) => {
            console.error('JavaScript Error:', event.error);
            analytics.track('javascript_error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        },
        
        handlePromiseRejection: (event) => {
            console.error('Unhandled Promise Rejection:', event.reason);
            analytics.track('promise_rejection', {
                reason: event.reason.toString()
            });
        }
    };
    
    // Blog Post Enhancement Features
    const blogEnhancements = {
        init: () => {
            blogEnhancements.enhanceCodeBlocks();
            blogEnhancements.addImageLightbox();
            blogEnhancements.improveTableResponsiveness();
            blogEnhancements.addSmoothScrolling();
        },
        
        enhanceCodeBlocks: () => {
            document.querySelectorAll('pre code').forEach((block, index) => {
                // Add language indicator if available
                const language = block.className.match(/language-([\w-]+)/);
                if (language) {
                    const indicator = document.createElement('div');
                    indicator.className = 'code-language-indicator';
                    indicator.textContent = language[1].toUpperCase();
                    indicator.style.cssText = `
                        position: absolute;
                        top: 8px;
                        left: 12px;
                        font-size: 10px;
                        background: rgba(255,255,255,0.1);
                        color: rgba(255,255,255,0.7);
                        padding: 2px 6px;
                        border-radius: 3px;
                        text-transform: uppercase;
                        font-weight: 600;
                        letter-spacing: 0.5px;
                    `;
                    block.parentNode.style.position = 'relative';
                    block.parentNode.appendChild(indicator);
                }
                
                // Add line numbers for longer code blocks
                const lines = block.textContent.split('\n');
                if (lines.length > 5) {
                    block.classList.add('has-line-numbers');
                }
            });
        },
        
        addImageLightbox: () => {
            document.querySelectorAll('.post-content img').forEach(img => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function() {
                    const lightbox = document.createElement('div');
                    lightbox.className = 'image-lightbox';
                    lightbox.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.8);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        cursor: pointer;
                    `;
                    
                    const lightboxImg = document.createElement('img');
                    lightboxImg.src = this.src;
                    lightboxImg.alt = this.alt;
                    lightboxImg.style.cssText = `
                        max-width: 90%;
                        max-height: 90%;
                        object-fit: contain;
                        border-radius: 8px;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                    `;
                    
                    lightbox.appendChild(lightboxImg);
                    document.body.appendChild(lightbox);
                    
                    lightbox.addEventListener('click', () => {
                        document.body.removeChild(lightbox);
                    });
                    
                    analytics.track('image_view', { src: this.src });
                });
            });
        },
        
        improveTableResponsiveness: () => {
            document.querySelectorAll('.post-content table').forEach(table => {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-wrapper';
                wrapper.style.cssText = `
                    overflow-x: auto;
                    margin: var(--space-8) 0;
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow-sm);
                `;
                
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            });
        },
        
        addSmoothScrolling: () => {
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const target = document.getElementById(targetId);
                    
                    if (target) {
                        const offset = 80; // Account for fixed header
                        const targetPosition = target.offsetTop - offset;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        analytics.track('anchor_scroll', { target: targetId });
                    }
                });
            });
        }
    };
    
    // Initialization
    const app = {
        init: () => {
            console.log('%c🚀 Outlier Alpha Blog Initialized', 'color: #2563eb; font-size: 16px; font-weight: bold;');
            
            // Initialize all modules
            analytics.pageView();
            mobileMenu.init();
            newsletter.init();
            navigation.init();
            animationObserver.init();
            scrollProgress.init();
            codeCopy.init();
            marketData.init();
            performance.init();
            theme.init();
            errorHandler.init();
            blogEnhancements.init();
            
            // Add custom animations
            app.addCustomAnimations();
            
            // Initialize typewriter effect after a delay
            setTimeout(typewriter.init, 500);
            
            console.log('%c💎 Looking for investment insights? You\\'re in the right place!', 'color: #7c3aed; font-size: 14px;');
        },
        
        addCustomAnimations: () => {
            // Add CSS for animations
            const style = document.createElement('style');
            style.textContent = `
                .animate-in {
                    animation: slideInUp 0.6s ease-out forwards;
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .cursor {
                    animation: blink 1s infinite;
                }
                
                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }
                
                .loading-dots {
                    display: inline-flex;
                    gap: 2px;
                    margin-right: 8px;
                }
                
                .loading-dots div {
                    width: 4px;
                    height: 4px;
                    background: currentColor;
                    border-radius: 50%;
                    animation: loadingDots 1.4s ease-in-out infinite both;
                }
                
                .loading-dots div:nth-child(1) { animation-delay: -0.32s; }
                .loading-dots div:nth-child(2) { animation-delay: -0.16s; }
                .loading-dots div:nth-child(3) { animation-delay: 0; }
                
                @keyframes loadingDots {
                    0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
                    40% { transform: scale(1); opacity: 1; }
                }
                
                .subscribe-btn.success {
                    background: var(--accent-success) !important;
                }
                
                .subscribe-btn.error {
                    background: var(--accent-danger) !important;
                }
            `;
            document.head.appendChild(style);
        }
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', app.init);
    } else {
        app.init();
    }
    
    // Expose utilities for external use
    window.OutlierAlpha = {
        utils,
        analytics,
        config
    };
    
})();