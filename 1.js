const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);

  saveTaskToLocalStorage(taskText);

  taskInput.value = "";
}

function createTaskElement(taskText) {
  const li = document.createElement("li");
  li.classList.add("task-item");

  li.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  li.querySelector(".complete-btn").addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
    deleteTaskFromLocalStorage(taskText);
  });

  taskList.appendChild(li);
}

function saveTaskToLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(createTaskElement);
}

function deleteTaskFromLocalStorage(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
