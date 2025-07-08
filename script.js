// ===

Tak! 💯 Ten będzie *poprawiony, dopracowany, kozacki* – koperta działa, znika, pokazuje się tekst, licznik, puzzle z 16 elementów, wszystko bajkowo, a konfetti leci dopiero PO ułożeniu puzzli 🎉

---

### 🧠 Oto pełny, **naprawiony script.js** – wklej cały:

```javascript
// === KOPERTA ===
document.getElementById("envelope").addEventListener("click", () => {
    document.getElementById("envelope-screen").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
    startCounter();
});

// === LICZNIK DNI ===
function startCounter() {
    const startDate = new Date("2022-07-15T00:00:00");
    setInterval(() => {
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("days-together").innerText = days;
    }, 1000);
}

// === GALERIA — PRZESUWANIE ===
document.getElementById("scroll-left").addEventListener("click", () => {
    document.getElementById("gallery").scrollBy({ left: -200, behavior: 'smooth' });
});
document.getElementById("scroll-right").addEventListener("click", () => {
    document.getElementById("gallery").scrollBy({ left: 200, behavior: 'smooth' });
});

// === PUZZLE ===
const board = document.getElementById("puzzle-board");
const shuffleBtn = document.getElementById("shuffle-btn");
const successMsg = document.getElementById("success-message");
let positions = [];
let size = 4;

shuffleBtn.addEventListener("click", () => {
    successMsg.classList.add("hidden");
    generatePuzzle();
});

function generatePuzzle() {
    board.innerHTML = "";
    positions = [];

    for (let i = 0; i < size * size; i++) {
        const piece = document.createElement("img");
        piece.src = piece_0_${i}.jpg;
        piece.className = "puzzle-piece";
        piece.dataset.index = i;
        positions.push(piece);
    }

    shuffleArray(positions);
    positions.forEach(piece => board.appendChild(piece));

    board.querySelectorAll(".puzzle-piece").forEach(piece => {
        piece.addEventListener("click", () => {
            const empty = board.querySelector(".empty");
            if (empty) return;

            piece.classList.add("selected");
            const selected = document.querySelectorAll(".selected");

            if (selected.length === 2) {
                swapPieces(selected[0], selected[1]);
                selected.forEach(el => el.classList.remove("selected"));
                checkWin();
            }
        });
    });
}

function swapPieces(a, b) {
    const aClone = a.cloneNode(true);
    const bClone = b.cloneNode(true);

    a.replaceWith(bClone);
    b.replaceWith(aClone);
}

function checkWin() {
    const current = Array.from(board.children);
    const isCorrect = current.every((piece, index) => {
        return piece.dataset.index == index;
    });

    if (isCorrect) {
        successMsg.classList.remove("hidden");
        showConfetti();
    }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// === KONFETTI PO UKOŃCZENIU ===
function showConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

// === KONFETTI BIBLIOTEKA ===
// Wklej <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
// w pliku index.html przed </body>
