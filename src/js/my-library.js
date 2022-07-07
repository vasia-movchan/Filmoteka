import { refs } from './refs';

refs.linkMyLibrary.addEventListener('click', myLibrary);

function myLibrary() {
  refs.gallery.innerHTML = '';
  refs.pagination.classList.add('visually-hidden');
  const watched = localStorage.getItem('watched');

  if (watched === null) {
    const libraryIsEmpty = `<p style="padding: 50px; text-align: center; min-height: calc(100vh - 295px);">Your library is empty</p>`;
    document.querySelector('main').innerHTML = libraryIsEmpty;
  }

  try {
    const parseWatched = JSON.parse(watched);
    if (parseWatched.length > 20) {
      refs.pagination.classList.remove('visually-hidden');
    }

    console.log(parseWatched);
  } catch (error) {
    console.log('Parse Error');
  }
}
