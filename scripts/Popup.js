export default class Popup {
  open(container) {
      container.classList.add('popup_is-opened');
  }

  close(container) {
      container.classList.remove('popup_is-opened');
  }
}