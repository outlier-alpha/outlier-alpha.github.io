/* ===================================================
   ENHANCED SIDEBAR AND INTERACTION JAVASCRIPT
   =================================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced sidebar script loaded');

    // Global Variables
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

    // Sidebar Toggle Functionality
    function toggleSidebar() {
        if (!sidebar || !mainWrapper) {
            console.error('Sidebar or main wrapper not found');
            return;
        }

        const isMinimized = sidebar.classList.contains('minimized');
        
        if (isMinimized) {
            // Expand sidebar
            sidebar.classList.remove('minimized');
            mainWrapper.classList.remove('sidebar-minimized');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-chevron-left';
            }
            
            // Animate content back in
            setTimeout(() => {
                const sidebarContent = sidebar.querySelectorAll('.sidebar-content > *:not(.profile-section)');
                sidebarContent.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateX(0)';
                        element.style.pointerEvents = 'all';
                    }, index * 50);
                });

                const profileElements = sidebar.querySelectorAll('.profile-section > *:not(.profile-avatar)');
                profileElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'scale(1)';
                        element.style.height = 'auto';
                        element.style.margin = '';
                    }, index * 50);
                });
            }, 100);
        } else {
            // Minimize sidebar
            sidebar.classList.add('minimized');
            mainWrapper.classList.add('sidebar-minimized');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-chevron-right';
            }
        }

        console.log('Sidebar toggled:', isMinimized ? 'expanded' : 'minimized');
    }

    // Mobile Menu Functionality
    function toggleMobileMenu() {
        if (!sidebar || !mobileMenuToggle) return;
        
        const isOpen = sidebar.classList.contains('open');
        
        if (isOpen) {
            // Close mobile menu
            sidebar.classList.remove('open');
            mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        } else {
            // Open mobile menu
            sidebar.classList.add('open');
            mobileMenuToggle.querySelector('i').className = 'fas fa-times';
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        }

        console.log('Mobile menu toggled:', isOpen ? 'closed' : 'opened');
    }

    // Event Listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
        console.log('Sidebar toggle button found and event listener attached');
    } else {
        console.warn('Sidebar toggle button not found');
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        console.log('Mobile menu toggle found and event listener attached');

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!sidebar.contains(event.target) && 
                !mobileMenuToggle.contains(event.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close mobile menu with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Enhanced Navigation Interactions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });

        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });

    // Hash Tag Interactions
    const hashtagLinks = document.querySelectorAll('.hashtag-link:not(.inactive)');
    hashtagLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Market Widget Refresh Functionality
    function setupMarketWidget() {
        const marketWidget = document.querySelector('.market-widget');
        if (!marketWidget) return;

        // Add refresh button
        const refreshButton = document.createElement('button');
        refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
        refreshButton.className = 'market-refresh-btn';
        refreshButton.style.cssText = `
            position: absolute;
            top: 12px;
            right: 12px;
            background: none;
            border: none;
            color: #9ca3af;
            cursor: pointer;
            font-size: 12px;
            opacity: 0.6;
            transition: all 0.3s ease;
            padding: 4px;
            border-radius: 4px;
        `;
        refreshButton.title = 'Refresh market data';

        refreshButton.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.color = '#2563eb';
        });

        refreshButton.addEventListener('mouseleave', function() {
            this.style.opacity = '0.6';
            this.style.color = '#9ca3af';
        });

        refreshButton.addEventListener('click', function() {
            // Rotation animation
            this.style.transform = 'rotate(360deg)';
            
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 500);

            // Update timestamp
            const marketFooter = document.querySelector('.market-footer small');
            if (marketFooter) {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                });
                marketFooter.textContent = `Live data via Yahoo Finance • Updated: ${timeString}`;
            }

            // Animate indicators
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach((indicator, index) => {
                setTimeout(() => {
                    indicator.style.transform = 'scale(1.02)';
                    indicator.style.background = '#f0f9ff';
                    
                    setTimeout(() => {
                        indicator.style.transform = 'scale(1)';
                        indicator.style.background = '';
                    }, 200);
                }, index * 100);
            });
        });

        marketWidget.style.position = 'relative';
        marketWidget.appendChild(refreshButton);
    }

    // Social Links Interactions
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });

        link.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // AI Assistant Button Interaction
    const aiTriggerBtn = document.querySelector('.ai-trigger-btn');
    if (aiTriggerBtn) {
        aiTriggerBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        aiTriggerBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Smooth Scrolling for Internal Links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Content Fade-in Animation
    function setupFadeInAnimations() {
        const fadeElements = document.querySelectorAll('.post-preview, .resource-card, .nav-item');
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.transitionDelay = `${index * 0.1}s`;
            
            observer.observe(element);
        });
    }

    // Window Resize Handler
    function handleResize() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth <= 1024) {
            // Mobile/tablet view
            sidebar.classList.remove('minimized');
            mainWrapper.classList.remove('sidebar-minimized');
            
            // Ensure mobile menu toggle is visible
            if (mobileMenuToggle) {
                mobileMenuToggle.style.display = 'block';
            }
            
            // Hide desktop sidebar toggle
            if (sidebarToggle) {
                sidebarToggle.style.display = 'none';
            }
        } else {
            // Desktop view
            sidebar.classList.remove('open');
            document.body.style.overflow = '';
            
            // Show desktop sidebar toggle
            if (sidebarToggle) {
                sidebarToggle.style.display = 'flex';
            }
            
            // Hide mobile menu toggle
            if (mobileMenuToggle) {
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }

    // Reading Progress Indicator
    function setupReadingProgress() {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;

        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            
            progressBar.style.width = scrolled + '%';
        });
    }

    // Initialize all functionality
    function initialize() {
        console.log('Initializing enhanced features...');
        
        setupMarketWidget();
        setupFadeInAnimations();
        setupReadingProgress();
        handleResize();
        
        // Add window event listeners
        window.addEventListener('resize', handleResize);
        
        // Initialize current time in market widget
        const marketFooter = document.querySelector('.market-footer small');
        if (marketFooter) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
            marketFooter.textContent = `Live data via Yahoo Finance • Updated: ${timeString}`;
        }
        
        console.log('Enhanced features initialized successfully');
    }

    // Run initialization
    initialize();

    // Expose toggle function globally for inline onclick
    window.toggleSidebar = toggleSidebar;
});

// Enhanced Chart Initialization (if Chart.js is available)
document.addEventListener('DOMContentLoaded', function() {
    if (typeof Chart !== 'undefined') {
        const chartCanvas = document.getElementById('growth-chart');
        if (chartCanvas) {
            const ctx = chartCanvas.getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1+1'],
                    datasets: [{
                        label: 'Growth Trajectory',
                        data: [100, 125, 165, 210, 280],
                        borderColor: 'rgba(255, 255, 255, 0.9)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        tension: 0.4,
                        fill: true,
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(255, 255, 255, 0.9)',
                        pointBorderColor: 'rgba(255, 255, 255, 0.9)',
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                        legend: { display: false }
                    },
                    scales: {
                        y: { 
                            beginAtZero: true, 
                            display: false,
                            grid: { display: false }
                        },
                        x: { 
                            display: false,
                            grid: { display: false }
                        }
                    },
                    elements: {
                        point: {
                            hoverRadius: 6
                        }
                    },
                    animation: {
                        duration: 2000,
                        easing: 'easeInOutQuart'
                    }
                }
            });
        }
    }
});

// Performance monitoring
console.log('Enhanced sidebar script execution completed');