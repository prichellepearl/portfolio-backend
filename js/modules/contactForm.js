// js/modules/contactForm.js
export const initContactForm = () => {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    let valid = true;

    if (name.value.trim().length < 2) { alert("Name must be at least 2 characters."); valid = false; }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) { alert("Please enter a valid email."); valid = false; }

    if (message.value.trim().length < 10) { alert("Message must be at least 10 characters."); valid = false; }

    if (valid) { 
      alert(`Thank you, ${name.value.trim()}! Your message has been submitted successfully.`); 
      contactForm.reset(); 
    }
  });
};
