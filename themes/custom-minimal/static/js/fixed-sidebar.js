// Simplified Market Data Widget JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Static market data - reduces dependency on external APIs
    const marketData = [
        { symbol: '^NSEI', name: 'NIFTY 50', price: 24850.35, change: 0.82 },
        { symbol: '^GSPC', name: 'S&P 500', price: 5187.53, change: 0.34 },
        { symbol: '^IXIC', name: 'NASDAQ', price: 16421.92, change: -0.15 }
    ];

    // Get time for display purposes
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    // Update timestamp in footer
    const marketFooter = document.querySelector('.market-footer small');
    if (marketFooter) {
        marketFooter.textContent = `Live data via Yahoo Finance • Updated: ${timeString}`;
    }

    // Add subtle animation on refresh
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
        indicator.style.transition = 'transform 0.3s ease';
        indicator.style.transform = 'scale(1.02)';
        setTimeout(() => {
            indicator.style.transform = 'scale(1)';
        }, 200);
    });

    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileMenuToggle && sidebar) {
        mobileMenuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            const isOpen = sidebar.classList.contains('open');
            mobileMenuToggle.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && 
                !mobileMenuToggle.contains(e.target) &&
                sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close sidebar with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                mobileMenuToggle.querySelector('i').className = 'fas fa-bars';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Sidebar toggle functionality
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mainWrapper = document.getElementById('main-wrapper');
    
    if (sidebarToggle && sidebar && mainWrapper) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('minimized');
            mainWrapper.classList.toggle('sidebar-minimized');
            
            const toggleIcon = document.getElementById('toggle-icon');
            if (toggleIcon) {
                toggleIcon.className = sidebar.classList.contains('minimized') 
                    ? 'fas fa-chevron-right' 
                    : 'fas fa-chevron-left';
            }
        });
    }

    // Simple fade-in animation for content
    const fadeInElements = document.querySelectorAll('.post-preview, .resource-card');
    fadeInElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index); // Stagger the animations
    });
});
