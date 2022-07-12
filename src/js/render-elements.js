import oopsImage from '../images/gallery/oops.png';
import noPoster from '../images/gallery/no-poster.png';
import svg from 'bundle-text:../images/svg/close.svg'
import filmIcon from 'bundle-text:../images/svg/film.svg'
  

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
    genres = 'Genre is not defined';
  }
  if (genres.length > 2) {
    const other = ['Other'];
    genres = genres.slice(0, 2).concat(other);
  }

  return `<li id="${id}" class="movie-card" data-card>
      <a id="${id}" class="movie-card__link link" href="#">
        <img id="${id}" class="movie-card__image" src="${BASE_URL}${poster_path}" loading="lazy" alt="movie poster">
        <p id="${id}" class="movie-card__title">${title}</p>
        <div ${id} class="movie-card__wrapper">
          <p id="${id}" class="movie-card__info">${genres.join(', ')} | ${release_date.slice(0, 4)}</p>
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
  id
}) {
  let BASE_URL = 'https://image.tmdb.org/t/p/';
  let original = 'original';
  let w500 = 'w500';
  let w300 = 'w300';

    if (poster_path === null) {
    BASE_URL = '';
    original = '';
    w300 = '';
    w500 = '';
    poster_path = noPoster;
  }

  // if (release_date === undefined) {
  //   release_date = 'n/a';
  // }
  if (genres === '') {
    genres = 'Genre is not defined';
  }

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
<button type="button" class="trailer trailer-button" id="${id}">
              ${filmIcon}  
        </button> 
              
      </div>

    <div class="modal-film_info">
        <h2 class="modal-film_info-titel">${original_title}</h2>

        <div class="modal-film_list-wrapper">
            <table>
            <tr>
              <td class="modal-film_name">Vote / Votes</td>
              <td class="modal-film_parameter"><span id="modal_rating-orange">${vote_average}</span> / <span id="modal_rating-grey">${vote_count}</span></td>
            </tr>
            <tr>
              <td class="modal-film_name">Popularity</td>
              <td class="modal-film_parameter">${popularity}</td>
            </tr>
            <tr>
              <td class="modal-film_name">Original Title</td>
              <td class="modal-film_parameter">${original_title}</td>
            </tr>
            <tr>
                <td class="modal-film_name">Genre</td>
                <td class="modal-film_parameter">${genres.map(genre => genre.name).join(', ')}</td>
            </tr>
            </table>
        </div>

        <div class="modal-film_info-about">
          <p class="about">ABOUT</p>
          <p class="modal-film_info-description">${overview}</p>
        </div>

        <div class="modal-film_button-wrapper">
            <button type="button" class="modal-film_button" data-watched>ADD TO WATCHED</button>
            <button type="button" class="modal-film_button" data-queue>ADD TO QUEUE</button>
        </div>  
        
    </div>
      <button class="modal-film_button-close">
        ${svg}
      </button>
      
  </div>

  `;
}




        // <svg class="close-svg" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        //   <path class="icon-close" d="M8 8L22 22" stroke="black" stroke-width="2"/>
        //   <path class="icon-close" d="M8 22L22 8" stroke="black" stroke-width="2"/>
        // </svg>