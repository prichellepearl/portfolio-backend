// js/modules/blog.js

// dynamic API base for local and production
const API_BASE = window.location.hostname.includes("localhost")
  ? "http://localhost:3000/api"
  : "https://portfolio-backend-ao6d.onrender.com/api";

export function initBlog() {
  const list = document.getElementById("blog-list");
  const loaderWrapper = document.getElementById("blog-loader-wrapper");
  const loadMoreBtn = document.getElementById("load-more-blog");

  if (!list || !loaderWrapper || !loadMoreBtn) return;

  let page = 1;
  const PER_LOAD = 6;

  async function fetchBlogs() {
    try {
      loaderWrapper.style.display = "flex";

      const res = await fetch(`${API_BASE}/blogs?page=${page}&limit=${PER_LOAD}`);

      if (!res.ok) {
        console.error("API ERROR:", res.status);
        throw new Error("Failed to load blogs");
      }

      const posts = await res.json();
      console.log("BLOG POSTS:", posts);

      if (posts.length === 0) {
        loadMoreBtn.style.display = "none";

        const endMsg = document.createElement("p");
        endMsg.className = "blog-end-msg";
        endMsg.textContent = "You've reached the end of the blog posts.";

        list.appendChild(endMsg);

        return;
      }

      addCards(posts);
      page++;

    } catch (err) {
      console.error("BLOG FETCH ERROR:", err);
      list.innerHTML = `<p class="error-msg">⚠ Unable to load blogs.</p>`;
    } finally {
      loaderWrapper.style.display = "none";
    }
  }

  function addCards(posts) {
    posts.forEach(post => {
      const card = document.createElement("article");
      card.className = "card blog-card";

      card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content.slice(0, 120)}...</p>
      `;

      card.style.background = "var(--card-bg)";
      card.style.color = "var(--text)";
      card.style.transition = "0.3s";

      list.appendChild(card);
    });
  }

  loadMoreBtn.addEventListener("click", fetchBlogs);
  fetchBlogs();
}