// ========================= NAVBAR & REVEAL SCRIPT =========================

// SELECT ELEMENTS
const nav = document.querySelector(".nav");
const reveals = document.querySelectorAll(".reveal");

// ========================= SCROLL EVENT =========================
window.addEventListener("scroll", () => {

  // ===== REVEAL ELEMENTS =====
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (top < windowHeight - 100) { // trigger point
      el.classList.add("active");
    }
  });

  // ===== NAVBAR SCROLL EFFECT =====
  if (window.scrollY > 50) { // change after 50px scroll
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }

});

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