// Progress tracking JavaScript
document.addEventListener('DOMContentLoaded', function() {
  let openedLetters = new Set();
  const totalLetters = 7;
  
  // Listen for letter opened events
  document.addEventListener('letterOpened', function(event) {
    const letterId = event.detail.letterId;
    openedLetters.add(letterId);
    
    console.log(`Letter ${letterId} opened. Total opened: ${openedLetters.size}/${totalLetters}`);
    
    // Check if all letters are opened
    if (openedLetters.size === totalLetters) {
      setTimeout(() => {
        showFinalSurprisePrompt();
      }, 1000);
    }
  });
  
  function showFinalSurprisePrompt() {
    // Create a beautiful modal/overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.5s ease-out;
    `;
    
    const modal = document.createElement('div');
    modal.style.cssText = `
      background: linear-gradient(135deg, #60a3bc, #82ccdd);
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      color: white;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      max-width: 400px;
      animation: fadeIn 0.8s ease-out 0.3s both;
    `;
    
    modal.innerHTML = `
      <h2 style="margin-bottom: 1rem; font-size: 1.8rem;">🎉 Congratulations! 🎉</h2>
      <p style="margin-bottom: 2rem; font-size: 1.1rem;">You've read all my letters!<br>Ready for your final surprise?</p>
      <button id="final-surprise-btn" style="
        background: white;
        color: #2c5aa0;
        border: none;
        padding: 15px 30px;
        border-radius: 25px;
        font-size: 1.1rem;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
      ">See Your Surprise ❤️</button>
    `;
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Add hover effect to button
    const btn = modal.querySelector('#final-surprise-btn');
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
    
    btn.addEventListener('click', function() {
      window.location.href = 'final.html';
    });
  }
});