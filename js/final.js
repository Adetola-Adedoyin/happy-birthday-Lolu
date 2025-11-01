// Floating hearts generator
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  document.body.appendChild(heart);

  // Random horizontal position
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.fontSize = (15 + Math.random() * 25) + "px";

  // Remove after animation
  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// Sparkles generator
function createSparkle() {
  const sparkle = document.createElement("div");
  sparkle.classList.add("sparkle");
  document.body.appendChild(sparkle);

  sparkle.style.left = Math.random() * window.innerWidth + "px";
  sparkle.style.top = Math.random() * window.innerHeight + "px";

  setTimeout(() => {
    sparkle.remove();
  }, 3000);
}

// Keep generating
setInterval(createHeart, 800);
setInterval(createSparkle, 500);
