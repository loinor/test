const nameEditInput = document.querySelector('#nameInput');
const addressEditInput = document.querySelector('#addressInput');
const errorName = document.querySelector('#error-name');
const errorAddress = document.querySelector('#error-address');
const buttonAdd = document.querySelector('#buttonAdd');

export default class AddressValidation {
  constructor() {
    this.name;
    this.address;
    this.addressBook = [];
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
}