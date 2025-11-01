// Simple envelope interaction
document.addEventListener('DOMContentLoaded', function() {
  const envelopes = document.querySelectorAll('.envelope');
  let openedCount = 0;
  
  envelopes.forEach((envelope, index) => {
    envelope.addEventListener('click', function() {
      if (!this.classList.contains('opened')) {
        this.classList.add('opened');
        const letter = this.querySelector('.letter');
        letter.classList.remove('hidden');
        letter.classList.add('visible');
        
        openedCount++;
        
        if (openedCount === 7) {
          setTimeout(() => {
            alert('🎉 You\'ve read all my letters! Ready for your surprise?');
            window.location.href = 'final.html';
          }, 1000);
        }
      }
    });
  });
});