// ==============================
// Navbar interactivo con animación JS + overlay blur
// ==============================


const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");
const overlay = document.getElementById("overlay");


navToggle.addEventListener("click", () => {
  const isActive = navMenu.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");


  const bars = navToggle.querySelectorAll(".bar");


  if (isActive) {
    // --- Animación de apertura ---
    bars.forEach((bar, i) => {
      setTimeout(() => {
        if (i === 0) bar.style.transform = "translateY(8px) rotate(45deg)";
        if (i === 1) {
          bar.style.opacity = "0";
          bar.style.transform = "scaleX(0)";
        }
        if (i === 2) bar.style.transform = "translateY(-8px) rotate(-45deg)";
      }, i * 60);
    });
  } else {
    // --- Animación de cierre ---
    bars.forEach((bar, i) => {
      setTimeout(() => {
        bar.style.transform = "translateY(0) rotate(0)";
        bar.style.opacity = "1";
      }, i * 60);
    });
  }


  // Accesibilidad
  const expanded = navToggle.getAttribute("aria-expanded") === "true" || false;
  navToggle.setAttribute("aria-expanded", !expanded);
});


// ==============================
// Cerrar menú al hacer clic en overlay
// ==============================
overlay.addEventListener("click", () => {
  navMenu.classList.remove("active");
  navbar.classList.remove("active");
  overlay.classList.remove("active");


  const bars = navToggle.querySelectorAll(".bar");
  bars.forEach((bar) => {
    bar.style.transform = "translateY(0) rotate(0)";
    bar.style.opacity = "1";
  });


  navToggle.setAttribute("aria-expanded", false);
});