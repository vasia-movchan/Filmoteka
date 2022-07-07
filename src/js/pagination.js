// import { refs } from "./refs";
// import { FilmApiService } from "./api-service";
// import { loadTrendingMovies } from "./load-homepage";

// const filmApiService = new FilmApiService();

// export function onPaginationClick(event) {
//   if (event.target.dataset.btn === 'prev') {
//     filmApiService.currentPage -= 1;
//   }
//   if (event.target.dataset.btn === 'next') {
//     filmApiService.currentPage += 1;
//   }
//   if (event.target.dataset.btn === 'first') {
//     filmApiService.currentPage = 1;
//   }
//   if (event.target.dataset.btn === 'last') {
//     filmApiService.currentPage = filmApiService.totalPages;
//   }
//   if (event.target.dataset.btn === '1') {
//     filmApiService.currentPage = Number(refs.btn1.textContent);
//   }
//   if (event.target.dataset.btn === '2') {
//     filmApiService.currentPage = Number(refs.btn2.textContent);
//   }
//   if (event.target.dataset.btn === '3') {
//     filmApiService.currentPage = Number(refs.btn3.textContent);
//   }
//   if (event.target.dataset.btn === '4') {
//     filmApiService.currentPage = Number(refs.btn4.textContent);
//   }
//   if (event.target.dataset.btn === '5') {
//     filmApiService.currentPage = Number(refs.btn5.textContent);
//   }
//   // if (event.target.className = 'pagination__item') {
//   //   scrollToTop();
//   // }
  
//   switch (filmApiService.dataType) {
//     case 'trending':
//       loadTrendingMovies();
//       break;
    
//     case 'search':
//       loadPagesBySearch();
//       break;
//   }
// }

// export function renderPagination(currentPage, totalPages) {
//   refs.firstPageBtn.textContent = 1;
//   refs.lastPageBtn.textContent = totalPages;
//   // -------- Conditions for initial numeric buttons rendering --------
//   if (totalPages === 1) {
//     refs.lastPageBtn.classList.add('visually-hidden');
//   } else {
//     refs.lastPageBtn.classList.remove('visually-hidden');
//   }
//   if (totalPages > 2) {
//     refs.btn1.classList.remove('visually-hidden');
//   } else {
//     refs.btn1.classList.add('visually-hidden');
//   }
//   if (totalPages > 3) {
//     refs.btn2.classList.remove('visually-hidden');
//   } else {
//     refs.btn2.classList.add('visually-hidden');
//   }
//   if (totalPages > 4) {
//     refs.btn3.classList.remove('visually-hidden');
//   } else {
//     refs.btn3.classList.add('visually-hidden');
//   }
//   if (totalPages > 5) {
//     refs.btn4.classList.remove('visually-hidden');
//   } else {
//     refs.btn4.classList.add('visually-hidden');
//   }
//   if (totalPages > 6) {
//     refs.btn5.classList.remove('visually-hidden');
//   } else {
//     refs.btn5.classList.add('visually-hidden');
//   }
//   // -------- Conditions for Dots rendering --------
//   if (totalPages > 7 && currentPage <= totalPages - 4) {
//     refs.dotsFwdBtn.classList.remove('visually-hidden');
//   } else {
//     refs.dotsFwdBtn.classList.add('visually-hidden');
//   }
//   if (currentPage > 4) {
//     refs.dotsBwdBtn.classList.remove('visually-hidden');
//   } else {
//     refs.dotsBwdBtn.classList.add('visually-hidden');
//   }
//   // -------- Conditions for middle numeric buttons behaviour --------
//   if (currentPage === totalPages) {
//     refs.numBtn.forEach((el, index) => el.textContent = totalPages - 5 + index);
//   }
//   if (currentPage === 1) {
//     refs.numBtn.forEach((el, index) => el.textContent = 1 + (index + 1));
//   }
//   if (currentPage > 3 && currentPage < totalPages - 2) {
//     refs.btn1.textContent = currentPage - 2;
//     refs.btn2.textContent = currentPage - 1;
//     refs.btn3.textContent = currentPage;
//     refs.btn4.textContent = currentPage + 1;
//     refs.btn5.textContent = currentPage + 2;
//   }
//   // --------------------------------------------
//   if (currentPage > 1) {
//     refs.prevBtn.classList.remove('pg-inactive');
//   }
//   if (currentPage === 1) {
//     refs.prevBtn.classList.add('pg-inactive');
//   }
//   if (currentPage < totalPages) {
//     refs.nextBtn.classList.remove('pg-inactive');
//   }
//   if (currentPage === totalPages) {
//     refs.nextBtn.classList.add('pg-inactive');
//   }
//   // --------------------------------------------
//   refs.pageBtn.forEach(el => {
//     if (currentPage === Number(el.textContent)) {
//       el.classList.add('pg-active');
//     } else {
//       el.classList.remove('pg-active');
//     }
//   })

//   if ( currentPage === refs.pageBtn) {
//     refs.prevBtn.classList.remove('pg-inactive');
//   }
// }

// function scrollToTop() {
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth"
// });
// }