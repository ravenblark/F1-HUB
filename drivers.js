document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".nav-links");
  if (menu) {
    menu.addEventListener("click", () => {
      menuLinks.classList.toggle("active");
      menu.classList.toggle("is-active");
    });
  }

  // Driver card expand/collapse
  const cards = document.querySelectorAll(".driver-card");
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const wasOpen = card.classList.contains("driver-card-expanded");
      // Close all cards first
      cards.forEach((c) => c.classList.remove("driver-card-expanded"));
      // Toggle the clicked one
      if (!wasOpen) {
        card.classList.add("driver-card-expanded");
      }
    });
  });
});
