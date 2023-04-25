// Initialisation tasks/projects as demonstration
// localStorage initialised with test/example information

import { toDoProjects, getLocalStorage } from './storage';

(function () {

    const initToDoData = [{ project: 'To Do List' }, { id: 'Firsttask', title: 'First task', description: 'Description of First Task' }, { id: 'SecondTask', title: 'Second Task', description: 'Second task description' }];
    const initToDoData_1 = [{ project: 'Today' }, { id: 'FirsttaskofToday', title: 'First task of Today', description: 'Detail of todays task' }, { id: 'SecondtaskforToday', title: 'Second task for Today', description: '' }];
    const initToDoData_2 = [{ project: 'This week' }];

    if (localStorage.getItem(('todoList')) === null) {
        let todoList = {
            "tasks": [],
            "today": [],
            "thisWeek": []
        };
        todoList.tasks = initToDoData;
        todoList.today = initToDoData_1;
        todoList.thisWeek = initToDoData_2;
        localStorage.setItem('todoList', JSON.stringify(todoList));

    };

    toDoProjects.displayAllProjects();
    (function () {
        const getData = getLocalStorage();
        toDoProjects.setProject('tasks');
        toDoProjects.getTasksFromProject(getData.tasks);
        toDoProjects.changeTitle('tasks');
    })();

})();