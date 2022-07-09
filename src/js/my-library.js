import { refs } from './refs';
import { renderMovieCard } from './render-elements';
import { FilmApiService } from './api-service';

refs.linkMyLibrary.addEventListener('click', myLibrary);
refs.watchedLibrary.addEventListener('click', onWatchedLibrary);
refs.queueLibrary.addEventListener('click', onQueueLibrary);

const filmApiService = new FilmApiService();

function myLibrary() {
  refs.gallery.style.display = 'block';
  const libraryIsEmpty = `<li class ="empty-my-library"><p class="title-empty-my-library">Your library is empty</p><img class="icon-empty-my-library" src="https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64711.jpg" alt ="not films here"></img></li>`;
  refs.gallery.innerHTML = libraryIsEmpty;
  refs.pagination.classList.add('visually-hidden');
  const queueFilms = localStorage.getItem('queue');
  const watchedFilms = localStorage.getItem('watched');

  if (!(queueFilms === null || queueFilms === '[]')) {
    onQueueLibrary();
  }

  if (!(watchedFilms === null || watchedFilms === '[]')) {
    onWatchedLibrary();
  }
}

function onQueueLibrary() {
  refs.gallery.innerHTML = '';
  const queueFilms = localStorage.getItem('queue');
  if (queueFilms === null || queueFilms === '[]') {
    refs.gallery.style.display = 'block';
    const libraryIsEmpty = `<li style="text-align: center;">Your queue is empty</li>`;
    refs.gallery.innerHTML = libraryIsEmpty;
  } else {
    try {
      refs.gallery.style.display = 'grid';
      const arrayQueueFilms = JSON.parse(queueFilms);
      const response = arrayQueueFilms.map(id => getFilmDataFromApi(id));
    } catch (error) {
      refs.gallery.style.display = 'block';
      const parseError = `<li style="text-align: center;">Failed to load library queue movies</li>`;
      refs.gallery.innerHTML = parseError;
    }
  }
}

function onWatchedLibrary() {
  refs.gallery.innerHTML = '';
  const watchedFilms = localStorage.getItem('watched');
  if (watchedFilms === null || watchedFilms === '[]') {
    refs.gallery.style.display = 'block';
    const libraryIsEmpty = `<li class ="empty-my-library"><p class = "title-empty-my-library">Your library is empty</p><img class="icon-empty-my-library" src="https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64711.jpg" alt ="not films here"></img></li>`;

refs.gallery.innerHTML = libraryIsEmpty;
  } else {
    try {
      refs.gallery.style.display = 'grid';
      const arrayWatchedFilms = JSON.parse(watchedFilms);
      const response = arrayWatchedFilms.map(id => getFilmDataFromApi(id));
    } catch (error) {
      refs.gallery.style.display = 'block';
      const parseError = `<li style="text-align: center;">Failed to load library watched movies</li>`;
      refs.gallery.innerHTML = parseError;
    }
  }
}

async function getFilmDataFromApi(id) {
  const response = await filmApiService.getMovieByID(id);
  //   console.log(response);
  const markup = renderMovieCard(response.data);
  refs.gallery.insertAdjacentHTML('afterbegin', markup);
  const genresInfo = document.querySelector('.movie-card__info');
  const genresCount = response.data.genres.length;
  //   console.log(genresCount);
  genresInfo.textContent = `${response.data.genres[0].name}, ${
    response.data.genres[1].name
  } | ${response.data.release_date.slice(0, 4)}`;
}
