const axios = require('axios').default;

const API_KEY = '799d796b985f1f6ed2e5b2e723499181';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export class FilmApiService {
  constructor() {
    this.searchQuery = '';
    this.currentPage = 1;
    this.totalPages = '';
    this.language = 'en';
    this.dataType = '';
  }

  async getTrendingMovies() {
    try {
      const response = await axios('/trending/movie/day', {
        params: {
          api_key: API_KEY,
          page: this.currentPage,
          language: this.language,
        }
      });

      this.totalPages = response.data.total_pages;
      this.dataType = 'trending';

      return response;
    } catch (error) {
    console.log(error);
    }
  };

  async getMoviesByQuery() {
    try {
      const response = await axios('/search/movie', {
        params: {
          api_key: API_KEY,
          query: this.searchQuery,
          page: this.currentPage,
          language: this.language,
        }
      });

      this.totalPages = response.data.total_pages;
      this.dataType = 'search';

      return response;
    } catch (error) {
    console.log(error);
    }
  };

  async getMovieByID(id) {
    try {
      const response = await axios(`/movie/${id}`, {
        params: {
          api_key: API_KEY,
          language: this.language,
        }
      });

      return response;
    } catch (error) {
    console.log(error);
    }
  };

  async getGenres() {
    try {
      const genres = await axios('/genre/movie/list', {
        params: {
          api_key: API_KEY,
          language: this.language,
        }
      });

      return genres.data.genres;
    } catch (error) {
    console.log(error);
    }
  }

  generateGenresNamesFromID(response, genres) {
    return response.data.results.map(movie => ({ ...movie, genres: movie.genre_ids.map(id => genres.filter(genre => genre.id === id)).flat().map(genre => genre.name).slice(0, 2).join(', ') })); 
  }

  async getTrailerByMvoieID(id) {
    try {
      const response = await axios(`/movie/${id}/videos`, {
        params: {
          api_key: API_KEY,
        }
      });

      return response;
    } catch (error) {
    console.log(error);
    }
  };
}