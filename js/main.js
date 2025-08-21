// Main JavaScript - ListGenie Landing Page

// Main application class
class ListGenieApp {
  constructor() {
    // Wait for DOM to be ready before initializing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.init());
    } else {
      this.init();
    }
  }

  init() {
    console.log('=== ListGenie App Initializing ===');
    
    // Clear any existing theme preferences to ensure fresh start
    this.clearExistingTheme();
    
    this.setupThemeToggle();
    this.setupEventListeners();
    this.setupAnimations();
    this.setupAccessibility();
    
    // Ensure interactive preview is set up after DOM is ready
    setTimeout(() => {
      this.setupInteractivePreview();
    }, 100);
    
    console.log('=== ListGenie App Initialized ===');
  }

  clearExistingTheme() {
    // Remove any existing theme attributes
    document.documentElement.removeAttribute('data-theme');
    document.documentElement.removeAttribute('data-theme-set');
    
    // Clear localStorage theme preference to start fresh
    localStorage.removeItem('listgenie-theme');
    
    console.log('Cleared existing theme preferences');
  }
  
  setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) {
      console.log('Theme toggle button not found');
      return;
    }

    console.log('Setting up theme toggle...');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('listgenie-theme');
    
    console.log('Saved theme:', savedTheme);
    
    // Default to light mode unless user has explicitly chosen dark
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.applyDarkTheme();
      console.log('Applied saved dark theme');
    } else {
      // No saved preference or light preference - default to light mode
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('listgenie-theme', 'light');
      this.applyLightTheme();
      console.log('Using default light theme');
    }

    // Update theme toggle icon
    this.updateThemeIcon();

    // Listen for theme toggle clicks
    themeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Theme toggle clicked');
      this.toggleTheme();
    });

    console.log('Theme toggle setup complete');
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    console.log('Toggling theme from', currentTheme, 'to', newTheme);
    
    if (newTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('listgenie-theme', 'light');
      this.applyLightTheme();
      console.log('Applied light theme');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('listgenie-theme', 'dark');
      this.applyDarkTheme();
      console.log('Applied dark theme');
    }
    
    this.updateThemeIcon();
  }

  applyLightTheme() {
    console.log('Applying light theme...');
    
    // Force background changes with !important equivalent
    document.documentElement.style.backgroundColor = '#ffffff';
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.color = '#0f172a';
    
    // Force HTML and body background
    document.documentElement.style.setProperty('background-color', '#ffffff', 'important');
    document.body.style.setProperty('background-color', '#ffffff', 'important');
    
    // Force all main containers
    const mainContainers = document.querySelectorAll('main, .main, #main, .container, .content');
    mainContainers.forEach(container => {
      container.style.setProperty('background-color', '#ffffff', 'important');
    });
    
    // Apply to navigation
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.style.setProperty('background-color', 'rgba(255, 255, 255, 0.8)', 'important');
      nav.style.setProperty('border-bottom-color', 'rgba(0, 0, 0, 0.08)', 'important');
      console.log('Updated navigation to light theme');
    }
    
    // Apply to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.setProperty('background', `
        radial-gradient(1200px 500px at 50% -180px, rgba(0, 180, 166, 0.08), transparent 70%),
        radial-gradient(800px 400px at 80% -180px, rgba(16, 185, 129, 0.06), transparent 60%)
      `, 'important');
      hero.style.setProperty('background-color', '#ffffff', 'important');
      console.log('Updated hero to light theme');
    }
    
    // Apply to all sections with force
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.setProperty('background-color', '#ffffff', 'important');
      section.style.setProperty('color', '#0f172a', 'important');
    });
    
    // Apply to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.style.setProperty('background-color', '#ffffff', 'important');
      card.style.setProperty('border-color', 'rgba(0, 0, 0, 0.08)', 'important');
      card.style.setProperty('color', '#0f172a', 'important');
    });
    console.log(`Updated ${cards.length} cards to light theme`);
    
    // Apply to interactive preview
    const preview = document.querySelector('.interactive-preview');
    if (preview) {
      preview.style.setProperty('background-color', '#ffffff', 'important');
      preview.style.setProperty('border-color', 'rgba(0, 0, 0, 0.08)', 'important');
      preview.style.setProperty('color', '#0f172a', 'important');
      console.log('Updated interactive preview to light theme');
    }
    
    // Apply to textarea
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.setProperty('background-color', '#f8fafc', 'important');
      textarea.style.setProperty('border-color', 'rgba(0, 0, 0, 0.1)', 'important');
      textarea.style.setProperty('color', '#0f172a', 'important');
      console.log('Updated textarea to light theme');
    }
    
    // Apply to all text elements more comprehensively
    const textSelectors = 'h1, h2, h3, h4, h5, h6, p, span, a, li, label, div';
    const textElements = document.querySelectorAll(textSelectors);
    let updatedCount = 0;
    textElements.forEach(el => {
      if (!el.closest('.btn') && !el.closest('button')) { // Don't change button text colors
        el.style.setProperty('color', '#0f172a', 'important');
        updatedCount++;
      }
    });
    console.log(`Updated ${updatedCount} text elements to light theme`);
    
    // Apply to specific elements that might be missed
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
      badge.style.setProperty('background-color', 'rgba(255, 255, 255, 0.1)', 'important');
      badge.style.setProperty('border-color', 'rgba(0, 0, 0, 0.1)', 'important');
      badge.style.setProperty('color', '#0f172a', 'important');
    });
    
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.style.setProperty('background-color', '#f8fafc', 'important');
      input.style.setProperty('border-color', 'rgba(0, 0, 0, 0.1)', 'important');
      input.style.setProperty('color', '#0f172a', 'important');
    });
    
    // Force all divs to have light background
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(div => {
      // Skip buttons and specific elements
      if (!div.closest('.btn') && !div.closest('button') && !div.classList.contains('btn')) {
        div.style.setProperty('background-color', '#ffffff', 'important');
        div.style.setProperty('color', '#0f172a', 'important');
      }
    });
    
    // Additional targeting for common elements
    this.updateAdditionalElements('light');
    
    console.log('Light theme applied completely');
  }

  applyDarkTheme() {
    console.log('Applying dark theme...');
    
    // Force background changes with !important equivalent
    document.documentElement.style.backgroundColor = '#0a0f1a';
    document.body.style.backgroundColor = '#0a0f1a';
    document.body.style.color = '#e8f0f8';
    
    // Force HTML and body background
    document.documentElement.style.setProperty('background-color', '#0a0f1a', 'important');
    document.body.style.setProperty('background-color', '#0a0f1a', 'important');
    
    // Force all main containers
    const mainContainers = document.querySelectorAll('main, .main, #main, .container, .content');
    mainContainers.forEach(container => {
      container.style.setProperty('background-color', '#0a0f1a', 'important');
    });
    
    // Apply to navigation
    const nav = document.querySelector('.nav');
    if (nav) {
      nav.style.setProperty('background-color', 'rgba(10, 15, 26, 0.8)', 'important');
      nav.style.setProperty('border-bottom-color', 'rgba(255, 255, 255, 0.08)', 'important');
      console.log('Updated navigation to dark theme');
    }
    
    // Apply to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.setProperty('background', `
        radial-gradient(1200px 500px at 50% -180px, rgba(0, 180, 166, 0.25), transparent 70%),
        radial-gradient(800px 400px at 80% -180px, rgba(16, 185, 129, 0.2), transparent 60%)
      `, 'important');
      hero.style.setProperty('background-color', '#0a0f1a', 'important');
      console.log('Updated hero to dark theme');
    }
    
    // Apply to all sections with force
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.setProperty('background-color', '#0a0f1a', 'important');
      section.style.setProperty('color', '#e8f0f8', 'important');
    });
    
    // Apply to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.style.setProperty('background-color', '#141c2a', 'important');
      card.style.setProperty('border-color', 'rgba(255, 255, 255, 0.08)', 'important');
      card.style.setProperty('color', '#e8f0f8', 'important');
    });
    console.log(`Updated ${cards.length} cards to dark theme`);
    
    // Apply to interactive preview
    const preview = document.querySelector('.interactive-preview');
    if (preview) {
      preview.style.setProperty('background-color', '#141c2a', 'important');
      preview.style.setProperty('border-color', 'rgba(255, 255, 255, 0.08)', 'important');
      preview.style.setProperty('color', '#e8f0f8', 'important');
      console.log('Updated interactive preview to dark theme');
    }
    
    // Apply to textarea
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.style.setProperty('background-color', '#0a0f1a', 'important');
      textarea.style.setProperty('border-color', 'rgba(255, 255, 255, 0.1)', 'important');
      textarea.style.setProperty('color', '#e8f0f8', 'important');
      console.log('Updated textarea to dark theme');
    }
    
    // Apply to all text elements more comprehensively
    const textSelectors = 'h1, h2, h3, h4, h5, h6, p, span, a, li, label, div';
    const textElements = document.querySelectorAll(textSelectors);
    let updatedCount = 0;
    textElements.forEach(el => {
      if (!el.closest('.btn') && !el.closest('button')) { // Don't change button text colors
        el.style.setProperty('color', '#e8f0f8', 'important');
        updatedCount++;
      }
    });
    console.log(`Updated ${updatedCount} text elements to dark theme`);
    
    // Apply to specific elements that might be missed
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
      badge.style.setProperty('background-color', 'rgba(255, 255, 255, 0.1)', 'important');
      badge.style.setProperty('border-color', 'rgba(255, 255, 255, 0.1)', 'important');
      badge.style.setProperty('color', '#e8f0f8', 'important');
    });
    
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.style.setProperty('background-color', '#0a0f1a', 'important');
      input.style.setProperty('border-color', 'rgba(255, 255, 255, 0.1)', 'important');
      input.style.setProperty('color', '#e8f0f8', 'important');
    });
    
    // Force all divs to have dark background
    const allDivs = document.querySelectorAll('div');
    allDivs.forEach(div => {
      // Skip buttons and specific elements
      if (!div.closest('.btn') && !div.closest('button') && !div.classList.contains('btn')) {
        div.style.setProperty('background-color', '#0a0f1a', 'important');
        div.style.setProperty('color', '#e8f0f8', 'important');
      }
    });
    
    // Additional targeting for common elements
    this.updateAdditionalElements('dark');
    
    console.log('Dark theme applied completely');
  }

  updateAdditionalElements(theme) {
    const isLight = theme === 'light';
    
    // Target specific classes that might be missed
    const additionalSelectors = [
      '.nav-links a',
      '.nav-brand a',
      '.hero-caption',
      '.hero-badges .badge',
      '.preview-header',
      '.property-input',
      '.tone-selector',
      '.example-btn',
      '.generate-btn',
      '.preview-output',
      '.output-placeholder',
      '.generated-content',
      '.premium-features',
      '.pro-cta'
    ];
    
    additionalSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        if (isLight) {
          el.style.setProperty('color', '#0f172a', 'important');
          if (el.classList.contains('badge')) {
            el.style.setProperty('background-color', 'rgba(255, 255, 255, 0.1)', 'important');
            el.style.setProperty('border-color', 'rgba(0, 0, 0, 0.1)', 'important');
          }
        } else {
          el.style.setProperty('color', '#e8f0f8', 'important');
          if (el.classList.contains('badge')) {
            el.style.setProperty('background-color', 'rgba(255, 255, 255, 0.1)', 'important');
            el.style.setProperty('border-color', 'rgba(255, 255, 255, 0.1)', 'important');
          }
        }
      });
    });
    
    // Find and fix any remaining dark elements
    this.findAndFixDarkElements(theme);
    
    console.log(`Updated additional elements for ${theme} theme`);
  }

  findAndFixDarkElements(theme) {
    const isLight = theme === 'light';
    const targetColor = isLight ? '#0f172a' : '#e8f0f8';
    const targetBg = isLight ? '#ffffff' : '#0a0f1a';
    
    // Find all elements with computed styles that might be dark
    const allElements = document.querySelectorAll('*');
    let fixedCount = 0;
    
    allElements.forEach(el => {
      if (el === document.body || el === document.documentElement) return;
      
      const computedStyle = window.getComputedStyle(el);
      const bgColor = computedStyle.backgroundColor;
      const textColor = computedStyle.color;
      
      // Check if element has dark background or light text (indicating dark mode)
      if (isLight) {
        // If we're switching to light mode, look for dark elements
        if (bgColor.includes('rgb(10, 15, 26)') || bgColor.includes('rgb(20, 28, 42)') || 
            bgColor.includes('rgba(10, 15, 26') || bgColor.includes('rgba(20, 28, 42')) {
          el.style.setProperty('background-color', targetBg, 'important');
          fixedCount++;
        }
        if (textColor.includes('rgb(232, 240, 248)') || textColor.includes('rgba(232, 240, 248')) {
          el.style.setProperty('color', targetColor, 'important');
          fixedCount++;
        }
      } else {
        // If we're switching to dark mode, look for light elements
        if (bgColor.includes('rgb(255, 255, 255)') || bgColor.includes('rgba(255, 255, 255')) {
          el.style.setProperty('background-color', targetBg, 'important');
          fixedCount++;
        }
        if (textColor.includes('rgb(15, 23, 42)') || textColor.includes('rgba(15, 23, 42')) {
          el.style.setProperty('color', targetColor, 'important');
          fixedCount++;
        }
      }
    });
    
    if (fixedCount > 0) {
      console.log(`Found and fixed ${fixedCount} remaining dark/light elements`);
    }
  }

  updateThemeIcon() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const sunIcon = themeToggle.querySelector('.sun-icon');
    const moonIcon = themeToggle.querySelector('.moon-icon');
    
    if (sunIcon && moonIcon) {
      if (isDark) {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
      } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
      }
    }

    // Update theme color meta tag
    this.updateThemeColor(isDark);
  }

  updateThemeColor(isDark) {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', isDark ? '#0a0f1a' : '#00b4a6');
    }
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
    
    // Setup interactive preview
    this.setupInteractivePreview();
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
  
  setupInteractivePreview() {
    console.log('Setting up interactive preview...');
    
    const toneButtons = document.querySelectorAll('.tone-btn');
    const generateBtn = document.querySelector('.generate-btn');
    const textarea = document.querySelector('.property-input textarea');
    const output = document.querySelector('.preview-output');
    const exampleButtons = document.querySelectorAll('.example-btn');
    
    console.log('Found elements:', {
      toneButtons: toneButtons.length,
      generateBtn: !!generateBtn,
      textarea: !!textarea,
      output: !!output,
      exampleButtons: exampleButtons.length
    });
    
    if (!toneButtons.length || !generateBtn || !textarea || !output) {
      console.error('Missing required elements for interactive preview');
      return;
    }
    
    // Tone button functionality
    toneButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        console.log('Tone button clicked:', btn.dataset.tone);
        e.preventDefault();
        toneButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
    
    // Example button functionality
    exampleButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        console.log('Example button clicked');
        e.preventDefault();
        const exampleText = btn.dataset.example;
        textarea.value = exampleText;
        textarea.focus();
        
        // Highlight the clicked button briefly
        btn.style.background = 'var(--brand-soft)';
        btn.style.borderColor = 'var(--brand)';
        btn.style.color = 'var(--brand)';
        
        setTimeout(() => {
          btn.style.background = '';
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 1000);
      });
    });
    
    // Generate button functionality
    generateBtn.addEventListener('click', (e) => {
      console.log('Generate button clicked');
      e.preventDefault();
      this.generatePreviewListing();
    });
    
    // Add click feedback to all buttons
    const allButtons = document.querySelectorAll('.interactive-preview button');
    allButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
          btn.style.transform = '';
        }, 150);
      });
    });
    
    console.log('Interactive preview setup complete!');
    
    // Test the setup
    this.testInteractivePreview();
  }
  
  testInteractivePreview() {
    console.log('Testing interactive preview...');
    
    // Test if we can find all elements
    const elements = {
      textarea: document.querySelector('.property-input textarea'),
      generateBtn: document.querySelector('.generate-btn'),
      toneButtons: document.querySelectorAll('.tone-btn'),
      exampleButtons: document.querySelectorAll('.example-btn'),
      output: document.querySelector('.preview-output')
    };
    
    console.log('Element test results:', elements);
    
    // Test if event listeners are working
    const testBtn = document.querySelector('.generate-btn');
    if (testBtn) {
      console.log('Generate button found, adding test click handler');
      testBtn.addEventListener('click', () => {
        console.log('✅ Generate button is working!');
      });
    }
    
    // Test tone buttons
    const testToneBtn = document.querySelector('.tone-btn');
    if (testToneBtn) {
      console.log('Tone button found, adding test click handler');
      testToneBtn.addEventListener('click', () => {
        console.log('✅ Tone button is working!');
      });
    }
  }
  
  generatePreviewListing() {
    const textarea = document.querySelector('.property-input textarea');
    const generateBtn = document.querySelector('.generate-btn');
    const output = document.querySelector('.preview-output');
    const activeTone = document.querySelector('.tone-btn.active');
    
    if (!textarea || !generateBtn || !output || !activeTone) return;
    
    const propertyText = textarea.value.trim();
    if (!propertyText) {
      this.showPreviewMessage('Please describe a property first!', 'error');
      return;
    }
    
    // Show loading state
    generateBtn.disabled = true;
    generateBtn.textContent = 'Generating...';
    generateBtn.parentElement.parentElement.classList.add('generating');
    
    // Show loading in output
    output.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>AI is crafting your perfect listing...</p>
      </div>
    `;
    
    // Simulate generation delay with progress
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(progressInterval);
        this.completeGeneration(propertyText, activeTone, output, generateBtn);
      }
    }, 400);
  }
  
  completeGeneration(propertyText, activeTone, output, generateBtn) {
    const tone = activeTone.dataset.tone;
    const generatedContent = this.createSampleListing(propertyText, tone);
    
    // Add fade-in effect
    output.style.opacity = '0';
    output.innerHTML = generatedContent;
    output.classList.add('has-content');
    
    // Show copy button
    const outputActions = document.querySelector('.output-actions');
    if (outputActions) {
      outputActions.style.display = 'block';
      this.setupCopyButton();
    }
    
    // Fade in the content
    setTimeout(() => {
      output.style.transition = 'opacity 0.5s ease';
      output.style.opacity = '1';
    }, 50);
    
    // Reset button
    generateBtn.disabled = false;
    generateBtn.textContent = 'Generate Another';
    generateBtn.parentElement.parentElement.classList.remove('generating');
    
    // Track the interaction
    if (window.analytics) {
      window.analytics.sendEvent('preview_generated', { tone, hasContent: !!propertyText });
    }
    
    // Show success message
    this.outputArea.innerHTML = `
      <div class="generated-content">
        <h4>Generated Listing:</h4>
        <div class="premium-features">
          <strong>✨ Pro Feature:</strong> This is a preview. Get the full version with Pro!
        </div>
        <p>${generatedContent}</p>
        <div class="output-actions">
          <button class="copy-btn" onclick="navigator.clipboard.writeText('${generatedContent.replace(/'/g, "\\'")}')">
            📋 Copy to Clipboard
          </button>
        </div>
      </div>
    `;
  }
  
  setupCopyButton() {
    const copyBtn = this.outputArea.querySelector('.copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const content = this.outputArea.querySelector('.generated-content p')?.textContent;
        if (content) {
          try {
            await navigator.clipboard.writeText(content);
            copyBtn.textContent = '✅ Copied!';
            setTimeout(() => {
              copyBtn.textContent = '📋 Copy to Clipboard';
            }, 2000);
          } catch (err) {
            console.error('Failed to copy:', err);
          }
        }
      });
    }
  }
  
  createSampleListing(propertyText, tone) {
    const baseText = propertyText.toLowerCase();
    let listing = '';
    
    // Extract key property features
    const hasBeds = baseText.includes('bed') || baseText.includes('bedroom');
    const hasBaths = baseText.includes('bath') || baseText.includes('bathroom');
    const hasSqft = baseText.includes('sqft') || baseText.includes('square feet');
    const hasKitchen = baseText.includes('kitchen') || baseText.includes('updated');
    const hasNeighborhood = baseText.includes('neighborhood') || baseText.includes('area') || baseText.includes('location');
    const hasGarage = baseText.includes('garage') || baseText.includes('parking');
    const hasYard = baseText.includes('yard') || baseText.includes('garden') || baseText.includes('outdoor');
    
    switch (tone) {
      case 'mls':
        listing = `
          <div class="generated-content">
            <h4>MLS-Ready Listing</h4>
            <p>${hasBeds ? 'Beautiful' : 'Stunning'} ${hasBeds ? 'bedroom' : 'property'} featuring ${hasKitchen ? 'recently updated' : 'modern'} finishes and ${hasSqft ? 'generous square footage' : 'excellent value'}. ${hasKitchen ? 'The kitchen has been thoughtfully designed with premium appliances, custom cabinetry, and ample storage space.' : 'This property offers excellent value and location for discerning buyers.'}</p>
            <p>${hasNeighborhood ? 'Located in a highly desirable neighborhood' : 'Situated in a prime location'} with easy access to amenities, schools, and transportation. ${hasGarage ? 'The attached garage provides convenient parking and additional storage.' : ''} ${hasYard ? 'The private yard offers outdoor living space perfect for entertaining.' : ''} ${hasSqft ? 'Spacious layout perfect for families or professionals seeking room to grow.' : 'Ideal for those seeking quality and convenience in today\'s market.'}</p>
            <p>Don't miss this opportunity to own a home that combines comfort, style, and location. Schedule your private showing today!</p>
            <div class="premium-features">
              <p><strong>💎 Pro Feature:</strong> Create professional listing flyers and open house materials with ListGenie Pro!</p>
            </div>
          </div>
        `;
        break;
        
      case 'social':
        listing = `
          <div class="generated-content">
            <h4>Social Media Caption</h4>
            <p>🏠 JUST LISTED! ${hasKitchen ? 'Freshly updated' : 'Stunning'} ${hasBeds ? 'bedroom' : 'property'} that's absolutely 🔥</p>
            <p>${hasKitchen ? '✨ Dream kitchen alert ✨' : '💎 This one won\'t last long!'} ${hasNeighborhood ? '📍 Prime location in an amazing neighborhood' : '📍 Location, location, location!'} ${hasYard ? '🌳 Private outdoor space perfect for summer BBQs' : ''}</p>
            <p>${hasGarage ? '🚗 Attached garage for easy parking' : ''} ${hasSqft ? '📏 Tons of space to grow into' : ''} This is the one you've been waiting for!</p>
            <p>DM me for a private showing! 📱 #RealEstate #JustListed #${hasKitchen ? 'Updated' : 'Beautiful'}Home #${hasNeighborhood ? 'GreatLocation' : 'DreamHome'}</p>
            <div class="premium-features">
              <p><strong>💎 Pro Feature:</strong> Generate open house announcements and listing flyers with ListGenie Pro!</p>
            </div>
          </div>
        `;
        break;
        
      case 'luxury':
        listing = `
          <div class="generated-content">
            <h4>Luxury Listing</h4>
            <p>Exquisite ${hasBeds ? 'bedroom' : 'residence'} showcasing ${hasKitchen ? 'sophisticated renovations' : 'unparalleled craftsmanship'} and timeless elegance. ${hasKitchen ? 'The chef-inspired kitchen features premium materials, state-of-the-art appliances, and custom details that define luxury living.' : 'Every detail has been carefully curated to create an atmosphere of refined luxury and sophistication.'}</p>
            <p>${hasNeighborhood ? 'Nestled in an exclusive neighborhood' : 'Positioned in a prestigious location'} where luxury meets convenience and privacy. ${hasGarage ? 'The elegant garage provides secure parking and additional storage solutions.' : ''} ${hasYard ? 'The meticulously landscaped grounds offer a private sanctuary for outdoor entertaining and relaxation.' : ''} ${hasSqft ? 'Generous proportions provide the perfect canvas for sophisticated living and entertaining.' : 'This exceptional property represents the pinnacle of luxury real estate.'}</p>
            <p>For the discerning buyer who demands nothing but the finest, this residence offers an unparalleled opportunity to experience luxury living at its most refined.</p>
            <div class="premium-features">
              <p><strong>💎 Pro Feature:</strong> Design luxury open house materials and premium listing flyers with ListGenie Pro!</p>
            </div>
          </div>
        `;
        break;
        
      default:
        listing = `
          <div class="generated-content">
            <h4>Generated Listing</h4>
            <p>${propertyText}</p>
          </div>
        `;
    }
    
    return listing;
  }
  
  showPreviewMessage(message, type = 'info') {
    ListGenieApp.showNotification(message, type);
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
