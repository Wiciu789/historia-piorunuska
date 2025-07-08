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
