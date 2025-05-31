let inp = document.querySelector(".container input");
let ul = document.querySelector(".container ul");
let addBtn = document.querySelector(".container #addBtn");

let taskAll = getTodoFromLS();

updateTodoList();

function createTodo(task, idx) {
  if (task) {
    let li = document.createElement("li");
    let del = document.createElement("button");
    li.innerHTML = `<i class="fa-regular fa-square-check"></i>${task.Todo}`;

    del.innerText = "Delete";
    del.addEventListener("click", () => {
      delTodoFromLS(idx);
    });

    let i = li.querySelector("i");
    i.addEventListener("click", () => {
      isDone(i, idx);
    });
    if (task.isDone == false) {
      i.classList.add("fa-regular");
      i.classList.remove("fa-solid");
    } else {
      li.style.opacity = "0.4";
      i.classList.remove("fa-regular");
      i.classList.add("fa-solid");
    }
    li.append(del);
    ul.append(li);
  }
}

function isDone(i, idx) {
  taskAll[idx].isDone = taskAll[idx].isDone ? false : true;
  saveToLS();
}
function updateTodoList() {
  if (taskAll) {
    taskAll.forEach((task, idx) => {
      createTodo(task, idx);
    });
  }
}

inp.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    accessInputValue();
  }
});

addBtn.addEventListener("click", () => {
  accessInputValue();
});

function accessInputValue() {
  let todo = inp.value;
  if (todo) {
    taskAll.push({ Todo: todo, isDone: false });
    inp.value = "";
    saveToLS();
  } else {
    alert("Enter the Task Please");
  }
}

function saveToLS() {
  localStorage.setItem("data", JSON.stringify(taskAll));
  ul.innerText = "";
  updateTodoList();
}

function delTodoFromLS(idx) {
  taskAll = taskAll.filter((task, id) => id != idx);
  saveToLS();
}

function getTodoFromLS() {
  let todoList = JSON.parse(localStorage.getItem("data"));
  return todoList || [];
}
console.log("hello");
