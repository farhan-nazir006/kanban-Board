const tasks = document.querySelectorAll(".task");
const todoContainer = document.querySelector("#Todo_box");
const inProgressContainer = document.querySelector("#InProgress_box");
const completedContainer = document.querySelector("#Completed_box");
const addbtn = document.querySelector(".Add_button");
const input = document.querySelector(".input_box");

let draggedTask = null;


// Drag and Drop in all containers
[todoContainer, inProgressContainer, completedContainer].forEach(container => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  container.addEventListener("drop", () => {
    container.appendChild(draggedTask);
  });
});

function createTask(tasktext) {

  let p = document.createElement("p");
  p.className = "task text-gray-600 w-full shadow-xl rounded-xl p-3 cursor-move";
  p.setAttribute("draggable", "true");
  p.innerHTML = tasktext;

  p.addEventListener("dragstart", () => {
    draggedTask = p;
    p.classList.add("rounded-xl", "text-white", "bg-black");
  })

  p.addEventListener("dragend", () => {
    draggedTask = null;
    p.classList.remove("text-white", "bg-black");
  })

  todoContainer.appendChild(p);
}

addbtn.addEventListener("click", () => {
  let tasktext = input.value.trim();
  if (tasktext == "") {
    alert("PLEASE ENTER THE TAX")
    return;
  }

  createTask(tasktext);

  input.value = "";
  input.focus();

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
