const form = document.getElementById("loginForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("https://portfolio-backend-ao6d.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      message.textContent = data.message || "Login failed";
      return;
    }

    localStorage.setItem("adminToken", data.token);

    window.location.href = "admin.html";

  } catch (error) {
    message.textContent = "Something went wrong.";
  }
});