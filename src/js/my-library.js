import { refs } from './refs';
import { renderMovieCard } from './render-elements';
import { FilmApiService } from './api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { onLogoHomeClick } from './load-homepage';

// refs.linkMyLibrary.addEventListener('click', myLibrary);
refs.watchedLibrary.addEventListener('click', clearGallery);
refs.watchedLibrary.addEventListener('click', onWatchedLibrary);
refs.queueLibrary.addEventListener('click', clearGallery);
refs.queueLibrary.addEventListener('click', onQueueLibrary);

const filmApiService = new FilmApiService();


export function MyLibraryNoLogin () {
  Notify.warning("To access the library - please authorize", {
    timeout: 2000,
    position: 'center-top',

  });
}



export function myLibrary() {
  clearGallery();
  refs.pagination.classList.add('visually-hidden');
  const queueFilms = localStorage.getItem('queue');
  const watchedFilms = localStorage.getItem('watched');
  const queueEmpty = queueFilms === null || queueFilms === '[]';
  const watchedEmpty = watchedFilms === null || watchedFilms === '[]';

  if (queueEmpty && watchedEmpty) {
    refs.gallery.style.display = 'block';
    const libraryIsEmpty = `<li class ="empty-my-library"><p class="title-empty-my-library">Your library is empty</p><img class="icon-empty-my-library" src="https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64711.jpg" alt ="not films here"></img></li>`;
    refs.gallery.innerHTML = libraryIsEmpty;
  }

  if (!queueEmpty) {
    onQueueLibrary();
  }

  if (!watchedEmpty) {
    onWatchedLibrary();
  }
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

export function onQueueLibrary() {
  // refs.gallery.innerHTML = '';
  const queueFilms = localStorage.getItem('queue');
  if (queueFilms === null || queueFilms === '[]') {
    refs.gallery.style.display = 'block';
    const libraryIsEmpty = `<li class ="empty-my-library"><p class = "title-empty-my-library">Your movie queue is empty</p><img class="icon-empty-my-library" src="https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64711.jpg" alt ="not films here"></img></li>`;
    refs.gallery.innerHTML = libraryIsEmpty;
  } else {
    try {
      refs.gallery.style.display = 'grid';
      const arrayQueueFilms = JSON.parse(queueFilms);
      arrayQueueFilms.map(film => getFilmDataFromLocalStorage(film));
    } catch (error) {
      refs.gallery.style.display = 'block';
      const parseError = `<li style="text-align: center;">Failed to load library queue movies</li>`;
      refs.gallery.innerHTML = parseError;
    }
  }
}

export function onWatchedLibrary() {
  // refs.gallery.innerHTML = '';
  const watchedFilms = localStorage.getItem('watched');
  if (watchedFilms === null || watchedFilms === '[]') {
    refs.gallery.style.display = 'block';
    const libraryIsEmpty = `<li class ="empty-my-library"><p class = "title-empty-my-library">Your library of watched movies is empty</p><img class="icon-empty-my-library" src="https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64711.jpg" alt ="not films here"></img></li>`;
    refs.gallery.innerHTML = libraryIsEmpty;
  } else {
    try {
      refs.gallery.style.display = 'grid';
      const arrayWatchedFilms = JSON.parse(watchedFilms);

      arrayWatchedFilms.map(film => getFilmDataFromLocalStorage(film));
    } catch (error) {
      refs.gallery.style.display = 'block';
      const parseError = `<li style="text-align: center;">Failed to load library watched movies</li>`;
      refs.gallery.innerHTML = parseError;
    }
  }
}

// async function getFilmDataFromApi(id) {
//   const response = await filmApiService.getMovieByID(id);
//   const markup = renderMovieCard(response.data);
//   refs.gallery.insertAdjacentHTML('afterbegin', markup);
//   const genresInfo = document.querySelector('.movie-card__info');
//   const genresCount = response.data.genres.length;
//   let genresName = [];
//   if (genresCount < 3) {
//     for (let i = 0; i < genresCount; i += 1) {
//       genresName.push(response.data.genres[i].name);
//     }
//   } else {
//     for (let i = 0; i < 2; i += 1) {
//       genresName.push(response.data.genres[i].name);
//     }
//     genresName.push('Other');
//   }
//   const genresList = genresName.join(', ');
//   genresInfo.textContent = `${genresList} | ${response.data.release_date.slice(0, 4)}`;
// }

function getFilmDataFromLocalStorage(film) {
  const markup = renderMovieCard(film);
  refs.gallery.insertAdjacentHTML('afterbegin', markup);
  const genresInfo = document.querySelector('.movie-card__info');
  const genresCount = film.genres.length;

  let genresName = [];
  if (genresCount < 3) {
    for (let i = 0; i < genresCount; i += 1) {
      genresName.push(film.genres[i].name);
    }
  } else {
    for (let i = 0; i < 2; i += 1) {
      genresName.push(film.genres[i].name);
    }
    genresName.push('Other');
  }
  const genresList = genresName.join(', ');
  genresInfo.textContent = `${genresList} | ${film.release_date.slice(0, 4)}`;
}

