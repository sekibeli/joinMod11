let currentOpenTask;
let currentdraggableElement;
let stati = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
let some = [];
let a = 0;
let AUDIO_MOVE = new Audio('assets/sound/splat.mp3');

function clearBoard() {
    document.getElementById('todo').innerHTML = ``;
    document.getElementById('inProgress').innerHTML = ``;
    document.getElementById('awaitingFeedback').innerHTML = ``;
    document.getElementById('done').innerHTML = ``;
}

/**
 * 
 * @param {*} i the index of the active task
 * @returns  the array with the possible target for the status
 */
function getMovingLinks(i) {
    let whereToGo = ['todo', 'inProgress', 'awaitingFeedback', 'done'];
    let position = whereToGo.indexOf(tasks[i].status);
    whereToGo.splice(position, 1);
    return whereToGo;
}

/**
 * gives the task the new status, saves and render the board to show the new position
 * @param {*} i active task
 * @param {*} desti target for the task-status
 */
function moveTask(i, desti) {
    tasks[i].status = desti;
    showTasksOnBoard();
    saveTasks();
    AUDIO_MOVE.play();
}


function goBack() {
    showTasksOnBoard();
}


/**
 * some calculation for the progressbar
 * @param {*} i index of the current task
 */
function getDoneSubtasks(i) {
    let count = getTheRightBgColor(tasks[i].category);
    let bgColor = categories[count].categoryColor;
    let total = tasks[i].subtasks.length;
    let width = countTrue(i) / total * 100;
    document.getElementById(`bar${i}`).style.width = `${width}%`;
    document.getElementById(`bar${i}`).style.backgroundColor = bgColor;
}

/**
 * it counts the amount of the done subtasks
 * @param {*} i index of current task
 * @returns the amount of done subtasks
 */
function countTrue(i) {
    let element = tasks[i].subtasks;
    let count = element.filter(a => a.check == true);
    return count.length;
}



/**
 * makes all placeholder seen for the user
 * @param {*} id current active Task
 */
function startDragging(id) {
    currentdraggableElement = getTheRightTask(id);
    let allPlaceholder = document.querySelectorAll('.placeholder');
    for (let i = 0; i < allPlaceholder.length; i++) {
        allPlaceholder[i].classList.remove('d-none');
        allPlaceholder[i].classList.add('showShort');
    }
}

/**
 * 
 * @param {*} stat gives the new tasks status and saves it
 */
function setStatus(stat) {
    tasks[currentdraggableElement].status = stat;
    saveTasks();
    showTasksOnBoard();
    AUDIO_MOVE.play();
}


function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * 
 * @param {*} objID the ID of a task
 * @returns the index of the task with this id
 */
function getTheRightTask(objID) {
    let searchFor = objID;
    let whatINeed = tasks.findIndex(obj => obj.id == searchFor);
    return whatINeed;
}

/**
 * 
 * @param {*} objID the id of the color
 * @returns the index of the color with this id
 */
function getTheRightBgColor(objID) {
    let searchFor = objID;
    let whatINeed = categories.findIndex(obj => obj.categoryName == searchFor);
    return whatINeed;
}


function freezeBackground() {
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    document.body.scoll = "no";
}

/**
 * all the content is loading
 * @param {*} i index of active task
 */
function loadAllTheTaskContent(i) {
    loadTheTaskContent(i);
    renderContactsAssignBoard(i);
    filterTheAssignedPeople(i);
    setToggleID(i);
    renderSubtasks(i);
    readPrio(i);
}

/**
 * the normal input-form is changed into a overlay
 */
function changeTheLook() {
    document.getElementById('overlayTask').classList.add('d-none');
    document.getElementById('divider').classList.add('d-none');
    document.getElementById('mainAddTask').classList.remove('d-flex');
    document.getElementById('addTaskForm').classList.remove('containerTasks');
    document.getElementById('addTaskForm').classList.add('overlayEdit');
    document.getElementById('BTN-save').classList.remove('d-none');
    document.getElementById('BTN').style.display = "flex";
    document.getElementById('BTN').style.justifyContent = "end";
    document.getElementById('inputUnit').style.display = "none";
    document.getElementById('see').classList.add('d-none');
}


function createSaveButton(i) {
    document.getElementById('BTN').innerHTML = `<button class="btn" id="ok" onclick="saveExistingTask(${i})">Ok <img src="assets/img/akar-icons_check.svg"><img src=""></button>`;
}


function getbgColor(index) {
    if (tasks[index].priority == 'urgent') {
        changeColor('red');
    }
    else if (tasks[index].priority == 'medium') {
        changeColor('orange');
    }
    else if (tasks[index].priority == 'low') {
        changeColor('green');
    }
}


function changeColor(color) {
    document.getElementById('prioPic').classList.add('invert');
    document.getElementById('priority').classList.add(color);
}


function closeTask() {
    document.getElementById('makeBgDarker').classList.add('d-none');
    document.getElementById('overlayTask').classList.add('d-none');
    document.getElementById('editTask').classList.add('d-none');
    document.getElementById('newTask').classList.add('d-none');
    document.getElementById('addTaskForm').classList.add('d-none');
    showTasksOnBoard();
    resetData();
    loosenBackground();
}

function resetData() {
    currentOpenTask = -1;
    chosenContacts = [];
    subtasks_interim = [];
    subtasks = [];
}


function loadTheTaskContent(i) {
    title.value = tasks[i].title;
    description.value = tasks[i].description;
    selectedCategory.textContent = tasks[i].category;
    document.getElementById('dueDate').value = tasks[i].duedate;
    prio = tasks[i].priority;
    subtasks = tasks[i].subtasks;
}


function saveExistingTask(i) {
    tasks[i] = changeTheExistingTask(i);
    saveTasks();
    document.getElementById('addTaskForm').classList.add('d-none');
    showTask(tasks[i].id);
    resetData();
}

function changeTheExistingTask(i) {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let task = {
        'id': tasks[i].id,
        'status': tasks[i].status,
        'title': title.value,
        'description': description.value,
        'duedate': dueDate.value,
        'priority': prio,
        'assignedTo': chosenContacts,
        'category': tasks[i].category,
        'subtasks': getExistingSubtasks(i)
    }
    return task;
}

/**
 * 
 * @param {*} i index of the active Task
 * @returns 
 */
function getExistingSubtasks(i) {
    data = tasks[i].subtasks.length;
    if (data < subtasks_namen.length) data = subtasks_namen.length;
    new_subtasks = [];
    for (let index = 0; index < data; index++) {
        let subtask = {
            'subtaskName': document.getElementById(`input${index}`).value,
            'check': document.getElementById(`input${index}`).checked
        }
        new_subtasks.push(subtask);
    }
    return new_subtasks;
}

/**
 * 
 * @param {*} i the index of the active Task
 */
function readPrio(i) {
    if (tasks[i].priority == 'urgent') renderPrioButton(renderUrgentHTML2());
    else if (tasks[i].priority == 'medium') renderPrioButton(renderMediumHTML2());
    else if (tasks[i].priority == 'low') renderPrioButton(renderLowHTML2());
}


function closeIt() {
    resetMissingText();
    document.location = "../board.html";
}

/**
 * Close the overlay AddTask without saving
 */
function closeOverlayAddTask() {
    document.getElementById('makeBgDarker').classList.add('d-none');
    document.getElementById('newTask').classList.add('d-none');
    resetMissingText();
    document.getElementById('newTask').innerHTML = ``;
    loosenBackground();
}


function setDarkLayer() {
    document.getElementById('makeBgDarker').classList.add('d-none');
}


function loosenBackground() {
    document.documentElement.style.overflow = 'auto';
    document.body.scroll = "yes";
}
/**
 * 
 * @param {*} i index of subtask of the interim subtask-array
 */
function deleteTheSubtask(i) {
    subtasks_interim.splice(i, 1);
    showSubtasks(subtasks_interim);
}

/**
 * Make background dark and show the addTaskForm
 */
function showAddTaskOverlay() {
    showDarkOverlay();
    document.getElementById('addTaskForm').classList.remove('d-none');
}

/**
 * search function which only shows the tasks which own the search expression
 */
function filterTasks() {
    let search = document.getElementById('search').value;
    search = search.toLowerCase();
    let regex = new RegExp(search);
    let content = document.getElementById('cols');
    let boxes = content.querySelectorAll('.box');
    for (let i = 0; i < boxes.length; i++) {
        let title = boxes[i].querySelector('.title').innerHTML;
        let description = boxes[i].querySelector('.description').innerHTML;
        if (regex.test(title.toLowerCase()) || regex.test(description.toLowerCase())) {
            boxes[i].style.display = 'flex';
        } else {
            boxes[i].style.display = 'none';
        }
    }
}
/**
 * 
 * @param {*} i index of the task which is deleted
 */
function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    goToBoard(300);
}


function renderDate() {
    let currentDate = document.getElementById('dueDate');
    currentDate.value = today;
    currentDate.setAttribute('min', today);
}

/**
 * 
 * @param {*} param1 id-Feld
 * @param {*} param2 id-Feld
 * @param {*} param3 id-Feld
 * @param {*} param4 id-Feld
 * 
 * It makes the borders round or square dependig on if the menu is open or close
 */
function toggleIt(param1, param2, param3, param4) {
    let seeCat = document.getElementById(param1);
    seeCat.classList.toggle('d-none');
    let checkIt = !seeCat.classList.contains('d-none');
    if (checkIt) {
        document.getElementById(param2).style.borderBottomLeftRadius = `0px`;
        document.getElementById(param2).style.borderBottomRightRadius = `0px`;
    }
    else {
        document.getElementById(param2).style.borderRadius = `8px`;
    }
    if (!document.getElementById(param3).classList.contains('d-none')) {
        document.getElementById(param3).classList.add('d-none')
        document.getElementById(param4).style.borderRadius = `8px`;
    }
    renderCategories();
}

/**
 * Displays the dark overlay to show AddTask or something like that
 */
function showDarkOverlay() {
    document.getElementById('makeBgDarker').classList.remove('d-none');
}

/**
 * Eventlistener to close the menu when clicking outside of it
 */
window.addEventListener('click', function (e) {
    if (document.getElementById('newCateg')) {
        if (!document.getElementById('newCateg').contains(e.target) && (!document.getElementById('toggleID').contains(e.target)) && (!this.document.getElementById('optionsUser').contains(e.target))) {
            document.getElementById('newCateg').style.borderRadius = `8px`;
            document.getElementById('toggleID').style.borderRadius = `8px`;
            document.getElementById('seeCat').classList.add('d-none');
            document.getElementById('see').classList.add('d-none');
        }
    }
});

