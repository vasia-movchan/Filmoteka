import oopsImage from '../images/gallery/oops.png';
import noPoster from '../images/gallery/no-poster.png';

export function renderMovieCard({ poster_path, id, title, genres, release_date, vote_average }) {
  let BASE_URL = 'https://image.tmdb.org/t/p/w500';

  if (poster_path === null) {
    BASE_URL = '';
    poster_path = noPoster;
  }
  if (release_date === undefined) {
    release_date = 'n/a';
  }
  if (genres === '') {
    genres = 'Unknown';
  }

  return `<li id="${id}" class="movie-card" data-card>
      <a id="${id}" class="movie-card__link link" href="#">
        <img id="${id}" class="movie-card__image" src="${BASE_URL}${poster_path}" loading="lazy" alt="movie poster">
        <p id="${id}" class="movie-card__title">${title}</p>
        <div ${id} class="movie-card__wrapper">
          <p id="${id}" class="movie-card__info">${genres} | ${release_date.slice(0, 4)}</p>
          <div id="${id}" class="movie-card__rating">
            <div id="${id}" class="movie-card__rating-icon" width="14" height="14"></div>
            <p id="${id}" class="movie-card__rating-number">${vote_average.toFixed(1)}</p>
          </div>
        </div>
      </a>
    </li>`;
}

export function renderOopsNoResults() {
  return `<img class="warning__no-results" src="${oopsImage}" alt="oops no results">`;
}

export function renderFilmModal({
  poster_path,
  original_title,
  vote_count,
  vote_average,
  popularity,
  overview,
  genres,
}) {
  let BASE_URL = 'https://image.tmdb.org/t/p/';
  const original = 'original';
  const w500 = 'w500';
  const w300 = 'w300';

  return `  
      <div class="modal-film">
      <div class="modal-film_poster">

          <picture>
          <source srcset="
          ${BASE_URL}${original}${poster_path} 1x,
          ${BASE_URL}${original}${poster_path} 2x
          " 
          media="(min-width: 1024px)"
          >
          <source srcset="
          ${BASE_URL}${w500}${poster_path} 1x,
          ${BASE_URL}${w500}${poster_path} 2x
          " 
          media="(min-width: 768px)"
          >
          <source srcset="
          ${BASE_URL}${w300}${poster_path} 1x,
          ${BASE_URL}${w300}${poster_path} 2x
          " 
          >
        <img src="${original}${poster_path}" 
        alt=""
        class="movie-card-img movie-poster"
        
        loading="lazy"/>

              
      </div>

    <div class="modal-film_info">
        <h2 class="modal-film_info-titel">${original_title}</h2>

        <div class="modal-film_list-wrapper">
        <ul class="modal-film_info-list">
            <li class="modal-film_info-name">Vote / Votes</li>
            <li class="modal-film_info-name">Popularity</li>
            <li class="modal-film_info-name">Original Title</li>
            <li class="modal-film_info-name">Genre</li>
        </ul>

        <ul class="modal-film_info-list">
            <li class="modal-film_info-param">${vote_average} / <span id="modal_rating">${vote_count}</span></li>
            <li class="modal-film_info-param">${popularity}</li>
            <li class="modal-film_info-param">${original_title}</li>
            <li class="modal-film_info-param">${genres[0].name} </li>
        </ul>
        </div>

        <div class="modal-film_info-about">
          <p class="about">About</p>
          <p class="modal-film_info-description">${overview}</p>
        </div>

        <div class="modal-film_button-wrapper">
            <button type="button" class="modal-film_button" data-watched>ADD TO WATCHED</button>
            <button type="button" class="modal-film_button" data-queue>ADD TO QUEUE</button>
        </div>
        
    </div>

  </div>

  `;
}
