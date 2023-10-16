function addANewCategoryHTML() {
  return `
    <label for="Category">Category</label>
      <input id="showNewCat" onfocus="hideMissingText('missingColorspot')" class="input" type="text" placeholder="New Category name">
       <div id="seeCat">
       <div class="options" id="optionsCat"></div>
    </div>
    <div class="cancelOrAdd plus"><img src="assets/img/cancel.png" onclick="renderInputUnit()"><div class="seperate"></div> <img src="assets/img/check.png" onclick="addNewCat()" alt=""></div>
    <div class="colorspots" id="colorspots"></div>                      `
}

function resetCategoryChoiceHTML() {
  return ` <label>Category</label>
    <div class="inputArea" id="newCateg">
        <div id="selectedCategory">Select a Category</div>
        <img src="assets/img/openMenuIcon.svg" onclick="toggleIt('seeCat', 'newCateg', 'see', 'toggleID')" alt="">
    </div>
    <div id="seeCat" class="d-none">
        <div class="options" id="optionsCat"> </div>
    </div>`;
}


function renderInputUnitHTML() {
  return `
     
    <label>Category</label>
    <div class="inputArea" id="newCateg">
        <div id="selectedCategory">Select a Category</div>
        <img src="assets/img/openMenuIcon.svg" onclick="toggleIt('seeCat', 'newCateg', 'see', 'toggleID')" alt="">
    </div>
    <div id="seeCat" class="d-none">
        <div class="options" id="optionsCat"></div>
    </div>
    </div>`;
}


function renderContactsAssignBoardHTML(i, index, contact, check) {
  return `
      <div class="checkbox" id="${index}">
      <label for="user${index}">${contacts[index].firstname} ${contacts[index].lastname}</label>
      <input type="checkbox" name="assignedTo" onchange="chooseTheContact(${i},${index})" value="${contact.id}" id="user${index}" ${check}>
    </div>`;
}

function renderContactsAssignContactsHTML(index, contact, check) {
  return `
      <div class="checkbox" id="${index}">
      <label for="user${index}">${contacts[index].firstname} ${contacts[index].lastname}</label>
      <input type="checkbox" name="assignedTo" onchange="chooseTheContact(-1,${index})" value="${contact.id}" id="user${index}" ${check}>
    </div>`;
}

function renderContactsAssignAddTaskHTML(index, element) {
  return `
      <div class="checkbox" id="${index}">
      <label for="user${index}">${contacts[index].firstname} ${contacts[index].lastname}</label>
      <input type="checkbox" name="assignedTo" onchange="chooseTheContact( -1,${index})" value="${element[index].id}" id="user${index}" ${element[index].check}>
    </div>`;
}

function renderContactsAssignToHTML(index, element) {
  return `
      <div class="checkbox">
      <label for="user${index}">${element.firstname} ${element.lastname}</label>
      <input type="checkbox" onchange="chooseTheContact(-1, ${index})" name="assignedTo" value="${element.id}" id="user${index}" >
    </div>`;
}

function showSubtasksHTML(element, index, gecheckt) {
  return `
  
      <div class="wrapper">
          <div id="firstPart">
             <input type="checkbox" name="subtask" value="${element.subtaskName}" id="input${index}" ${gecheckt}>
             <label for="subtask">${element.subtaskName}</label>
           </div>
         <div class="rubbish" onclick="deleteTheSubtask(${index})"><img src="./assets/img/abfall.png"></div>
      </div>`;
}

function renderNewCategoryHTML() {
  return `<span id="newCat" class="item" onclick="addANewCategory()">New Category</span>`;
}


function renderCategoriesHTML(index, element) {
  console.log(element);
  return `
      <div class="duo" <span id="${index}" class="item" onclick="selectCategory(${index})">${element.title}</span><span class="circle" style="background-color: ${element.color};"></span></div>`;
}

function renderColorSpotsHTML(index, element) {
  return `
      <div class="colorspot" id="col${index}" onclick="rememberColor(${index})"></div> `;
}
