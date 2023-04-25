
export const toDoProjects = (function () {

    // displays all created projects that are not 'ToDo', 'Today', 'This week'
    function displayAllProjects() {

        const getStorage = getLocalStorage();
        for (const [key, value] of Object.entries(getStorage)) {
            if (!["tasks", "today", "thisWeek"].includes(key)) {
                createProjectButton(key);
            }
        }
    }

    function addProjectToStorage(newProject) {

        if (newProject !== '') {
            const getStorage = getLocalStorage();
            getStorage[newProject] = [{ project: newProject }];
            localStorage.setItem('todoList', JSON.stringify(getStorage));

            toDoProjects.setProject(newProject);
            createProjectButton(newProject);
            removeAllChildNodes('new_project');
        }
    }

    // display page with selected project
    function setProject(project) {

        let taskContainer = document.getElementById('task_container');
        taskContainer.appendChild(document.createElement('div'));
        taskContainer.firstElementChild.setAttribute('id', project);
        document.getElementById('title').children[0].innerHTML = project;
    }

    // creates a sidebar button for a created project
    function createProjectButton(name) {

        const addButton = document.getElementById('add_project');
        const projectName = document.createElement('a');

        Object.assign(projectName, {
            id: name,
            className: 'btn newproject_button',
            innerHTML: name,
            value: name,
            style: 'display: flex, justify-content: space-around',
        });

        projectName.innerHTML = '<span>' + name + '</span><button class="" id="project_delete"><span class="material-symbols-outlined">close</span></button>';
        addButton.appendChild(projectName);
    }


    // sidebar add project functionality
    function projectToAdd() {
        let add = document.getElementById('new_project');

        const projectName = document.createElement('input');
        Object.assign(projectName, {
            className: 'projectname',
            id: 'input_project',
            style: 'text-align: center',
            placeholder: 'Project name',
        });
        projectName.setAttribute('maxlength', '19');
        const addName = document.createElement('a');
        Object.assign(addName, {
            className: 'btn buttonleft',
            innerHTML: 'ADD',
            id: 'add',
        });

        const deleteName = document.createElement('a');
        Object.assign(deleteName, {
            className: 'btn buttonright',
            innerHTML: 'CANCEL',
            id: 'cancel',
            style: 'background-color: #E57373',
        });

        add.appendChild(projectName);
        add.appendChild(addName);
        add.appendChild(deleteName);
        projectName.focus();

    }

    // requires button event to pass button id
    function changeProject(event) {

        let project = event.target.closest('a').getAttribute('id');
        const getStorage = getLocalStorage();
        removeAllChildNodes('task_container');

        let projectDiv = document.getElementById('task_container');
        projectDiv.appendChild(document.createElement('div'));
        projectDiv.firstElementChild.setAttribute('id', project);

        getTasksFromProject(getStorage[project]);
    }

    function getTasksFromProject(localStorageTasks) {
        for (let i = 0; i < localStorageTasks.length; i++) {
            if (localStorageTasks[i].hasOwnProperty('title')) {
                writeToDOM(localStorageTasks[i]);
            }
        }
    }

    // deletes project from localStorage
    function deleteProject(project) {

        let getStorage = getLocalStorage();
        delete getStorage[project];
        localStorage.setItem('todoList', JSON.stringify(getStorage));
        document.getElementById(project).remove();
        document.getElementById('tasks').click();

    }

    function changeTitle(keyId) {

        const getStorage = getLocalStorage();
        document.getElementById('title').children[0].innerHTML = getStorage[keyId][0].project;
    }

    return {
        displayAllProjects,
        addProjectToStorage,
        // createProjectButton,
        projectToAdd,
        changeProject,
        setProject,
        getTasksFromProject,
        deleteProject,
        changeTitle,
    }
})();


export function getLocalStorage() {
    return JSON.parse(localStorage.getItem('todoList'));
}

// writes all selected project tasks to DOM
function writeToDOM(data, project) {

    let taskContainer = document.getElementById('task_container').firstElementChild;
    let div = document.createElement('div');
    div.classList.add('listed_task', 'nav', 'z-depth-1');

    if (data.id === "") {
        var dataID = data.title.toString();
        dataID = dataID.replace(/[^a-zA-Z]+/g, '');
    } else {
        dataID = data.id;
    }

    div.innerHTML =

        ' <div id="' + dataID + '" class="task_header"><div class="task_title"  >' + data.title + '</div>'
        + '<div class="task_components"><div class="date_input"></div><div class="icons"><button class="icon right-align edit_button" type="button"><img style="width: 1.2rem;" src="../src/img/edit.png"></button><button class="icon right-align delete_button" type="button"><img src="../src/img/delete_black_24dp.svg"></button></div></div></div>';

    taskContainer.appendChild(div);
}


export const storageMethods = (function () {


    function sendTaskToLocalStorage(event) {

        let project = getProject();
        let taskToStorage = taskToObject(event);
        const getStorage = getLocalStorage();

        if (event.target.value !== '') {
            getStorage[project].push(taskToStorage);
            writeToDOM(getStorage[project][getStorage[project].length - 1]);
            localStorage.setItem('todoList', JSON.stringify(getStorage));
            document.getElementById('add_task').value = '';
        }
    }

    // returns id of project currently in view
    function getProject() {
        let taskContainer = document.getElementById('task_container');
        return taskContainer.firstElementChild.getAttribute('id');
    }

    // returns object of a newly created task
    function taskToObject(event) {

        const title = event.target.value;
        const project = document.getElementById('task_container').firstElementChild.getAttribute('id');
        let id = title.replace(/[^a-zA-Z]+/g, '');
        let description;
        return {
            id: id,
            title: title,
            description: '',
            dueDate: '',
            // priority: '',
        }
    }

    // deletes task from current project
    function deleteTask(event) {
        let getStorage = getLocalStorage();
        const task = event.target.closest('.listed_task');
        const project = document.getElementById('task_container').firstElementChild.getAttribute('id');
        const keyValue = task.getElementsByClassName('task_title')[0].innerHTML;

        let result = getStorage[project];
        result.forEach((element, index, arr) => {
            if (element.title === keyValue) {
                arr.splice(index, 1);
            }
        });

        getStorage[project] = result;
        task.remove();
        localStorage.setItem('todoList', JSON.stringify(getStorage));
        getTasksFromProject(getLocalStorage());
    }

    return {
        sendTaskToLocalStorage,
        deleteTask,
    }

})();

export function removeAllChildNodes(node) {
    const parent = document.getElementById(node);
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

