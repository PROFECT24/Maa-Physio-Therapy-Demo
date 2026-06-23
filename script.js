const nav = document.querySelector("[data-nav]");
const menu = document.querySelector("[data-menu]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const appointmentForm = document.querySelector("[data-appointment-form]");
const revealItems = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
const whatsappNumber = "916000714583";

const setScrolledNav = () => {
  nav.classList.toggle("scrolled", window.scrollY > 18);
};

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(appointmentForm);
  const message = [
    "Hello Maa Physiotherapy Clinic, I would like to book an appointment.",
    "",
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Service: ${data.get("service")}`,
    `Preferred time: ${data.get("time")}`,
    `Message: ${data.get("message") || "Not specified"}`
  ].join("\n");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => revealObserver.observe(item));
setScrolledNav();
window.addEventListener("scroll", setScrolledNav, { passive: true });
