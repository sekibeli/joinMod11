let allCounts = [];
let dates = [];
let tasksNotDone = [];
let greetings = ['Good Morning', 'Hello', 'Good Afternoon', 'Good Evening'];
let position;


async function getSummary(){
    await init();
    getNumberofTasks('status', 'inProgress', tasks);
    getNumberofTasks('status', 'awaitingFeedback', tasks);
    getTasksNotDone();
    getNumberofTasks('priority', 'urgent', tasksNotDone);
    getNumberofTasks('status', 'todo', tasks);
    getNumberofTasks('status', 'done', tasks);
    getLatestDueDate();
    getGreetingTime();
    generateSummaryHTML();
    getUrgentLogic();
}

/**
 * get amount of tasks with status not done
 */
function getTasksNotDone(){
    for (let i = 0; i < tasks.length; i++) {
        task = tasks[i];
        if (!(task['status'] == 'done')) {
            tasksNotDone.push(task);
        }
    }
}

/**
 * 
 * @param {*} hours time in hours
 * get the right greeting
 */
function getGreeting(hours){
    if (hours < 10) {
        position = 0;  
    }
    if(hours >= 10 && hours <15){
        position = 1;
    }
    if (hours >= 15 && hours <19) {
        position = 2;
    }
    if (hours >= 19) {
        position = 3;
    }
}


function getGreetingTime(){
    let date = new Date();
    let hours = date.getHours();
    getGreeting(hours);
    allCounts.push(greetings[position])
}


function getLatestDueDate(){
    for (let i = 0; i < tasksNotDone.length; i++) {
        let duedate = tasksNotDone[i]['duedate'];
        dates.push(duedate);
    }
    dates.sort();
    if (dates.length == 0) {
        dates.push('No');
    }
}


function getUrgentLogic(){
    if (allCounts[2] == 0) {
        let urgentSymbol = document.getElementById('urgent-summary');
        urgentSymbol.src = "assets/img/not_urgent_icon.png";
    }

}

/**
 * 
 * @param {*} category 
 * @param {*} status 
 * @param {*} relevantArray 
 * get amount of tasks
 */
function getNumberofTasks(category, status, relevantArray){
    let count = 0;
    for (let i = 0; i < relevantArray.length; i++) {
        let task = relevantArray[i]
        if (task[`${category}`] == `${status}`) {
            count++;
        }
    }
    allCounts.push(count)
}


function goToBoard(){
    window.location.href = "../joinsingle/board.html"

}


function generateSummaryHTML(){
    let content = document.getElementById('summary-content');
    content.innerHTML = `
        <div class="kanban-header-headline">
            Kanban Projekt Management Tool
        </div>
        <div class="summary-headline">
            <h1>Summary</h1>
            <div class="headline-box-line">
                <div class="summary-line"></div>
                <span>Everything in a nutshell</span>
            </div>
        </div>
        <div class="summary-and-greeting-box">
            <div class="summary-box">
                <div class="summary-row">
                    <div onclick="goToBoard()" class="single-box single-first-row animation1">
                        <span class="big-number">${tasks.length}</span>
                        <span>Tasks in <br>Board</span>
                    </div>
                    <div onclick="goToBoard()" class="single-box single-first-row animation2">
                        <span class="big-number">${allCounts[0]}</span>
                        <span>Tasks in <br>Progress</span>
                    </div>
                    <div onclick="goToBoard()" class="single-box single-first-row animation3">
                        <span class="big-number">${allCounts[1]}</span>
                        <span>Awaiting <br> Feedback</span>
                    </div>
                </div>
                <div class="summary-row">
                    <div onclick="goToBoard()" class="single-box single-second-row animation4">
                        <div class="urgent-box">
                            <div class="second-line-urgent-box">
                                <img src="assets/img/urgent_icon.svg" alt="" id="urgent-summary">
                            </div>
                            <div class="urgent-and-number">
                                <span class="big-number">${allCounts[2]}</span>
                                <span>Urgent</span> 
                            </div>
                        </div>
                        <div class="middle-row-line">
                        </div>
                        <div class="deadline-text">
                            <span class="deadline-headline">${dates[0]}</span>
                            <span>Upcoming Deadline</span>
                        </div>
                    </div>
                </div>
                <div class="summary-row">
                    <div onclick="goToBoard()" class="single-box single-third-row animation5">
                        <div class="summary-img-box">
                            <img class="summary-icon" src="assets/img/edit_white.png" alt="">
                        </div>
                        <div class="summary-todo-done">
                            <span class="big-number">${allCounts[3]}</span>
                            <span>To-do</span>
                        </div>
                    </div>
                    <div onclick="goToBoard()" class="single-box single-third-row animation6">
                        <div class="summary-img-box">
                            <img class="summary-icon" src="assets/img/icon-done.svg" alt="">
                        </div>
                        <div class="summary-todo-done">
                            <span class="big-number">${allCounts[4]}</span>
                            <span>Done</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="greeting-box">
                <span class="greeting" id="greeting">${allCounts[5]},</span>
                <span class="greeting-user" id="greeting-user">${activeUser['firstname']}<br>${activeUser['lastname']}</span>
            </div>
        </div>

    
    `;
}