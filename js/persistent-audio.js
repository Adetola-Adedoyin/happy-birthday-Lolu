// Persistent audio across all pages
(function() {
  'use strict';
  
  const AUDIO_KEY = 'birthday-audio-state';
  const AUDIO_TIME_KEY = 'birthday-audio-time';
  
  class PersistentAudio {
    constructor() {
      this.audio = null;
      this.toggle = null;
      this.isPlaying = false;
      this.init();
    }
    
    init() {
      this.audio = document.getElementById('bg-music');
      this.toggle = document.getElementById('music-toggle');
      
      if (!this.audio || !this.toggle) return;
      
      this.setupAudio();
      this.bindEvents();
      this.restoreState();
    }
    
    setupAudio() {
      this.audio.volume = 0.3;
      this.audio.loop = true;
      
      // Save time periodically
      setInterval(() => {
        if (this.isPlaying) {
          localStorage.setItem(AUDIO_TIME_KEY, this.audio.currentTime);
        }
      }, 1000);
    }
    
    bindEvents() {
      this.toggle.addEventListener('click', () => this.toggleMusic());
      
      // Save state before page unload
      window.addEventListener('beforeunload', () => {
        this.saveState();
      });
      
      // Auto-play attempt on user interaction and immediately
      document.addEventListener('click', () => this.attemptAutoPlay(), { once: true });
      
      // Try to start immediately
      setTimeout(() => this.attemptAutoPlay(), 100);
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
        this.saveState();
      } catch (error) {
        console.error('Audio toggle failed:', error);
      }
    }
    
    async attemptAutoPlay() {
      try {
        await this.audio.play();
        this.isPlaying = true;
        this.updateToggleButton();
        this.saveState();
      } catch (error) {
        console.log('Auto-play blocked - click anywhere to start music');
        this.isPlaying = false;
        this.updateToggleButton();
      }
    }
    
    restoreState() {
      const savedState = localStorage.getItem(AUDIO_KEY);
      const savedTime = localStorage.getItem(AUDIO_TIME_KEY);
      
      if (savedTime) {
        this.audio.currentTime = parseFloat(savedTime);
      } else {
        // Start from 23 seconds on first load
        this.audio.currentTime = 23;
      }
      
      // Default to playing - only pause if explicitly set to paused
      if (savedState !== 'paused') {
        this.attemptAutoPlay();
      } else {
        this.isPlaying = false;
        this.updateToggleButton();
      }
    }
    
    saveState() {
      localStorage.setItem(AUDIO_KEY, this.isPlaying ? 'playing' : 'paused');
      if (this.isPlaying) {
        localStorage.setItem(AUDIO_TIME_KEY, this.audio.currentTime);
      }
    }
    
    updateToggleButton() {
      const span = this.toggle.querySelector('span');
      if (this.isPlaying) {
        span.textContent = '🔊';
        this.toggle.style.background = 'var(--light-blue)';
        this.toggle.setAttribute('aria-label', 'Pause background music');
      } else {
        span.textContent = '🔇';
        this.toggle.style.background = 'var(--accent-blue)';
        this.toggle.setAttribute('aria-label', 'Play background music');
      }
    }
  }
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    new PersistentAudio();
  });
  
})();