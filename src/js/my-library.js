import { refs } from './refs';

refs.linkMyLibrary.addEventListener('click', myLibrary);

function myLibrary() {
  refs.gallery.innerHTML = '';
  refs.pagination.classList.add('visually-hidden');
  const watchedFilms = localStorage.getItem('watched');
  console.log(watchedFilms);

  if (watchedFilms === null || watchedFilms === '[]') {
    refs.gallery.style.display = 'block';
    const libraryIsEmpty = `<li class ="empty-my-library"><p class = "title-empty-my-library">Your library is empty</p><img class="icon-empty-my-library" src="https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64711.jpg" alt ="not films here"></img></li>`;
    refs.gallery.innerHTML = libraryIsEmpty;
  }
}
