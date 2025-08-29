/**
 * COMPLETE INTERFACE FIX JavaScript - Outlier Alpha Website
 * This file contains all the critical JavaScript fixes for sidebar functionality and mobile interactions
 */

(function() {
    'use strict';

    // State management
    let sidebarMinimized = localStorage.getItem('sidebarMinimized') === 'true';
    let isMobile = window.innerWidth <= 1024;
    let mobileMenuOpen = false;

    // DOM elements (will be set when DOM is ready)
    let sidebar = null;
    let mainWrapper = null;
    let toggleIcon = null;
    let sidebarToggle = null;
    let mobileMenuToggle = null;

    /**
     * Initialize the interface when DOM is ready
     */
    function init() {
        // Get DOM elements
        sidebar = document.getElementById('sidebar');
        mainWrapper = document.getElementById('main-wrapper');
        toggleIcon = document.getElementById('toggle-icon');
        sidebarToggle = document.querySelector('.sidebar-toggle');
        mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

        if (!sidebar || !mainWrapper) {
            console.warn('Critical elements not found. Retrying...');
            setTimeout(init, 100);
            return;
        }

        // Set initial state
        updateResponsiveState();
        restoreSidebarState();
        
        // Bind events
        bindEvents();
        
        // Setup mobile menu if needed
        setupMobileMenu();
        
        // Fix logo on load
        fixLogoDisplay();
        
        console.log('Interface initialized successfully');
    }

    /**
     * Update responsive state based on window width
     */
    function updateResponsiveState() {
        const wasActive = isMobile;
        isMobile = window.innerWidth <= 1024;
        
        if (wasActive !== isMobile) {
            if (isMobile) {
                // Switching to mobile
                sidebar.classList.remove('minimized');
                mainWrapper.classList.remove('sidebar-minimized');
                if (sidebarToggle) sidebarToggle.style.display = 'none';
                if (mobileMenuToggle) mobileMenuToggle.style.display = 'block';
            } else {
                // Switching to desktop
                sidebar.classList.remove('mobile-open');
                if (sidebarToggle) sidebarToggle.style.display = 'flex';
                if (mobileMenuToggle) mobileMenuToggle.style.display = 'none';
                restoreSidebarState();
            }
        }
    }

    /**
     * Restore sidebar state from localStorage
     */
    function restoreSidebarState() {
        if (isMobile) return; // Don't restore state on mobile
        
        if (sidebarMinimized) {
            sidebar.classList.add('minimized');
            mainWrapper.classList.add('sidebar-minimized');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-chevron-right';
            }
        } else {
            sidebar.classList.remove('minimized');
            mainWrapper.classList.remove('sidebar-minimized');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-chevron-left';
            }
        }
    }

    /**
     * Toggle sidebar visibility/minimization
     */
    function toggleSidebar() {
        if (isMobile) {
            toggleMobileMenu();
            return;
        }

        sidebarMinimized = !sidebarMinimized;
        localStorage.setItem('sidebarMinimized', sidebarMinimized.toString());
        
        if (sidebarMinimized) {
            sidebar.classList.add('minimized');
            mainWrapper.classList.add('sidebar-minimized');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-chevron-right';
            }
        } else {
            sidebar.classList.remove('minimized');
            mainWrapper.classList.remove('sidebar-minimized');
            if (toggleIcon) {
                toggleIcon.className = 'fas fa-chevron-left';
            }
        }

        // Announce change for screen readers
        const announcement = sidebarMinimized ? 'Sidebar minimized' : 'Sidebar expanded';
        announceToScreenReader(announcement);
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        mobileMenuOpen = !mobileMenuOpen;
        
        if (mobileMenuOpen) {
            sidebar.classList.add('mobile-open');
            document.body.style.overflow = 'hidden';
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-times';
            }
        } else {
            sidebar.classList.remove('mobile-open');
            document.body.style.overflow = '';
            if (mobileMenuToggle) {
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        }

        // Announce change for screen readers
        const announcement = mobileMenuOpen ? 'Menu opened' : 'Menu closed';
        announceToScreenReader(announcement);
    }

    /**
     * Setup mobile menu functionality
     */
    function setupMobileMenu() {
        // Create mobile menu toggle if it doesn't exist
        if (!mobileMenuToggle && isMobile) {
            const toggle = document.createElement('button');
            toggle.className = 'mobile-menu-toggle';
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
            toggle.setAttribute('aria-label', 'Toggle navigation menu');
            toggle.setAttribute('aria-expanded', 'false');
            
            // Add styles
            toggle.style.cssText = `
                position: fixed;
                top: 20px;
                left: 20px;
                z-index: 1002;
                background: #2563eb;
                color: white;
                border: none;
                border-radius: 8px;
                width: 44px;
                height: 44px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            `;
            
            document.body.appendChild(toggle);
            mobileMenuToggle = toggle;
        }

        // Add click handler for mobile menu
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (isMobile && mobileMenuOpen && !sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                toggleMobileMenu();
            }
        });
    }

    /**
     * Bind all event listeners
     */
    function bindEvents() {
        // Sidebar toggle button
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', toggleSidebar);
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            // ESC key closes mobile menu
            if (e.key === 'Escape' && isMobile && mobileMenuOpen) {
                toggleMobileMenu();
            }
            
            // Ctrl+B toggles sidebar on desktop
            if (e.ctrlKey && e.key === 'b' && !isMobile) {
                e.preventDefault();
                toggleSidebar();
            }
        });

        // Window resize handler (debounced)
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function() {
                updateResponsiveState();
            }, 150);
        });

        // Focus management for accessibility
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                handleTabNavigation(e);
            }
        });

        // Handle navigation link clicks on mobile
        const navLinks = sidebar.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (isMobile && mobileMenuOpen) {
                    // Close mobile menu after navigation
                    setTimeout(toggleMobileMenu, 100);
                }
            });
        });
    }

    /**
     * Handle tab navigation for accessibility
     */
    function handleTabNavigation(e) {
        if (!isMobile || !mobileMenuOpen) return;

        const focusableElements = sidebar.querySelectorAll(
            'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault();
                lastFocusable.focus();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault();
                firstFocusable.focus();
            }
        }
    }

    /**
     * Fix logo display and add fallback
     */
    function fixLogoDisplay() {
        const logoImg = document.querySelector('.profile-avatar img');
        if (!logoImg) return;

        // Set proper attributes
        logoImg.setAttribute('alt', 'Outlier Alpha Logo');
        logoImg.setAttribute('loading', 'eager');

        // Handle image load error
        logoImg.addEventListener('error', function() {
            if (this.src && !this.src.includes('placeholder')) {
                console.warn('Logo failed to load, creating fallback');
                createLogoFallback(this);
            }
        });

        // Check if image is already broken
        if (logoImg.complete && logoImg.naturalHeight === 0) {
            createLogoFallback(logoImg);
        }
    }

    /**
     * Create fallback logo when image fails to load
     */
    function createLogoFallback(imgElement) {
        const container = imgElement.parentElement;
        if (!container || container.querySelector('.logo-image-fallback')) {
            return; // Fallback already exists
        }

        const fallback = document.createElement('div');
        fallback.className = 'logo-image-fallback';
        fallback.textContent = 'OA';
        fallback.setAttribute('role', 'img');
        fallback.setAttribute('aria-label', 'Outlier Alpha Logo');
        
        // Hide the broken image
        imgElement.style.display = 'none';
        
        // Insert fallback
        container.appendChild(fallback);
        
        console.log('Logo fallback created successfully');
    }

    /**
     * Announce text to screen readers
     */
    function announceToScreenReader(text) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = text;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    /**
     * Debug function to log current state
     */
    function debugState() {
        console.log('Debug State:', {
            isMobile,
            sidebarMinimized,
            mobileMenuOpen,
            sidebarClasses: sidebar ? sidebar.className : 'N/A',
            mainWrapperClasses: mainWrapper ? mainWrapper.className : 'N/A'
        });
    }

    // Expose functions globally for emergency access
    window.OutlierAlphaInterface = {
        toggleSidebar,
        toggleMobileMenu,
        debugState,
        init
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Fallback initialization
    setTimeout(function() {
        if (!sidebar || !mainWrapper) {
            console.warn('Interface not properly initialized, retrying...');
            init();
        }
    }, 500);

})();

/**
 * Legacy support - ensure toggleSidebar is available globally
 */
window.toggleSidebar = function() {
    if (window.OutlierAlphaInterface && window.OutlierAlphaInterface.toggleSidebar) {
        window.OutlierAlphaInterface.toggleSidebar();
    } else {
        console.warn('Interface not initialized yet');
    }
};

/**
 * Performance monitoring
 */
if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('interface-script-loaded');
}