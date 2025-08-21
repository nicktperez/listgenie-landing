// Analytics and event tracking
class Analytics {
  constructor() {
    this.endpoint = '/collect';
    this.events = [];
    this.isOnline = navigator.onLine;
    
    this.init();
  }
  
  init() {
    this.bindEvents();
    this.setupOnlineOfflineHandling();
  }
  
  bindEvents() {
    // Track button clicks
    document.addEventListener('click', (e) => this.trackButtonClick(e));
    
    // Track form submissions
    document.addEventListener('submit', (e) => this.trackFormSubmit(e));
    
      // Track page views
    this.trackPageView();
    
    // Track scroll depth
    this.trackScrollDepth();
    
    // Track time on page
    this.trackTimeOnPage();
  }
  
  trackButtonClick(e) {
    const button = e.target.closest('.track');
    if (!button) return;
    
    const eventName = button.getAttribute('data-event') || 'click';
    const eventMeta = {
      buttonText: button.textContent?.trim(),
      buttonClass: button.className,
      href: button.href,
      buttonType: button.type || 'button',
      timestamp: Date.now()
    };
    
    this.sendEvent(eventName, eventMeta);
  }
  
  trackFormSubmit(e) {
    const form = e.target;
    const formData = new FormData(form);
    
    const eventMeta = {
      formId: form.id || 'unknown',
      formAction: form.action,
      formMethod: form.method,
      fieldCount: formData.entries().length,
      timestamp: Date.now()
    };
    
    this.sendEvent('form_submit', eventMeta);
  }
  
  trackPageView() {
    const pageData = {
      path: location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      timestamp: Date.now()
    };
    
    this.sendEvent('page_view', pageData);
  }
  
  trackScrollDepth() {
    let maxScroll = 0;
    let scrollEvents = 0;
    
    const trackScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track at 25%, 50%, 75%, 100%
        if (scrollPercent >= 25 && scrollPercent < 50 && scrollEvents < 1) {
          this.sendEvent('scroll_25', { scrollPercent, timestamp: Date.now() });
          scrollEvents++;
        } else if (scrollPercent >= 50 && scrollPercent < 75 && scrollEvents < 2) {
          this.sendEvent('scroll_50', { scrollPercent, timestamp: Date.now() });
          scrollEvents++;
        } else if (scrollPercent >= 75 && scrollPercent < 100 && scrollEvents < 3) {
          this.sendEvent('scroll_75', { scrollPercent, timestamp: Date.now() });
          scrollEvents++;
        } else if (scrollPercent >= 100 && scrollEvents < 4) {
          this.sendEvent('scroll_100', { scrollPercent, timestamp: Date.now() });
          scrollEvents++;
        }
      }
    };
    
    // Throttle scroll events
    let ticking = false;
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(trackScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick);
  }
  
  trackTimeOnPage() {
    const startTime = Date.now();
    
    // Track time on page when user leaves
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - startTime;
      this.sendEvent('time_on_page', { 
        timeOnPage, 
        timestamp: Date.now() 
      }, true); // Use sendBeacon for beforeunload
    });
    
    // Track time on page every 30 seconds
    setInterval(() => {
      const timeOnPage = Date.now() - startTime;
      this.sendEvent('time_on_page_interval', { 
        timeOnPage, 
        timestamp: Date.now() 
      });
    }, 30000);
  }
  
  sendEvent(eventName, meta = {}, useBeacon = false) {
    const payload = {
      event: eventName,
      meta,
      timestamp: Date.now(),
      path: location.pathname,
      sessionId: this.getSessionId()
    };
    
    if (useBeacon && navigator.sendBeacon) {
      try {
        navigator.sendBeacon(this.endpoint, JSON.stringify(payload));
      } catch (error) {
        console.error('Beacon failed, falling back to fetch:', error);
        this.sendWithFetch(payload);
      }
    } else {
      this.sendWithFetch(payload);
    }
    
    // Store event locally for offline handling
    this.events.push(payload);
    this.persistEvents();
  }
  
  sendWithFetch(payload) {
    if (!this.isOnline) {
      // Store for later if offline
      this.events.push(payload);
      this.persistEvents();
      return;
    }
    
    fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    }).catch(error => {
      console.error('Analytics error:', error);
      // Store failed events for retry
      this.events.push(payload);
      this.persistEvents();
    });
  }
  
  setupOnlineOfflineHandling() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.flushOfflineEvents();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }
  
  flushOfflineEvents() {
    const offlineEvents = this.getOfflineEvents();
    if (offlineEvents.length === 0) return;
    
    offlineEvents.forEach(event => {
      this.sendWithFetch(event);
    });
    
    // Clear offline events after sending
    localStorage.removeItem('analytics_offline_events');
  }
  
  persistEvents() {
    try {
      localStorage.setItem('analytics_offline_events', JSON.stringify(this.events));
    } catch (error) {
      console.error('Failed to persist analytics events:', error);
    }
  }
  
  getOfflineEvents() {
    try {
      const events = localStorage.getItem('analytics_offline_events');
      return events ? JSON.parse(events) : [];
    } catch (error) {
      console.error('Failed to get offline events:', error);
      return [];
    }
  }
  
  getSessionId() {
    let sessionId = sessionStorage.getItem('analytics_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('analytics_session_id', sessionId);
    }
    return sessionId;
  }
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', () => {
  new Analytics();
});
