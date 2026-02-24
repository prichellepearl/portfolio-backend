// js/script.js
import { initTyping } from './modules/typing.js';
import { initSmoothScroll } from './modules/smoothScroll.js';
import { initScrollTop } from './modules/scrollTop.js';
import { initTestimonials } from './modules/testimonials.js';
import { initContactForm } from './modules/contactForm.js';
import { initThemeToggle } from './modules/themeToggle.js';
import { initScrollAnimations } from "./modules/scrollAnimations.js";
import { initBlog } from "./modules/blog.js";

initThemeToggle();
initTyping();
initSmoothScroll();
initScrollTop();
initTestimonials();
initContactForm();
initScrollAnimations();  
initBlog();

const menuIcon = document.querySelector(".menu-icon");
const mobileNav = document.querySelector(".mobile-nav");

menuIcon?.addEventListener("click", () => {
  mobileNav?.classList.toggle("active");
});
