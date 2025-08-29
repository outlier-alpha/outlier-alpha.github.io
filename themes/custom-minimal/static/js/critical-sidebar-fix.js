/* SIDEBAR TOGGLE FUNCTIONALITY - FIXES FOR TOGGLE BUTTON */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar state
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    const toggleButton = document.querySelector('.sidebar-toggle');
    const toggleIcon = document.getElementById('toggle-icon');
    
    // Ensure elements exist
    if (!sidebar || !mainWrapper || !toggleButton || !toggleIcon) {
        console.log('Sidebar elements not found, creating fallback');
        return;
    }
    
    // Toggle function
    function toggleSidebar() {
        console.log('Toggle sidebar clicked');
        
        // Toggle classes
        sidebar.classList.toggle('minimized');
        mainWrapper.classList.toggle('sidebar-minimized');
        
        // Update icon
        if (sidebar.classList.contains('minimized')) {
            toggleIcon.className = 'fas fa-chevron-right';
            console.log('Sidebar minimized');
        } else {
            toggleIcon.className = 'fas fa-chevron-left';
            console.log('Sidebar expanded');
        }
    }
    
    // Add click event listener
    toggleButton.addEventListener('click', toggleSidebar);
    
    // Make function globally available
    window.toggleSidebar = toggleSidebar;
    
    // Handle window resize
    function handleResize() {
        if (window.innerWidth <= 1024) {
            // Mobile mode - hide sidebar
            sidebar.classList.add('mobile-hidden');
        } else {
            // Desktop mode - show sidebar
            sidebar.classList.remove('mobile-hidden');
        }
    }
    
    // Initial resize check
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-visible');
        });
    }
    
    // Close sidebar on mobile when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
            if (!sidebar.contains(e.target) && !e.target.classList.contains('mobile-menu-toggle')) {
                sidebar.classList.remove('mobile-visible');
            }
        }
    });
    
    // Add smooth scrolling for sidebar
    sidebar.style.scrollBehavior = 'smooth';
    
    // Initialize market data refresh
    initializeMarketData();
    
    console.log('Sidebar functionality initialized');
});

// Market data refresh functionality
function initializeMarketData() {
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
        transition: all 0.2s ease;
        padding: 4px;
        border-radius: 4px;
    `;
    refreshButton.title = 'Refresh market data';
    
    refreshButton.addEventListener('mouseenter', function() {
        this.style.opacity = '1';
        this.style.background = '#f3f4f6';
    });
    
    refreshButton.addEventListener('mouseleave', function() {
        this.style.opacity = '0.6';
        this.style.background = 'none';
    });
    
    refreshButton.addEventListener('click', function() {
        // Add rotation animation
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
        
        // Add subtle animation on indicators
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            setTimeout(() => {
                indicator.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    indicator.style.transform = 'scale(1)';
                }, 200);
            }, index * 50);
        });
    });
    
    marketWidget.style.position = 'relative';
    marketWidget.appendChild(refreshButton);
}

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced scroll behavior for sidebar
function initializeSidebarScroll() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    
    let isScrolling = false;
    
    sidebar.addEventListener('scroll', debounce(function() {
        if (!isScrolling) {
            isScrolling = true;
            sidebar.style.scrollBehavior = 'smooth';
            setTimeout(() => {
                isScrolling = false;
            }, 150);
        }
    }, 50));
}

// Initialize scroll behavior
initializeSidebarScroll();

// Export functions for global access
window.toggleSidebar = window.toggleSidebar || function() {
    console.log('Fallback toggle function called');
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    const toggleIcon = document.getElementById('toggle-icon');
    
    if (sidebar && mainWrapper && toggleIcon) {
        sidebar.classList.toggle('minimized');
        mainWrapper.classList.toggle('sidebar-minimized');
        
        if (sidebar.classList.contains('minimized')) {
            toggleIcon.className = 'fas fa-chevron-right';
        } else {
            toggleIcon.className = 'fas fa-chevron-left';
        }
    }
};

console.log('Sidebar fixes loaded');
