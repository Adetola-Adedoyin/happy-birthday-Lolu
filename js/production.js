// Production-level JavaScript with error handling and performance optimizations
(function() {
  'use strict';
  
  // Error handling
  window.addEventListener('error', function(e) {
    console.error('Runtime error:', e.error);
  });
  
  // Performance monitoring
  const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'navigation') {
        console.log('Page load time:', entry.loadEventEnd - entry.loadEventStart);
      }
    }
  });
  
  if ('PerformanceObserver' in window) {
    perfObserver.observe({ entryTypes: ['navigation'] });
  }
  
  // Enhanced envelope interaction with accessibility
  class EnvelopeManager {
    constructor() {
      this.openedCount = 0;
      this.totalLetters = 7;
      this.envelopes = [];
      this.init();
    }
    
    init() {
      this.bindEvents();
      this.setupAccessibility();
      this.updateProgress();
    }
    
    bindEvents() {
      const envelopes = document.querySelectorAll('.envelope');
      
      envelopes.forEach((envelope, index) => {
        this.envelopes.push(envelope);
        
        // Click handler
        envelope.addEventListener('click', (e) => this.handleEnvelopeOpen(e, index));
        
        // Keyboard handler
        envelope.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.handleEnvelopeOpen(e, index);
          }
        });
        
        // Focus management
        envelope.addEventListener('focus', () => {
          envelope.setAttribute('aria-expanded', 'false');
        });
      });
    }
    
    setupAccessibility() {
      this.envelopes.forEach((envelope, index) => {
        envelope.setAttribute('role', 'button');
        envelope.setAttribute('tabindex', '0');
        envelope.setAttribute('aria-label', `Love letter ${index + 1} of ${this.totalLetters}`);
        envelope.setAttribute('data-letter', index + 1);
      });
    }
    
    handleEnvelopeOpen(event, index) {
      const envelope = event.currentTarget;
      
      if (envelope.classList.contains('opened')) return;
      
      try {
        // Add loading state
        envelope.classList.add('loading');
        
        setTimeout(() => {
          envelope.classList.remove('loading');
          envelope.classList.add('opened');
          envelope.setAttribute('aria-expanded', 'true');
          
          const letter = envelope.querySelector('.letter');
          if (letter) {
            letter.classList.remove('hidden');
            letter.classList.add('visible');
            letter.setAttribute('aria-hidden', 'false');
          }
          
          this.openedCount++;
          this.updateProgress();
          
          // Announce to screen readers
          this.announceLetterOpened(index + 1);
          
          if (this.openedCount === this.totalLetters) {
            setTimeout(() => this.showFinalSurprise(), 1000);
          }
        }, 300);
        
      } catch (error) {
        console.error('Error opening envelope:', error);
        envelope.classList.remove('loading');
      }
    }
    
    updateProgress() {
      const progressBar = document.getElementById('progress-indicator');
      if (progressBar) {
        const percentage = (this.openedCount / this.totalLetters) * 100;
        const fill = progressBar.querySelector('.progress-fill');
        const text = progressBar.querySelector('.progress-text');
        
        if (fill) fill.style.width = percentage + '%';
        if (text) text.textContent = `${this.openedCount} of ${this.totalLetters} letters opened`;
        
        progressBar.setAttribute('aria-valuenow', this.openedCount);
      }
    }
    
    announceLetterOpened(letterNumber) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = `Letter ${letterNumber} opened. ${this.totalLetters - this.openedCount} letters remaining.`;
      
      document.body.appendChild(announcement);
      
      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
    
    showFinalSurprise() {
      const modal = this.createModal();
      document.body.appendChild(modal);
      
      // Focus management
      const button = modal.querySelector('#final-surprise-btn');
      if (button) button.focus();
    }
    
    createModal() {
      const overlay = document.createElement('div');
      overlay.className = 'modal-overlay';
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-modal', 'true');
      overlay.setAttribute('aria-labelledby', 'modal-title');
      
      overlay.innerHTML = `
        <div class="modal-content">
          <h2 id="modal-title">🎉 Congratulations! 🎉</h2>
          <p>You've read all my letters!<br>Ready for your final surprise?</p>
          <button id="final-surprise-btn" class="cta-button">
            See Your Surprise ❤️
          </button>
        </div>
      `;
      
      // Event handlers
      const button = overlay.querySelector('#final-surprise-btn');
      button.addEventListener('click', () => {
        window.location.href = 'final.html';
      });
      
      // Close on Escape
      overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          document.body.removeChild(overlay);
        }
      });
      
      return overlay;
    }
  }
  
  // Enhanced audio manager
  class AudioManager {
    constructor() {
      this.audio = document.getElementById('bg-music');
      this.toggle = document.getElementById('music-toggle');
      this.isPlaying = false;
      this.init();
    }
    
    init() {
      if (!this.audio || !this.toggle) return;
      
      this.setupAudio();
      this.bindEvents();
    }
    
    setupAudio() {
      this.audio.volume = 0.3;
      this.audio.addEventListener('loadstart', () => console.log('Audio loading started'));
      this.audio.addEventListener('canplaythrough', () => console.log('Audio ready to play'));
      this.audio.addEventListener('error', (e) => console.error('Audio error:', e));
    }
    
    bindEvents() {
      this.toggle.addEventListener('click', () => this.toggleMusic());
      
      // Keyboard support
      this.toggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.toggleMusic();
        }
      });
      
      // Auto-play attempt
      document.addEventListener('click', () => this.attemptAutoPlay(), { once: true });
    }
    
    async toggleMusic() {
      try {
        if (this.isPlaying) {
          this.audio.pause();
          this.isPlaying = false;
        } else {
          await this.audio.play();
          this.isPlaying = true;
        }
        this.updateToggleButton();
      } catch (error) {
        console.error('Audio toggle failed:', error);
      }
    }
    
    async attemptAutoPlay() {
      try {
        await this.audio.play();
        this.isPlaying = true;
        this.updateToggleButton();
      } catch (error) {
        console.log('Auto-play blocked by browser');
      }
    }
    
    updateToggleButton() {
      const span = this.toggle.querySelector('span');
      if (this.isPlaying) {
        span.textContent = '🔊';
        this.toggle.style.background = '#82ccdd';
        this.toggle.setAttribute('aria-label', 'Pause background music');
      } else {
        span.textContent = '🔇';
        this.toggle.style.background = '#60a3bc';
        this.toggle.setAttribute('aria-label', 'Play background music');
      }
    }
  }
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new EnvelopeManager();
    new AudioManager();
  });
  
})();