// js/modules/blog.js
export function initBlog() {
  const list = document.getElementById("blog-list");
  const loader = document.getElementById("blog-loader");
  const loadMoreBtn = document.getElementById("load-more-blog");

  if (!list || !loader || !loadMoreBtn) return;

  let page = 1;
  const PER_LOAD = 6;

  async function fetchBlogs() {
    try {
      loader.style.display = "flex";

      const res = await fetch(
        `http://localhost:3000/api/blogs?page=${page}&limit=${PER_LOAD}`
      );
      if (!res.ok) throw new Error("Failed to load blogs");

      const posts = await res.json();

      if (posts.length === 0) {
        loadMoreBtn.style.display = "none";
        return;
      }

      addCards(posts);
      page++;

    } catch (err) {
      list.innerHTML = `<p class="error-msg">⚠ Unable to load blogs. Please try again later.</p>`;
    } finally {
      loader.style.display = "none";
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