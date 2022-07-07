 export function renderFilmModal({ poster_path,  title, genres, release_date, vote_average }) {
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
  
    return `  <div id="myModal" class="modal">

                <div class="modal-film">
                
                <div class="modal-film_poster"></div>

                


                <div class="modal-film_info">
                    <h2 class="modal-film_info-titel">${title}</h2>

                    <div class="modal-film_list-wrapper">
                    <ul class="modal-film_info-list">
                        <li class="modal-film_info-name">Vote / Votes</li>
                        <li class="modal-film_info-name">Popularity</li>
                        <li class="modal-film_info-name">Original Title</li>
                        <li class="modal-film_info-name">Genre</li>
                    </ul>

                    <ul class="modal-film_info-list">
                        <li class="modal-film_info-param" id="modal_rating">${vote_average}</li>
                        <li class="modal-film_info-param">100.2</li>
                        <li class="modal-film_info-param">${title}</li>
                        <li class="modal-film_info-param">Western </li>
                    </ul>
                    </div>

                    <div class="modal-film_info-about">
                        <p class="about">About</p>
                        <p class="modal-film_info-description">Lorem ipsum dolor sit 
                        amet consectetur adipisicing elit. 
                        Aspernatur sunt recusandae ab quis. 
                        Aliquam aliquid cumque optio dolor ex tempora doloribus 
                        error vero amet cupiditate dolores exercitationem, 
                        voluptates nostrum aut.</p>
                    </div>

                    <div class="modal-film_button-wrapper">
                        <button type="button" class="modal-film_button">ADD TO WATCHED</button>
                        <button type="button" class="modal-film_button">ADD TO QUEUE</button>
                    </div>
                    
                </div>

                </div>



            </div>
` 
  }