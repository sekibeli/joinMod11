let oldContacts = [];

/**
 * A contact is created and pushed to the contacts array. contacts is then stored in the backend.
 */
function addContact(){

    let fullname = document.getElementById('fullname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    
    let oldContact = 
        {
            'fullname': fullname.value,
            'email': email.value,
            'phone': phone.value,
            'contactColor' : getRandomColor()
        }
    
    oldContacts.push(oldContact);
    backend.setItem('oldContacts', JSON.stringify(oldContacts));
    
}
/**
 * The makeshift overlay is rendered
 */
function renderAddContact(){
    document.getElementById('addContact').innerHTML = renderAddContactHTML();
}

/**
 * 
 * @returns The template is returned
 */
function renderAddContactHTML(){
    return `
    <div class="addContact">
    <div class="inputUnit"><input id="fullname" class="input" type="text" placeholder="Name"</div>
    <div class="inputUnit"><input id="email" class="input" type="text" placeholder="Email"</div>
    <div class="inputUnit"><input id="phone" class="input" type="text" placeholder="phone"</div>
    <button onclick="addContact()">Create contact</button>
    </div>
    `;

}
/**
 * Timeout because the backend is loading too slow and causes a error message. Hope there will be a better solution!
 */
function waitForBackend(){
    setTimeout(renderAddContact, 400);
}



// function getBgColor(){
//     randomColor = Math.floor(Math.random()*16777215).toString(16);
//     return `#${randomColor}`;
//   }

/**
 * @returns new function for random color for contacts. Works hopfully better than the previous.
 */
  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }