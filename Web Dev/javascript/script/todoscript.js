const todoList = [{
    name: 'Watch YT',
    dueDate: '2025-03-01'
}, {
    name: 'Play Game',
    dueDate: '2025-12-13'
}];

renderTodo();

function renderTodo() {
    let todoListHTML = '';

    for (let i = 0; i < todoList.length; i++) {
        const todoHTML = `
            <p>
                ${todoList[i].name} ${todoList[i].dueDate}
                <button onclick="
                    todoList.splice(${i}, 1);
                    renderTodo();
                ">Delete</button>
            </p>
        `;
        todoListHTML += todoHTML;
    }

    const todoElement = document.querySelector('.js-todo-name');
    todoElement.innerHTML = todoListHTML;
}

function addTodo() {
    const inputElement = document.querySelector('.js-input-element');
    const name = inputElement.value;

    const inputDueDate = document.querySelector('.js-input-due-date');
    const dueDate = inputDueDate.value;

    todoList.push({
        name,
        dueDate
    });
    renderTodo();

    inputElement.value = '';
    inputDueDate.value = '';
}