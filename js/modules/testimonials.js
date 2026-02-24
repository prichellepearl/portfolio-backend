// js/modules/testimonials.js
export const initTestimonials = () => {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');

  const showSlide = index => {
    if (!slides.length) return;
    slides.forEach(slide => slide.classList.remove('active'));

    if (index < 0) currentSlide = slides.length - 1;
    else if (index >= slides.length) currentSlide = 0;
    else currentSlide = index;

    slides[currentSlide].classList.add('active');
  };

  nextBtn?.addEventListener('click', () => showSlide(currentSlide + 1));
  prevBtn?.addEventListener('click', () => showSlide(currentSlide - 1));

  showSlide(0);
};
