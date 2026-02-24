import { throttle } from "../utils/throttle.js";

export function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".section, .card, .about-image, .slide"
  );

  const reveal = () => {
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < triggerBottom) {
        el.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", throttle(reveal, 200));

  reveal(); // Run once on load
}
