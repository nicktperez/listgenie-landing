// Navigation functionality
class Navigation {
  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.mobileMenu = document.getElementById('mobileMenu');
    this.nav = document.querySelector('.nav');
    this.lastScrollY = window.scrollY;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupScrollEffects();
  }
  
  bindEvents() {
    // Mobile menu toggle
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
      this.hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleMenu();
        }
      });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.nav.contains(e.target)) {
        this.closeMenu();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMenu();
      }
    });
    
    // Smooth scroll for anchor links
    document.addEventListener('click', (e) => this.handleSmoothScroll(e));
  }
  
  toggleMenu() {
    if (!this.mobileMenu) return;
    
    const isOpen = this.mobileMenu.style.display === 'flex';
    
    if (isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }
  
  openMenu() {
    if (!this.mobileMenu || !this.hamburger) return;
    
    this.mobileMenu.style.display = 'flex';
    this.hamburger.classList.add('active');
    this.hamburger.setAttribute('aria-expanded', 'true');
    
    // Focus management
    const firstLink = this.mobileMenu.querySelector('a');
    if (firstLink) {
      firstLink.focus();
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  closeMenu() {
    if (!this.mobileMenu || !this.hamburger) return;
    
    this.mobileMenu.style.display = 'none';
    this.hamburger.classList.remove('active');
    this.hamburger.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to hamburger
    this.hamburger.focus();
  }
  
  handleSmoothScroll(e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    
    e.preventDefault();
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({ 
        top: offsetTop, 
        behavior: 'smooth' 
      });
      
      // Close mobile menu after navigation
      this.closeMenu();
      
      // Update URL without page jump
      history.pushState(null, null, link.href);
    }
  }
  
  setupScrollEffects() {
    let ticking = false;
    
    const updateNav = () => {
      const currentScrollY = window.scrollY;
      
      // Add/remove scrolled class for styling
      if (currentScrollY > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
      
      // Hide/show nav on scroll (optional)
      if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        this.nav.style.transform = 'translateY(-100%)';
      } else {
        this.nav.style.transform = 'translateY(0)';
      }
      
      this.lastScrollY = currentScrollY;
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateNav);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick);
  }
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});
