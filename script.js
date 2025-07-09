document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const mainContent = document.getElementById('main-content');
  const galleryImage = document.getElementById('galleryImage');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const puzzleContainer = document.getElementById('puzzle');
  const playBtn = document.getElementById('playPuzzle');
  const shuffleBtn = document.getElementById('shufflePuzzle');
  const success = document.getElementById('success');

  // --- Otwieranie koperty ---
  envelope.addEventListener('click', () => {
    document.getElementById('envelope-container').style.display = 'none';
    mainContent.style.display = 'block';
    startCounter();
  });

  // --- Timer ---
  function startCounter() {
    const startDate = new Date("2022-07-15T00:00:00");
    setInterval(() => {
      const now = new Date();
      const diff = now - startDate;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      document.getElementById('timer').innerText = 
        `${days} dni ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }

  // --- Galeria zdjęć ---
  const galleryImages = [
    "zdjecie1.jpg", "zdjecie2.jpg", "zdjecie3.jpg",
    "zdjecie4.jpg", "zdjecie5.jpg"
  ];
  let currentIndex = 0;

  function updateGallery() {
    galleryImage.src = galleryImages[currentIndex];
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGallery();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateGallery();
  });

  updateGallery();

  // --- Puzzle ---
  const gridSize = 4;
  let tiles = [];

  function createPuzzle() {
    puzzleContainer.innerHTML = '';
    tiles = [];

    for (let i = 0; i < gridSize * gridSize; i++) {
      const tile = document.createElement('div');
      tile.classList.add('tile');
      tile.dataset.index = i;
      tile.style.backgroundImage = url('${galleryImages[currentIndex]}');
      tile.style.backgroundSize = ${gridSize * 100}% ${gridSize * 100}%;
      tile.style.backgroundPosition = ${(i % gridSize) * -100}% ${Math.floor(i / gridSize) * -100}%;
      puzzleContainer.appendChild(tile);
      tiles.push(tile);
    }

    addDragListeners();
  }

  function addDragListeners() {
    let dragged;

    tiles.forEach(tile => {
      tile.draggable = true;

      tile.addEventListener('dragstart', e => {
        dragged = tile;
      });

      tile.addEventListener('dragover', e => {
        e.preventDefault();
      });

      tile.addEventListener('drop', e => {
        e.preventDefault();
        if (dragged !== tile) {
          const draggedIndex = dragged.dataset.index;
          const targetIndex = tile.dataset.index;

          // Zamiana
          [dragged.style.backgroundPosition, tile.style.backgroundPosition] = 
          [tile.style.backgroundPosition, dragged.style.backgroundPosition];

          [dragged.dataset.index, tile.dataset.index] = [targetIndex, draggedIndex];

          // Sprawdź ułożenie
          checkWin();
        }
      });
    });
  }

  function checkWin() {
    const allCorrect = tiles.every((tile, i) => tile.dataset.index == i);
    if (allCorrect) {
      success.style.display = 'block';
      launchConfetti();
    }
  }

  // --- Losowanie ---
  shuffleBtn.addEventListener('click', () => {
    const shuffled = [...tiles];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i].dataset.index, shuffled[j].dataset.index] = 
      [shuffled[j].dataset.index, shuffled[i].dataset.index];

      [shuffled[i].style.backgroundPosition, shuffled[j].style.backgroundPosition] = 
      [shuffled[j].style.backgroundPosition, shuffled[i].style.backgroundPosition];
    }
  });

  playBtn.addEventListener('click', () => {
    success.style.display = 'none';
    createPuzzle();
  });

  // --- Konfetti ---
  function launchConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  }
});
