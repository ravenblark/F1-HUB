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
  // Clocks
  function updateClocks() {
    const now = new Date();
    document.getElementById("local-clock").innerText = now.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    );
    const trackTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Europe/Monaco" }),
    );
    document.getElementById("track-clock").innerText =
      trackTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
  }
  setInterval(updateClocks, 1000);
  updateClocks();

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
