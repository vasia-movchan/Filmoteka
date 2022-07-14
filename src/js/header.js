import { refs } from './refs.js';

export const controlPageHome = function () {
  refs.linkMyLibrary.classList.remove('current');
  refs.linkHome.classList.add('current', 'animate__animated', 'animate__fadeIn');
  refs.linkHome.style.setProperty('--animate-duration', '0.25s');
  refs.linkHome.addEventListener('animationend', () => {
    refs.linkHome.classList.remove('animate__animated', 'animate__fadeIn');
    refs.linkHome.style.removeProperty('--animate-duration', '0.25s');
  });
  refs.header.classList.remove('lib-bg');
  refs.header.classList.add('header-bg', 'animate__animated', 'animate__fadeIn');
  refs.header.style.setProperty('--animate-duration', '0.25s');
  refs.header.addEventListener('animationend', () => {
    refs.header.classList.remove('animate__animated', 'animate__fadeIn');
    refs.header.style.removeProperty('--animate-duration', '0.25s');
  });
  refs.searchForm.classList.remove('visually-hidden');
  refs.headerButtons.classList.add('visually-hidden', 'animate__animated', 'animate__fadeIn');
  refs.headerButtons.style.setProperty('--animate-duration', '0.25s');
  refs.headerButtons.addEventListener('animationend', () => {
    refs.headerButtons.classList.remove('animate__animated', 'animate__fadeIn');
    refs.headerButtons.style.removeProperty('--animate-duration', '0.25s');
  });
  refs.watchedLibrary.classList.remove('active-btn');
  refs.queueLibrary.classList.remove('active-btn');
};

export const controlPageLib = function (e) {
  refs.linkHome.classList.remove('current');
  refs.linkMyLibrary.classList.add('current', 'animate__animated', 'animate__fadeIn');
  refs.linkMyLibrary.style.setProperty('--animate-duration', '0.25s');
  refs.linkMyLibrary.addEventListener('animationend', () => {
    refs.linkMyLibrary.classList.remove('animate__animated', 'animate__fadeIn');
    refs.linkMyLibrary.style.removeProperty('--animate-duration', '0.25s');
  });
  refs.header.classList.remove('header-bg');
  refs.header.classList.add('lib-bg', 'animate__animated', 'animate__fadeIn');
  refs.header.style.setProperty('--animate-duration', '0.25s');
  refs.header.addEventListener('animationend', () => {
    refs.header.classList.remove('animate__animated', 'animate__fadeIn');
    refs.header.style.removeProperty('--animate-duration', '0.25s');
  });
  refs.headerButtons.classList.remove('visually-hidden');
  refs.searchForm.classList.add('visually-hidden', 'animate__animated', 'animate__fadeIn');
  refs.searchForm.style.setProperty('--animate-duration', '0.25s');
  refs.searchForm.addEventListener('animationend', () => {
    refs.searchForm.classList.remove('animate__animated', 'animate__fadeIn');
    refs.searchForm.style.removeProperty('--animate-duration', '0.25s');
  });
  refs.searchInput.value = '';
};

// refs.headerNavigation.addEventListener('click', evt => {
//   evt.preventDefault();

//   if (evt.target === refs.linkMyLibrary) {
//     controlPageLib();

//     refs.watchedLibrary.classList.remove('active-btn');
//     refs.queueLibrary.classList.remove('active-btn');
//     return;
//   } else if (evt.target === refs.linkHome) {
//     controlPageHome();

//     return;
//   }
// });

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
