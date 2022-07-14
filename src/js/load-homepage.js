import { refs } from './refs';
import { FilmApiService } from './api-service';
// import { onPaginationClick, renderPagination } from "./pagination";
import { renderMovieCard, renderOopsNoResults } from './render-elements';
import Spinner from './spinner';

const filmApiService = new FilmApiService();
const spinner = new Spinner(refs.spinner);

document.addEventListener('DOMContentLoaded', loadTrendingMovies);
refs.logoHome.addEventListener('click', onLogoHomeClick);
refs.home.addEventListener('click', onHomeButtonClick);
refs.searchForm.addEventListener('submit', loadMoviesByQuery);
refs.pagination.addEventListener('click', onPaginationClick);
refs.searchSwitcher.addEventListener('change', onSearchSwitcher);

filmApiService
  .getGenres()
  .then(response => localStorage.setItem('genres', JSON.stringify(response)));

function onSearchSwitcher(e) {
  if (e.target.checked) {
    refs.searchInput.placeholder = 'Search by Id';
    refs.select.classList.toggle('visually-hidden');
    refs.searchForm.removeEventListener('submit', loadMoviesByQuery);
    refs.searchForm.addEventListener('submit', onGetMovieByExternalId);
  } else {
    refs.select.classList.toggle('visually-hidden');
    refs.searchInput.placeholder = 'Movie search';
    refs.searchForm.removeEventListener('submit', onGetMovieByExternalId);
    refs.searchForm.addEventListener('submit', loadMoviesByQuery);
  }
}

async function onGetMovieByExternalId(e) {
  e.preventDefault();
  spinner.on();
  let external_id = refs.searchInput.value;
  let external_source = refs.select.value;
  refs.searchInput.value = '';

  if (external_id === '') {
    spinner.off();
    onInvalidSearchQuery();
    return;
  }

  filmApiService.getMovieByExternalID(external_id, external_source);
  spinner.on();
  const searchResult = await filmApiService.getMovieByExternalID(external_id, external_source);
  const searchResultWithGenreNames = filmApiService.getGenresNamesFromID(
    searchResult,
    filmApiService.genres
  );
  spinner.off();
  const createExternalSearchPage = searchResultWithGenreNames.map(renderMovieCard).join('');

  if (searchResult.data.movie_results.length === 0) {
    spinner.off();
    onInvalidSearchQuery();
    return;
  }

  refs.searchWarning.style.opacity = 0;
  refs.pagination.classList.add('visually-hidden');
  refs.gallery.style.cssText = 'display: grid;';
  refs.gallery.style.removeProperty('justify-content');
  refs.gallery.style.removeProperty('align-items');
  spinner.off();
  refs.gallery.innerHTML = createExternalSearchPage;
}

export async function loadTrendingMovies() {
  spinner.on();
  refs.gallery.style.display = 'grid';
  const response = await filmApiService.getTrendingMovies();
  const responseWithGenreNames = filmApiService.generateGenresNamesFromID(
    response,
    filmApiService.genres
  );

  // console.log(responseWithGenreNames);

  renderPagination(filmApiService.currentPage, filmApiService.totalPages);

  const createTrendPage = responseWithGenreNames.map(renderMovieCard).join('');
  spinner.off();
  refs.gallery.innerHTML = createTrendPage;
  refs.gallery.classList.add('animate__animated', 'animate__fadeIn');
  refs.gallery.addEventListener('animationend', () => {
    refs.gallery.classList.remove('animate__animated', 'animate__fadeIn');
  });
}

export function onLogoHomeClick() {
  // refs.logoHome.removeEventListener('click', onLogoHomeClick);
  filmApiService.currentPage = 1;
  refs.pagination.classList.remove('visually-hidden');
  refs.gallery.style.removeProperty('justify-content');
  refs.gallery.style.removeProperty('align-items');
  loadTrendingMovies();
}

function onHomeButtonClick() {
  // refs.logoHome.removeEventListener('click', onLogoHomeClick);
  filmApiService.currentPage = 1;
  refs.pagination.classList.remove('visually-hidden');
  refs.gallery.style.removeProperty('justify-content');
  refs.gallery.style.removeProperty('align-items');
  loadTrendingMovies();
}

async function loadMoviesByQuery(event) {
  event.preventDefault();
  spinner.on();

  filmApiService.currentPage = 1;
  filmApiService.searchQuery = event.target.elements.search.value;
  refs.searchInput.value = '';

  if (filmApiService.searchQuery === '') {
    spinner.off();
    onInvalidSearchQuery();
    return;
  }

  const response = await filmApiService.getMoviesByQuery();
  const responseWithGenreNames = filmApiService.generateGenresNamesFromID(
    response,
    filmApiService.genres
  );

  if (response.data.results.length === 0) {
    spinner.off();
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
  spinner.off();
  refs.gallery.innerHTML = createGalleryByQuery;
}

async function loadPagesBySearch() {
  spinner.on();
  const response = await filmApiService.getMoviesByQuery();
  const responseWithGenreNames = filmApiService.generateGenresNamesFromID(
    response,
    filmApiService.genres
  );

  renderPagination(filmApiService.currentPage, filmApiService.totalPages);

  const createGalleryByQuery = responseWithGenreNames.map(renderMovieCard).join('');
  spinner.off();
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
