// js/modules/adminPanel.js

// API base for local development
const API_BASE = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api"
  : "https://portfolio-backend-ao6d.onrender.com/api";

// Check for admin token
const token = localStorage.getItem("adminToken");
if (!token) window.location.href = "login.html";

// DOM elements
const blogList = document.getElementById("blogList");
const blogForm = document.getElementById("blogForm");
const formMessage = document.getElementById("formMessage");
const logoutBtn = document.getElementById("logoutBtn");

// Logout button
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  window.location.href = "login.html";
});

// Helper to handle API requests with JWT
async function apiFetch(url, options = {}) {
  const headers = options.headers || {};
  headers["Authorization"] = `Bearer ${token}`;
  headers["Content-Type"] = "application/json";

  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.message || "Request failed");
  }
  return res.json();
}

// Fetch all blogs
async function fetchBlogs() {
  try {
    const blogs = await apiFetch(`${API_BASE}/blogs`);
    blogList.innerHTML = "";

    blogs.forEach(blog => {
      const div = document.createElement("div");
      div.className = "blog-card";
      div.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <p>Status: ${blog.status}</p>
        <button class="delete-btn" data-id="${blog._id}">Delete</button>
      `;
      blogList.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    blogList.innerHTML = "<p>Error loading blogs.</p>";
  }
}

// Add new blog
blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const status = document.getElementById("status").value;

  if (!title || !content) {
    formMessage.textContent = "Title and content cannot be empty.";
    return;
  }

  try {
    await apiFetch(`${API_BASE}/blogs`, {
  method: "POST",
  body: JSON.stringify({
    title,
    content,
    status,
    author: "Admin"
  })
});
    formMessage.textContent = "Blog added successfully!";
    blogForm.reset();
    fetchBlogs();
  } catch (error) {
    console.error(error);
    formMessage.textContent = "Error adding blog.";
  }
});

// Delete a blog
blogList.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("delete-btn")) return;
  const blogId = e.target.dataset.id;

  if (!confirm("Are you sure you want to delete this blog?")) return;

  try {
    await apiFetch(`${API_BASE}/blogs/${blogId}`, { method: "DELETE" });
    fetchBlogs();
  } catch (error) {
    console.error(error);
    alert("Failed to delete the blog.");
  }
});

// Initial load
fetchBlogs();