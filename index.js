//В идеале, я бы хотел вынести по модульно, отдельно IndexedDB сформировать как сущность и пользоваться внутри класс Address

let db;
let request = indexedDB.open("myDB", 1);

request.onupgradeneeded = (event) => {
  db = event.target.result;
  let address = db.createObjectStore("users", {autoIncrement: true});
}

request.onsuccess = (event) => {
  db = event.target.result;
}

request.onerror = (event) => {
  console.log(event.target.errorCode);
}

const buttonAdd = document.querySelector('#buttonAdd')
const nameEditInput = document.querySelector('#nameInput');
const numberEditInput = document.querySelector('#numberInput');
const addressEditInput = document.querySelector('#addressInput');
const errorName = document.querySelector('#error-name');
const errorNumber = document.querySelector('#error-number');
const errorAddress = document.querySelector('#error-address');

class Address {
  constructor() {
    this.name;
    this.addres;
  }

  editNameFunction = () => {
    const nameValue = nameEditInput.value;
  
    if ( nameValue.length < 2 && nameValue.length !==0 || nameValue.length > 30) {
      errorName.classList.remove('.error-hidden');
      errorName.textContent = 'Должно быть от 2 до 30 символов';
      return false
    } else if ( nameValue.length === 0) {
      errorName.classList.remove('.error-hidden');
      errorName.textContent = 'Это обязательное поле';
      return false
    } else {
      errorName.classList.add('.error-hidden');
      errorName.textContent = '';
      this.name = nameValue;
      return true
    }
  }

  editAddressFunction = () => {
    const addressValue = addressEditInput.value;
  
    if ( addressValue.length < 2 && addressValue.length !==0 || addressValue.length > 30) {
      errorAddress.classList.remove('.error-hidden');
      errorAddress.textContent = 'Должно быть от 2 до 30 символов';
      return false
    } else if ( addressValue.length === 0) {
      errorAddress.classList.remove('.error-hidden');
      errorAddress.textContent = 'Это обязательное поле';
      return false
    } else {
      errorAddress.classList.add('.error-hidden');
      errorAddress.textContent = '';
      this.address = addressValue;
      return true
    }
  }

  checkValidity = () => {
    if ( !this.editNameFunction() || !this.editAddressFunction() ) {
      buttonAdd.setAttribute('disabled', 'true');
      
    } else {
      buttonAdd.removeAttribute('disabled');
    }
  }
  //Здесь немного не доделано, нужно взять объект хранение и через for in пройтись для вложения в DOM
  getUsers = (db) => {
    let data = db.transaction(["users"], "readwrite");
    let dataStore = data.objectStore("users");
    console.log(dataStore)
  }

  addAddressDb = (db, name, address) => {
    let data = db.transaction(["users"], "readwrite");
    let dataStore = data.objectStore("users");
    let userAddress = {name: name, address: address};
    console.log(userAddress)
    dataStore.add(userAddress);
    data.oncomplete = () => {
      console.log('Completed')
    }
    data.onerror = (event) => {
      alert('error storing note ' + event.target.errorCode);
    }
  }

  addUser = () => {
    this.addAddressDb(db, this.name, this.address);
  }

}

let address = new Address;
nameEditInput.addEventListener('input', address.checkValidity);
addressEditInput.addEventListener('input', address.checkValidity);
buttonAdd.addEventListener('click', address.addUser);