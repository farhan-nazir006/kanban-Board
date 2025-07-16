const tasks = document.querySelectorAll(".task");
const todoContainer = document.querySelector("#Todo_box");
const inProgressContainer = document.querySelector("#InProgress_box");
const completedContainer = document.querySelector("#Completed_box");
const addTaskbtn = document.querySelector(".Add_task");
const addCardbtn = document.querySelector(".Add_Card");
const input = document.querySelector(".input_box");
const notification = document.getElementById("notification");
const deleteBtn = document.querySelectorAll(".delete_task");
const editBtn = document.querySelectorAll(".edit_task");
const allCardsContainer = document.querySelectorAll(".cardsContainer");

let draggedTask = null;
let todos = [];


function createTask(tasktext) {

  let p = document.createElement("p");
  p.className = "task text-gray-600 w-full shadow-xl rounded-xl p-3 cursor-move flex items-center justify-between";
  p.setAttribute("draggable", "true");
  p.innerHTML = `${tasktext}<button><i class="delete_task fa-solid fa-trash cursor-pointer text-red-500"></i><i
              class="edit_task cursor-pointer text-green-500 ml-1 fa-regular fa-pen-to-square"></i></button>`;

  p.addEventListener("dragstart", () => {
    draggedTask = p;
    p.classList.add("rounded-xl", "text-white", "bg-black");
  })

  p.addEventListener("dragend", () => {
    draggedTask = null;
    p.classList.remove("text-white", "bg-black");
  })

  // delete new added task
  const deleteBtn = p.querySelector(".delete_task");
  deleteBtn.addEventListener("click", () => {
    p.remove();
    removeTaskFromLocalStorage(tasktext);
  })

  // edit

  const editBtn = p.querySelector('.edit_task');
  editBtn.addEventListener("click", () => {
    let task = editBtn.closest('.task');
    task.remove();
    input.value = task.textContent.trim();
    input.focus();
    addTaskbtn.innerHTML = "EDIT+"
  })
  addTaskbtn.innerHTML = "ADD TASK+"


  todoContainer.appendChild(p);
}

// Add card funtion
function createCard(cardtext) {
  let div = document.createElement("div");
  div.className = "box self-start bg-white w-60 p-3 rounded-xl flex flex-col gap-3 shadow-xl hover:-translate-y-2 transition-all duration-300";
  div.setAttribute("draggable", "true");
  div.innerHTML = `<h4 class="font-bold text-gray-700">${cardtext}</h4>`;

  allCardsContainer.forEach(card => {
    card.appendChild(div);
  })


  div.addEventListener("dragover", (e) => {
    e.preventDefault();
  })

  div.addEventListener("drop", () => {
    div.appendChild(draggedTask);
  });
}

// Drag and Drop in Todo container
todoContainer.addEventListener("dragover", (e) => {
  e.preventDefault();
});

todoContainer.addEventListener("drop", () => {
  todoContainer.appendChild(draggedTask);
});

addTaskbtn.addEventListener("click", () => {
  let tasktext = input.value.trim();
  if (tasktext == "") {
    showNotification("⚠️ Please enter the task!");
    return;
  }

  createTask(tasktext);
  savedTasks(tasktext);

  input.value = "";
  input.focus();

})

addCardbtn.addEventListener("click", () => {
  let cardtext = input.value.trim();

  if (cardtext == "") {
    showNotification("⚠️ Please enter the Card name!");
    return;
  }

  createCard(cardtext);

  input.value = "";
  input.focus();
})

function showNotification(message) {
  notification.innerHTML = message;

  notification.classList.remove('hidden');

  setTimeout(() => {
    notification.classList.add('hidden');
  }, 2000)
}

// Local Storage
function savedTasks(tasktext) {
  todos.push(tasktext);
  localStorage.setItem("todosTasks", JSON.stringify(todos));
}

function removeTaskFromLocalStorage(tasktext) {
  let allsavedTask = JSON.parse(localStorage.getItem("todosTasks")) || [];

  allsavedTask = allsavedTask.filter(task => task !== tasktext);
  localStorage.setItem("todosTasks", JSON.stringify(allsavedTask));
}

window.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("todosTasks")) || [];
  savedTasks.forEach(task => {
    createTask(task);
  })
})

// For Local tasks 
tasks.forEach(task =>
  task.addEventListener("dragstart", () => {
    draggedTask = task;
    task.classList.add("rounded-xl", "text-white", "bg-black");
  })
)

tasks.forEach(task =>
  task.addEventListener("dragend", () => {
    draggedTask = null;
    task.classList.remove("text-white", "bg-black");
  })
)

deleteBtn.forEach(btn =>
  btn.addEventListener("click", () => {
    let task = btn.closest(".task");
    task.remove();
  })
)

editBtn.forEach(btn =>
  btn.addEventListener("click", () => {
    let task = btn.closest(".task");
    task.remove();
    input.value = task.textContent.trim();
    input.focus();
    addTaskbtn.innerHTML = "EDIT+"
  })
)


