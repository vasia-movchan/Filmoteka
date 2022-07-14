import { renderFilmModal } from './render-elements';
import { FilmApiService } from './api-service';
import { showTrailer } from './trailer';
import { refs } from './refs';
import { onWatchedLibrary, onQueueLibrary, myLibrary, clearGallery } from './my-library';

const filmApiService = new FilmApiService();

const scrollBtn = document.querySelector('.scrollBtn');

document.addEventListener('DOMContentLoaded', () => {
  if (refs.gallery) {
    refs.gallery.addEventListener('click', onMovieCardClick);
  }
});

function closeFilmModal() {
  refs.modal.style.display = 'none';
  refs.filmModal.innerHTML = '';
  document.body.style.overflow = 'auto';
}

async function onMovieCardClick(event) {
  event.preventDefault();

  scrollBtn.classList.remove('showBtn');
  document.body.style.overflow = 'hidden';

  if (!event.target.closest('.movie-card__link')) {
    return;
  }
  window.addEventListener('keydown', onKeyPress);
  let movieID = event.target.closest('.movie-card__link').id;

  const response = await filmApiService.getMovieByID(movieID);

  const markup = renderFilmModal(response.data);
  refs.filmModal.insertAdjacentHTML('afterbegin', markup);
  refs.modal.style.display = 'block';
  refs.modal.classList.add('animate__animated', 'animate__fadeIn');
  refs.modal.style.setProperty('--animate-duration', '0.5s');
  refs.modal.addEventListener('animationend', () => {
    refs.modal.classList.remove('animate__animated', 'animate__fadeIn');
    refs.modal.style.removeProperty('--animate-duration', '0.5s');
  });

  // render text for button
  const trailer = document.querySelector('.trailer');
  const addToWatched = document.querySelector('[data-watched]');
  const addToQueue = document.querySelector('[data-queue]');
  const closeBtn = document.querySelector('.modal-film_button-close');

  trailer.addEventListener('click', showTrailer);
  closeBtn.addEventListener('click', closeFilmModal);

  // render text for button WATCHED
  const filmsInWatched = localStorage.getItem('watched');

  try {
    const arrayfilmInWatched = JSON.parse(filmsInWatched);
    const filmIdInWatched = response.data.id;
    const filmInWatched = arrayfilmInWatched.find(elem => elem.id === filmIdInWatched);

    if (filmInWatched) {
      addToWatched.textContent = 'REMOVE FROM WATCHED';
      addToWatched.dataset.watched = 'add';
      addToWatched.classList.add('modal-film_active-btn');
    }
  } catch (error) {}

  // render text for button QUEUE

  const filmsInQueue = localStorage.getItem('queue');
  try {
    const arrayfilmInQueue = JSON.parse(filmsInQueue);
    const filmIdInQueue = response.data.id;
    const filmInQueue = arrayfilmInQueue.find(elem => elem.id === filmIdInQueue);

    if (filmInQueue) {
      addToQueue.textContent = 'REMOVE FROM QUEUE';
      addToQueue.dataset.queue = 'add';
      addToQueue.classList.add('modal-film_active-btn');
    }
  } catch (error) {}

  // add and remove film in watched locale storage

  addToWatched.addEventListener('click', () => {
    const filmIdForLocalStorage = response.data.id;
    const filmDataForLocalStorage = response.data;

    const watchedInLocalStorage = localStorage.getItem('watched');

    if (addToWatched.dataset.watched === 'add') {
      try {
        // remove from watched

        const arrayWatchedInLocalStorage = JSON.parse(watchedInLocalStorage);
        const indexFilmInWatched = arrayWatchedInLocalStorage.findIndex(
          elem => elem.id === filmIdForLocalStorage
        );
        arrayWatchedInLocalStorage.splice(indexFilmInWatched, 1);
        const updateArrayWatchedInLocalStorage = JSON.stringify(arrayWatchedInLocalStorage);
        localStorage.setItem('watched', updateArrayWatchedInLocalStorage);
        addToWatched.textContent = 'ADD TO WATCHED';
        addToWatched.dataset.watched = '';
        addToWatched.classList.remove('modal-film_active-btn');

        if (
          refs.linkMyLibrary.classList.contains('current') &&
          refs.watchedLibrary.classList.contains('active-btn')
        ) {
          clearGallery();
          onWatchedLibrary();
        }

        if (
          refs.linkMyLibrary.classList.contains('current') &&
          !refs.watchedLibrary.classList.contains('active-btn') &&
          !refs.queueLibrary.classList.contains('active-btn')
        ) {
          myLibrary();
        }
      } catch (error) {
        console.log('Parse error');
      }
    }

    try {
      const arrayWatchedInLocalStorage = watchedInLocalStorage
        ? JSON.parse(watchedInLocalStorage)
        : [];
      const uniqueID = arrayWatchedInLocalStorage.find(elem => elem.id === filmIdForLocalStorage);
      if (!uniqueID) {
        // add to watched

        arrayWatchedInLocalStorage.push(filmDataForLocalStorage);
        const updateArrayWatchedInLocalStorage = JSON.stringify(arrayWatchedInLocalStorage);
        localStorage.setItem('watched', updateArrayWatchedInLocalStorage);
        addToWatched.textContent = 'REMOVE FROM WATCHED';
        addToWatched.dataset.watched = 'add';
        addToWatched.classList.add('modal-film_active-btn');

        if (
          refs.linkMyLibrary.classList.contains('current') &&
          refs.watchedLibrary.classList.contains('active-btn')
        ) {
          clearGallery();
          onWatchedLibrary();
        }

        // remove from queue

        const queueInLocalStorage = localStorage.getItem('queue');

        try {
          const arrayQueueInLocalStorage = queueInLocalStorage
            ? JSON.parse(queueInLocalStorage)
            : [];
          const indexFilmInQueue = arrayQueueInLocalStorage.findIndex(
            elem => elem.id === filmIdForLocalStorage
          );

          if (indexFilmInQueue >= 0) {
            arrayQueueInLocalStorage.splice(indexFilmInQueue, 1);
          }
          const updateArrayQueueInLocalStorage = JSON.stringify(arrayQueueInLocalStorage);
          localStorage.setItem('queue', updateArrayQueueInLocalStorage);
          addToQueue.textContent = 'ADD TO QUEUE';
          addToQueue.dataset.queue = '';
          addToQueue.classList.remove('modal-film_active-btn');

          if (
            refs.linkMyLibrary.classList.contains('current') &&
            refs.queueLibrary.classList.contains('active-btn')
          ) {
            clearGallery();
            onQueueLibrary();
          }

          if (
            refs.linkMyLibrary.classList.contains('current') &&
            !refs.watchedLibrary.classList.contains('active-btn') &&
            !refs.queueLibrary.classList.contains('active-btn')
          ) {
            myLibrary();
          }
        } catch (error) {
          console.log('Parse error');
        }
      }
    } catch (error) {
      console.log('Parse error');
    }
  });

  // add and remove film in queue locale storage

  addToQueue.addEventListener('click', () => {
    const filmIdForLocalStorage = response.data.id;
    const filmDataForLocalStorage = response.data;

    const queueInLocalStorage = localStorage.getItem('queue');

    if (addToQueue.dataset.queue === 'add') {
      try {
        // remove from queue

        const arrayQueueInLocalStorage = JSON.parse(queueInLocalStorage);
        const indexFilmInQueue = arrayQueueInLocalStorage.findIndex(
          elem => elem.id === filmIdForLocalStorage
        );
        arrayQueueInLocalStorage.splice(indexFilmInQueue, 1);
        const updateArrayQueueInLocalStorage = JSON.stringify(arrayQueueInLocalStorage);
        localStorage.setItem('queue', updateArrayQueueInLocalStorage);
        addToQueue.textContent = 'ADD TO QUEUE';
        addToQueue.dataset.queue = '';
        addToQueue.classList.remove('modal-film_active-btn');

        if (
          refs.linkMyLibrary.classList.contains('current') &&
          refs.queueLibrary.classList.contains('active-btn')
        ) {
          clearGallery();
          onQueueLibrary();
        }

        if (
          refs.linkMyLibrary.classList.contains('current') &&
          !refs.watchedLibrary.classList.contains('active-btn') &&
          !refs.queueLibrary.classList.contains('active-btn')
        ) {
          myLibrary();
        }
      } catch (error) {
        console.log('Parse error');
      }
    }

    try {
      const arrayQueueInLocalStorage = queueInLocalStorage ? JSON.parse(queueInLocalStorage) : [];
      const uniqueID = arrayQueueInLocalStorage.find(elem => elem.id === filmIdForLocalStorage);
      if (!uniqueID) {
        // add to queue

        arrayQueueInLocalStorage.push(filmDataForLocalStorage);
        const updateArrayQueueInLocalStorage = JSON.stringify(arrayQueueInLocalStorage);
        localStorage.setItem('queue', updateArrayQueueInLocalStorage);
        addToQueue.textContent = 'REMOVE FROM QUEUE';
        addToQueue.dataset.queue = 'add';
        addToQueue.classList.add('modal-film_active-btn');

        if (
          refs.linkMyLibrary.classList.contains('current') &&
          refs.queueLibrary.classList.contains('active-btn')
        ) {
          clearGallery();
          onQueueLibrary();
        }

        // remove from watched

        const watchedInLocalStorage = localStorage.getItem('watched');

        try {
          const arrayWatchedInLocalStorage = watchedInLocalStorage
            ? JSON.parse(watchedInLocalStorage)
            : [];

          const indexFilmInWatched = arrayWatchedInLocalStorage.findIndex(
            elem => elem.id === filmIdForLocalStorage
          );

          if (indexFilmInWatched >= 0) {
            arrayWatchedInLocalStorage.splice(indexFilmInWatched, 1);
          }
          const updateArrayWatchedInLocalStorage = JSON.stringify(arrayWatchedInLocalStorage);
          localStorage.setItem('watched', updateArrayWatchedInLocalStorage);
          addToWatched.textContent = 'ADD TO WATCHED';
          addToWatched.dataset.watched = '';
          addToWatched.classList.remove('modal-film_active-btn');

          if (
            refs.linkMyLibrary.classList.contains('current') &&
            refs.watchedLibrary.classList.contains('active-btn')
          ) {
            clearGallery();
            onWatchedLibrary();
          }

          if (
            refs.linkMyLibrary.classList.contains('current') &&
            !refs.watchedLibrary.classList.contains('active-btn') &&
            !refs.queueLibrary.classList.contains('active-btn')
          ) {
            myLibrary();
          }
        } catch (error) {
          console.log('Parse error');
        }
      }
    } catch (error) {
      console.log('Parse error');
    }
  });
}

function onKeyPress(e) {
  if (e.code === 'Escape') {
    closeFilmModal();
  }
}

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', onClickClose);

function onClickClose(e) {
  if (e.target == refs.modal) {
    refs.modal.style.display = 'none';
    refs.filmModal.innerHTML = '';
    document.body.style.overflow = 'auto';
  }
}
