// Enhanced envelope interactions with realistic animations
document.addEventListener('DOMContentLoaded', function() {
  let openedCount = 0;
  const totalLetters = 7;
  
  // Handle envelope clicks
  document.querySelectorAll('.envelope').forEach((envelope, index) => {
    envelope.addEventListener('click', function() {
      if (this.classList.contains('opened')) return;
      
      // Add opening animation
      this.classList.add('opening');
      
      // After animation completes
      setTimeout(() => {
        this.classList.add('opened');
        openedCount++;
        
        // Check if all letters opened
        if (openedCount === totalLetters) {
          setTimeout(() => showFinalSurprise(), 2000);
        }
      }, 1200);
    });
    
    // Handle letter close
    const paperLetter = envelope.querySelector('.paper-letter');
    if (paperLetter) {
      paperLetter.addEventListener('click', function(e) {
        if (e.target === this || e.target.textContent === '✕') {
          envelope.classList.remove('opening');
        }
      });
    }
    
    // Keyboard support
    envelope.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });
  
  function showFinalSurprise() {
    // Create modal for final surprise
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
});

// Final envelope special interaction
document.addEventListener('DOMContentLoaded', function() {
  const finalEnvelope = document.querySelector('.final-envelope');
  if (!finalEnvelope) return;
  
  const waxSeal = finalEnvelope.querySelector('.wax-seal');
  
  waxSeal.addEventListener('click', function(e) {
    e.stopPropagation();
    
    // Add cracking effect
    finalEnvelope.classList.add('cracking');
    
    setTimeout(() => {
      finalEnvelope.classList.add('breaking');
      
      setTimeout(() => {
        finalEnvelope.classList.add('opening');
      }, 800);
    }, 500);
  });
  
  // Handle final letter close
  const finalPaper = finalEnvelope.querySelector('.paper-letter');
  if (finalPaper) {
    finalPaper.addEventListener('click', function(e) {
      if (e.target === this || e.target.textContent === '✕') {
        finalEnvelope.classList.remove('opening');
      }
    });
  }
});