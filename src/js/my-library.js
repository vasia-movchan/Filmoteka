import { refs } from './refs';

refs.linkMyLibrary.addEventListener('click', myLibrary);

function myLibrary() {
  refs.gallery.innerHTML = '';
  refs.pagination.classList.add('visually-hidden');
  const watchedFilms = localStorage.getItem('watched');
  console.log(watchedFilms);

  if (watchedFilms === null || watchedFilms === '[]') {
    refs.gallery.style.display = 'block';
    const libraryIsEmpty = `<li style="text-align: center;">Your library is empty</li>`;
    refs.gallery.innerHTML = libraryIsEmpty;
  }
}
