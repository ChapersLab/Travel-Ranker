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
// HERO SLIDER (3 slides)
// ==============================
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');

function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// start slider only if slides exist
if (slides.length > 0) {
  showSlide(0);
  const slideInterval = setInterval(nextSlide, 6000);

  // optional: pause on hover (desktop)
  slides.forEach(slide => {
    slide.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slide.addEventListener('mouseleave', () => setInterval(nextSlide, 6000));
  });
}
