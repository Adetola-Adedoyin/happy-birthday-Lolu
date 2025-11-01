// Smooth Letter Animation System
class LetterAnimation {
  constructor() {
    this.openedCount = 0;
    this.totalLetters = 7;
    this.init();
  }

  init() {
    this.bindEvents();
    this.createSparkles();
  }

  bindEvents() {
    document.querySelectorAll('.envelope').forEach((envelope, index) => {
      envelope.addEventListener('click', (e) => this.openLetter(envelope, e));
      
      // Keyboard support
      envelope.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLetter(envelope, e);
        }
      });
    });
  }

  async openLetter(envelope, event) {
    if (envelope.classList.contains('step-4')) {
      this.closeLetter(envelope);
      return;
    }

    if (envelope.classList.contains('step-1')) return;

    // Step 1: Open flap and break seal
    envelope.classList.add('step-1');
    
    await this.delay(800);
    
    // Step 2: Letter starts sliding out
    envelope.classList.add('step-2');
    
    await this.delay(600);
    
    // Step 3: Letter moves to center
    envelope.classList.add('step-3');
    
    await this.delay(800);
    
    // Step 4: Letter unfolds and reveals text
    envelope.classList.add('step-4');
    
    // Add sparkles effect
    this.showSparkles();
    
    // Track progress
    this.openedCount++;
    
    // Setup close functionality
    this.setupCloseButton(envelope);
    
    // Check if all letters opened
    if (this.openedCount === this.totalLetters) {
      setTimeout(() => this.showFinalSurprise(), 2000);
    }
  }

  closeLetter(envelope) {
    envelope.classList.remove('step-1', 'step-2', 'step-3', 'step-4');
    this.hideSparkles();
  }

  setupCloseButton(envelope) {
    const paperLetter = envelope.querySelector('.paper-letter');
    
    const closeHandler = (e) => {
      if (e.target === paperLetter || e.target.textContent === '✕') {
        this.closeLetter(envelope);
        paperLetter.removeEventListener('click', closeHandler);
      }
    };
    
    paperLetter.addEventListener('click', closeHandler);
    
    // Close on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.closeLetter(envelope);
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    
    document.addEventListener('keydown', escapeHandler);
  }

  createSparkles() {
    const sparklesContainer = document.createElement('div');
    sparklesContainer.className = 'sparkles';
    document.body.appendChild(sparklesContainer);
    
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.animationDelay = Math.random() * 3 + 's';
      sparklesContainer.appendChild(sparkle);
    }
    
    this.sparklesContainer = sparklesContainer;
  }

  showSparkles() {
    if (this.sparklesContainer) {
      this.sparklesContainer.style.display = 'block';
      this.sparklesContainer.querySelectorAll('.sparkle').forEach(sparkle => {
        sparkle.style.animationPlayState = 'running';
      });
    }
  }

  hideSparkles() {
    if (this.sparklesContainer) {
      this.sparklesContainer.style.display = 'none';
      this.sparklesContainer.querySelectorAll('.sparkle').forEach(sparkle => {
        sparkle.style.animationPlayState = 'paused';
      });
    }
  }

  showFinalSurprise() {
    const modal = document.createElement('div');
    modal.className = 'surprise-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <h2>🎉 All Letters Read! 🎉</h2>
        <p>You've opened all my love letters!<br>Ready for your final surprise?</p>
        <button class="final-btn">See Final Surprise ❤️</button>
      </div>
    `;
    
    modal.querySelector('.final-btn').addEventListener('click', () => {
      window.location.href = 'final.html';
    });
    
    document.body.appendChild(modal);
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Final envelope special handling
class FinalEnvelopeAnimation extends LetterAnimation {
  constructor() {
    super();
    this.setupFinalEnvelope();
  }

  setupFinalEnvelope() {
    const finalEnvelope = document.querySelector('.final-envelope');
    if (!finalEnvelope) return;

    const waxSeal = finalEnvelope.querySelector('.wax-seal');
    
    waxSeal.addEventListener('click', async (e) => {
      e.stopPropagation();
      
      // Special seal breaking animation
      waxSeal.style.animation = 'sealCrack 0.5s ease-out';
      
      await this.delay(500);
      
      this.openLetter(finalEnvelope, e);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.final-envelope')) {
    new FinalEnvelopeAnimation();
  } else {
    new LetterAnimation();
  }
});