const todoForm = document.querySelector('.js-todoForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.js-todoList');

const TODO = 'todo';

let todo = [];

/**
 * get value from storage
 * if available, output through the function showTodo()
 */
function loadTodo() {

    let loadedTodo = localStorage.getItem('todo');

    if (loadedTodo != null) {

        let parsedTodo = JSON.parse(loadedTodo);

        parsedTodo.forEach(function(toDo){

            showTodo(toDo.name);
            
        });

    }

}

/**
 * save the entered string in storage as JSON
 */
function saveTodo() {

    localStorage.setItem(TODO, JSON.stringify(todo));

}

/**
 * handle the event for delete
 * @param {object} event 
 */
function deleteTodo(event) {

    let btn = event.target;
    let li = btn.parentNode;

    todoList.removeChild(li);

    let cleanTodo = todo.filter(function(todo) {

        return todo.id != parseInt(li.id);

    });

    todo = cleanTodo;
    saveTodo();

}

/**
 * add text
 * create new html element
 * @param {string} text 
 */
function showTodo(text) {

    let li = document.createElement('li');
    let delBtn = document.createElement('button');
    let span = document.createElement('span');
    let newId = todo.length + 1;
    delBtn.innerHTML = '❌';
    delBtn.addEventListener('click', deleteTodo)
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    todoList.appendChild(li);

    let todoObject = {
        name: text,
        id: newId
    }
    todo.push(todoObject);
    saveTodo();

}

/**
 * handle the event
 * @param {object} event 
 */
function submitHandler(event) {

    event.preventDefault();

    let inputValue = todoInput.value;
    showTodo(inputValue);
    todoInput.value = '';

}

/**
 * script initialization
 */
function init() {

    loadTodo();
    todoForm.addEventListener('submit', submitHandler);

}

init();