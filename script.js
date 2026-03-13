document.addEventListener('DOMContentLoaded', () => {
  // HERO parallax effect
  const name = document.querySelector('.name-display');
  window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    if (name) {
      name.style.transform = `translateY(${scrollValue * 0.2}px)`;
    }
  });

  // SKILLS slider
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const slider = document.querySelector(".skills-slider");

  if (slider && prevBtn && nextBtn) {
    const scrollAmount = 270; // roughly one skill card width + gap

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  // SCROLL REVEAL
  const reveals = document.querySelectorAll(".reveal");
  window.addEventListener("scroll", () => {
    reveals.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (top < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  });

  const dots = document.querySelectorAll(".skills-indicators .dot");
const skillCards = document.querySelectorAll(".skills-track .skill");

function updateDots() {
  const sliderLeft = slider.scrollLeft;
  const cardWidth = skillCards[0].offsetWidth + 24; // card width + gap (1.5rem ≈ 24px)
  const activeIndex = Math.round(sliderLeft / cardWidth);

  dots.forEach((dot, i) => dot.classList.toggle("active", i === activeIndex));
}

// Update on scroll
slider.addEventListener("scroll", updateDots);

// Optional: click on dot to jump to card
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const cardWidth = skillCards[0].offsetWidth + 24;
    slider.scrollTo({ left: index * cardWidth, behavior: "smooth" });
  });
});

  // Optional: Allow drag-to-scroll on skills slider
  let isDown = false;
  let startX;
  let scrollLeft;

  if (slider) {
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active-drag');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active-drag');
    });
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active-drag');
    });
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // scroll-fast factor
      slider.scrollLeft = scrollLeft - walk;
    });
  }
});