export const refs = {
  //---- header refs ----
  header: document.querySelector('.js-header'),
  headerNavigation: document.querySelector('.js-site-nav'),
  logoHome: document.querySelector('.js-logo'),
  linkHome: document.querySelector('.js-home_page'),
  linkMyLibrary: document.querySelector('.js-lib_page'),
  home: document.querySelector('#home'),
  searchForm: document.querySelector('.js-search-form'),
  searchInput: document.querySelector('.js-search-input'),
  headerButtons: document.querySelector('.js-buttons'),
  searchWarning: document.querySelector('.js-search-res'),
  emptySearchWarning: document.querySelector('.js-warn'),

  // --------- locale storage -------
  addToWatched: document.querySelector('[data-watched]'),
  addToQueue: document.querySelector('[data-queue]'),
  watchedLibrary: document.querySelector('.js-btn_watched'),
  queueLibrary: document.querySelector('.js-btn_queue'),

  animation: document.querySelector('.animate__animated animate__fadeInDown'),

  //---- main gallery refs ----
  gallery: document.querySelector('.gallery'),

  //---- pagination refs ----
  pageBtn: document.querySelectorAll('.pagination__page'),
  numBtn: document.querySelectorAll('.pagination__num-btn'),
  prevBtn: document.querySelector('[data-btn="prev"]'),
  firstPageBtn: document.querySelector('[data-btn="first"]'),
  dotsBwdBtn: document.querySelector('[data-btn="dots-bwd"]'),
  btn1: document.querySelector('[data-btn="1"]'),
  btn2: document.querySelector('[data-btn="2"]'),
  btn3: document.querySelector('[data-btn="3"]'),
  btn4: document.querySelector('[data-btn="4"]'),
  btn5: document.querySelector('[data-btn="5"]'),
  dotsFwdBtn: document.querySelector('[data-btn="dots-fwd"]'),
  lastPageBtn: document.querySelector('[data-btn="last"]'),
  nextBtn: document.querySelector('[data-btn="next"]'),
  pagination: document.querySelector('.pagination'),
};
