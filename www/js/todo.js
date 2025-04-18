function loadTasks() {
    fetch("http://localhost:3000/tasks")
      .then(res => res.json())
      .then(tasks => displayTasks(tasks))
      .catch(err => console.error("Failed to load tasks:", err));
  }
  
  function displayTasks(tasks, filter = "all") {
    const list = document.getElementById("todoList");
    list.innerHTML = "";
    const today = new Date().toISOString().split("T")[0];
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const endOfWeek = nextWeek.toISOString().split("T")[0];
  
    const filtered = tasks.filter(task => {
      if (filter === "today" && task.deadline) return task.deadline === today;
      if (filter === "week" && task.deadline)
        return task.deadline >= today && task.deadline <= endOfWeek;
      return true;
    });
  
    filtered.forEach(task => {
      const li = document.createElement("li");
      li.textContent = task.title + (task.deadline ? ` — Due: ${task.deadline}` : "");
      li.className = task.completed ? "completed" : "";
      li.addEventListener("click", () => toggleTask(task));
      list.appendChild(li);
    });
  }
  
  function toggleTask(task) {
    task.completed = !task.completed;
    fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task)
    })
      .then(() => loadTasks())
      .catch(err => console.error("Failed to update task:", err));
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        fetch("http://localhost:3000/tasks")
          .then(res => res.json())
          .then(tasks => displayTasks(tasks, filter));
      });
    });
  
    loadTasks();
  });
  