// js/modules/scrollTop.js

export const initScrollTop = () => {
  const scrollBtn = document.getElementById("scroll-top-btn");
  if (!scrollBtn) return;

  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};
