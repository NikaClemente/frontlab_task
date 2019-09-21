let userListElement = document.querySelector("#user_list");
let infoStatElement = document.querySelector("#stat");
let avatarUser;
let newUser;
let newUserText;

let dictAZ = "abcdefghijklmnopqrstuvwxyz";

let xhr = new XMLHttpRequest();

xhr.open('GET', 'https://api.randomuser.me/1.0/?results=50&nat=gb,us&inc=gender,name,location,email,phone,picture');
xhr.send();

let response;

xhr.onreadystatechange = function() {
  if (xhr.readyState != 4) return;

  userListElement.innerHTML = '';

  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    response = JSON.parse(xhr.responseText);

    createInfoStat(response);
    createUserList(response);
  }

}

userListElement.innerHTML = 'Загружаю...';


let modal = document.querySelector("#modal"),
    modal_sort = document.querySelector("#modal_sort"),
		modalOverlay = document.querySelector("#modal-overlay"),
    closeButton = document.querySelector("#close-button"),
    closeSortButton = document.querySelector("#close-button-sort");

closeButton.addEventListener("click", function() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

let openSortButton = document.querySelector(".sort_button");
openSortButton.addEventListener("click", function() {
  optionsVariantUnVisible();
  document.querySelector("#options_variantChoice1").checked = false;
  document.querySelector("#options_variantChoice2").checked = false;
  document.querySelector("#options_variantChoice3").checked = false;
  modal_sort.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
  
});
closeSortButton.addEventListener("click", function() {
  modal_sort.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
});

let srAlfElement = document.querySelector(".modal_sort_srAlf_select");

for (let index = 0; index < dictAZ.length; index++) {
  let element = document.createElement('option');
  element.setAttribute("value", dictAZ[index]);
  element.textContent = dictAZ[index];
  srAlfElement.appendChild(element);
}

function createUserList(data) {
  
  while (userListElement.firstChild) {
    userListElement.removeChild(userListElement.firstChild);
  }

  for (const key in data.results) {
    // Create box for avatar and nameUser
    let newUserElement = document.createElement('div');
    newUserElement.className = 'newUserElement';
    newUserElement.setAttribute("idUser", key)
    newUserElement.addEventListener("click", clickUserElement);
    userListElement.appendChild(newUserElement);

    // Add avatar
    avatarUser = document.createElement('img');
    avatarUser.className = 'avatarUser';
    avatarUser.setAttribute("src", data.results[key].picture.medium);
    newUserElement.appendChild(avatarUser);

    // Add userName
    newUserText = data.results[key].name.title + ". " + ucFirst(data.results[key].name.first) + " " + ucFirst(data.results[key].name.last);
    newUser = document.createElement('div');
    newUser.className = 'nameUser';
    newUser.textContent = newUserText;
    newUserElement.appendChild(newUser);
  }
}


function createInfoStat(data) {
  let infoStatSeed = document.createElement('span');
  infoStatSeed.className = 'statElement infoStatSeed';
  infoStatSeed.textContent = "Seed: " + data.info.seed;

  let infoStatResults = document.createElement('span');
  infoStatResults.className = 'statElement infoStatResult';
  infoStatResults.textContent = "Results: " + data.info.results;

  let infoStatPage = document.createElement('span');
  infoStatPage.className = 'statElement infoStatPage';
  infoStatPage.textContent = "Page: " + data.info.page;

  let infoStatVersion = document.createElement('span');
  infoStatVersion.className = 'statElement infoStatVersion';
  infoStatVersion.textContent = "Version: " + data.info.version;

  infoStatElement.appendChild(infoStatSeed);
  infoStatElement.appendChild(infoStatResults);
  infoStatElement.appendChild(infoStatPage);
  infoStatElement.appendChild(infoStatVersion);
}

// Open modal window
function clickUserElement() {
  modal.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");

  let user_avatarL = document.querySelector(".user_avatarL"),
    user_FIO = document.querySelector(".user_FIO"),
    user_street = document.querySelector(".user_street"),
    user_city = document.querySelector(".user_city"),
    user_state = document.querySelector(".user_state"),
    user_email = document.querySelector(".user_email"),
    user_phone = document.querySelector(".user_phone");

  
  user_avatarL.setAttribute("src", response.results[this.getAttribute("iduser")].picture.large)
  let fio = response.results[this.getAttribute("iduser")].name.title + ". " + ucFirst(response.results[this.getAttribute("iduser")].name.first) + " " + ucFirst(response.results[this.getAttribute("iduser")].name.last);    
  user_FIO.innerHTML = fio;
  user_street.innerHTML = response.results[this.getAttribute("iduser")].location.street;
  user_city.innerHTML = ucFirst(response.results[this.getAttribute("iduser")].location.city);
  user_state.innerHTML = ucFirst(response.results[this.getAttribute("iduser")].location.state);
  user_email.innerHTML = response.results[this.getAttribute("iduser")].email;
  user_phone.innerHTML = response.results[this.getAttribute("iduser")].phone;


}

function ucFirst(str) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

function optionsVariantUnVisible() {
  document.querySelector(".standart_sort").style.display='none';
  document.querySelector(".search_word").style.display='none';
  document.querySelector(".search_alf").style.display='none';
  document.querySelector(".close-button_sort").style.display='none';
  document.querySelector(".close-button_word").style.display='none';
  document.querySelector(".close-button_alf").style.display='none';
}


function setOption(option) {
  optionsVariantUnVisible();
  switch (option) {
    case "stSort":
      document.querySelector(".standart_sort").style.display='block';
      document.querySelector(".close-button_sort").style.display='block';
      break;
    case "srWord":
      document.querySelector(".search_word").style.display='block';
      document.querySelector(".close-button_word").style.display='block';
      break;
    case "srAlf":
      document.querySelector(".search_alf").style.display='block';
      document.querySelector(".close-button_alf").style.display='block';
      break;
    default:
      break;
  }
}

function closeSortButtonFiltered() {
  modal_sort.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");

  let selectSort = document.querySelector(".modal_sort_stSort_select");
  let selectPoleSort = document.querySelector(".modal_sort_poleSort_select");
  let key = selectSort.options[selectSort.selectedIndex].value;
  let pole = selectPoleSort.options[selectPoleSort.selectedIndex].value;

  sort(key, pole);
};

function closeWordButtonFiltered(){
  let selectSort = document.querySelector(".modal_sort_srWord_text");
  let selectPoleSort = document.querySelector(".modal_sort_srWord_select");
  let word = selectSort.value;
  let pole = selectPoleSort.options[selectPoleSort.selectedIndex].value;

  search(word, pole);
};

function closeAlfButtonFiltered(){
  modal_sort.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");

  let selectSort = document.querySelector(".modal_sort_srAlf_select");
  let selectPoleSort = document.querySelector(".modal_sort_srAlfPole_select");
  let alf = selectSort.options[selectSort.selectedIndex].value;
  let pole = selectPoleSort.options[selectPoleSort.selectedIndex].value;

  searchAlf(alf, pole);
};

function sort(key, pole) {
  response.results.sort(function(obj1, obj2) {
    if (pole == "first") {
      let a1 = obj1.name.first.toLowerCase();
      let b1 = obj2.name.first.toLowerCase();
    }

    if (pole == "last") {
      let a1 = obj1.name.last.toLowerCase();
      let b1 = obj2.name.last.toLowerCase();
    }

    if (key == "alf") {
      return a1<b1 ?-1: a1>b1 ?1 :0;
    }
    if (key == "un_alf") {
      return a1>b1 ?-1: a1>b1 ?1 :0;
    }
    
  });

  createUserList(response);
}

function search(word, pole) {
  let searchFinish = {};
  let results = [];
  
  for (const key in response.results) {
    if (response.results[key].name.first == word.toLowerCase() && pole == "srFirst") {
      results.push(response.results[key]);
    }

    if (response.results[key].name.last == word.toLowerCase() && pole == "srLast") {
      results.push(response.results[key]);
    }
  }
  
  searchFinish.results = results;

  if (word != "") {
    createUserList(searchFinish);
    modal_sort.classList.toggle("closed");
    modalOverlay.classList.toggle("closed");
  } else {
    alert("Введите слово для поиска!");
  }
  
}

function searchAlf(alf, pole) {
  let searchFinish = {};
  let results = [];
  
  for (const key in response.results) {
    if (response.results[key].name.first[0] == alf && pole == "srAlfFirst") {
      results.push(response.results[key]);
    }

    if (response.results[key].name.last[0] == alf && pole == "srAlfLast") {
      results.push(response.results[key]);
    }
  }
  
  searchFinish.results = results;
  createUserList(searchFinish);
}

function deleteSort() {
  createUserList(response);
  modal_sort.classList.toggle("closed");
  modalOverlay.classList.toggle("closed");
}

function linkVK() {
  window.open('https://vk.com/nikaclemente');
} 
