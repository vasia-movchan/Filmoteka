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
    this.genres = JSON.parse(localStorage.getItem('genres'));;
  }

  async getTrendingMovies() {
    try {
      const response = await axios('/trending/movie/day', {
        params: {
          api_key: API_KEY,
          page: this.currentPage,
        }
      });

      this.totalPages = response.data.total_pages;
      this.dataType = 'trending';

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getMoviesByQuery() {
    try {
      const response = await axios('/search/movie', {
        params: {
          api_key: API_KEY,
          query: this.searchQuery,
          page: this.currentPage,
        }
      });

      this.totalPages = response.data.total_pages;
      this.dataType = 'search';

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getMovieByID(id) {
    try {
      const response = await axios(`/movie/${id}`, {
        params: {
          api_key: API_KEY,
        }
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getGenres() {
    try {
      const genres = await axios('/genre/movie/list', {
        params: {
          api_key: API_KEY,
          language: this.language,
        },
      });

      return genres.data.genres;
    } catch (error) {
      console.log(error);
    }
  }

  // async setGenres() {
  //   const genres = await this.getGenres();
    
  //   return genres;
  // }

  generateGenresNamesFromID(response, genres) {
    const movieList = response.data.results.map(movie => ({
      ...movie,
      genres: movie.genre_ids
        .map(id => genres.filter(genre => genre.id === id))
        .flat()
        .map(genre => genre.name)
    }));

    return movieList;
  }

  getGenresNamesFromID(response, genres) {
    const movieList = response.data.movie_results.map(movie => ({
      ...movie,
      genres: movie.genre_ids
        .map(id => genres.filter(genre => genre.id === id))
        .flat()
        .map(genre => genre.name)
    }));

    return movieList;
  }

  async getTrailerByMvoieID(id) {
    try {
      const response = await axios(`/movie/${id}/videos`, {
        params: {
          api_key: API_KEY,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getMovieByExternalID(external_id, external_source) {
    try {
      const response = await axios(`/find/${external_id}`, {
        params: {
          api_key: API_KEY,
          external_source,
        },
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
