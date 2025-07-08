// --- KOPERTA ---
document.getElementById("envelope").addEventListener("click", () => {
    document.getElementById("envelope-screen").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
    startCounter();
});

// --- LICZNIK DNI ---
function startCounter() {
    const startDate = new Date("2022-07-15T00:00:00");
    setInterval(() => {
        const now = new Date();
        const diff = now - startDate;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("days-together").innerText = days;
    }, 1000);
}

// --- GALERIA - PRZESUWANIE ---
document.getElementById("scroll-left").addEventListener("click", () => {
    document.getElementById("gallery").scrollBy({ left: -200, behavior: 'smooth' });
});

document.getElementById("scroll-right").addEventListener("click", () => {
    document.getElementById("gallery").scrollBy({ left: 200, behavior: 'smooth' });
});
