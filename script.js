// --- KOPERTA + START ---
document.getElementById("envelope").addEventListener("click", () => {
    document.getElementById("envelope-screen").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
    startCounter();
    updateGalleryImage();
});

// --- LICZNIK: DNI, GODZINY, MINUTY, SEKUNDY ---
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

// --- GALERIA: JEDNO ZDJĘCIE + STRZAŁKI ---
const galleryImages = [
    "gallery_1.jpg",
    "gallery_2.jpg",
    "gallery_3.jpg",
    "gallery_4.jpg",
    "gallery_5.jpg"
];

let currentGalleryIndex = 0;

function updateGalleryImage() {
    const img = document.getElementById("gallery-single");
    if (img) {
        img.src = galleryImages[currentGalleryIndex];
    }
}

document.getElementById("scroll-left").addEventListener("click", () => {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryImages.length) % galleryImages.length;
    updateGalleryImage();
});

document.getElementById("scroll-right").addEventListener("click", () => {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryImages.length;
    updateGalleryImage();
});

// --- PRZYCISK PUZZLI ---
document.getElementById("shuffle-btn").addEventListener("click", () => {
    document.getElementById("puzzle-board").style.display = "grid";
    // Tutaj możesz dodać kod do uruchomienia puzzli
});
