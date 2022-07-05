import { refs } from "./refs";
import { FilmApiService } from "./api-service";
import { onPaginationClick, renderPagination } from "./pagination";
import { renderMovieCard } from "./render-elements";

const filmApiService = new FilmApiService();

document.addEventListener('DOMContentLoaded', loadTrendingMovies);
refs.pagination.addEventListener('click', onPaginationClick);

async function loadTrendingMovies() {
  const trendResponse = await filmApiService.getTrendingMovies();
  renderPagination(filmApiService.currentPage, filmApiService.totalPages);
  
  const createTrendPage = trendResponse.data.results.map(renderMovieCard).join('');
  console.log(trendResponse);
  refs.gallery.innerHTML = createTrendPage;  
}