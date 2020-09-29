import Popup from './scripts/Popup.js';
import AddressValidation from './scripts/AddressValidation.js';


const openButton = document.querySelector('#buttonAddMain');
const closeButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const buttonAdd = document.querySelector('#buttonAdd')
const nameEditInput = document.querySelector('#nameInput');
const addressEditInput = document.querySelector('#addressInput');
const container = document.querySelector('.data');
const nameInputEditPopup = document.querySelector('#nameInputEdit');
const addressInputEditPopup = document.querySelector('#addressInputEdit');
const editClose = document.querySelector('#editClose');
const addEdit = document.querySelector('#buttonAddEdit');

const classPopup = new Popup;
const valid = new AddressValidation;
var addressBook = [];

function jsonStructure(fullname, address){
  this.fullname = fullname;
  this.address = address;
}

function addToBook(){
  let obj = new jsonStructure(nameEditInput.value, addressEditInput.value);
  addressBook.push(obj);
  localStorage['addbook'] = JSON.stringify(addressBook);
  showAddressBook();
  classPopup.close(popup)
}

function removeEntry(e){
  if(e.target.classList.contains('delbutton')){
    var remID = e.target.getAttribute('data-id');
    addressBook.splice(remID,1);
    localStorage['addbook'] = JSON.stringify(addressBook);
    showAddressBook();
  }
}

function changeEntry(e){
  if(e.target.classList.contains('button')){
    let raw = localStorage.getItem('addbook');
    let change = JSON.parse(raw);
    console.log(change, 0)
    change[0].fullname = nameInputEditPopup.value;
    change[0].address = addressInputEditPopup.value;
    localStorage['addbook'] = JSON.stringify(change);
    showAddressBook();
    classPopup.close(editPopup)
  }
}

function showAddressBook(){
  if(localStorage['addbook'] === undefined){
    localStorage['addbook'] = '';
  } else {
    addressBook = JSON.parse(localStorage['addbook']);
    //Я понимаю, что innerHTML не следует использовать с точки зрения безопасности, но для тестового я решил, что пойдет из-за простоты
    container.innerHTML = '';
    for(let item in addressBook){
      let str = '<div class="data__element">';
        str += '<p class="element__name">' + addressBook[item].fullname + '</p>';
        str += '<p class="element__address">' + addressBook[item].address + '</p>';
        str += '<div class="del"><a href="#" class="delbutton" data-id="' + item + '">Delete</a></div>';
        str += '<button id="buttonEdit" type="button" data-id="' + item + '" class="button popup__button edit">Edit</button>';
        str += '</div>';
      container.innerHTML += str;
    }
  }
}

showAddressBook();
const editPopup = document.querySelector('#popupEdit');

addEdit.addEventListener("click", changeEntry);

buttonAdd.addEventListener("click", addToBook);
container.addEventListener("click", removeEntry);
editClose.addEventListener("click", function() {
  classPopup.close(editPopup)
})
container.addEventListener("click", function() {
  classPopup.open(editPopup)
})
openButton.addEventListener("click", function() {
  classPopup.open(popup);
});
closeButton.addEventListener("click", function() {
  classPopup.close(popup);
});
nameEditInput.addEventListener("input", valid.checkValidity);
addressEditInput.addEventListener("input", valid.checkValidity);
buttonAdd.addEventListener("click", valid.addUser);