/**
 * displays the tasks overview on the board and the placeholder areas for dropping tasks
 */
function renderCompleteBoard() {
    for (let index = 0; index < tasks.length; index++) {
        const element = tasks[index];
        document.getElementById(`${element.status}`).innerHTML += showTasksOnBoardHTML(index, element);
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

function renderTheMovingPic(i) {
    document.getElementById(`box${i}`).innerHTML += `<img class="moveIt" id="moveIt${tasks[i].id}" onclick="event.stopPropagation();showTheMovingBox(${i})" src="assets/img/icons8-bewegen.png" alt=""></img>`;
}

/**
 * 
 * @param {*} index the current task
 * @param {*} area the area which needs the right background-color
 */
function renderBg(index, area) {
    let count = getTheRightBgColor(tasks[index].category);
    let bgColor = categories[count].categoryColor;
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
    some = element.assignedTo
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
function renderNameCircles(i, countIt, some) {
    for (let j = 0; j < countIt; j++) {
        const element = some[j];
        document.getElementById(`assignToBoard${i}`).innerHTML += `<div class="bigNameCircle bg${element.color}" >${element.initial}</div>`;
    }
}


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
function showAssigned(element) {
    for (let index = 0; index < element.assignedTo.length; index++) {
        let assigns = element.assignedTo[index];
        document.getElementById('assign').innerHTML += `<div class="row"><div class="bigNameCircle bg${assigns.color}">${assigns.initial}</div> <div>${assigns.name}</div></div>`;
    }
}

function showExistingSubtasks(i) {
    if (tasks[i].subtasks.length > 0) {
        tasks[i].subtasks.forEach((element, j) => {
            document.getElementById('displaySubtasks').innerHTML += showExistingSubtasksHTML(element, j);
        });
    }
}

function renderPrioButton(func) {
    document.getElementById('prioButtons').innerHTML = ``;
    document.getElementById('prioButtons').innerHTML += func;
}


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
 */
function renderNewTaskContact(para, contact) {
    
    document.getElementById('newTask').innerHTML = ``;
    freezeBackground();
    showDarkOverlay();
    document.getElementById('newTask').classList.remove('d-none');
    document.getElementById('overlayTask').innerHTML = ``;
    document.getElementById('newTask').innerHTML += testRenderNewTaskHTML(para);
   
    // renderContactsAssignBoard(i);
    renderDate();
   
    let indi;
    contacts.find(function(item,i) {
        if(item.id === contact)
        indi = i;});
        renderTheContactsInContacts(indi);
    chooseTheContact(para, indi);
   

}

// function deleteAssignedPeople(){
//     document.getElementById(`showAssignedPeople`).innerHTML = ``;
// }

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
  