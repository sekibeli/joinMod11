let tasks = [];
let allIDs = [];
let chosenContacts = [];
let more = true;
let prio;
let subtasks_namen = [];
let subtasks_interim = [];
let subtasks = [];
let contactsAssignTo = [];
let taskID = 0;
let categories = [];
let colorspots = ['#f99090', '#ff1717', '#fac66e', '#845400', '#b6fa81', '#07ab1d', '#81adfd', '#0048cd', '#ffb0f7', '#f500dc'];
let colorspot;
let priorities = [{ prio: 'urgent', color: 'red' }, { prio: 'medium', color: 'orange' }, { prio: 'low', color: 'green' }];
let today = new Date().toISOString().split("T")[0];
let para = 'todo';


/**
 * 
 * @returns the first ID which is available
 */
function searchTheMaxID() {
  allIDs = [];
  for (i = 0; i < tasks.length; i++) {
    allIDs.push(tasks[i].id);
  }
  let maxID = Math.max(...allIDs);
  return (maxID + 1);
}

/**
 * 
 * @param {*} para Status of the task
 * creates a new task, pushes it into the array and shows it on board
 */
function addTask(para) {
  let title = document.getElementById('title');
  let description = document.getElementById('description');
  let category = document.getElementById('selectedCategory');
  let duedate = document.getElementById('dueDate');
  if (checkAllInputs(title, description, category)) {
    tasks.push(createSingleTask(findAvailableTaskID(), title, description, duedate, prio, category, para));
    saveTasks();
    flyingInfo();
    goToBoard(2000);
    subtasks_interim = [];
  }
}

/**
 * 
 * @returns the ID which can be used
 */
function findAvailableTaskID() {
  let autoID;
  if (tasks.length > 0) {
    autoID = searchTheMaxID();
  }
  else { autoID = 0 };
  return autoID;
}

/**
 * 
 * @param {*} title 
 * @param {*} description 
 * @param {*} category 
 * @returns true or false
 * Inputvalidation Add Task
 */
function checkAllInputs(title, description, category) {
  let totalOK = checkTheInput(title.value.length, 'missingTitle', 0) && checkTheInput(description.value.length, 'missingDescription', 0) && checkTheInput(category.textContent, 'missingCategory', 'Select a Category')  && checkTheInput(prio, 'missingPrio', undefined);
  return totalOK;
}

/**
 * 
 * @param {*} autoID 
 * @param {*} title 
 * @param {*} description 
 * @param {*} duedate 
 * @param {*} prio 
 * @param {*} category 
 * @param {*} para status
 * @returns a new single task
 */
function createSingleTask(autoID, title, description, duedate, prio, category, para) {
  let task = {
    'id': autoID,
    'status': para,
    'title': title.value,
    'description': description.value,
    'duedate': duedate.value,
    'priority': prio,
    'assignedTo': getAssignedContacts(),
    'category': category.textContent,
    'subtasks': getSubtasks()
  }
  return task;
}

/**
 * 
 * @param {*} delay 
 * shoes the board after some delay
 */
function goToBoard(delay) {
  setTimeout(() => {
    document.location = "../board.html"
  }, delay);
}

/**
 * closes the open task by clicking on the dark overlay
 */
function closeItQuick() {
  closeOverlayAddTask();
  document.getElementById('overlayTask').classList.add('d-none');
  document.getElementById('makeBgDarker').classList.add('d-none');
  document.getElementById('newTask').classList.add('d-none');
  showTasksOnBoard();
}


function resetOverlay() {
  if (!document.getElementById('makeBgDarker').classList.contains('d-none')) {
    document.getElementById('makeBgDarker').classList.add('d-none');
  }
}

/**
 * 
 * @param {*} item 
 * @param {*} area 
 * @param {*} vgl 
 * @returns true or false, depending on correct/incorrect input
 */
function checkTheInput(item, area, vgl) {
  let itemOK = true;
  if (item == vgl) {
    itemOK = false;
    let missingText = document.getElementById(area);
    missingText.classList.remove('d-none');
  }
  return itemOK;
}


function addSubtask() {
  let subtaskField = document.getElementById('subtask');
  let singleSubtask = subtaskField.value;
  if ((currentOpenTask >= 0) && more) { // wenn in einem existierendem Task gearbeitet wird
    subtasks_interim = tasks[getTheRightTask(currentOpenTask)].subtasks;
  }
  more = false; // verhindern, dass die Subtasks doppelt angezeigt werden
  if (singleSubtask.length > 0) {
    let subtask_interim = { 'subtaskName': singleSubtask, 'check': false }
    subtasks_interim.push(subtask_interim);
  }
  subtaskField.value = ``;
  showSubtasks(subtasks_interim);
}


function showSubtasks(subtasks_interim) {
  let gecheckt;
  document.getElementById('displaySubtasks').innerHTML = ``;
  subtasks_interim.forEach((element, index) => {
    gecheckt = '';
    if (subtasks_interim[index].check) gecheckt = 'checked';
    document.getElementById('displaySubtasks').innerHTML += showSubtasksHTML(element, index, gecheckt);
  });
}


function getSubtasks() {
  subtasks = [];
  for (let index = 0; index < subtasks_interim.length; index++) {
    let subtask = {
      'subtaskName': subtasks_interim[index].subtaskName,'check': document.getElementById(`input${index}`).checked
    }
    subtasks.push(subtask);
  }
  return subtasks;
}


function getAssignedContacts() {
  contactsAssignTo = [];
  for (let index = 0; index < contacts.length; index++) {
    let contactID = document.getElementById(`user${index}`).value;
    let checkbox = document.getElementById(`user${index}`).checked;
    let contactIndex = contacts.findIndex(obj => obj.id == contactID);
    if (checkbox) {
      let contactAssignTo = {
        'name': contacts[contactIndex].firstname + ' ' + contacts[contactIndex].lastname, 'initial': contacts[contactIndex].initials, 'color': contacts[contactIndex].color
      }
      contactsAssignTo.push(contactAssignTo);
    }
  }
  return contactsAssignTo;
}


async function saveTasks() {
  await backend.setItem('tasks', JSON.stringify(tasks));
}


function getAssignedToUser() {
  let checkboxes = document.querySelectorAll('input[name="assignedTo"]:checked');
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
  return values;
}


function addPrio(id) {
  prio = id;
}


function selectCategory(param) {
  let category = document.getElementById(`${param}`).textContent;
  document.getElementById('selectedCategory').innerHTML = `<div class="inlineDuo"><span>${category}</span><span class="circle" style="background-color: ${categories[param].categoryColor};"></span></div>`;
  document.getElementById('seeCat').classList.add('d-none');
  document.getElementById('newCateg').style.borderBottomLeftRadius = "8px";
  document.getElementById('newCateg').style.borderBottomRightRadius = "8px";
  document.getElementById('missingCategory').classList.add('d-none');
}


function toggleOptionsContactsAssignTo(i) {
  document.getElementById('see').classList.toggle('d-none');
  renderContactsAssignBoard(i);
}


function renderTheContacts() {
  setTimeout(renderContactsAssignTo, 300);
}

function renderTheContactsInContacts(alreadyChosen) {
  setTimeout(renderContactsAssignToContacts, 300, alreadyChosen);
}

function renderContactsAssignToContacts(alreadyChosen) {
  let check;
  console.log('hierbinich');
  document.getElementById('optionsUser').innerHTML = ``;
  // for (let index = 0; index < contacts.length; index++) {
  //   const element = contacts[index];
  //   if(index == alreadyChosen) { check = 'checked'
  //   break;
  // }
  // else {
  //   check = '';
  // }
  for (let index = 0; index < contacts.length; index++) {
    // let contact = contacts[index];
   
      // if (contact.firstname + ' ' + contact.lastname == tasks[i].assignedTo[a].name) 
      if(index == alreadyChosen)
      {
        check = 'checked';
        
      }
      else {
        check = '';
      }
    
    document.getElementById('optionsUser').innerHTML += renderContactsAssignContactsHTML(index, contacts[index], check);
  }
}

function renderContactsAssignTo() {
  document.getElementById('optionsUser').innerHTML = ``;
  for (let index = 0; index < contacts.length; index++) {
    const element = contacts[index];
    document.getElementById('optionsUser').innerHTML += renderContactsAssignToHTML(index, element);
  }
}


function renderContactsAssignBoard(i) {
  let check;
  document.getElementById('optionsUser').innerHTML = ``;
  for (let index = 0; index < contacts.length; index++) {
    let contact = contacts[index];
    for (let a = 0; a < tasks[i].assignedTo.length; a++) {
      if (contact.firstname + ' ' + contact.lastname == tasks[i].assignedTo[a].name) {
        check = 'checked'
        break;
      }
      else {
        check = '';
      }
    }
    document.getElementById('optionsUser').innerHTML += renderContactsAssignBoardHTML(i, index, contact, check);
  }
}


function renderContactsAssignAddTask(i) {
  document.getElementById('optionsUser').innerHTML = ``;
  for (let index = 0; index < contacts.length; index++) {
    const element = tasks[i].assignedTo;
    document.getElementById('optionsUser').innerHTML += renderContactsAssignAddTaskHTML(index, element);
  }
}


function renderCategories() {
  document.getElementById('optionsCat').innerHTML = ``;
  document.getElementById('optionsCat').innerHTML += renderNewCategoryHTML();
  for (let index = 0; index < categories.length; index++) {
    const element = categories[index];
    document.getElementById('optionsCat').innerHTML += renderCategoriesHTML(index, element);
  }
}


function addANewCategory() {
  document.getElementById('missingCategory').classList.add('d-none');
  document.getElementById(`inputUnit`).innerHTML = addANewCategoryHTML();
  document.getElementById('seeCat').classList.add('d-none');
  renderColorSpots();
}


async function delayDate() {
  await init();
     setTimeout(renderDate, 300);
     setTimeout(renderContactsAssignTo, 300);
    
  }


function renderInputUnit() {
  document.getElementById(`inputUnit`).innerHTML = ``;
  document.getElementById(`inputUnit`).innerHTML += renderInputUnitHTML();
  renderCategories();
  selectCategory(categories.length - 1);
}


function renderColorSpots() {
  for (let index = 0; index < colorspots.length; index++) {
    const element = colorspots[index];
    document.getElementById('colorspots').innerHTML += renderColorSpotsHTML(index, element);
  }
}


function rememberColor(index) {
  colorspot = colorspots[index];
  document.getElementById(`col${index}`).classList.add('highlighted');
  resetUnselectedSpots(index);
}


function resetUnselectedSpots(index) {
  for (let j = 0; j < colorspots.length; j++) {
    if (index != j) {
      document.getElementById(`col${j}`).classList.remove('highlighted');
    }
  }
}


async function addNewCat() {
  let newCatField = document.getElementById('showNewCat');
  if (checkIfInputIsComplete(newCatField)) {
    document.getElementById('missingColorspot').classList.add('d-none');
    let category = {
      'categoryName': newCatField.value,'categoryColor': colorspot}
    categories.push(category);
    await backend.setItem('categories', JSON.stringify(categories));
    renderInputUnit();
  }
}


function checkIfInputIsComplete(field) {
    return (checkCategoryName(field) && checkColorspot());
}

function resetCategoryChoice() {
  let inputUnit = document.getElementById('inputUnit');
  inputUnit.innerHTML = ``;
  inputUnit.innerHTML += resetCategoryChoiceHTML();
}


function checkColorspot(){
  let colorspotIsChosen = false;
  if (colorspot == undefined) {
    document.getElementById('missingColorspot').classList.remove('d-none');
  }
  else {
    colorspotIsChosen = true;
  }
  return colorspotIsChosen;
}


/**
 * This function gives the active Button the right look and sets the inactive to default
 * @param {*} id
 */
function selectButton(id) {
  document.getElementById('missingPrio').classList.add('d-none');
  prio = priorities[id].prio;
  changeSelectedButton(id);
  resetUnselectedButtons(id);
}


function changeSelectedButton(id) {
  let priority = document.getElementById(`${priorities[id].prio}`);
  document.getElementById(`pic${priorities[id].prio}`).style = `filter: brightness(0) invert(1)`;
  priority.style = `background-color: ${priorities[id].color}; color: white`;
}


function resetUnselectedButtons(id) {
  for (let index = 0; index < priorities.length; index++) {
    if (index != id) {
      document.getElementById(`pic${priorities[index].prio}`).style = ``;
      document.getElementById(`${priorities[index].prio}`).style = ``;
      document.getElementById(`${priorities[index].prio}`).classList.remove(priorities[index].color);
    }
  }
}


function changeButtonOnclick() {
  document.getElementById('clearBTN').onclick = `clearAddTask`;
}


function hideMissingText(field) {
  document.getElementById(`${field}`).classList.add('d-none');
}


function resetMissingText() {
  document.getElementById('missingTitle').classList.add('d-none');
  document.getElementById('missingDescription').classList.add('d-none');
  document.getElementById('missingCategory').classList.add('d-none');
  document.getElementById('missingColorspot').classList.add('d-none');
  document.getElementById('missingPrio').classList.add('d-none');
}


function chooseTheContact(i, index) {
  if (i >= 0) {
    chosenContacts = tasks[i].assignedTo;
  }
  let chosenContact = {
    'name': contacts[index].firstname + ' ' + contacts[index].lastname,'initial': contacts[index].initials,'color': contacts[index].color};
  let inis = chosenContacts.findIndex(obj => obj.initial == chosenContact.initial);
  if (inis == -1) {
    chosenContacts.push(chosenContact);
  }
  else {
    chosenContacts.splice(inis, 1);
  }
  showTheJustChosenContacts(chosenContacts);
}


function showTheJustChosenContacts(theContacts) {
  document.getElementById(`showAssignedPeople`).innerHTML = ``;
  for (let j = 0; j < theContacts.length; j++) {
    document.getElementById(`showAssignedPeople`).innerHTML += `<div class="bigNameCircle bg${theContacts[j].color}" >${theContacts[j].initial}</div>`;
  }
  document.getElementById('missingContact').classList.add('d-none');
}


function flyingInfo() {
  document.getElementById('infoText').classList.remove('d-none');
  document.getElementById('infoText').classList.add('infoText')
  resetFlyingInfo();
}


function checkCategoryName(field){
  let categorynameIsChosen = false;
  if (field.value == '') {
    categorynameIsChosen = false;
    document.getElementById('missingColorspot').classList.remove('d-none');
  }
  else {
    categorynameIsChosen = true;
  }
  return categorynameIsChosen;
}

/**
 * Resets the information-text which fly in from the bottom
 */
function resetFlyingInfo() {
  setTimeout(() => {
    document.getElementById('infoText').classList.add('d-none');
    document.getElementById('infoText').classList.remove('infoText')
  }, 4000);
}