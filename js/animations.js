// Animations JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // Create floating hearts for final page
  if (document.body.classList.contains('final-page')) {
    createFloatingHearts();
    createSparkles();
  }
  
  // Add sparkle effects to envelopes
  const envelopes = document.querySelectorAll('.envelope');
  envelopes.forEach(envelope => {
    envelope.addEventListener('mouseenter', function() {
      createSparkleEffect(this);
    });
  });
});

function createFloatingHearts() {
  const heartsContainer = document.querySelector('.floating-hearts');
  if (!heartsContainer) return;
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart);
      }
    }, 8000);
  }, 1000);
}

function createSparkles() {
  setInterval(() => {
    const sparkle = document.createElement('div');
    sparkle.className = 'final-sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 2 + 's';
    
    document.body.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 3000);
  }, 500);
}

function createSparkleEffect(element) {
  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.animationDelay = Math.random() * 0.5 + 's';
    
    element.appendChild(sparkle);
    
    setTimeout(() => {
      if (sparkle.parentNode) {
        sparkle.parentNode.removeChild(sparkle);
      }
    }, 2000);
  }
}