
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", navLinks.classList.contains("open"));
      menuBtn.textContent = navLinks.classList.contains("open") ? "✕" : "☰";
    });
    navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.textContent = "☰";
    }));
  }

  const reveal = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.12});
  reveal.forEach(el => observer.observe(el));

  const dateInput = document.querySelector("#date");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];

  const form = document.querySelector("#reservationForm");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const data = new FormData(form);
      const msg =
`Bonjour Complexe Sportif Dong-Wè,
Je souhaite faire une réservation.

Nom : ${data.get("nom")}
Téléphone : ${data.get("telephone")}
Équipement : ${data.get("activite")}
Date : ${data.get("date")}
Heure : ${data.get("heure")}
Nombre de personnes : ${data.get("personnes")}
Message : ${data.get("message") || "Aucun"}`;
      const phone = "22899244397";
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
    });
  }

  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("error", () => {
      img.style.opacity = ".45";
      img.alt = "Image à remplacer";
    });
  });

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});
