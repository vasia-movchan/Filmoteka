import { renderFilmModal } from "./render-elements"
import { FilmApiService } from "./api-service";
 

const refs = {
  modal: document.getElementById("myModal"),
  btn: document.getElementById("myBtn"),
  gallery: document.querySelector('.gallery'),
  filmModal: document.querySelector('.modal')
  // span: document.getElementsByClassName("close")[0]
}

const filmApiService = new FilmApiService();

// document.addEventListener("DOMContentLoaded", () => {
//   if(refs.gallery) {
//     refs.gallery.addEventListener('click', openModalFilm)
    
//   }
 
// });

document.addEventListener("DOMContentLoaded", () => {
  if(refs.gallery) {
    refs.gallery.addEventListener('click', onMovieCardClick)
    
  }
 
});
 
 
async function onMovieCardClick(event) {
  event.preventDefault()
  if(!event.target.closest('.movie-card__link')) {
    console.log('Ну туда класцнул')
    return
  }
  let movieID = event.target.closest('.movie-card__link').id;

  const response = await filmApiService.getMovieByID(movieID);
      const markup = renderFilmModal(response.data)
            refs.filmModal.insertAdjacentHTML('afterbegin', markup)
            refs.modal.style.display = "block";
   
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

 