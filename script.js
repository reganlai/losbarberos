/* ===== Los Barberos — script.js ===== */

/* --- Elements --- */
const hamburger     = document.getElementById('hamburger-toggle');
const mobileOverlay = document.getElementById('mobile-menu-overlay');
const mobileLinks   = document.querySelectorAll('.mobile-nav-link');
const header        = document.getElementById('header');
const timeSlots     = document.querySelectorAll('.booking-time');

/* ============================================================
   HAMBURGER MENU
   ============================================================ */
function openMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileOverlay.classList.add('active');
    document.body.classList.add('menu-open');
}

function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

hamburger.addEventListener('click', () => {
    hamburger.classList.contains('active') ? closeMenu() : openMenu();
});

/* Close when any mobile nav link is clicked */
mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

/* Close on Escape key */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});

/* ============================================================
   SCROLL — sticky header tint
   ============================================================ */
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

/* ============================================================
   GALLERY CAROUSEL
   ============================================================ */
const galleryTrack = document.getElementById('gallery-track');
const galleryPrev  = document.getElementById('gallery-prev');
const galleryNext  = document.getElementById('gallery-next');
const galleryDots  = document.querySelectorAll('.carousel-dot');
const slideCount   = document.querySelectorAll('.carousel-slide').length;
let galleryIndex   = 0;

function goToSlide(n) {
    galleryIndex = (n + slideCount) % slideCount;
    galleryTrack.style.transform = `translateX(-${galleryIndex * 100}%)`;
    galleryDots.forEach((d, i) => d.classList.toggle('active', i === galleryIndex));
}

galleryPrev.addEventListener('click', () => goToSlide(galleryIndex - 1));
galleryNext.addEventListener('click', () => goToSlide(galleryIndex + 1));
galleryDots.forEach(dot => dot.addEventListener('click', () => goToSlide(+dot.dataset.index)));

