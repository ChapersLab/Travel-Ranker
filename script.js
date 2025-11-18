// ==============================
// MENU HAMBURGUESA + OVERLAY
// ==============================
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const overlay = document.getElementById('overlay');

if (navToggle && navMenu && overlay) {
  navToggle.addEventListener('click', () => {
    const isActive = navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
    navToggle.classList.toggle('open');

    const bars = navToggle.querySelectorAll('.bar');

    if (isActive) {
      // apertura X
      bars.forEach((bar, i) => {
        setTimeout(() => {
          if (i === 0) bar.style.transform = 'translateY(8px) rotate(45deg)';
          if (i === 1) { bar.style.opacity = '0'; bar.style.transform = 'scaleX(0)'; }
          if (i === 2) bar.style.transform = 'translateY(-8px) rotate(-45deg)';
        }, i * 60);
      });
    } else {
      // cierre a barras
      bars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.transform = 'translateY(0) rotate(0)';
          bar.style.opacity = '1';
        }, i * 60);
      });
    }

    // accesibilidad
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });

  // cerrar al clicar overlay
  overlay.addEventListener('click', () => {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    navToggle.classList.remove('open');

    const bars = navToggle.querySelectorAll('.bar');
    bars.forEach(bar => {
      bar.style.transform = 'translateY(0) rotate(0)';
      bar.style.opacity = '1';
    });

    navToggle.setAttribute('aria-expanded', 'false');
  });

  // cerrar al clicar un link en móvil
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        overlay.classList.remove('active');
        navToggle.classList.remove('open');

        const bars = navToggle.querySelectorAll('.bar');
        bars.forEach(bar => {
          bar.style.transform = 'translateY(0) rotate(0)';
          bar.style.opacity = '1';
        });

        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// ==============================
// HERO START
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".hero-slide");
  const dotsContainer = document.querySelector(".hero-dots");
  const prevBtn = document.querySelector(".hero-prev");
  const nextBtn = document.querySelector(".hero-next");

  let currentIndex = 0;
  let autoSlide;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("button");

  function goToSlide(index) {
    slides[currentIndex].classList.remove("active");
    dots[currentIndex].classList.remove("active");

    currentIndex = index;

    slides[currentIndex].classList.add("active");
    dots[currentIndex].classList.add("active");
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  }

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoSlide();
  });

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoSlide();
  });

  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 7000);
  }

  function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  startAutoSlide();
});

// ==============================
// HERO END
// ==============================
