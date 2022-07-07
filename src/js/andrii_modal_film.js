import FilmApiService from "./filmoteka";

let BASE_URL = 'https://image.tmdb.org/t/p/';
const original = 'original'
const w500 = 'w500'
const w300 = 'w300'

const refs = {
  modal: document.getElementById("myModal"),
  btn: document.getElementById("myBtn"),
  gallery: document.querySelector('.gallery'),
  filmModal: document.querySelector('.modal')
  // span: document.getElementsByClassName("close")[0]
}

const filmApiService = new FilmApiService();

document.addEventListener("DOMContentLoaded", () => {
  if(refs.gallery) {
    refs.gallery.addEventListener('click', openModalFilm)
    
  }
 
});
 
 
 
 
function openModalFilm (e) {
  e.preventDefault()
  
  const filmId = e.target.id
  if(filmId === '') {
    console.log('Ну туда класцнул')
    return
  }
  filmApiService.id = filmId;
   
   
   
   
  filmApiService.searchMovieById().then(data => {
     
    const {poster_path,original_title,vote_count,vote_average,popularity,overview, genres} = data
    console.log(data)
     
    const markup = `
            
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
                            <button type="button" class="modal-film_button">ADD TO WATCHED</button>
                            <button type="button" class="modal-film_button">ADD TO QUEUE</button>
                        </div>
                        
                    </div>

                  </div>
           
            `   
            refs.filmModal.insertAdjacentHTML('afterbegin', markup)
           
            refs.modal.style.display = "block";
    })
}





// When the user clicks the button, open the modal 
 

// When the user clicks on <span> (x), close the modal
// refs.span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == refs.modal) {
    refs.modal.style.display = "none";
    refs.filmModal.innerHTML = "";
  }
}

 