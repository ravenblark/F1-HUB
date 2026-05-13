document.addEventListener("DOMContentLoaded", () => {
  function updateClocks() {
    const now = new Date();
    const localEl = document.getElementById("local-clock");
    const trackEl = document.getElementById("track-clock");

    if (localEl) {
      localEl.textContent = now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (trackEl) {
      //
      const track = new Date(
        now.toLocaleString("en-US", { timeZone: "America/Toronto" }),
      );
      trackEl.textContent = track.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  // Run clock immediately and then every second
  updateClocks();
  const clockInterval = setInterval(updateClocks, 1000);

  // 2. MOBILE MENU (Hamburger)
  const toggle = document.getElementById("mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("is-active"); // For the hamburger animation
      navLinks.classList.toggle("active"); // To slide the menu in
    });
  }

  // 3. TEAM ROW EXPAND/COLLAPSE
  // Useful for your Teams page tomorrow!
  const rows = document.querySelectorAll(".team-row");

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const wasExpanded = row.classList.contains("team-row-expanded");

      // Close all other rows first (Accordion style)
      rows.forEach((r) => r.classList.remove("team-row-expanded"));

      // If the clicked row wasn't open, open it
      if (!wasExpanded) {
        row.classList.add("team-row-expanded");
      }
    });
  });
});
