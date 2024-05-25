// menuToggle.js
function onMenuToggle(e) {
  const navlinks = document.querySelector(".navLinks");
  e.name = e.name === "menu" ? "close" : "menu";
  navlinks.classList.toggle("left-[0%]");
}
