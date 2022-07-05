export function renderMovieCard({ poster_path, id, title, genre_ids, release_date }) {
  // const extractGenres = genres.map(genre => genre.name).join(', ');
  let BASE_URL = 'https://image.tmdb.org/t/p/w500';

  if (poster_path === null) {
    BASE_URL = '';
    poster_path = 'https://bflix.biz/no-poster.png';
  }
  if (release_date === undefined) {
    release_date = 'n/a';
  }

  return `<div class="movie-card">
      <a id="${id}" class="movie-card__link link" href="#">
        <img class="movie-card__image" src="${BASE_URL}${poster_path}" alt="movie poster">
        <p class="movie-card__title movie-card__text">${title}</p>
        <p class="movie-card__info movie-card__text">${genre_ids} | ${release_date.slice(0, 4)}</p>
      </a>
    </div>` 
}