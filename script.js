const todoInput = document.querySelector(".todo-Input");
const todoBtn = document.querySelector(".bt1");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector("#dropdown");

document.addEventListener("DOMContentLoaded", getLocalTodos);
//When the page loads, this event listener calls getLocalTodos to load any saved to-do items from local storage.
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

//addTodo creates a new to -do item.
function addTodo(event) {
    event.preventDefault();
    //event.preventDefault() prevents the page from refreshing when the button is clicked.
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocalTodos(todoInput.value);
    //The saveLocalTodos function is called to save this new to-do item to the local storage.

    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
    // The entire div containing the new to-do is added to the main list, and the input box is cleared for the next entry.
}

function deleteCheck(e) {
    const item = e.target;

    // If trash button is clicked
    if (item.classList.contains("trash-btn")) {
        const todo = item.parentElement;

        // Remove from local storage first
        removeLocalTodos(todo);

        // Add slide-out animation
        todo.classList.add("slide");

        // Wait for the animation to complete before removing the element
        todo.addEventListener("transitionend", function (e) {
            // Only remove if it's the transform transition that ended
            if (e.propertyName === "transform") {
                todo.remove();
            }
        });
    }
    // If complete button is clicked
    else if (item.classList.contains("complete-btn")) {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
        todo.querySelector(".todo-item").classList.toggle("completed");
    }
}
function filterTodo(e) {
    const todos = Array.from(todoList.children).filter(todo => todo.nodeType === 1); // Filters out only element nodes
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completeBtn = document.createElement("button");
        completeBtn.innerHTML = '<i class="fas fa-check-circle"></i>';
        completeBtn.classList.add("complete-btn");
        todoDiv.appendChild(completeBtn);

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add("trash-btn");
        todoDiv.appendChild(trashBtn);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
