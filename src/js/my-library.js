import { refs } from './refs';

refs.linkMyLibrary.addEventListener('click', myLibrary);

function myLibrary() {
  refs.gallery.innerHTML = '';
  refs.pagination.classList.add('visually-hidden');
  const watchedFilms = localStorage.getItem('watched');
  console.log(watchedFilms);

  if (watchedFilms === null || watchedFilms === '[]') {
    const libraryIsEmpty = `<p style="padding: 50px; text-align: center; min-height: calc(100vh - 295px);">Your library is empty</p>`;
    document.querySelector('main').innerHTML = libraryIsEmpty;
  }
}
