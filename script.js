// ========================= HAMBURGER MENU & SCROLL =========================

// SELECT ELEMENTS
const nav = document.querySelector(".nav");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

// ========================= HAMBURGER MENU TOGGLE =========================
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});

// Close menu when a link is clicked
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
  });
});

// ========================= NAVBAR SCROLL EFFECT =========================
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// ========================= SMOOTH SCROLL FOR NAV LINKS =========================
document.querySelectorAll(".nav-links a[href^='#']").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);
    
    if(target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  });
});