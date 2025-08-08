// Email capture (placeholder)
function captureEmail(event) {
  event.preventDefault();
  const email = document.getElementById("email-input").value.trim();
  if (!email) return;
  alert(`Thanks for joining the waitlist, ${email}!`);
  document.getElementById("email-input").value = "";
  return false;
}
window.captureEmail = captureEmail;

// Mobile menu toggle
(function () {
  const toggle = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");

  if (!toggle || !menu) return;

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }
  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }
  function isOpen() {
    return toggle.getAttribute("aria-expanded") === "true";
  }

  toggle.addEventListener("click", () => {
    isOpen() ? closeMenu() : openMenu();
  });

  // Close when clicking a menu link
  menu.querySelectorAll("[data-close-menu]").forEach((a) =>
    a.addEventListener("click", closeMenu)
  );

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // Close if you click outside
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;
    const withinMenu = menu.contains(e.target) || toggle.contains(e.target);
    if (!withinMenu) closeMenu();
  });
})();