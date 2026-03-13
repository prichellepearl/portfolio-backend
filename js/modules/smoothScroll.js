// js/modules/smoothScroll.js
export const initSmoothScroll = () => {
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth"
          });
        }
      });
    }
  });
};