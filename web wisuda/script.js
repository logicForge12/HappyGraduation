
const cards = document.querySelectorAll(".photo-card");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const caption = document.getElementById("lightboxCaption");

const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIndex = 0;

// Menampilkan foto yang dipilih
function showPhoto(index) {
    currentIndex = (index + cards.length) % cards.length;

    const card = cards[currentIndex];
    const img = card.querySelector("img");
    const title = card.querySelector(".photo-info strong");

    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;

    caption.textContent =
        `${String(currentIndex + 1).padStart(2, "0")} / ${title.textContent}`;
}

// Membuka foto
function openLightbox(index) {
    showPhoto(index);

    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
    closeBtn.focus();
}

// Menutup foto
function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
}

// Event klik pada ketiga foto
cards.forEach((card, index) => {
    card.addEventListener("click", () => {
        openLightbox(index);
    });
});

closeBtn.addEventListener("click", closeLightbox);

prevBtn.addEventListener("click", () => {
    showPhoto(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
    showPhoto(currentIndex + 1);
});

// Klik area gelap untuk menutup foto
lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

// Kontrol keyboard
document.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("open")) return;

    if (event.key === "Escape") closeLightbox();
    if (event.key === "ArrowLeft") showPhoto(currentIndex - 1);
    if (event.key === "ArrowRight") showPhoto(currentIndex + 1);
});

// Animasi saat elemen masuk ke layar
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}
