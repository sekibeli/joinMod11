let logOutShown = false;
window.tasks = [];
window.categories = [];
window.contacts = [];

/**
 * fetches the JSON from backend and put it in the arrays tasks, contacts, categories
 */
async function init() {
    setURL('http://127.0.0.1:8000');
    await downloadFromServer().then((tasks)=> {
        this.tasks = tasks;
        console.log('Tasks:', tasks);
    });
    await downloadCategoriesFromServer().then((categories)=> {
        this.categories = categories;
        console.log('Categories:', categories);
    });
    await downloadContactsFromServer().then((contacts)=> {
        this.contacts = contacts;
        console.log('Contacts:', contacts);
    });
  
    // tasks = JSON.parse(backend.getItem('tasks')) || [];
    // contacts = JSON.parse(backend.getItem('contacts')) || [];
    // categories = JSON.parse(backend.getItem('categories')) || [];
    // users = JSON.parse(backend.getItem('users')) || [];
    // activeUser = JSON.parse(backend.getItem('activeUser')) || [];


}

/**
 * includes the header and sidebar
 */
async function includeHTML(element) {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    document.getElementById(`sidebar-${element}`).style.backgroundColor = "#091931";
}


function showLogout(){
    let button = document.getElementById('logout-button');
    if (logOutShown == false) {
        button.style.display = "flex";
        logOutShown = true;
    }
    else{
        button.style.display = "none";
        logOutShown = false;
    }
}
