// main.js
// Handles page navigation and initializes logic on page load

document.addEventListener("deviceready", () => {
  navigateTo('brainstorm');
});

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation(); // Attach nav events initially
});

// ✅ Load a subpage and initialize logic if needed
function navigateTo(page) {
  fetch(`pages/${page}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;
      bindNavigation(); // Re-bind after content is loaded

      if (page === "brainstorm") initBrainstormLogic();
      if (page === "todo" && typeof loadTasks === "function") loadTasks();
    })
    .catch(err => console.error("❌ Error loading page:", err));
}

// ✅ Assign click listeners to nav buttons (re-usable)
function bindNavigation() {
  const navIds = ['btnBrainstorm', 'btnTodo', 'btnHome', 'btnChat', 'btnStats'];
  navIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      const target = id.replace("btn", "").toLowerCase();
      el.onclick = () => navigateTo(target);
    }
  });
} 

