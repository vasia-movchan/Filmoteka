import { refs } from './refs';
import { FilmApiService } from './api-service';
// import { onPaginationClick, renderPagination } from "./pagination";
import { renderMovieCard, renderOopsNoResults } from './render-elements';

const filmApiService = new FilmApiService();

document.addEventListener('DOMContentLoaded', loadTrendingMovies);
// refs.logoHome.addEventListener('click', onLogoHomeClick);
refs.home.addEventListener('click', onHomeButtonClick);
refs.searchForm.addEventListener('submit', loadMoviesByQuery);
refs.pagination.addEventListener('click', onPaginationClick);

async function loadTrendingMovies() {
  refs.gallery.style.display = 'grid';
  const response = await filmApiService.getTrendingMovies();
  const genres = await filmApiService.getGenres();
  const responseWithGenreNames = filmApiService.generateGenresNamesFromID(
    response,
    genres
  );

  renderPagination(filmApiService.currentPage, filmApiService.totalPages);

  const createTrendPage = responseWithGenreNames.map(renderMovieCard).join('');
  refs.gallery.innerHTML = createTrendPage;
}

export function onLogoHomeClick() {
  filmApiService.currentPage = 1;
  refs.pagination.classList.remove('visually-hidden');
  refs.gallery.style.removeProperty('justify-content');
  refs.gallery.style.removeProperty('align-items');
  loadTrendingMovies();
}

function onHomeButtonClick() {
  refs.logoHome.removeEventListener('click', onLogoHomeClick);
  filmApiService.currentPage = 1;
  refs.pagination.classList.remove('visually-hidden');
  refs.gallery.style.removeProperty('justify-content');
  refs.gallery.style.removeProperty('align-items');
  loadTrendingMovies();
}

async function loadMoviesByQuery(event) {
  event.preventDefault();

  filmApiService.currentPage = 1;
  filmApiService.searchQuery = event.target.elements.search.value;
  refs.searchInput.value = '';

  if (filmApiService.searchQuery === '') {
    onInvalidSearchQuery();
    return;
  }

  const response = await filmApiService.getMoviesByQuery();
  const genres = await filmApiService.getGenres();
  const responseWithGenreNames = filmApiService.generateGenresNamesFromID(
    response,
    genres
  );

  if (response.data.results.length === 0) {
    onInvalidSearchQuery();
    return;
  }

  refs.searchWarning.style.opacity = 0;
  refs.pagination.classList.remove('visually-hidden');
  refs.gallery.style.cssText = 'display: grid;';
  refs.gallery.style.removeProperty('justify-content');
  refs.gallery.style.removeProperty('align-items');

  renderPagination(filmApiService.currentPage, filmApiService.totalPages);

  const createGalleryByQuery = responseWithGenreNames.map(renderMovieCard).join('');
  refs.gallery.innerHTML = createGalleryByQuery;
}

async function loadPagesBySearch() {
  const response = await filmApiService.getMoviesByQuery();
  const genres = await filmApiService.getGenres();
  const responseWithGenreNames = filmApiService.generateGenresNamesFromID(
    response,
    genres
  );

  renderPagination(filmApiService.currentPage, filmApiService.totalPages);

  const createGalleryByQuery = responseWithGenreNames.map(renderMovieCard).join('');
  refs.gallery.innerHTML = createGalleryByQuery;
}

function onPaginationClick(event) {
  if (event.target.dataset.btn === 'prev') {
    filmApiService.currentPage -= 1;
  }
  if (event.target.dataset.btn === 'next') {
    filmApiService.currentPage += 1;
  }
  if (event.target.dataset.btn === 'first') {
    filmApiService.currentPage = 1;
  }
  if (event.target.dataset.btn === 'last') {
    filmApiService.currentPage = filmApiService.totalPages;
  }
  if (event.target.dataset.btn === '1') {
    filmApiService.currentPage = Number(refs.btn1.textContent);
  }
  if (event.target.dataset.btn === '2') {
    filmApiService.currentPage = Number(refs.btn2.textContent);
  }
  if (event.target.dataset.btn === '3') {
    filmApiService.currentPage = Number(refs.btn3.textContent);
  }
  if (event.target.dataset.btn === '4') {
    filmApiService.currentPage = Number(refs.btn4.textContent);
  }
  if (event.target.dataset.btn === '5') {
    filmApiService.currentPage = Number(refs.btn5.textContent);
  }
  // if (event.target.className = 'pagination__item') {
  //   scrollToTop();
  // }

  switch (filmApiService.dataType) {
    case 'trending':
      loadTrendingMovies();
      break;

    case 'search':
      loadPagesBySearch();
      break;
  }
}

function renderPagination(currentPage, totalPages) {
  refs.firstPageBtn.textContent = 1;
  refs.lastPageBtn.textContent = totalPages;
  // -------- Conditions for initial numeric buttons rendering --------
  if (totalPages === 1) {
    refs.lastPageBtn.classList.add('visually-hidden');
  } else {
    refs.lastPageBtn.classList.remove('visually-hidden');
  }
  if (totalPages > 2) {
    refs.btn1.classList.remove('visually-hidden');
  } else {
    refs.btn1.classList.add('visually-hidden');
  }
  if (totalPages > 3) {
    refs.btn2.classList.remove('visually-hidden');
  } else {
    refs.btn2.classList.add('visually-hidden');
  }
  if (totalPages > 4) {
    refs.btn3.classList.remove('visually-hidden');
  } else {
    refs.btn3.classList.add('visually-hidden');
  }
  if (totalPages > 5) {
    refs.btn4.classList.remove('visually-hidden');
  } else {
    refs.btn4.classList.add('visually-hidden');
  }
  if (totalPages > 6) {
    refs.btn5.classList.remove('visually-hidden');
  } else {
    refs.btn5.classList.add('visually-hidden');
  }
  // -------- Conditions for Dots rendering --------
  if (totalPages > 7 && currentPage <= totalPages - 4) {
    refs.dotsFwdBtn.classList.remove('visually-hidden');
  } else {
    refs.dotsFwdBtn.classList.add('visually-hidden');
  }
  if (currentPage > 4) {
    refs.dotsBwdBtn.classList.remove('visually-hidden');
  } else {
    refs.dotsBwdBtn.classList.add('visually-hidden');
  }
  // -------- Conditions for middle numeric buttons behaviour --------
  if (currentPage === totalPages) {
    refs.numBtn.forEach((el, index) => (el.textContent = totalPages - 5 + index));
  }
  if (currentPage === 1) {
    refs.numBtn.forEach((el, index) => (el.textContent = 1 + (index + 1)));
  }
  if (currentPage > 3 && currentPage < totalPages - 2) {
    refs.btn1.textContent = currentPage - 2;
    refs.btn2.textContent = currentPage - 1;
    refs.btn3.textContent = currentPage;
    refs.btn4.textContent = currentPage + 1;
    refs.btn5.textContent = currentPage + 2;
  }
  // --------------------------------------------
  if (currentPage > 1) {
    refs.prevBtn.classList.remove('pg-inactive');
  }
  if (currentPage === 1) {
    refs.prevBtn.classList.add('pg-inactive');
  }
  if (currentPage < totalPages) {
    refs.nextBtn.classList.remove('pg-inactive');
  }
  if (currentPage === totalPages) {
    refs.nextBtn.classList.add('pg-inactive');
  }
  // --------------------------------------------
  refs.pageBtn.forEach(el => {
    if (currentPage === Number(el.textContent)) {
      el.classList.add('pg-active');
    } else {
      el.classList.remove('pg-active');
    }
  });

  if (currentPage === refs.pageBtn) {
    refs.prevBtn.classList.remove('pg-inactive');
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function addOpacity() {
  return (refs.searchWarning.style.opacity = 1);
}

function removeOpacity() {
  return (refs.searchWarning.style.opacity = 0);
}

function onInvalidSearchQuery() {
  refs.searchWarning.style.opacity = 1;
  setTimeout(removeOpacity, 3000);
  refs.pagination.classList.add('visually-hidden');
  refs.gallery.style.display = 'flex';
  refs.gallery.style.justifyContent = 'center';
  refs.gallery.style.alignItems = 'center';
  refs.gallery.innerHTML = renderOopsNoResults();
}
