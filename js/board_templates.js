function renderProgressBar(index, element) {
    return `  <div class="oneRow">
    <div class="container">
       <div class="progress">
            <div id="bar${index}" class="bar"></div>
       </div>
    </div>
    <div class="howMuch">${countTrue(index)}/${element.subtasks.length} done</div>
</div>`;
}


function showTasksOnBoardHTML(index, element) {
    return `
    <div class="box" id="box${index}"  onclick="showTask(${element.id})" draggable="true" ondragstart="startDragging(${element.id})">
        <div class="category" id="categoryBgColor${index}">${element.category}</div>
        <div class="title">${element.title}</div>
        <div class="description">${element.description}</div>
<div id="progressField${index}"></div>
    <div class="oneRow">
        <div id="assignToBoard${index}" class="assignTo"></div>
        <img src="assets/img/${element.priority}.svg">
</div>` ;
}


function showTaskHTML(index, element, j) {
    return `
        <div class="fullUseOfSpace">
        <div class="fullUseOfSpaceTop">
                <div class="overlayOneRow">
                    <div class="overlayCategory" id="categoryBgColorShowTask${j}">${element.category}</div>
                    <div id="closeTask" onclick="closeTask()">&#8592;</div>
                </div>
                <div class="overlayTitle">${element.title}</div>
                <div class="overlayDescription">${element.description}</div>
                <div class="overlayContent"><b>Due Date: </b> ${element.duedate}</div>
                <div class="overlayContent"><b>Priority: </b><div id="priority">${element.priority}<img id="prioPic" src="assets/img/${element.priority}.svg"></div></div>
            
                <div id="assignTo${index}" class="assignTo"><b> Assigned To:</b></div>
                <div id="assign"></div>
        </div>
            <div class="fullUseOfSpaceBottom">
                <div id="edit${j}" class="edit"><div id="deleteIt" onclick="deleteTask(${j})"><img src="./assets/img/delete.png"></div><img onclick="showEditTask(${j})" id="edit${j}" src="./assets/img/edit.svg" ></div>
            </div>
    </div>
    `;
}


function testRenderNewTaskHTML(para) {
    return `
    <div class="whiteBg">
         <div onclick="addTask('${para}')" class="mobileCreate" id="mobileCreate">Create  <img src="assets/img/akar-icons_check.svg"></div>
    </div>
    <div class="newTaskHeadline"><h1>Add Task</h1><span id="clickMe" onclick="closeIt()">&#10005;</span></div>
    <div class="newTaskThird">
        <div class="containerAddTaskLeftSide">
                <div class="inputUnit">
                <label for="name">Title</label>
                <input id="title" onfocus="hideMissingText('missingTitle')" class="input" type="text" placeholder="Enter a title">
        </div>
    <div class="missingInfoText d-none" id="missingTitle">Please enter a title</div>

    <div class="inputUnit">
        <label for="description">Description</label>
        <textarea id="description" onfocus="hideMissingText('missingDescription')" class="inputDescription" type="textarea"
            placeholder="Enter a Description"></textarea>
                    </div>
    <div class="missingInfoText d-none" id="missingDescription">Please enter a description </div>
    
    <div class="inputUnit" id="inputUnit">
        <label>Category</label>
        <div class="inputArea" id="newCateg">
            <div id="selectedCategory">Select a Category</div>
            <img src="assets/img/openMenuIcon.svg" onclick="toggleIt('seeCat', 'newCateg', 'see', 'toggleID')" alt="">
        </div>
        <div id="seeCat" class="d-none">
            <div class="options" id="optionsCat"></div>
        </div>
                </div>
    <div class="missingInfoText d-none" id="missingCategory">Please choose a category</div>
    <div class="missingInfoText d-none" id="missingColorspot">Please choose a category color and name</div>
    <div class="inputUnit">
        <label>Assigned to</label>
        <div class="inputArea" id="toggleID">
            <div id="selected">Assigned to</div>
            <img src="assets/img/openMenuIcon.svg" onclick="toggleIt('see', 'toggleID', 'seeCat', 'newCateg')" alt="">
        </div>
        <div id="see" class="d-none">
            <div class="options" id="optionsUser"></div>
        </div>
                </div>
    <div class="missingInfoText d-none" id="missingContact">Please select one ore more contacts for this task</div>
    <div id="showAssignedPeople"></div>
</div>
<div class="divider" id="divider"></div>
<div class="containerAddTaskRightSide">
    <div class="inputUnit">
        <label for="dueDate">Due Date</label>
        <input id="dueDate" class="input" type="date" required>
    </div>
    <div class="inputUnit">
        <label for="prio">Prio</label>
        <div class="prioButtons" id="prioButtons">
            <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
                    src="assets/img/urgent.svg"></button>
            <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
                    src="assets/img/medium.svg"></button>
            <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
                    src="assets/img/low.svg"></button>
        </div>
              </div>
    <div class="missingInfoText d-none" id="missingPrio">Select a priority</div>
    <div class="inputUnit">
        <label for="subtask">Subtasks</label>
        <input id="subtask" class="input" type="text" placeholder="Add new subtask">
        <div class="plus"><img src="assets/img/plus.svg" onclick="addSubtask()" alt=""></div>
    </div>
    <div id="displaySubtasks"></div>

    <div class="BTN" id="BTN">
        <button onclick="closeOverlayAddTask()" class="btn light" id="clearBTN">Cancel &#10005;</button>
        <button class="btn" id="createTaskBTN_task" onclick="addTask('${para}')">Create Task<img src="assets/img/akar-icons_check.svg"></button>
        </div>
            <div class="BTN" id="BTN-save"></div>
        </div>
    </div>
</div>`
}


function showExistingSubtasksHTML(element, j) {
    return `
    <div class="wrapper">
    <div id="firstPart">
    <input type="checkbox" name="subtask" value="${element.subtaskName}" id="input${j}">
    <label for="subtask">${element.subtaskName}</label>
    </div>
  </div>`;
}


function renderUrgentHTML2() {
    return ` <button onclick="selectButton(0)" class="buttonPrio red" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg" style="filter:brightness(0) invert(1)"></button>
    <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg"></button>
    <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
    src="assets/img/low.svg"></button>`
}


function renderMediumHTML2() {
    return ` <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
        src="assets/img/urgent.svg"></button>
        <button onclick="selectButton(1)" class="buttonPrio orange" id="medium">Medium<img id="picmedium"
        src="assets/img/medium.svg" style="filter:brightness(0) invert(1)"></button>
        <button onclick="selectButton(2)" class="buttonPrio" id="low">Low<img id="piclow"
        src="assets/img/low.svg"></button>`
}


function renderLowHTML2() {
    return ` <button onclick="selectButton(0)" class="buttonPrio" id="urgent">Urgent<img id="picurgent"
    src="assets/img/urgent.svg"></button>
    <button onclick="selectButton(1)" class="buttonPrio" id="medium">Medium<img id="picmedium"
    src="assets/img/medium.svg"></button>
    <button onclick="selectButton(2)" class="buttonPrio green" id="low">Low<img id="piclow"
    src="assets/img/low.svg" style="filter:brightness(0) invert(1)"></button>`
}


function renderSubtasksHTML(element, index, ch) {
    return `
        <div class="wrapper">
           <div id="firstPart">
                <input id="input${index}" type="checkbox" name="subtask" value="${element.subtaskName}" ${ch} >
                <label for="subtask">${element.subtaskName}</label>
           </div>
         <div class="rubbish" onclick="deleteTheSubtask(${index})"><img src="./assets/img/abfall.png"></div>
        </div>`;
}