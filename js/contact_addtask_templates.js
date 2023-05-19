function categoryChosen(color, category){
    let categoryBox = document.getElementById('categories-options-box');
    document.getElementById('categories-options-box').style.height = `36px`;
    chosenCategory = category;
    categoryBox.innerHTML = `
                <div class="category-to-choose">
                    <div class="options-cancel">
                        <div class="category-to-choose">
                            <span onclick="categoryChosen(color, category)">${category}</span>
                            <div class="small-point bg${color}"></div>
                        </div>
                        <span class="cancel-new-category" onclick="closeOptions()">&#10005;</span>
                    </div>
                </div>
    `;
}


function generatCategoryOptions(color, category){
    return `
                <div onclick="categoryChosen(${color}, '${category}')" class="category-to-choose">
                    <span>${category}</span>
                    <div class="small-point bg${color}"></div>
                </div>                       
    `;
}


function generateAssignedToOptions(color, name, index){
    return `
                    <div class="assigned-option category-to-choose">
                        <label for="name">${name}</label>
                        <input ${checkIfAssigned(name)} onchange="addAssignmentsto(${index})" type="checkbox" id="assignedToName${index}">
                    </div>
    `;
}


function generateNewCategoryOption(){
    return `
            <div class="new-category-option">
                <input id="input-new-category" onfocus="showNewCategoryCheckmark(), showNewCategoryColorOptions()" placeholder="Add new category">
                <div class="color-avatar" id="color-avatar"></div>
                <img src="assets/img/check.png" onclick="addNewCategory()" id="input-new-category-symbol">
            </div>
            <div class="choose-category-colors" id="color-options">
            </div>
            <div id="popup-new-category">
            </div>
    `;
}


function generatColorOptions(i){
    return `   <div class="one-color-option bg${i}" onclick="fillAvatarColor(${i})">   
               </div>
    `;
}


function generateNewSubtask(input){
    return `                     <div class="each-subtask new-sub-animation">
                                    <span>${input}</span> 
                                    <div>
                                        <input type="checkbox">
                                        <label>&#10005;</label>
                                    </div>
                                </div>           
    `;
}


function generateSubtasks(index){
    return `
        <div class="each-subtask">
            <span>${subtasks[index]['subtask']}</span> 
            <div>
                <input onchange="checkSubtask(${index})" ${subtasks[index]['status']} id="subtask${index}" type="checkbox">
                <label onclick="deleteSub(${index})">&#10005;</label>
            </div>
        </div>
    `;
}


function generateAssignedToCircles(initials, color, index){
    return `
            <div class="each-chosen-circle bg${color}">
                ${initials}
            </div>  
    `;
}



function generateCardHTML(id){
    let index;
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        if (contact['id'] == id) {
            assignedTo.push(contact);
            index = i;
        }
    }
    let content = document.getElementById('container-content');
    content.style.display = "flex";
    content.innerHTML = `
    <div class="card" id="card">
    <form onsubmit="saveNewTask()" autocomplete="off">
         <div class="card-left">
            <span class="add-task-head-title">Add Task</span>
            <label for="add-task-title">Title</label>
            <input required id="add-task-title" placeholder="Enter a title"></input>
            <label for="add-task-description">Description</label>
            <textarea placeholder="Enter a description" required class="task-textarea" type="text" id="add-task-description"></textarea>
            <label for="add-task-category">Category</label>
            <div class="categories-options-box" id="categories-options-box">
                <div onclick="showCategoryOptions()" class="categories-options-headline">
                    <span>Choose category</span>
                    <span class="options-triangle" id="category-options-triangle">&#x25BE;</span>
                </div>
                <div class="category-options" id="category-options">
                </div>
            </div>     
            <label for="assigned-options-box">Assigned to</label>               
            <div class="assigned-options-box" id="assigned-options-box">
                <div onclick="showAssignedToOptions()" class="categories-options-headline">
                    <span>Select contact to assign</span>
                    <span class="options-triangle" id="assigned-options-triangle">&#x25BE;</span>
                </div>
                <div class="assigned-options" id="assigned-options">
                </div>  
            </div>  
            <div class="chosen-circles" id="chosen-circles">
                <div class="each-chosen-circle bg${contacts[index]['color']}">
                ${contacts[index]['initials']}
                </div>  
            </div>     
        </div>
        <div class="card-middle-box">
            <div class="middle-line">
            </div>
        </div>
        <div class="card-right">
            <label for="add-task-duedate">Due date</label>
            <input min="${today}" id="due-date-input" value="${getDueDate()}" type="date" id="add-task-duedate" required>
            <label for="add-task-prio">Prio</label>
            <div class="add-task-prio" id="add-task-prio">
                <div onclick="definePrio('urgent')" class="prio-box urgent-box" id="urgent-box">
                    <span>urgent</span>
                    <img id="urgent-symbol" src="assets/img/urgent.svg">
                </div>
                <div onclick="definePrio('medium')" class="prio-box medium-box" id="medium-box">
                    <span>medium</span>
                    <img id="medium-symbol" src="assets/img/medium.svg">
                </div>
                <div onclick="definePrio('low')" class="prio-box low-box" id="low-box">
                    <span>low</span>
                    <img id="low-symbol" src="assets/img/low.svg">
                </div>
            </div>
            <label for="add-task-subtasks1">Subtasks</label>
            <div class="subtask-options-box" id="subtask-options-box">
                <div class="categories-options-headline">
                    <input type="text" min-length="4" placeholder="Add new subtask" id="new-subtask">
                    <span onclick="createNewSubtask()" class="options-triangle">&#xFE62;</span>
                </div>
            </div>  
            <div class="new-subtask-box" id="new-subtask-box">
            </div>
            <div class="subtask-options" id="subtask-options">
            </div> 
            <div class="subtasks-done-box" id="done-of">Subtasks done
            </div>
            <div class="subtasks-done-line">
                <div class="subtasks-really-done" id="done-subtasks-line"></div>
                <div class="coffee-container" id="coffee-container">
                    <img src="assets/img/cup_join.png" class="cup">
                    <img src="assets/img/cup-steam.png" class="steam">
                </div> 
            </div>   
            <div class="save-task-button">
                <span class="cancel-new-task" onclick="cancelNewTask()">Cancel</span>
                <input type="submit" value="Create Task" id="add-task-submit">
            </div>                    
        </div>
    </form>
</div>
    
    `;
showSubTasks();
}


