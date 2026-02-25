const token = localStorage.getItem("adminToken");

if (!token) {
  window.location.href = "login.html";
}

const blogList = document.getElementById("blogList");
const blogForm = document.getElementById("blogForm");
const formMessage = document.getElementById("formMessage");
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("adminToken");
  window.location.href = "login.html";
});


async function fetchBlogs() {
  try {
    const response = await fetch("http://localhost:3000/api/blogs/admin/all", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const blogs = await response.json();
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
    console.error("Failed to fetch blogs");
  }
}


blogForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const status = document.getElementById("status").value;

  try {
    const response = await fetch("http://localhost:3000/api/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, content, status })
    });

    const data = await response.json();

    if (!response.ok) {
      formMessage.textContent = data.message;
      return;
    }

    formMessage.textContent = "Blog added successfully!";
    blogForm.reset();
    fetchBlogs();

  } catch (error) {
    formMessage.textContent = "Error adding blog.";
  }
});


blogList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const blogId = e.target.getAttribute("data-id");

    try {
      await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchBlogs();

    } catch (error) {
      console.error("Delete failed");
    }
  }
});

fetchBlogs();