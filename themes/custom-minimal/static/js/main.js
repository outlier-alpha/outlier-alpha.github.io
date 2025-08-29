// Modern Investment Blog JavaScript
(function() {
    'use strict';
    
    // DOM Elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const newsletterForm = document.querySelector('.newsletter-form');
    const inlineNewsletterForm = document.querySelector('.newsletter-inline-form');
    
    // Mobile menu functionality
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            
            // Update button icon
            const icon = this.querySelector('i');
            if (sidebar.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            }
        });
    }
    
    // Newsletter form handling
    const handleNewsletterSubmit = function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        // Show loading state
        button.textContent = 'Subscribing...';
        button.disabled = true;
        
        // Simulate API call (replace with actual newsletter service)
        setTimeout(() => {
            button.textContent = 'Subscribed!';
            button.style.background = 'var(--success-green)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
                this.reset();
            }, 3000);
        }, 1500);
    };
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    if (inlineNewsletterForm) {
        inlineNewsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Carousel functionality for resources
    function initCarousel(carouselElement) {
        if (!carouselElement) return;
        
        const container = carouselElement.querySelector('.carousel-container');
        const slides = carouselElement.querySelectorAll('.carousel-slide');
        const dotsContainer = carouselElement.querySelector('.carousel-controls');
        
        if (!container || slides.length === 0) return;
        
        let currentSlide = 0;
        const totalSlides = slides.length;
        
        // Create dots if they don't exist
        if (dotsContainer && dotsContainer.children.length === 0) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.dataset.slide = i;
                dotsContainer.appendChild(dot);
            }
        }
        
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.carousel-dot') : [];
        
        // Next slide function
        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
        
        // Previous slide function
        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        }
        
        // Update carousel display
        function updateCarousel() {
            container.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Dot click handlers
        dots.forEach((dot) => {
            dot.addEventListener('click', () => {
                currentSlide = parseInt(dot.dataset.slide);
                updateCarousel();
            });
        });
        
        // Add swipe gesture support
        let touchStartX = 0;
        let touchEndX = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX) {
                nextSlide(); // Swipe left
            } else if (touchEndX > touchStartX) {
                prevSlide(); // Swipe right
            }
        }
        
        // Auto-advance every 5 seconds
        const interval = setInterval(nextSlide, 5000);
        
        // Pause auto-advance on hover
        carouselElement.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Initialize
        updateCarousel();
    }
    
    // Initialize all carousels
    document.querySelectorAll('.resource-carousel').forEach(initCarousel);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Reading progress indicator (for blog posts)
    function initReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'reading-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--accent-blue);
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }
    
    // Initialize reading progress on article pages
    if (document.querySelector('.post-content')) {
        initReadingProgress();
    }
    
    // Copy to clipboard functionality for code blocks
    function initCodeCopy() {
        document.querySelectorAll('pre code').forEach((codeBlock) => {
            // Create copy button
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-code-button';
            copyButton.textContent = 'Copy';
            
            // Style the button
            copyButton.style.cssText = `
                position: absolute;
                top: 5px;
                right: 5px;
                padding: 3px 8px;
                font-size: 12px;
                background: rgba(255,255,255,0.1);
                color: #fff;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                opacity: 0;
                transition: opacity 0.2s;
            `;
            
            // Make container relative
            const pre = codeBlock.parentNode;
            pre.style.position = 'relative';
            
            // Show button on hover
            pre.addEventListener('mouseenter', () => {
                copyButton.style.opacity = '1';
            });
            
            pre.addEventListener('mouseleave', () => {
                copyButton.style.opacity = '0';
            });
            
            // Copy functionality
            copyButton.addEventListener('click', () => {
                navigator.clipboard.writeText(codeBlock.textContent)
                    .then(() => {
                        copyButton.textContent = 'Copied!';
                        setTimeout(() => {
                            copyButton.textContent = 'Copy';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy: ', err);
                        copyButton.textContent = 'Error';
                    });
            });
            
            pre.appendChild(copyButton);
        });
    }
    
    // Initialize copy code functionality
    initCodeCopy();
    
    // Initialize videos for resources section
    function initResourceVideos() {
        document.querySelectorAll('.resource-video-placeholder').forEach(placeholder => {
            placeholder.addEventListener('click', function() {
                const videoId = this.dataset.videoId;
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
                iframe.allowFullscreen = true;
                
                this.parentNode.replaceChild(iframe, this);
            });
        });
    }
    
    // Initialize resource videos
    initResourceVideos();
    
    // Performance optimization: reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
    
    // Console message for developers
    console.log('%c🚀 Outlier Alpha Blog', 'color: #3182ce; font-size: 18px; font-weight: bold;');
    console.log('%cLooking for strategic investment insights? You\'re in the right place!', 'color: #4a5568; font-size: 14px;');
    
})();
