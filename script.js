window.addEventListener("DOMContentLoaded", () => {
  // === KOPERTA ===
  const envelope = document.getElementById("envelope");
  if (envelope) {
    envelope.addEventListener("click", () => {
      document.getElementById("envelope_screen").style.display = "none";
      document.getElementById("main_content").classList.remove("hidden");
      startCounter();
      updateGalleryImage();
    });
  }

  // === LICZNIK ===
  function startCounter() {
    const startDate = new Date("2022-07-15T00:00:00");
    setInterval(() => {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      document.getElementById("days-together").innerText =
        `${days} dni, ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }

  // === GALERIA ===
  const galleryImages = [
    "gallery_1.jpg",
    "gallery_2.jpg",
    "gallery_3.jpg",
    "gallery_4.jpg",
    "gallery_5.jpg"
  ];
  let currentGalleryIndex = 0;

  function updateGalleryImage() {
    const img = document.getElementById("gallery-image");
    if (img) {
      img.src = galleryImages[currentGalleryIndex];
    }
  }

  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentGalleryIndex =
        (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGalleryImage();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentGalleryIndex =
        (currentGalleryIndex + 1) % galleryImages.length;
      updateGalleryImage();
    });
  }
});
document.getElementById("shuffle-btn").addEventListener("click", () => {
  const board = document.getElementById("puzzle-board");
  board.classList.remove("hidden");
  board.innerHTML = "";

  const pieces = [];
  for (let i = 0; i < 16; i++) {
    const piece = document.createElement("img");
    piece.src = piece_${i}.jpg;
    piece.className = "puzzle-piece";
    piece.draggable = true;
    piece.dataset.index = i;
    pieces.push(piece);
  }

  pieces.sort(() => Math.random() - 0.5);

  pieces.forEach(p => board.appendChild(p));

  let dragged = null;
  board.querySelectorAll("img").forEach(el => {
    el.addEventListener("dragstart", e => dragged = e.target);
    el.addEventListener("dragover", e => e.preventDefault());
    el.addEventListener("drop", e => {
      e.preventDefault();
      if (!dragged || dragged === e.target) return;

      const tmp = document.createElement("span");
      board.insertBefore(tmp, dragged);
      board.insertBefore(dragged, e.target);
      board.insertBefore(e.target, tmp);
      board.removeChild(tmp);

      const isCorrect = [...board.children].every((el, idx) =>
        el.dataset.index == idx
      );

      if (isCorrect) {
        setTimeout(() => alert("Brawo! Ułożyłeś puzzle 🎉"), 300);
      }
    });
  });
});
