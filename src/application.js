function todoCreator (title, description, duedate, priority, project) {
   // Just some properties assigned
   // return {properties}
   const timestamp = Date.now();
   const unique_id = title.replaceAll(' ', '') + String(timestamp);

   return { title, description, duedate, priority, project, unique_id }
}

function projectCreator (name) {
   // Initialize a list
   // create a method to add to_dos to that list
   // a method to delete to_dos
   let todoItems = {};

   const addTodo = (todoItem) => {
      todoItems[todoItem.unique_id] = todoItem;
   }

   const removeTodo = (unique_id) => {
      delete todoItems[unique_id];
   }

   return { name, todoItems, addTodo, removeTodo }
}
function localstoragesave (projects) {
   localStorage.setItem('projects', JSON.stringify(projects));

}

function localstoragefetch () {

   if (localStorage.getItem('projects')) {
      let rehydratedProjects = {};
      const rawProjects = JSON.parse(localStorage.getItem('projects'));

      for (let key in rawProjects) {
         const rawProject = rawProjects[key];
         rehydratedProjects[key] = projectCreator(rawProject.name);
         for (let todoId in rawProject.todoItems) {
            rehydratedProjects[key].addTodo(rawProject.todoItems[todoId]);
         }
      }

      return rehydratedProjects;
   }

   else {
      const projects = {};
      projects['Default'] = projectCreator('Default');
      localStorage.setItem('projects', JSON.stringify(projects));
      return projects;
   }


}

export {todoCreator, projectCreator, localstoragesave, localstoragefetch};