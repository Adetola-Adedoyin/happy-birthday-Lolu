// Audio control JavaScript
document.addEventListener('DOMContentLoaded', function() {
  const musicToggle = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');
  let isPlaying = false;
  
  // Auto-play music (with user interaction fallback)
  function initAudio() {
    bgMusic.volume = 0.3; // Set volume to 30%
    
    // Try to auto-play
    const playPromise = bgMusic.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        updateToggleButton();
      }).catch(() => {
        // Auto-play failed, wait for user interaction
        isPlaying = false;
        updateToggleButton();
      });
    }
  }
  
  // Toggle music on button click
  musicToggle.addEventListener('click', function() {
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
    } else {
      bgMusic.play().then(() => {
        isPlaying = true;
      }).catch(error => {
        console.log('Audio play failed:', error);
      });
    }
    updateToggleButton();
  });
  
  // Update button appearance
  function updateToggleButton() {
    const span = musicToggle.querySelector('span');
    if (isPlaying) {
      span.textContent = '🔊';
      musicToggle.style.background = '#82ccdd';
    } else {
      span.textContent = '🔇';
      musicToggle.style.background = '#60a3bc';
    }
  }
  
  // Handle audio events
  bgMusic.addEventListener('ended', function() {
    isPlaying = false;
    updateToggleButton();
  });
  
  bgMusic.addEventListener('pause', function() {
    isPlaying = false;
    updateToggleButton();
  });
  
  bgMusic.addEventListener('play', function() {
    isPlaying = true;
    updateToggleButton();
  });
  
  // Initialize audio
  initAudio();
  
  // Try to resume audio on any user interaction
  document.addEventListener('click', function() {
    if (!isPlaying && bgMusic.paused) {
      bgMusic.play().then(() => {
        isPlaying = true;
        updateToggleButton();
      }).catch(() => {
        // Still can't play
      });
    }
  }, { once: true });
});