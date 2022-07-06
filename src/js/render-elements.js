export function renderMovieCard({ poster_path, id, title, genres, release_date, vote_average }) {
  let BASE_URL = 'https://image.tmdb.org/t/p/w500';

  if (poster_path === null) {
    BASE_URL = '';
    poster_path = 'https://bflix.biz/no-poster.png';
  }
  if (release_date === undefined) {
    release_date = 'n/a';
  }
  if (genres === '') {
    genres = 'Unknown';
  }

  return `<div class="movie-card">
      <a id="${id}" class="movie-card__link link" href="#">
        <img class="movie-card__image" src="${BASE_URL}${poster_path}" alt="movie poster">
        <p class="movie-card__title">${title}</p>
        <div class="movie-card__wrapper">
          <p class="movie-card__info">${genres} | ${release_date.slice(0, 4)}</p>  
        </div>
      </a>
    </div>` 
}

{/* <div class="movie-card__rating">
  <p class="movie-card__rating-text">Viewer's Rating</p>
  <p class="movie-card__rating-number">${vote_average.toFixed(1)}</p>
</div> */}