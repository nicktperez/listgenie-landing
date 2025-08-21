// Main JavaScript - ListGenie Landing Page

// Main application class
class ListGenieApp {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.setupAnimations();
    this.setupAccessibility();
  }
  
  setupEventListeners() {
    // Handle form submissions if any forms are added later
    document.addEventListener('submit', (e) => this.handleFormSubmit(e));
    
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    
    // Handle window resize
    window.addEventListener('resize', Utils.debounce(() => this.handleResize(), 250));
    
    // Handle page visibility changes
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
  }
  
  setupAnimations() {
    // Add CSS animations for elements
    const animatedElements = document.querySelectorAll('.card, .step, .badge');
    
    animatedElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.1}s`;
      el.classList.add('fade-in-up');
    });
  }
  
  setupAccessibility() {
    // Add skip link
    this.addSkipLink();
    
    // Add ARIA labels to interactive elements
    this.addAriaLabels();
    
    // Setup focus management
    this.setupFocusManagement();
  }
  
  addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID if it doesn't exist
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent && !mainContent.id) {
      mainContent.id = 'main-content';
    }
  }
  
  addAriaLabels() {
    // Add ARIA labels to buttons without text
    const buttons = document.querySelectorAll('button:not([aria-label])');
    buttons.forEach(button => {
      if (!button.textContent.trim()) {
        button.setAttribute('aria-label', 'Button');
      }
    });
    
    // Add ARIA labels to images without alt text
    const images = document.querySelectorAll('img:not([alt])');
    images.forEach(img => {
      img.setAttribute('alt', '');
      img.setAttribute('aria-hidden', 'true');
    });
  }
  
  setupFocusManagement() {
    // Trap focus in mobile menu when open
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      const focusableElements = mobileMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      mobileMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      });
    }
  }
  
  handleFormSubmit(e) {
    // Handle form submissions (for future forms)
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    
    if (submitButton) {
      this.showLoadingState(submitButton);
    }
  }
  
  handleKeyboardNavigation(e) {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'k':
          e.preventDefault();
          this.focusSearch();
          break;
        case '/':
          e.preventDefault();
          this.toggleHelp();
          break;
      }
    }
  }
  
  handleResize() {
    // Handle responsive behavior
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      document.body.classList.add('mobile');
    } else {
      document.body.classList.remove('mobile');
    }
  }
  
  handleVisibilityChange() {
    // Handle page visibility changes
    if (document.hidden) {
      document.body.classList.add('page-hidden');
    } else {
      document.body.classList.remove('page-hidden');
    }
  }
  
  showLoadingState(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="spinner"></span> Loading...';
    button.disabled = true;
    button.classList.add('loading');
    
    // Reset after 3 seconds (or when form submission completes)
    setTimeout(() => {
      button.innerHTML = originalText;
      button.disabled = false;
      button.classList.remove('loading');
    }, 3000);
  }
  
  focusSearch() {
    // Focus search input if it exists (for future search functionality)
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
      searchInput.focus();
    }
  }
  
  toggleHelp() {
    // Toggle help modal if it exists (for future help functionality)
    const helpModal = document.getElementById('help-modal');
    if (helpModal) {
      const isVisible = helpModal.style.display === 'block';
      helpModal.style.display = isVisible ? 'none' : 'block';
    }
  }
  
  // Public methods for external use
  static showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
  
  static showModal(content, options = {}) {
    // Modal functionality for future use
    console.log('Modal functionality not yet implemented');
  }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  new ListGenieApp();
});

// Export for external use
window.ListGenieApp = ListGenieApp;
