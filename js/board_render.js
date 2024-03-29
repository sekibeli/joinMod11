/**
 * displays the tasks overview on the board and the placeholder areas for dropping tasks
 */
function renderCompleteBoard() {
    console.log(this.tasks);
    for (let index = 0; index < this.tasks.length; index++) {
        const element = this.tasks[index];
        console.log('element:', element);
        document.getElementById(`${element.status.title}`).innerHTML += showTasksOnBoardHTML(index, element);
        if (element.subtasks.length > 0) {
            document.getElementById(`progressField${index}`).innerHTML += renderProgressBar(index, element);
            getDoneSubtasks(index)
        }
        renderContactsOnBoard(index, element);
        renderBg(index, `categoryBgColor`);
        renderTheMovingPic(index);
    }
    renderPlaceholder();
}

/**
 * render the placeholder
 */
function renderPlaceholder() {
    stati.forEach(element => {
        generatePlaceholderBox(`${element}`);
    });
}

/**
 * clears the board and render the tasks on board
 */
function showTasksOnBoard() {
    clearBoard();
    renderCompleteBoard();
}

/**
 * renders the moving-icon on the tasks
 * @param {*} i the index of the activ task
 */
function showTheMovingBox(i) {
    document.getElementById(`box${i}`).innerHTML = `<div class="boxLayer" id="boxLayer${i}"></div>`;
    let links = getMovingLinks(i);
    renderMovingTo(i, links);
}
/**
 * 
 * @param {*} i index of task
 * renders the pic shown on mobile for moving the task to different stati
 */
function renderTheMovingPic(i) {
    document.getElementById(`box${i}`).innerHTML += `<img class="moveIt" id="moveIt${this.tasks[i].id}" onclick="event.stopPropagation();showTheMovingBox(${i})" src="assets/img/icons8-bewegen.png" alt=""></img>`;
}

/**
 * 
 * @param {*} index the current task
 * @param {*} area the area which needs the right background-color
 */
function renderBg(index, area) {
    let count = getTheRightBgColor(this.tasks[index].category);
    // let bgColor = categories[count].color;
    let bgColor = this.tasks[index].category.color
    document.getElementById(`${area}${index}`).style.backgroundColor = bgColor;
}

/**
 * delays the rendering of the board until the JSON is available
 */
async function delay() {
    // setTimeout(function () {
    await init();
    showTasksOnBoard();
    // }, 300);
}

/**
 * It renders the assigned Contacts on board
 * @param {*} i index of the activ task
 * @param {*} element the active task
 */
function renderContactsOnBoard(i, element) {
   
    document.getElementById(`assignToBoard${i}`).innerHTML = ``;
    let some = [];
    some = element.assigned
    console.log('some:', some);
    let contactsLeft;
    let countIt = some.length
    if (some.length > 3) {
        contactsLeft = (some.length - 2);
        countIt = 2
    }
    renderNameCircles(i, countIt, some);
    if (contactsLeft > 0) document.getElementById(`assignToBoard${i}`).innerHTML += `<div class="bigNameCircle bgDark" >+${contactsLeft}</div>`;
}

/**
 * 
 * @param {*} i the active task
 * @param {*} countIt the amount of assigned contacts
 * @param {*} some 
 */
// function renderNameCircles(i, countIt, some) {
//     for (let j = 0; j < countIt; j++) {
//         const element = some[j];
//         console.log('initials:', element);
//         console.log(this.contacts[1].initials);
//         document.getElementById(`assignToBoard${i}`).innerHTML += `<div class="bigNameCircle" style="background-color: ${element.color}" >${element.initials}</div>`;
//     }
// }

function renderNameCircles(i, task, contacts) {
    const assignedIds = contacts; // z.B. [2, 3] für task[0]
console.log('task:', assignedIds);
    for (let j = 0; j < assignedIds.length; j++) {
        const assignedId = assignedIds[j];
        const contact = this.contacts.find(c => c.id === assignedId);
        if (contact) {
            console.log('initials:', contact.initials);
            document.getElementById(`assignToBoard${i}`).innerHTML += `<div class="bigNameCircle" style="background-color: ${contact.color}" >${contact.initials}</div>`;
        }
    }
}
/**
 * 
 * @param {*} status 
 * generates the placeholder box which is needed for the drag and drop
 */
function generatePlaceholderBox(status) {
    document.getElementById(status).innerHTML += `<div class="placeholder d-none" id="box-end-Column-${status}"></div>`;
}

/**
 * it shows the single task with this index
 * @param {*} index 
 */
function showTask(index) {
    freezeBackground();
    currentOpenTask = index;
    showDarkOverlay();
    document.getElementById('overlayTask').innerHTML = ``;
    let j = getTheRightTask(index);
    document.getElementById('overlayTask').classList.remove('d-none');
    let element = tasks[j];
    document.getElementById('overlayTask').innerHTML += showTaskHTML(index, element, j);
    showAssigned(element);
    getbgColor(j);
    renderBg(j, `categoryBgColorShowTask`);
}

/**
 * it renders the active task and loads the content, so the content can be changed
 * @param {*} i index of the task
 */
function showEditTask(i) {
    showAddTaskOverlay();
    changeTheLook();
    createSaveButton(i);
    loadAllTheTaskContent(i);
}

/**
 * 
 * @param {*} element array which contains the assigned contacts 
 * renders the contacts on board assigned to a task
 */
function showAssigned(element) {
    for (let index = 0; index < element.assignedTo.length; index++) {
        let assigns = element.assignedTo[index];
        document.getElementById('assign').innerHTML += `<div class="row"><div class="bigNameCircle bg${assigns.color}">${assigns.initial}</div> <div>${assigns.name}</div></div>`;
    }
}

/**
 * 
 * @param {*} i index activ task
 * shows all subtasks of an existing task
 */
function showExistingSubtasks(i) {
    if (tasks[i].subtasks.length > 0) {
        tasks[i].subtasks.forEach((element, j) => {
            document.getElementById('displaySubtasks').innerHTML += showExistingSubtasksHTML(element, j);
        });
    }
}

/**
 * 
 * @param {*} func html-code with onformation about what prio
 * renders the prio buttons in edit anexisting task
 */
function renderPrioButton(func) {
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML += func;
}

/**
 * 
 * @param {*} i index active task
 * renders the subtasks with information about already checked subtasks
 */
function renderSubtasks(i) {
    subtasks_interim = tasks[i].subtasks;
    document.getElementById('displaySubtasks').innerHTML = ``;
    let subs = tasks[i].subtasks;
    let ch = ``;
    for (let index = 0; index < subs.length; index++) {
        const element = subs[index];
        if (element.check) ch = 'checked';
        document.getElementById('displaySubtasks').innerHTML += renderSubtasksHTML(element, index, ch);
        ch = '';
    }
}

/**
 * 
 * @param {*} para status
 * renders the addTask form
 */
function testRenderNewTask(para) {
    document.getElementById('newTask').innerHTML = ``;
    freezeBackground();
    showDarkOverlay();
    document.getElementById('newTask').classList.remove('d-none');
    document.getElementById('overlayTask').innerHTML = ``;
    document.getElementById('newTask').innerHTML += testRenderNewTaskHTML(para);
    renderTheContacts();
    renderDate();
}
/**
 * 
 * @param {*} para status
 * @param {*} contact contact in which the task is created
 * renders the addTask form in the contacts with one contact already chosen as assigned to the task
 */
function renderNewTaskContact(para, contact) {
    document.getElementById('newTask').innerHTML = ``;
    freezeBackground();
    showDarkOverlay();
    document.getElementById('newTask').classList.remove('d-none');
    document.getElementById('overlayTask').innerHTML = ``;
    document.getElementById('newTask').innerHTML += testRenderNewTaskHTML(para);
    renderDate();
    let indi;
    contacts.find(function (item, i) {
        if (item.id === contact)
            indi = i;
    });
    renderTheContactsInContacts(indi);
    chooseTheContact(para, indi);
}

/**
 * 
 * @param {*} i index of active task
 * filters the contacts to display only those who are assigned to the task
 */
function filterTheAssignedPeople(i) {
    document.getElementById(`showAssignedPeople`).innerHTML = ``;
    some = [];
    some = tasks[i].assignedTo;
    for (let j = 0; j < tasks[i].assignedTo.length; j++) {
        document.getElementById(`showAssignedPeople`).innerHTML += `<div class="bigNameCircle bg${tasks[i].assignedTo[j].color}" >${tasks[i].assignedTo[j].initial}</div>`;
    }
    chosenContacts = tasks[i].assignedTo;
}

/**
 * renders the overlay for mobile change of the status
 * @param {*} i index of active task
 * @param {*} links array with possible targets for the status
 */
function renderMovingTo(i, links) {
    document.getElementById(`boxLayer${i}`).innerHTML += `<div>Move this task to:<div><div class="back" onclick="event.stopPropagation(); goBack()">&#x2715;</div>`;
    for (j = 0; j < links.length; j++) {
        let destination = links[j];
        document.getElementById(`boxLayer${i}`).innerHTML += `<div>
    <button class="boxLayerButton" onclick="event.stopPropagation(); moveTask(${i}, '${destination}')">${destination}</button></div>`
    }
}


function setToggleID(i) {
    document.getElementById('toggleID').innerHTML = `<div id="selected">Assigned to</div>
    <img src="assets/img/openMenuIcon.svg" onclick="toggleOptionsContactsAssignTo(${i})" alt="">`;
}
