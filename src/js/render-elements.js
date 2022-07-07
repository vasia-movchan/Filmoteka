import oopsImage from "../images/gallery/oops.png";
import noPoster from "../images/gallery/no-poster.png";

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

  return `<li class="movie-card" data-card>
      <a id="${id}" class="movie-card__link link" href="#">
        <img class="movie-card__image" src="${BASE_URL}${poster_path}" loading="lazy" alt="movie poster">
        <p class="movie-card__title">${title}</p>
        <div class="movie-card__wrapper">
          <p class="movie-card__info">${genres} | ${release_date.slice(0, 4)}</p>
          <div class="movie-card__rating">
            <div class="movie-card__rating-icon" width="14" height="14"></div>
            <p class="movie-card__rating-number">${vote_average.toFixed(1)}</p>
          </div>
        </div>
      </a>
    </li>` 
}

export function renderOopsNoResults() {
  return `<img class="warning__no-results" src="${oopsImage}" alt="oops no results">`;
}

