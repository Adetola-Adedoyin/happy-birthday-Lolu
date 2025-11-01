// Interactive Letter Animation System
class InteractiveLetter {
  constructor() {
    this.openedCount = 0;
    this.totalLetters = 7;
    this.currentOpenLetter = null;
    this.init();
  }

  init() {
    this.createRomanticBackground();
    this.bindEvents();
  }

  bindEvents() {
    document.querySelectorAll('.envelope').forEach((envelope, index) => {
      // Add backdrop element
      const backdrop = document.createElement('div');
      backdrop.className = 'letter-backdrop';
      envelope.appendChild(backdrop);

      // Add close button to paper letter
      const closeBtn = document.createElement('div');
      closeBtn.className = 'close-btn';
      closeBtn.innerHTML = '✕';
      envelope.querySelector('.paper-letter').appendChild(closeBtn);

      // Main click handler
      envelope.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-btn') || 
            e.target.classList.contains('letter-backdrop')) {
          this.closeLetter(envelope);
        } else if (!envelope.classList.contains('opening')) {
          this.openLetter(envelope);
        }
      });

      // Keyboard support
      envelope.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!envelope.classList.contains('opening')) {
            this.openLetter(envelope);
          }
        } else if (e.key === 'Escape') {
          this.closeLetter(envelope);
        }
      });

      // Make envelope focusable
      envelope.setAttribute('tabindex', '0');
      envelope.setAttribute('role', 'button');
      envelope.setAttribute('aria-label', `Love letter ${index + 1}`);
    });

    // Global escape key handler
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.currentOpenLetter) {
        this.closeLetter(this.currentOpenLetter);
      }
    });
  }

  async openLetter(envelope) {
    // Close any currently open letter
    if (this.currentOpenLetter && this.currentOpenLetter !== envelope) {
      this.closeLetter(this.currentOpenLetter);
      await this.delay(300);
    }

    this.currentOpenLetter = envelope;
    envelope.classList.add('opening');

    // Step 1: Open flap and break seal (0.8s)
    envelope.classList.add('opening');
    await this.delay(800);

    // Step 2: Letter slides out (0.8s)
    envelope.classList.add('slide-out');
    await this.delay(800);

    // Step 3: First unfold (0.6s)
    envelope.classList.add('unfold-1');
    await this.delay(600);

    // Step 4: Second unfold (0.6s)
    envelope.classList.add('unfold-2');
    await this.delay(600);

    // Step 5: Fully expand and show content (0.8s)
    envelope.classList.add('fully-open');
    
    // Show romantic effects
    this.showRomanticEffects();
    
    // Add typewriter effect to text
    this.addTypewriterEffect(envelope);
    
    // Track progress
    if (!envelope.hasAttribute('data-opened')) {
      envelope.setAttribute('data-opened', 'true');
      this.openedCount++;
      
      // Check if all letters opened
      if (this.openedCount === this.totalLetters) {
        setTimeout(() => this.showFinalSurprise(), 3000);
      }
    }
  }

  closeLetter(envelope) {
    if (!envelope || !envelope.classList.contains('opening')) return;

    // Remove all animation classes in reverse order
    envelope.classList.remove('fully-open');
    
    setTimeout(() => {
      envelope.classList.remove('unfold-2');
    }, 100);
    
    setTimeout(() => {
      envelope.classList.remove('unfold-1');
    }, 200);
    
    setTimeout(() => {
      envelope.classList.remove('slide-out');
    }, 300);
    
    setTimeout(() => {
      envelope.classList.remove('opening');
      this.currentOpenLetter = null;
    }, 800);

    // Hide romantic effects
    this.hideRomanticEffects();
    
    // Remove typewriter effect
    this.removeTypewriterEffect(envelope);
  }

  addTypewriterEffect(envelope) {
    const content = envelope.querySelector('.paper-content');
    const text = content.textContent.trim();
    
    // For long text, use fade-in instead of typewriter
    if (text.length > 200) {
      content.style.opacity = '0';
      setTimeout(() => {
        content.style.transition = 'opacity 1.5s ease';
        content.style.opacity = '1';
      }, 500);
    } else {
      // Use typewriter for shorter text
      content.classList.add('typewriter');
      content.innerHTML = `<p>${text}</p>`;
    }
  }

  removeTypewriterEffect(envelope) {
    const content = envelope.querySelector('.paper-content');
    content.classList.remove('typewriter');
    content.style.transition = '';
  }

  createRomanticBackground() {
    const romanticBg = document.createElement('div');
    romanticBg.className = 'romantic-bg';
    
    // Create floating hearts
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.innerHTML = '💕';
      heart.style.left = Math.random() * 100 + '%';
      heart.style.animationDelay = Math.random() * 6 + 's';
      heart.style.animationDuration = (6 + Math.random() * 3) + 's';
      romanticBg.appendChild(heart);
    }
    
    // Create sparkles
    for (let i = 0; i < 15; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 4 + 's';
      sparkle.style.animationDuration = (3 + Math.random() * 2) + 's';
      romanticBg.appendChild(sparkle);
    }
    
    document.body.appendChild(romanticBg);
    this.romanticBg = romanticBg;
  }

  showRomanticEffects() {
    if (this.romanticBg) {
      this.romanticBg.style.opacity = '1';
    }
  }

  hideRomanticEffects() {
    if (this.romanticBg) {
      this.romanticBg.style.opacity = '0';
    }
  }

  showFinalSurprise() {
    const modal = document.createElement('div');
    modal.className = 'surprise-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>🎉 All Letters Opened! 🎉</h2>
        <p>You've read all my love letters!<br>Ready for your final surprise?</p>
        <button class="final-btn">See Final Surprise ❤️</button>
      </div>
    `;
    
    modal.querySelector('.final-btn').addEventListener('click', () => {
      window.location.href = 'final.html';
    });
    
    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
    
    document.body.appendChild(modal);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Final envelope special handling
class FinalInteractiveLetter extends InteractiveLetter {
  constructor() {
    super();
    this.setupFinalEnvelope();
  }

  setupFinalEnvelope() {
    const finalEnvelope = document.querySelector('.final-envelope');
    if (!finalEnvelope) return;

    const waxSeal = finalEnvelope.querySelector('.wax-seal');
    
    // Special wax seal interaction
    waxSeal.addEventListener('click', async (e) => {
      e.stopPropagation();
      
      // Add seal breaking animation
      waxSeal.style.animation = 'sealBreak 0.6s ease-out forwards';
      
      await this.delay(300);
      
      this.openLetter(finalEnvelope);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.final-envelope')) {
    new FinalInteractiveLetter();
  } else {
    new InteractiveLetter();
  }
});