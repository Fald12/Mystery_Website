const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonsArea = document.getElementById("buttonsArea");
const questionCard = document.getElementById("questionCard");
const successCard = document.getElementById("successCard");
const againBtn = document.getElementById("againBtn");
const songFile = document.getElementById("songFile");
const audioPlayer = document.getElementById("audioPlayer");
const fileName = document.getElementById("fileName");

function moveNoButton() {
  // Pindahkan tombol "Tidak" secara acak di dalam area tombol.
  const area = buttonsArea.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const maxX = Math.max(0, area.width - btn.width);
  const maxY = 75;

  noBtn.style.position = "absolute";
  noBtn.style.left = `${Math.random() * maxX}px`;
  noBtn.style.top = `${Math.random() * maxY - 8}px`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  questionCard.classList.add("hidden");
  successCard.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  burstHearts();
});

againBtn.addEventListener("click", () => {
  successCard.classList.add("hidden");
  questionCard.classList.remove("hidden");
  noBtn.style.position = "";
  noBtn.style.left = "";
  noBtn.style.top = "";
  audioPlayer.pause();
  audioPlayer.removeAttribute("src");
  audioPlayer.load();
  songFile.value = "";
  fileName.textContent = "Belum ada lagu yang dipilih";
});

songFile.addEventListener("change", () => {
  const file = songFile.files[0];
  if (!file) return;
  if (audioPlayer.dataset.objectUrl) {
    URL.revokeObjectURL(audioPlayer.dataset.objectUrl);
  }
  const objectUrl = URL.createObjectURL(file);
  audioPlayer.dataset.objectUrl = objectUrl;
  audioPlayer.src = objectUrl;
  fileName.textContent = `Lagu dipilih: ${file.name}`;
  audioPlayer.load();
  audioPlayer.play().catch(() => {
    // Beberapa browser menunggu pengguna menekan tombol Play.
  });
});

function burstHearts() {
  const symbols = ["💗", "💖", "🌸", "💕", "✨", "🌷"];
  for (let i = 0; i < 24; i++) {
    const item = document.createElement("span");
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.position = "fixed";
    item.style.left = `${Math.random() * 100}vw`;
    item.style.top = `${35 + Math.random() * 45}vh`;
    item.style.fontSize = `${18 + Math.random() * 20}px`;
    item.style.pointerEvents = "none";
    item.style.zIndex = "5";
    item.style.transition = "transform 1.5s ease, opacity 1.5s ease";
    document.body.appendChild(item);
    requestAnimationFrame(() => {
      item.style.transform = `translate(${Math.random() * 180 - 90}px, ${-100 - Math.random() * 220}px) rotate(${Math.random() * 90 - 45}deg)`;
      item.style.opacity = "0";
    });
    setTimeout(() => item.remove(), 1700);
  }
}
