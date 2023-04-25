import { getLocalStorage } from './storage';

export const toDoMethods = (function () {

    // saves entered details of task
    function saveTask(event) {

        const taskTitle = document.querySelector('.open_task div div').textContent;
        const projectName = document.getElementById('task_container').firstElementChild.id;
        const textAreaValue = document.querySelector('#text_area').firstElementChild.value;
        const targetTaskID = event.target.closest(".open_task").firstElementChild.id;
        const targetDate = document.getElementById('date_input').value;
        const toGetIndex = fetchToDo(event);
        let getStorage = getLocalStorage();

        getStorage[projectName][toGetIndex.index].title = taskTitle;
        getStorage[projectName][toGetIndex.index].description = textAreaValue;
        getStorage[projectName][toGetIndex.index].date = targetDate;

        localStorage.setItem('todoList', JSON.stringify(getStorage));

        document.querySelector(".open_task").classList.toggle('open_task');
        taskClose(targetTaskID);
    }


    function taskExpand(event) {

        openTaskToggle(event);

        const targetTask = event.target.closest('.listed_task');
        const list = event.target.closest('.listed_task').classList;
        const id = event.target.closest('div').parentElement.parentElement.id;
        const openTask = document.querySelector('open_task');

        if (list.contains('open_task')) {
            let taskTitle = document.querySelector('.open_task div');
            taskTitle.setAttribute('contenteditable', 'false');

            targetTask.classList.toggle('open_task');
            taskClose(id);
        } else {
            targetTask.classList.toggle('open_task');

            let taskTitle = document.querySelector('.open_task div');
            taskTitle.setAttribute('contenteditable', 'true');
            todoLayout(event);
        }
        recallTaskDetails(event);
    }

    function fetchToDo(event) {

        const getStorage = getLocalStorage();
        const project = document.getElementById('task_container').firstElementChild.id;
        const targetTaskID = document.querySelector(".open_task").firstElementChild.id;

        for (let i = 0; i < getStorage[project].length; i++) {
            if (getStorage[project][i].id === targetTaskID) {
                let task = getStorage[project][i];
                let index = i;
                return {
                    'task': task,
                    'index': index
                };
            }
        }
    }

    function recallTaskDetails(event) {

        let fetchedToDo = fetchToDo(event);
        let textAreaValue = document.getElementById('text_area').firstElementChild;
        let todoList = document.getElementsByClassName('listed_task');
        let taskDate = document.getElementById('date_input');

        // builds an array of tasks with 'listed_task' class and determines single task possessing 'open_task'
        Array.prototype.filter.call(todoList, function (x, index) {
            if (x.classList.value.includes('open_task')) {
                x.querySelector('textarea').value = fetchedToDo.task.description;
                taskDate.value = fetchedToDo.task.date;
            }
        });
    }

    // ensures that only one task is open at a time
    function openTaskToggle(event) {
        const targetId = event.target.closest('div').parentElement.id;
        let tasksClassList = document.getElementsByClassName('open_task');

        Array.prototype.filter.call(tasksClassList, function (x, index) {
            if (x.classList.value.includes('open_task')) {
                if (x.firstElementChild.id !== targetId) {
                    x.classList.toggle('open_task');
                    taskClose(x.firstElementChild.id);
                }
            }
        });
    }

    // places elements into open/expanded task for edit mode
    function todoLayout(event) {

        const task = event.target.closest('.listed_task');
        const id = event.target.closest('div').parentElement.id;

        let div = document.createElement('div');
        div.setAttribute('class', 'open_contents');
        div.setAttribute('id', 'open_contents');

        div.innerHTML =
            '<div id="text_area"><textarea class="" placeholder="Description"></textarea></div><div class="components"><div><button class="icon right-align " id="save_button" type="button"><img class="save_button" style="" src="../src/img/checkmark.png"></button><button id="not_saved" class="icon right-align not_saved_button" type="button"><img class="not_saved_button" style ="" src="../src/img/delete-button.png"></button></div><div><input id="date_input" type="date" value="" /></div></div>';

        task.appendChild(div);
    }

    function taskClose(id) {
        document.getElementById(id).nextSibling.remove();
    }

    return {
        saveTask,
        taskExpand,
        // fetchToDo
    }
})();

