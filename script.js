
document.addEventListener("DOMContentLoaded", () => {
  const envelope = document.getElementById("envelope");
  const cover = document.getElementById("cover");
  const mainContent = document.getElementById("main-content");
  const puzzleBoard = document.getElementById("puzzle-board");
  const shuffleBtn = document.getElementById("shuffle-btn");
  const successMsg = document.getElementById("success-message");

  envelope.addEventListener("click", () => {
    cover.classList.add("hidden");
    mainContent.classList.remove("hidden");
  });

  function createPuzzlePieces() {
    puzzleBoard.innerHTML = "";
    const positions = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        positions.push(`piece_${r}_${c}.jpg`);
      }
    }

    const shuffled = positions.sort(() => 0.5 - Math.random());

    shuffled.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = `images/${src}`;
      img.classList.add("puzzle-piece");
      img.draggable = true;
      img.dataset.index = index;

      img.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.dataset.index);
      });

      img.addEventListener("dragover", (e) => e.preventDefault());

      img.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedIndex = e.dataTransfer.getData("text/plain");
        const targetIndex = e.target.dataset.index;

        const dragged = document.querySelector(`[data-index='${draggedIndex}']`);
        const target = document.querySelector(`[data-index='${targetIndex}']`);

        if (dragged && target) {
          [dragged.src, target.src] = [target.src, dragged.src];
        }

        checkWin();
      });

      puzzleBoard.appendChild(img);
    });
  }

  function checkWin() {
    const pieces = document.querySelectorAll(".puzzle-piece");
    let win = true;
    pieces.forEach((el, i) => {
      if (!el.src.includes(`piece_${Math.floor(i / 4)}_${i % 4}.jpg`)) {
        win = false;
      }
    });

    if (win) {
      successMsg.classList.remove("hidden");
      alert("🎉 Konfetti! Udało się!");
    }
  }

  shuffleBtn.addEventListener("click", createPuzzlePieces);

  const startDate = new Date("2022-07-15");
  const now = new Date();
  const days = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
  document.getElementById("days-together").textContent = days;
});
