// ── Navbar scroll ──────────────────────────────────────────
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// ── Modal ───────────────────────────────────────────────────
const homeModal    = document.getElementById('home-modal');
const openHomeBtn  = document.getElementById('open-home-btn');
const closeHomeBtn = document.getElementById('close-home');
const modalOverlay = document.getElementById('modal-overlay');

function openModal()  { homeModal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
function closeModal() { homeModal.classList.add('hidden');    document.body.style.overflow = 'auto';   }

if (openHomeBtn)   openHomeBtn.addEventListener('click', openModal);
if (closeHomeBtn)  closeHomeBtn.addEventListener('click', closeModal);
if (modalOverlay)  modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && homeModal && !homeModal.classList.contains('hidden')) closeModal();
});

// ── Hamburger ───────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-center');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    if (navLinks) navLinks.classList.toggle('active');
  });
}
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger) hamburger.classList.remove('active');
    if (navLinks)  navLinks.classList.remove('active');
  });
});

// ── Smooth scroll ───────────────────────────────────────────
document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ── Dark mode ───────────────────────────────────────────────
const themeToggle = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark-mode');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
}

// ── Nav "home" opens modal ──────────────────────────────────
const navHome = document.getElementById('nav-home');
if (navHome && homeModal) {
  navHome.addEventListener('click', e => {
    e.preventDefault();
    openModal();
    if (hamburger) hamburger.classList.remove('active');
    if (navLinks)  navLinks.classList.remove('active');
  });
}

// ── Typewriter ──────────────────────────────────────────────
const roles = [
  'Software Engineer',
  'UI/UX Designer',
  'QA Specialist',
  'Problem Solver',
  'Creative Technologist',
];

const el       = document.getElementById('typewriter');
let roleIndex  = 0;
let charIndex  = 0;
let deleting   = false;
const SPEED_TYPE   = 70;
const SPEED_DELETE = 38;
const PAUSE_END    = 1600;
const PAUSE_START  = 300;

function tick() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(tick, PAUSE_END);
      return;
    }
  } else {
    charIndex--;
    el.textContent = current.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(tick, PAUSE_START);
      return;
    }
  }
  setTimeout(tick, deleting ? SPEED_DELETE : SPEED_TYPE);
}
setTimeout(tick, 900);

// ── Scroll reveal (IntersectionObserver) ───────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ── Active nav link on scroll ───────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const allLinks  = document.querySelectorAll('.nav-link[href^="#"]');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      allLinks.forEach(link => {
        const href = link.getAttribute('href').slice(1);
        link.classList.toggle('active', href === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObserver.observe(s));

// ── Scroll progress bar ─────────────────────────────────────
const progressBar = document.getElementById('scrollProgress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrolled / maxScroll) * 100}%`;
  }, { passive: true });
}

// ── Back to top ─────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Photo tilt on mouse move ────────────────────────────────
const photoFrame = document.getElementById('photoFrame');
const photoCol   = document.getElementById('heroPhotoCol');
if (photoFrame && photoCol) {
  photoCol.addEventListener('mousemove', e => {
    const rect = photoFrame.getBoundingClientRect();
    const x = (e.clientX - rect.left  - rect.width  / 2) / (rect.width  / 2);
    const y = (e.clientY - rect.top   - rect.height / 2) / (rect.height / 2);
    photoFrame.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg)`;
  });
  photoCol.addEventListener('mouseleave', () => {
    photoFrame.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg)';
  });
}
