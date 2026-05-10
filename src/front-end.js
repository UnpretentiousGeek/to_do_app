import { format } from "date-fns";

const formEdit = (todoObj) => {
    document.querySelector('#newTitle').value = todoObj.title;
    document.querySelector('#newdescription').value = todoObj.description;
    document.querySelector('#newDueDate').value = todoObj.duedate;
    document.querySelector('#newpriority').value = todoObj.priority;
    document.querySelector('#uniqueId').value = todoObj.unique_id;
    document.querySelector('#projectId').value = todoObj.project;
}

const todoDOM = (todoObj) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todoItem', todoObj.priority, todoObj.unique_id)
    const todoName = document.createElement('p');
    todoName.textContent = todoObj.title;
    todoName.classList.add('todoName');
    const dueDate = document.createElement('p');
    dueDate.textContent = format(new Date(todoObj.duedate), "MMM dd yyyy");;
    dueDate.classList.add('dueDate');
    todoItem.append(todoName, dueDate);
    todoItem.addEventListener('click', (e) => {
        const dialog = document.querySelector('#EditTodo');
        dialog.showModal();
        formEdit(todoObj);
    })
    const main = document.querySelector('.main');
    main.append(todoItem);
}

const projectRender = (projectObj) => {
    const main = document.querySelector('.main');
    main.replaceChildren();
    for (let key in projectObj.todoItems) {
        let todoObj = projectObj.todoItems[key];
        todoDOM(todoObj);
    }
}

const addProjectDOM = (projectObj) => {
    const projectList = document.querySelector('.projectList');
    const project = document.createElement('button');
    project.textContent = projectObj.name;
    projectList.append(project);
    const projectSelect = document.querySelector('#projectSelect');
    const newOption = new Option(projectObj.name, projectObj.name);
    projectSelect.add(newOption);


    project.addEventListener('click', (e) => {
        e.preventDefault();
        projectRender(projectObj);
    })
}



export { todoDOM, addProjectDOM, projectRender };