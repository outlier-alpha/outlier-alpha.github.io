/**
 * Professional Investment Platform - Interactive JavaScript
 * Sophisticated functionality for blog and resources presentation
 */

class OutlierAlphaPlatform {
  constructor() {
    this.isInitialized = false;
    this.currentFilter = 'all';
    this.searchQuery = '';
    this.isMobile = window.innerWidth < 1024;
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    try {
      this.setupEventListeners();
      this.initializeAnimations();
      this.setupResourceFiltering();
      this.setupSearchFunctionality();
      this.initializeCharts();
      this.setupIntersectionObserver();
      this.isInitialized = true;
      console.log('Outlier Alpha Platform initialized successfully');
    } catch (error) {
      console.warn('Platform initialization error:', error);
    }
  }

  setupEventListeners() {
    // Sidebar toggle with enhanced mobile support
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('main-wrapper');
    
    if (sidebarToggle && sidebar && mainWrapper) {
      sidebarToggle.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleSidebar(sidebar, mainWrapper);
      });
    }

    // Mobile menu functionality
    this.setupMobileMenu();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Window resize handler
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }

  toggleSidebar(sidebar, mainWrapper) {
    if (!sidebar || !mainWrapper) return;
    
    const isMinimized = sidebar.classList.contains('minimized');
    const toggleIcon = document.getElementById('toggle-icon');
    
    sidebar.classList.toggle('minimized');
    mainWrapper.classList.toggle('sidebar-minimized');
    
    if (toggleIcon) {
      toggleIcon.className = isMinimized ? 
        'fas fa-chevron-left' : 
        'fas fa-chevron-right';
    }
    
    // Store preference
    localStorage.setItem('sidebarMinimized', !isMinimized);
    
    // Trigger resize event for any charts
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

  setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('mobile-open');
        mobileToggle.setAttribute('aria-expanded', 
          sidebar.classList.contains('mobile-open'));
      });
      
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.isMobile && 
            !sidebar.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
          sidebar.classList.remove('mobile-open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }

  initializeAnimations() {
    // Stagger animation for resource cards
    const resourceCards = document.querySelectorAll('.resource-card, .post-preview');
    resourceCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    });

    // Parallax effect for headers
    this.setupParallaxHeaders();
  }

  setupParallaxHeaders() {
    const headers = document.querySelectorAll('.resources-header, .post-header');
    
    window.addEventListener('scroll', this.debounce(() => {
      const scrolled = window.pageYOffset;
      headers.forEach(header => {
        const rate = scrolled * -0.3;
        header.style.transform = `translateY(${rate}px)`;
      });
    }, 16));
  }

  setupResourceFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const resourceItems = document.querySelectorAll('.resource-card, .resource-item');
    
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = btn.dataset.filter || 'all';
        this.filterResources(filter, filterButtons, resourceItems);
      });
    });
  }

  filterResources(filter, buttons, items) {
    // Update active state
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeBtn = Array.from(buttons).find(btn => 
      (btn.dataset.filter || 'all') === filter);
    if (activeBtn) activeBtn.classList.add('active');
    
    this.currentFilter = filter;
    
    // Filter items with animation
    items.forEach((item, index) => {
      const shouldShow = filter === 'all' || 
        item.classList.contains(filter) ||
        item.dataset.category === filter;
      
      if (shouldShow && this.matchesSearch(item)) {
        setTimeout(() => {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
          }, 50);
        }, index * 50);
      } else {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px) scale(0.95)';
        setTimeout(() => {
          item.style.display = 'none';
        }, 300);
      }
    });
  }

  setupSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', this.debounce((e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.performSearch();
    }, 300));
    
    // Add search suggestions
    this.addSearchSuggestions(searchInput);
  }

  performSearch() {
    const items = document.querySelectorAll('.resource-card, .resource-item, .post-preview');
    
    items.forEach(item => {
      if (this.matchesSearch(item) && this.matchesFilter(item)) {
        this.showItem(item);
      } else {
        this.hideItem(item);
      }
    });
  }

  matchesSearch(item) {
    if (!this.searchQuery) return true;
    
    const searchableText = [
      item.querySelector('h3, h4, .post-title')?.textContent || '',
      item.querySelector('p, .post-summary')?.textContent || '',
      item.dataset.tags || ''
    ].join(' ').toLowerCase();
    
    return searchableText.includes(this.searchQuery);
  }

  matchesFilter(item) {
    return this.currentFilter === 'all' ||
           item.classList.contains(this.currentFilter) ||
           item.dataset.category === this.currentFilter;
  }

  showItem(item) {
    item.style.display = 'block';
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 50);
  }

  hideItem(item) {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    setTimeout(() => {
      item.style.display = 'none';
    }, 300);
  }

  addSearchSuggestions(input) {
    const suggestions = [
      'AI investment strategies',
      'fintech analysis',
      'venture capital frameworks',
      'market research tools',
      'financial modeling',
      'podcast summaries'
    ];
    
    // Create suggestions dropdown (simplified implementation)
    const suggestionsContainer = document.createElement('div');
    suggestionsContainer.className = 'search-suggestions';
    input.parentNode.appendChild(suggestionsContainer);
    
    input.addEventListener('focus', () => {
      if (!input.value) {
        this.showSuggestions(suggestions, suggestionsContainer, input);
      }
    });
    
    document.addEventListener('click', (e) => {
      if (!input.parentNode.contains(e.target)) {
        suggestionsContainer.style.display = 'none';
      }
    });
  }

  showSuggestions(suggestions, container, input) {
    container.innerHTML = suggestions
      .map(suggestion => `
        <div class="suggestion-item" data-suggestion="${suggestion}">
          <i class="fas fa-search"></i>
          <span>${suggestion}</span>
        </div>
      `).join('');
    
    container.style.display = 'block';
    
    // Add click handlers for suggestions
    container.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        input.value = item.dataset.suggestion;
        input.focus();
        container.style.display = 'none';
        this.searchQuery = item.dataset.suggestion.toLowerCase();
        this.performSearch();
      });
    });
  }

  initializeCharts() {
    // Initialize growth chart if Chart.js is available
    if (typeof Chart === 'undefined') return;
    
    const chartCanvas = document.getElementById('growth-chart');
    if (!chartCanvas) return;
    
    try {
      const ctx = chartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
          datasets: [{
            label: 'Portfolio Growth',
            data: [100, 115, 142, 168, 195],
            borderColor: 'rgba(255, 255, 255, 0.9)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            pointBorderColor: 'rgba(255, 255, 255, 1)',
            pointRadius: 6,
            pointHoverRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: 'white',
              bodyColor: 'white',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              borderWidth: 1
            }
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
              hoverBorderWidth: 3
            }
          }
        }
      });
    } catch (error) {
      console.warn('Chart initialization failed:', error);
      // Fallback: Hide chart container
      chartCanvas.parentNode.style.display = 'none';
    }
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          // Optional: Add counter animations for metrics
          this.animateCounters(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.resource-card, .post-preview, .resource-section')
      .forEach(el => observer.observe(el));
  }

  animateCounters(element) {
    const counters = element.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const duration = 2000; // 2 seconds
      const startTime = performance.now();
      
      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        counter.textContent = this.formatNumber(current);
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        }
      };
      
      requestAnimationFrame(updateCounter);
    });
  }

  formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  }

  handleResize() {
    this.isMobile = window.innerWidth < 1024;
    
    // Adjust layouts for mobile
    if (this.isMobile) {
      document.body.classList.add('mobile-layout');
    } else {
      document.body.classList.remove('mobile-layout');
    }
  }

  // Enhanced carousel functionality
  initializeCarousels() {
    const carousels = document.querySelectorAll('.resource-carousel');
    
    carousels.forEach(carousel => {
      this.setupCarousel(carousel);
    });
  }

  setupCarousel(carousel) {
    const container = carousel.querySelector('.carousel-container');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const controlsContainer = carousel.querySelector('.carousel-controls');
    
    if (!container || slides.length === 0) return;
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Create navigation dots
    if (controlsContainer) {
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('button');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => this.goToSlide(i, container, carousel));
        controlsContainer.appendChild(dot);
      }
    }
    
    // Auto-advance carousel
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slideCount;
      this.goToSlide(currentSlide, container, carousel);
    }, 5000);
  }

  goToSlide(index, container, carousel) {
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    // Update slide position
    container.style.transform = `translateX(-${index * 100}%)`;
    
    // Update active dot
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Utility function for debouncing
  debounce(func, wait) {
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

  // Performance optimization
  preloadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // Enhanced form handling
  setupFormEnhancements() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.classList.add('loading');
          submitBtn.textContent = 'Subscribing...';
          
          // Re-enable after form processes
          setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Subscribe';
          }, 2000);
        }
      });
    });
  }

  // Reading progress indicator for blog posts
  initializeReadingProgress() {
    if (!document.querySelector('.post-content')) return;
    
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    const content = document.querySelector('.post-content');
    const progressFill = progressBar.querySelector('.reading-progress-fill');
    
    window.addEventListener('scroll', () => {
      const contentTop = content.offsetTop;
      const contentHeight = content.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrolled = window.scrollY;
      
      const progress = Math.max(0, Math.min(100, 
        ((scrolled - contentTop + windowHeight) / contentHeight) * 100));
      
      progressFill.style.width = `${progress}%`;
    });
  }

  // Enhanced error handling
  handleErrors() {
    window.addEventListener('error', (e) => {
      console.warn('JS Error caught:', e.error);
      // Graceful degradation - hide broken elements
      if (e.target && e.target.tagName === 'IMG') {
        this.handleImageError(e.target);
      }
    });
  }

  handleImageError(img) {
    const fallback = document.createElement('div');
    fallback.className = 'image-fallback';
    fallback.textContent = 'OA';
    fallback.style.cssText = `
      width: ${img.width || 80}px;
      height: ${img.height || 80}px;
      background: var(--primary-blue);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 12px;
      font-weight: 700;
      font-size: 1.2rem;
    `;
    
    img.parentNode.insertBefore(fallback, img);
    img.style.display = 'none';
  }

  // Performance monitoring
  trackPerformance() {
    // Track key metrics
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart);
    }
  }
}

// Professional CSS injection for dynamic styles
const professionalStyles = `
<style>
  /* Reading Progress Bar */
  .reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1000;
    backdrop-filter: blur(10px);
  }
  
  .reading-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-blue), var(--accent-gold));
    width: 0%;
    transition: width 0.3s ease;
  }
  
  /* Search Suggestions */
  .search-suggestions {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid var(--neutral-200);
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
    z-index: 100;
    max-height: 200px;
    overflow-y: auto;
    display: none;
  }
  
  .suggestion-item {
    padding: var(--space-3) var(--space-4);
    cursor: pointer;
    transition: background var(--transition-fast);
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }
  
  .suggestion-item:hover {
    background: rgba(59, 130, 246, 0.1);
  }
  
  .suggestion-item i {
    color: var(--neutral-400);
    font-size: var(--text-sm);
  }
  
  /* Enhanced Mobile Styles */
  @media (max-width: 1024px) {
    .sidebar.mobile-open {
      transform: translateX(0);
      box-shadow: 0 0 50px rgba(0, 0, 0, 0.3);
    }
    
    .mobile-menu-toggle {
      position: fixed;
      top: 20px;
      left: 20px;
      z-index: 1001;
      background: var(--primary-blue);
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-lg);
    }
  }
  
  /* Loading States */
  .loading {
    position: relative;
    overflow: hidden;
  }
  
  .loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
    animation: shimmer 1.5s infinite;
  }
  
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }
  
  /* Professional Form Enhancements */
  .form-group {
    position: relative;
    margin-bottom: var(--space-6);
  }
  
  .form-group input:focus + label,
  .form-group input:not(:placeholder-shown) + label {
    transform: translateY(-30px) scale(0.85);
    color: var(--primary-blue);
  }
  
  /* Interactive Elements */
  .interactive-stat {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: var(--space-6);
    text-align: center;
    transition: all var(--transition-normal);
    cursor: pointer;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  .interactive-stat:hover {
    transform: scale(1.05) rotate(1deg);
    box-shadow: var(--shadow-xl);
  }
  
  .stat-number {
    font-size: var(--text-3xl);
    font-weight: 800;
    color: var(--primary-blue);
    display: block;
  }
  
  .stat-label {
    font-size: var(--text-sm);
    color: var(--neutral-500);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
</style>
`;

// Initialize platform when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new OutlierAlphaPlatform();
  });
} else {
  new OutlierAlphaPlatform();
}

// Global utility functions
window.OutlierAlpha = {
  // Smooth scroll to element
  scrollTo: (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },
  
  // Track user interactions for analytics
  trackInteraction: (action, category = 'engagement') => {
    if (typeof gtag !== 'undefined') {
      gtag('event', action, {
        event_category: category,
        event_label: window.location.pathname
      });
    }
  },
  
  // Copy text to clipboard with user feedback
  copyToClipboard: async (text, element = null) => {
    try {
      await navigator.clipboard.writeText(text);
      if (element) {
        const originalText = element.textContent;
        element.textContent = 'Copied!';
        element.classList.add('success');
        setTimeout(() => {
          element.textContent = originalText;
          element.classList.remove('success');
        }, 2000);
      }
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  }
};

// Inject professional styles
document.head.insertAdjacentHTML('beforeend', professionalStyles);

console.log('Outlier Alpha Professional Platform loaded successfully');