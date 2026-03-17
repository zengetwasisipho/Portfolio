// ========================= NAVBAR & REVEAL SCRIPT =========================

// SELECT ELEMENTS
const nav = document.querySelector(".nav");
const reveals = document.querySelectorAll(".reveal");
const landingAnimation = document.getElementById("landing");
let hasScrolled = false;

// ========================= FUNCTION TO CHECK AND REVEAL ELEMENTS =========================
function checkReveals() {
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) { // trigger point
      el.classList.add("active");
    }
  });
}

// ========================= AUTO-HIDE LANDING ANIMATION =========================
window.addEventListener("load", () => {
  checkReveals();
  
  // Auto-hide landing animation after 3 seconds
  setTimeout(() => {
    if (landingAnimation) {
      landingAnimation.classList.add("hidden");
    }
  }, 3000);
});

// ========================= LANDING ANIMATION FADE OUT ON SCROLL =========================
window.addEventListener("scroll", () => {
  // Hide landing animation on first scroll
  if (!hasScrolled && window.scrollY > 0) {
    hasScrolled = true;
    if (landingAnimation) {
      landingAnimation.classList.add("hidden");
    }
  }

  // ===== REVEAL ELEMENTS =====
  checkReveals();

  // ===== NAVBAR SCROLL EFFECT =====
  if (window.scrollY > 50) { // change after 50px scroll
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

}, { passive: true });

// ========================= SMOOTH SCROLL FOR NAV LINKS =========================
const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

navLinks.forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if(target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});