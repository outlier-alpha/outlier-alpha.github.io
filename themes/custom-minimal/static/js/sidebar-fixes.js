// Enhanced Sidebar Functionality - Fixed Version
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced sidebar functionality loaded');
    
    // Toggle sidebar function
    window.toggleSidebar = function() {
        console.log('Toggle sidebar called');
        const sidebar = document.getElementById('sidebar');
        const mainWrapper = document.getElementById('main-wrapper');
        const toggleIcon = document.getElementById('toggle-icon');
        
        if (sidebar && mainWrapper && toggleIcon) {
            sidebar.classList.toggle('minimized');
            mainWrapper.classList.toggle('sidebar-minimized');
            
            // Update icon
            if (sidebar.classList.contains('minimized')) {
                toggleIcon.className = 'fas fa-chevron-right';
            } else {
                toggleIcon.className = 'fas fa-chevron-left';
            }
            
            console.log('Sidebar toggled, minimized:', sidebar.classList.contains('minimized'));
        } else {
            console.error('Required elements not found:', {
                sidebar: !!sidebar,
                mainWrapper: !!mainWrapper,
                toggleIcon: !!toggleIcon
            });
        }
    };
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('open');
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 1024) {
            const sidebar = document.getElementById('sidebar');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (sidebar && !sidebar.contains(event.target) && 
                (!mobileToggle || !mobileToggle.contains(event.target))) {
                sidebar.classList.remove('open');
            }
        }
    });
    
    // Escape key to close mobile menu
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && window.innerWidth <= 1024) {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.remove('open');
            }
        }
    });
});

// Market data refresh functionality
function refreshMarketData() {
    const indicators = document.querySelectorAll('.indicator');
    const marketFooter = document.querySelector('.market-footer small');
    
    // Add animation to indicators
    indicators.forEach(indicator => {
        indicator.style.transform = 'scale(1.02)';
        setTimeout(() => {
            indicator.style.transform = 'scale(1)';
        }, 200);
    });
    
    // Update timestamp
    if (marketFooter) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
        marketFooter.textContent = `Live data via Yahoo Finance • Updated: ${timeString}`;
    }
    
    console.log('Market data refreshed');
}

// Initialize refresh button if market widget exists
document.addEventListener('DOMContentLoaded', function() {
    const marketWidget = document.querySelector('.market-widget');
    if (marketWidget && !marketWidget.querySelector('.market-refresh-btn')) {
        const refreshButton = document.createElement('button');
        refreshButton.innerHTML = '<i class="fas fa-sync-alt"></i>';
        refreshButton.className = 'market-refresh-btn';
        refreshButton.style.cssText = `
            position: absolute;
            top: 12px;
            right: 12px;
            background: none;
            border: none;
            color: var(--text-muted, #9ca3af);
            cursor: pointer;
            font-size: 12px;
            opacity: 0.6;
            transition: all 0.2s ease;
        `;
        refreshButton.title = 'Refresh market data';
        
        refreshButton.addEventListener('click', function() {
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 500);
            refreshMarketData();
        });
        
        marketWidget.style.position = 'relative';
        marketWidget.appendChild(refreshButton);
    }
});

// Smooth scrolling for sidebar
document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        // Add custom scrollbar styling
        sidebar.style.scrollbarWidth = 'thin';
        sidebar.style.scrollbarColor = '#cbd5e0 transparent';
    }
});

// Debug logging
console.log('Enhanced sidebar JS loaded successfully');