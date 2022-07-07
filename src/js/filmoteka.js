// ------ Создать класс FilmApiService ----- //
const BASE_URL = "https://api.themoviedb.org/3/"
const KEY = '799d796b985f1f6ed2e5b2e723499181'


export default class FilmApiService {
    constructor(){
        this.searchQuery = '';
        this.movieId = '';
        this.page = 1;
         
    }
     
    searchMovieByName() {
       
       const url = `${BASE_URL}search/movie?api_key=${KEY}&query=${this.searchQuery}&language=en-US&page=${this.page}`;
       return fetch(url)
          .then(response =>  response.json())
          .then((data) => {
            this.page += 1 
            return data
        })
    }

    searchPopularDayMovie() {
        const url = `${BASE_URL}trending/all/day?api_key=${KEY}`;
        return fetch(url)
           .then(response =>  response.json())
           .then((data) => {
             this.page += 1 
             return data
         })
    }

    searchMovieById() {
        const url = `${BASE_URL}movie/${this.movieId}?api_key=${KEY}`;
        return fetch(url)
           .then(response =>  response.json())
           .then((data) => {
             this.page += 1 
             return data
         })
    }
    
    resetPage() {
        this.page = 1 
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery
    }
    get id() {
        return this.movieId;
      }
    
      set id(newId) {
        this.movieId = newId;
      }
}