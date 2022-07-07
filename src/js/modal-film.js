import { renderFilmModal } from './render-elements';
import { FilmApiService } from './api-service';
import { addFilmToWatched } from './my-library';

const refs = {
  modal: document.getElementById('myModal'),
  btn: document.getElementById('myBtn'),
  gallery: document.querySelector('.gallery'),
  filmModal: document.querySelector('.modal'),
  // span: document.getElementsByClassName("close")[0]
};

const filmApiService = new FilmApiService();

// document.addEventListener("DOMContentLoaded", () => {
//   if(refs.gallery) {
//     refs.gallery.addEventListener('click', openModalFilm)

//   }

// });

document.addEventListener('DOMContentLoaded', () => {
  if (refs.gallery) {
    refs.gallery.addEventListener('click', onMovieCardClick);
  }
});

async function onMovieCardClick(event) {
  event.preventDefault();
  if (!event.target.closest('.movie-card__link')) {
    console.log('Ну туда класцнул');
    return;
  }

  let movieID = event.target.closest('.movie-card__link').id;

  const response = await filmApiService.getMovieByID(movieID);
  const markup = renderFilmModal(response.data);
  refs.filmModal.insertAdjacentHTML('afterbegin', markup);
  refs.modal.style.display = 'block';

  // render text for button
  const addToWatched = document.querySelector('[data-watched]');
  const addToQueue = document.querySelector('[data-queue]');

  // render text for button WATCHED
  const filmsInWatched = localStorage.getItem('watched');
  try {
    const arrayfilmInWatched = JSON.parse(filmsInWatched);
    const filmIdInWatched = response.data.id;
    const filmInWatched = arrayfilmInWatched.find(elem => elem === filmIdInWatched);

    if (filmInWatched) {
      addToWatched.textContent = 'REMOVE FROM WATCHED';
      addToWatched.dataset.watched = 'add';
    }
  } catch (error) {}

  // render text for button QUEUE
  const filmsInQueue = localStorage.getItem('queue');
  try {
    const arrayfilmInQueue = JSON.parse(filmsInQueue);
    const filmIdInQueue = response.data.id;
    const filmInQueue = arrayfilmInQueue.find(elem => elem === filmIdInQueue);

    if (filmInQueue) {
      addToQueue.textContent = 'REMOVE FROM QUEUE';
      addToQueue.dataset.queue = 'add';
    }
  } catch (error) {}

  // add and remove film in watched locale storage

  addToWatched.addEventListener('click', () => {
    const filmIdForLocalStorage = response.data.id;

    const watchedInLocalStorage = localStorage.getItem('watched');

    if (addToWatched.dataset.watched === 'add') {
      try {
        const arrayWatchedInLocalStorage = JSON.parse(watchedInLocalStorage);
        const indexFilmInWatched = arrayWatchedInLocalStorage.findIndex(elem => elem === filmIdForLocalStorage);
        arrayWatchedInLocalStorage.splice(indexFilmInWatched, 1);
        const updateArrayWatchedInLocalStorage = JSON.stringify(arrayWatchedInLocalStorage);
        localStorage.setItem('watched', updateArrayWatchedInLocalStorage);
        addToWatched.textContent = 'ADD TO WATCHED';
        addToWatched.dataset.watched = '';
      } catch (error) {
        console.log('Parse error');
      }
    }

    try {
      const arrayWatchedInLocalStorage = watchedInLocalStorage ? JSON.parse(watchedInLocalStorage) : [];
      const uniqueID = arrayWatchedInLocalStorage.find(elem => elem === filmIdForLocalStorage);
      if (!uniqueID) {
        arrayWatchedInLocalStorage.push(filmIdForLocalStorage);
        const updateArrayWatchedInLocalStorage = JSON.stringify(arrayWatchedInLocalStorage);
        localStorage.setItem('watched', updateArrayWatchedInLocalStorage);
        addToWatched.textContent = 'REMOVE FROM WATCHED';
        addToWatched.dataset.watched = 'add';
      }
    } catch (error) {
      console.log('Parse error');
    }
  });

  // add and remove film in queue locale storage

  addToQueue.addEventListener('click', () => {
    const filmIdForLocalStorage = response.data.id;

    const QueueInLocalStorage = localStorage.getItem('queue');

    if (addToQueue.dataset.queue === 'add') {
      try {
        const arrayQueueInLocalStorage = JSON.parse(QueueInLocalStorage);
        const indexFilmInQueue = arrayQueueInLocalStorage.findIndex(elem => elem === filmIdForLocalStorage);
        arrayQueueInLocalStorage.splice(indexFilmInQueue, 1);
        const updateArrayQueueInLocalStorage = JSON.stringify(arrayQueueInLocalStorage);
        localStorage.setItem('queue', updateArrayQueueInLocalStorage);
        addToQueue.textContent = 'ADD TO QUEUE';
        addToQueue.dataset.queue = '';
      } catch (error) {
        console.log('Parse error');
      }
    }

    try {
      const arrayQueueInLocalStorage = QueueInLocalStorage ? JSON.parse(QueueInLocalStorage) : [];
      const uniqueID = arrayQueueInLocalStorage.find(elem => elem === filmIdForLocalStorage);
      if (!uniqueID) {
        arrayQueueInLocalStorage.push(filmIdForLocalStorage);
        const updateArrayQueueInLocalStorage = JSON.stringify(arrayQueueInLocalStorage);
        localStorage.setItem('queue', updateArrayQueueInLocalStorage);
        addToQueue.textContent = 'REMOVE FROM QUEUE';
        addToQueue.dataset.queue = 'add';
      }
    } catch (error) {
      console.log('Parse error');
    }
  });
}

// When the user clicks the button, open the modal

// When the user clicks on <span> (x), close the modal
// refs.span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == refs.modal) {
    refs.modal.style.display = 'none';
    refs.filmModal.innerHTML = '';
  }
};
