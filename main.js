const form = document.getElementById("itemForm");
const input = document.getElementById("itemInput");
const list = document.querySelector(".item-list");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const div = document.createElement("div");

    div.className =
      "item flex justify-between items-center my-3 border-b border-b-green-500 pb-1";

    div.innerHTML = `
    
      <div class="flex gap-1 items-center todo-text cursor-pointer" data-id="${index}">
      
        <h6 class="border border-green-500 rounded p-1">${index + 1}</h6>
        
        <p class="capitalize ${todo.completed ? "line-through" : ""}">
          ${todo.name}
        </p>

      </div>

      <i class="far fa-times-circle text-red-500 cursor-pointer delete-item" data-id="${index}"></i>
    `;

    list.appendChild(div);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const value = input.value.trim();

  if (value === "") {
    alert("Bo'sh todo qo'shib bo'lmaydi");
    return;
  }

  const newTodo = {
    name: value,
    completed: false,
  };

  todos.push(newTodo);

  saveTodos();
  renderTodos();

  input.value = "";
});

list.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-item")) {
    const id = e.target.dataset.id;

    todos.splice(id, 1);

    saveTodos();
    renderTodos();
  }

  const todoText = e.target.closest(".todo-text");

  if (todoText) {
    const id = todoText.dataset.id;

    todos[id].completed = !todos[id].completed;

    saveTodos();
    renderTodos();
  }
});

renderTodos();
