// js/modules/themeToggle.js

export const initThemeToggle = () => {
  const lightBtn = document.getElementById("light-btn");
  const darkBtn = document.getElementById("dark-btn");

  if (!lightBtn || !darkBtn) return;

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      darkBtn.classList.add("active");
      lightBtn.classList.remove("active");
    } else {
      document.body.classList.remove("dark-theme");
      lightBtn.classList.add("active");
      darkBtn.classList.remove("active");
    }
    localStorage.setItem("theme", theme);
  };


  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);

  darkBtn.addEventListener("click", () => applyTheme("dark"));
  lightBtn.addEventListener("click", () => applyTheme("light"));
};
