let categoriesOpen = false;
let assignedToOpen = false;
let colorsOpen = false;
let subtasksOpen = false;
let chosenCategory;
let alreadyAssigned = false;
let assignedTo = [];
let prio = '';
let previousPrio = '';
let today = new Date().toISOString().split("T")[0];
let previousColorAvatar = 0;
let tasks = [];
let percentage;
let subtasksDone;
let categories = [];
let subtasks = [];
    
        

function addNewCategory(){
    let addedCategory = document.getElementById('input-new-category').value;
    if (addedCategory.length < 1) {
        return;
    }
    let newpopup = document.getElementById('popup-new-category');
    newpopup.innerHTML += `<div class="popup-new-category">
                            ${addedCategory}
                            <div class="small-point bg${previousColorAvatar}"></div>
                          </div>
    `;
    document.getElementById('input-new-category').value = '';
    document.getElementById('color-options').innerHTML = '';
    document.getElementById('input-new-category-symbol').style.opacity = "0";
    colorsOpen = false;
    setTimeout(() => {
        categoriesOpen = false;
        newCategory = {'category': addedCategory, 'color': previousColorAvatar};
        categories.splice(0, 0, newCategory);
        showCategoryOptions();
    }, 800);
}


function showNewCategoryColorOptions(){
       if (colorsOpen == false) {
        let options = document.getElementById('color-options');
        for (let i = 1; i < 13; i++) {
         options.innerHTML += generatColorOptions(i);
        }
        colorsOpen = true;
        let neededLength = (categories.length+3) * 36;
        document.getElementById('categories-options-box').style.height = `${neededLength}px`;
    }         
}


function fillAvatarColor(index){
    if (previousColorAvatar) {
        document.getElementById('color-avatar').classList.remove(`bg${previousColorAvatar}`);
    }
    document.getElementById('color-avatar').classList.add(`bg${index}`);
    previousColorAvatar = index;
}


function showNewCategoryCheckmark(){
    document.getElementById('input-new-category-symbol').style.opacity = "1";
}


function showCategoryOptions(){
            if (categoriesOpen == false) {
                let neededLength = (categories.length+2) * 36;
                document.getElementById('categories-options-box').style.height = `${neededLength}px`;
                document.getElementById('category-options-triangle').style.transform = "translateX(-10px) rotate(180deg)";
                setTimeout(() => {
                    renderCategoryOptionsInAddTask();
                }, 200);
                categoriesOpen = true;
            } else {
                closeOptionsBox();
                categoriesOpen = false;
                colorsOpen = false;
            }
}


function closeOptionsBox(){
                let options = document.getElementById('category-options');
                document.getElementById('category-options-triangle').style.transform = "rotate(0deg)"
                document.getElementById('categories-options-box').style.height = `36px`;
                options.innerHTML = '';

}

function renderCategoryOptionsInAddTask(){
    let options = document.getElementById('category-options');
    options.innerHTML = generateNewCategoryOption();
                    for (let i = 0; i < categories.length; i++) {
                        let category = categories[i]['categoryName'];
                        let color = categories[i]['categoryColor'];
                        let colorConverted = colorCodes.indexOf(color) +1;
                        options.innerHTML += generatCategoryOptions(colorConverted, category);
                    }


}
        
function showSubTasks(){
            let content = document.getElementById('subtask-options');
            content.innerHTML = '';
            for (let i = 0; i < subtasks.length; i++) {
                let subtask = subtasks[i]['subtask'];
                content.innerHTML += generateSubtasks(i);
            }
            checkSubtasksDoneLine();

}

function createNewSubtask(){
            let content = document.getElementById('new-subtask-box');
            let input = document.getElementById('new-subtask').value;
            if (input.length < 1) {
                return;
            }
            content.innerHTML = generateNewSubtask(input);
            let newsub = {'subtask': input, 'status': ''}
            subtasks.splice(0, 0, newsub);
            document.getElementById('new-subtask').value = '';
            setTimeout(() => {
                content.innerHTML = '';
                showSubTasks();
                checkSubtasksDoneLine(0);
            }, 625);            
}


function deleteSub(index){
            subtasks.splice(index, 1);
            showSubTasks();
}


function checkSubtask(index){
            if (subtasks[index]['status'] == '') {
                subtasks[index]['status'] = 'checked';
            }
            else{
                subtasks[index]['status'] = ''
            }
            checkSubtasksDoneLine();
}


function checkHowManySubtasksAreDone(){
    subtasksDone = 0;
    for (let i = 0; i < subtasks.length; i++) {
       if (subtasks[i]['status'] == 'checked') {
           subtasksDone++
       }
   }
}


function checkSubtasksDoneLine(){
            let line = document.getElementById('done-subtasks-line');
            let noti = document.getElementById('done-of');
            checkHowManySubtasksAreDone();
            percentage = subtasksDone / subtasks.length * 100
            line.style.width = `${percentage}%`;
            noti.innerHTML = `(${subtasksDone}/${subtasks.length}) Done`;
            setTimeout(() => {
               checkIfCoffeeIsJustified(percentage);
            }, 250);
}


function checkIfCoffeeIsJustified(percentage){
    let line = document.getElementById('done-subtasks-line');
    let noti = document.getElementById('done-of');
    if (percentage == 100) {
        showCoffee('flex');
        line.style.backgroundColor = "rgb(41, 54, 70)";
        noti.innerHTML = `all Subtasks are done!`
         }
        else{
        showCoffee('none');
        line.style.backgroundColor = "rgb(11, 173, 221)";
        }
}


function showCoffee(param){
            document.getElementById('coffee-container').style.display = `${param}`;
}


function closeOptions(){
            categoriesOpen = false;
            chosenCategory = [];
            document.getElementById('categories-options-box').style.height = `36px`
            let options = document.getElementById('categories-options-box');
            options.innerHTML = `
                         <div onclick="showCategoryOptions()" class="categories-options-headline" id="options1">
                            <span>Choose category</span>
                            <span class="options-triangle" id="category-options-triangle">&#x25BE;</span>
                        </div>
                        <div class="category-options" id="category-options">
                        </div>
            `;
}


function showAssignedToOptions(){
            let options = document.getElementById('assigned-options');
            if (assignedToOpen == false) {
                let neededLength = (contacts.length+1) * 36;
                document.getElementById('assigned-options-box').style.height = `${neededLength}px`;
                document.getElementById('assigned-options-triangle').style.transform = "translateX(-10px) rotate(180deg)";
                setTimeout(() => {
                    renderContactsInCategoryOptions();
                }, 200);
                assignedToOpen = true;
            } else {
                document.getElementById('assigned-options-triangle').style.transform = "rotate(0)"
                document.getElementById('assigned-options-box').style.height = `36px`;
                options.innerHTML = '';
                assignedToOpen = false;
            }
        }

        

function renderContactsInCategoryOptions(){
    let options = document.getElementById('assigned-options');
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['firstname']+ ' ' + contacts[i]['lastname'];
        let color = contacts[i]['color'];
        options.innerHTML += generateAssignedToOptions(color, name, i);
        }  
}


function checkIfAssigned(name){
            for (let i = 0; i < assignedTo.length; i++) {
                let element = assignedTo[i]['firstname'] + " " + assignedTo[i]['lastname'];
                if (element == name) {
                    return `checked`;
                }
            }
}


function addAssignmentsto(index){
            let newlyAssignedName = contacts[index]['firstname'] + ' ' + contacts[index]['lastname'];
            for (let i = 0; i < assignedTo.length; i++) {
                let element = assignedTo[i]['firstname'] + " " + assignedTo[i]['lastname'];
                if (newlyAssignedName == element) {
                    assignedTo.splice(i, 1);
                    renderChosenCircles();
                    return;
                } 
            }
            assignedTo.push(contacts[index]);
            renderChosenCircles();
}


function renderChosenCircles(){
            let content = document.getElementById('chosen-circles');
            content.innerHTML = '';
            for (let i = 0; i < assignedTo.length; i++) {
                let initials = assignedTo[i]['initials'];
                let color = assignedTo[i]['color'];
                content.innerHTML += generateAssignedToCircles(initials, color, i);
            }
            document.getElementById('chosen-circles').scrollIntoView();

}

      

function definePrio(chosenPrio){
                if (previousPrio) {
                    document.getElementById(`${previousPrio}-box`).classList.remove(`${previousPrio}-clicked`);
                    document.getElementById(`${previousPrio}-symbol`).classList.remove('symbol-clicked');
                }
                document.getElementById(`${chosenPrio}-box`).classList.toggle(`${chosenPrio}-clicked`);
                document.getElementById(`${chosenPrio}-symbol`).classList.toggle('symbol-clicked');
                previousPrio = chosenPrio;
                prio = chosenPrio;                       
}


async function saveNewTask(){
            let taskTitle = document.getElementById('add-task-title').value;
            let taskdescription = document.getElementById('add-task-description').value;
            let taskduedate = document.getElementById('due-date-input').value;
            let newTask = {'id': tasks.length,
                            'status': 'todo', 
                            'title': taskTitle, 
                            'description': taskdescription,
                            'duedate': taskduedate,
                            'priority': prio, 
                            'assignedTo': assignedTo, 
                            'category': chosenCategory, 
                            'subtasks': subtasks,
                            'subtasksdone': percentage};
            tasks.push(newTask);
            await saveNewTaskToBackend();
}


async function saveNewTaskToBackend(){
            await backend.setItem('tasks', JSON.stringify(tasks));
            document.getElementById('card').classList.add('close-card-animation');
            resetInputs();
            setTimeout(() => {
                let content = document.getElementById('container-content');
                content.style.display = "none";
            }, 525);
}

        
function getDueDate() {
        let todayasnumber = today.charAt(today.length-2)+today.charAt(today.length-1);
        duedateday = +todayasnumber +7;
        duedate = `2023-${today.charAt(5)}${today.charAt(6)}-${duedateday}`
        return duedate;       
}


function cancelNewTask(){
            let content = document.getElementById('container-content');
            content.style.display = "none";
            resetInputs();
            
}


function resetInputs(){
    assignedTo = [];
    chosenCategory = '';
    subtasks = [];
}

