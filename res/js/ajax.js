let userListElement = document.getElementById("user_list");
let newUser;
let newUserText;

var xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture', false);
xhr.send();

if (xhr.status != 200) {
  alert( xhr.status + ': ' + xhr.statusText );
} else {
    var response = JSON.parse(xhr.responseText);
    createUserList(response);
}

function createUserList(data) {
  for (const key in data.results) {
    // console.log( data.results[key].name.first );
    newUserText = data.results[key].name.title + ". " + data.results[key].name.first + " " + data.results[key].name.last
    newUser = document.createElement('div');
    newUser.className = 'newUser';
    newUser.textContent = newUserText;
    newUser.addEventListener("click", clickUserElement);
    userListElement.appendChild(newUser);
  }
}

function clickUserElement() {
  alert(this.innerHTML);
}
