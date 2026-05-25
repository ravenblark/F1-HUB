document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector("#mobile-menu");
  const menuLinks = document.querySelector(".nav-links");

  if (menu) {
    // Safety check to prevent errors if the menu isn't on the page
    menu.addEventListener("click", () => {
      menuLinks.classList.toggle("active");
      menu.classList.toggle("is-active");
    });
  }

  function updateClocks() {
    // Local Time
    const now = new Date();
    document.getElementById("local-clock").innerText = now.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    );
    // Track Time (Montreal)
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
  // Update every second
  setInterval(updateClocks, 1000);
  updateClocks();
});
