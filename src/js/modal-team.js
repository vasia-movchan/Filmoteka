const refs = {
    openModal: document.querySelector('.footer__link'),
    closeModalBtn: document.querySelector('[data-close-modal]'),
  backdrop: document.querySelector('.backdrop'),
    scrollBtn: document.querySelector(".scrollBtn"),
}

refs.openModal.addEventListener('click', openLink);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.backdrop.addEventListener('click', onBackdropClick);

function openLink(e) {
  e.preventDefault();
  refs.scrollBtn.classList.remove("showBtn");
    window.addEventListener('keydown', onKeyPress);
    refs.backdrop.classList.remove('is-hidden');
  document.body.classList.add('modal-open');

};


function closeModal() {
    refs.backdrop.classList.add('is-hidden');
    document.body.classList.remove('modal-open');
    window.removeEventListener('keydown', onKeyPress);
};

function onKeyPress(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
  }
}




