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
   BOOKING TIME SLOT — click to select
   ============================================================ */
timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        timeSlots.forEach(s => s.classList.remove('active-slot'));
        slot.classList.add('active-slot');
    });
});

/* ============================================================
   SCROLL REVEAL — fade in sections on scroll
   ============================================================ */
const revealTargets = document.querySelectorAll(
    '.section-label, .section-title, .section-desc, .gallery-item, .service-card, .booking-card, .location-detail-row, .location-map, .cta-btn'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.04}s, transform 0.6s ease ${i * 0.04}s`;
    revealObserver.observe(el);
});

/* Revealed state — set by IntersectionObserver */
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);
});
