import { refs } from './refs';

export default class Spinner {
  constructor(element) {
    this.spinner = element;
  }

  on() {
    this.spinner.classList.remove('visually-hidden');
  }

  off() {
    this.spinner.classList.add('visually-hidden');
  }
}
