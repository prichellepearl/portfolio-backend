// js/modules/contactForm.js

// dynamic API base for local and production
const API_BASE = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api"
  : "https://portfolio-backend-ao6d.onrender.com/api";

export const initContactForm = () => {
  const contactForm = document.querySelector(".contact-form");

  if (!contactForm) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { name, email, message } = contactForm;
    let valid = true;

    if (name.value.trim().length < 2) {
      alert("Name must be at least 2 characters.");
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value.trim())) {
      alert("Please enter a valid email.");
      valid = false;
    }

    if (message.value.trim().length < 10) {
      alert("Message must be at least 10 characters.");
      valid = false;
    }

    if (!valid) return;

    try {
    const response = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
    name: name.value.trim(),
    email: email.value.trim(),
    message: message.value.trim()
  })
});

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert(`Thank you, ${name.value.trim()}! Your message has been submitted successfully.`);
      contactForm.reset();

    } catch (error) {
      console.error(error);
      alert("Error sending message. Please try again later.");
    }

  });
};