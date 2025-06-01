const emojis = ["📚", "📖", "📝", "✨"];

setInterval(() => {
  const emoji = document.createElement("div");
  emoji.className = "emoji";
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  emoji.style.left = Math.random() * 100 + "vw";
  emoji.style.top = `${-2 - Math.random() * 2}rem`;

  // ✅ 強制設定完整 animation 屬性以確保觸發動畫
  const duration = 4 + Math.random() * 3;
  emoji.style.animation = `fall ${duration}s linear`;

  document.querySelector("main").appendChild(emoji);

  setTimeout(() => {
    emoji.remove();
  }, duration * 1000 + 1000); // 動畫結束再多保留 1 秒
}, 500);