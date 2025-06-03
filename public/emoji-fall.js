const emojis = ["📚", "📖", "📝", "✨"];

setInterval(() => {
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.left = `${Math.random() * 100}vw`;
  emoji.style.top = `${-2 - Math.random() * 2}rem`;

  const duration = 4 + Math.random() * 3;
  emoji.style.animation = `fall ${duration}s linear`;

  document.querySelector("main").appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, duration * 1000 + 1000);
}, 500);