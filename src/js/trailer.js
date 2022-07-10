import { FilmApiService } from './api-service';
import { refs } from './refs';

const filmApiService = new FilmApiService();

export function createTrailerModal(key) {
    return   `    
                    <!-- The Modal -->
                    <div id="myModalTrailer" class="modal-trailer">

                    <!-- Modal content -->
                    <div class="modal-content_treiler">
                        <iframe class="iframe" 
                                src="https://www.youtube.com/embed/${key}"
                                width="560" height="315" 
                                frameborder="0"
                                allowfullscreen="allowfullscreen">
                        </iframe>
                    </div>
      
    `
}

export async function showTrailer(e) {
    // let movieID = e.target.closest('.trailer-button"').id;
    let movieID = e.currentTarget .id;
    const response = await filmApiService.getTrailerByMvoieID(movieID);
    const trailer = response.data.results.filter(el => el.name = 'Official Trailer')
    let filmKey = trailer[0].key
    const trailerModal = createTrailerModal(filmKey)
    console.log(filmKey)
    refs.body.insertAdjacentHTML('afterbegin', trailerModal)
    const modalTrailer = document.getElementById("myModalTrailer");
    const iframe = document.querySelector('.iframe')
    modalTrailer.style.display = "block";
    console.log(iframe)
    
    window.onclick = function(event) {
      if (event.target !== iframe) {
        modalTrailer.style.display = "none";
        modalTrailer.innerHTML = ''
        modalTrailer.remove()
      }
    }
  }
