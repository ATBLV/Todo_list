// Your todo list should have projects or separate lists of todos. When a user first opens the app, 
// there should be some sort of ‘default’ project to which all of their todos are put. Users should 
// be able to create new projects and choose which project their todos go into.

// separate your application logic (i.e. creating new todos, setting todos as complete, changing todo 
// priority etc.) from the DOM-related stuff, so keep all of those things in separate modules.

// The look of the User Interface is up to you, but it should be able to do the following:
// view all projects
// view all todos in each project (probably just the title and duedate… perhaps changing color for different priorities)
// expand a single todo to see/edit its details
// delete a todo

// title, description, dueDate and priority. You might also want to include notes or even a checklist


import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min';
import './css/style.css';
import * as initialize from './js/init.js'
import { toDoMethods } from './js/todo.js'
import { toDoProjects, storageMethods, removeAllChildNodes } from './js/storage';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


document.getElementById('add_task').addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        storageMethods.sendTaskToLocalStorage(event);
    }
});

document.addEventListener('click', (event) => {
    if (event.target.closest('button').classList.contains('delete_button')) {
        storageMethods.deleteTask(event);
    }
});

// Expand task to edit
document.addEventListener('click', (event) => {
    try {
        if (event.target.closest('button').classList.contains('edit_button')) {
            toDoMethods.taskExpand(event);
        }
    } catch { }
});

// Not Saved button 
document.addEventListener('click', (event) => {
    if (event.target.closest('button').id === 'not_saved') {
        let targetTask = event.target.closest(".open_task");
        targetTask.classList.toggle('open_task');
        event.target.closest(".open_contents").remove();
    }
});

// Save button
document.addEventListener('click', (event) => {
    if (event.target.closest('button').id === 'save_button') {
        toDoMethods.saveTask(event);
    }
});

// Project select buttons
document.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
            toDoProjects.changeProject(event);
            toDoProjects.changeTitle(event.target.closest('a').getAttribute('id'));
        }
});

document.getElementById('project_button').addEventListener('click', (event) => {
        toDoProjects.projectToAdd();
});

document.addEventListener('click', (event) => {
    if (event.target.closest('button').getAttribute('id') === 'project_delete') {
        toDoProjects.deleteProject(event.target.closest('a').getAttribute('id'));
    }
});

document.addEventListener('click', (event) => {
        if (event.target.id === 'add') {
            toDoProjects.addProjectToStorage(document.getElementById('input_project').value);
        } else if (event.target.id === 'cancel') {
            removeAllChildNodes('new_project');
        }
});

// window.onclick = function (event) {
//     toDoMethods;
// }

