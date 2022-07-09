import { refs } from './refs.js';

export const controlPageHome = function () {
  refs.linkMyLibrary.classList.remove('current');
  refs.linkHome.classList.add('current');
  refs.header.classList.remove('lib-bg');
  refs.header.classList.add('header-bg');
  refs.searchForm.classList.remove('visually-hidden');
  refs.headerButtons.classList.add('visually-hidden');
  refs.watchedLibrary.classList.remove('active-btn');
  refs.queueLibrary.classList.remove('active-btn');
};
const controlPageLib = function (e) {
  refs.linkHome.classList.remove('current');
  refs.linkMyLibrary.classList.add('current');
  refs.header.classList.remove('header-bg');
  refs.header.classList.add('lib-bg');
  refs.headerButtons.classList.remove('visually-hidden');
  refs.searchForm.classList.add('visually-hidden');
  refs.searchInput.value = '';
};

refs.headerNavigation.addEventListener('click', evt => {
  evt.preventDefault();

  if (evt.target === refs.linkMyLibrary) {
    controlPageLib();

    refs.watchedLibrary.classList.remove('active-btn');
    refs.queueLibrary.classList.remove('active-btn');
    return;
  } else if (evt.target === refs.linkHome) {
    controlPageHome();

    return;
  }
});

refs.logoHome.addEventListener('click', evt => {
  evt.preventDefault();
  controlPageHome();
});

const buttons = document.querySelectorAll('.button_lib');
for (const button of buttons) {
  button.addEventListener('click', function () {
    buttons.forEach(i => i.classList.remove('active-btn'));
    this.classList.toggle('active-btn');
  });
}
