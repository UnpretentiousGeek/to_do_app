import "./style.css";
import {todoDOM, addProjectDOM, projectRender} from "./front-end.js";
import {todoCreator, projectCreator, localstoragesave, localstoragefetch} from "./application.js";


const projects = localstoragefetch();
for (let key in projects) {
    addProjectDOM(projects[key]);
}
document.querySelector('.projectList button').click();
document.querySelector('.projectList button').focus();

const newProject = document.querySelector('#projectDetails');

newProject.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const projectName = formData.get('projectName');
    projects[projectName] = projectCreator(projectName);
    addProjectDOM(projects[projectName]);
    newProject.reset();
    document.querySelector('#addProject').close();
    localstoragesave(projects);
})


const newTodo = document.querySelector('#todoDetails')

newTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const todoTitle = formData.get('todoTitle');
    const description = formData.get('description');
    const dueDate = formData.get('dueDate');
    const priority = formData.get('priority');
    const projectSelect = formData.get('projectSelect');
    const todoItem = todoCreator(todoTitle, description, dueDate, priority, projectSelect)
    projects[projectSelect].addTodo(todoItem);
    projectRender(projects[projectSelect]);

    newTodo.reset();
    document.querySelector('#addTodo').close();
    localstoragesave(projects);
})

const editTodo = document.querySelector('#editedTodoDetails')

editTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const unique_id = formData.get('uniqueId');
    const projectId = formData.get('projectId');
    const todoObj = projects[projectId].todoItems[unique_id];
    todoObj.title = formData.get('newTitle');
    todoObj.description = formData.get('newdescription');
    todoObj.duedate = formData.get('newDueDate');
    todoObj.priority = formData.get('newpriority');

    projectRender(projects[projectId]);
    editTodo.reset();
    document.querySelector('#EditTodo').close();
    localstoragesave(projects);
})

const deleteTodo = document.querySelector('#deleteTodo')

deleteTodo.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(editTodo);
    const unique_id = formData.get('uniqueId');
    const projectId = formData.get('projectId');
    projects[projectId].removeTodo(unique_id);
    projectRender(projects[projectId]);
    document.querySelector('#EditTodo').close();
    localstoragesave(projects);

})




// event listener to add todo to project list with unique name and datestamp name