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
   const row = Math.floor(i / 4);
const col = i % 4;
piece.src = `piece_${row}_${col}.jpg`;
    piece.className = "puzzle-piece";
    piece.draggable = true;
    piece.dataset.index = i;
    pieces.push(piece);
  }

  pieces.sort(() => Math.random() - 0.5);

  pieces.forEach(p => board.appendChild(p));

  let emptyTile = { row: 3, col: 3 };
const board = document.getElementById("puzzle-board");
board.classList.remove("hidden");
board.innerHTML = "";

const tiles = [];
for (let i = 0; i < 16; i++) {
  const row = Math.floor(i / 4);
  const col = i % 4;

  const tile = document.createElement("img");
  tile.className = "puzzle-piece";
  tile.dataset.index = i;
  tile.dataset.row = row;
  tile.dataset.col = col;

  if (i < 15) {
    tile.src = piece_${row}_${col}.jpg;
  } else {
    tile.classList.add("empty");
    tile.src = ""; // lub np. pusty obrazek
  }

  tile.addEventListener("click", () => {
    const r = parseInt(tile.dataset.row);
    const c = parseInt(tile.dataset.col);

    if (
      (Math.abs(r - emptyTile.row) === 1 && c === emptyTile.col) ||
      (Math.abs(c - emptyTile.col) === 1 && r === emptyTile.row)
    ) {
      // Zamiana pozycji
      const emptyIndex = emptyTile.row * 4 + emptyTile.col;
      const clickedIndex = r * 4 + c;

      const emptyElement = board.querySelector(img[data-row='${emptyTile.row}'][data-col='${emptyTile.col}']);

      // Zamiana src
      emptyElement.src = tile.src;
      tile.src = "";
      tile.classList.add("empty");
      emptyElement.classList.remove("empty");

      // Aktualizacja pozycji
      emptyTile.row = r;
      emptyTile.col = c;

      tile.dataset.row = emptyTile.row;
      tile.dataset.col = emptyTile.col;
      emptyElement.dataset.row = r;
      emptyElement.dataset.col = c;

      checkIfCorrect();
    }
  });

  board.appendChild(tile);
  tiles.push(tile);
}

function checkIfCorrect() {
  const allTiles = board.querySelectorAll("img");
  let correct = true;

  allTiles.forEach((tile, i) => {
    if (i < 15) {
      const expectedRow = Math.floor(i / 4);
      const expectedCol = i % 4;
      const currentSrc = tile.src.split("/").pop();
      const expectedName = piece_${expectedRow}_${expectedCol}.jpg;

      if (!currentSrc.endsWith(expectedName)) {
        correct = false;
      }
    }
  });

  if (correct) {
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      alert("Brawo! Ułożyłeś puzzle! 🧩");
    }, 300);
  }
}
