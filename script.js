const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const homeModal = document.getElementById('home-modal');
const openHomeBtn = document.getElementById('open-home-btn');
const closeHomeBtn = document.getElementById('close-home');
const modalOverlay = document.getElementById('modal-overlay');

if (openHomeBtn) {
  openHomeBtn.addEventListener('click', () => {
    homeModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
}

if (closeHomeBtn) {
  closeHomeBtn.addEventListener('click', () => {
    homeModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', () => {
    homeModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && homeModal && !homeModal.classList.contains('hidden')) {
    homeModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
});

const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-center');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    if (navLinks) {
      navLinks.classList.toggle('active');
    }
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
  });
});

document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  });
}

const navHome = document.getElementById('nav-home');
if (navHome && homeModal) {
  navHome.addEventListener('click', (e) => {
    e.preventDefault();
    homeModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (hamburger) hamburger.classList.remove('active');
    if (navLinks) navLinks.classList.remove('active');
  });
}