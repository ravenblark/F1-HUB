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
});
