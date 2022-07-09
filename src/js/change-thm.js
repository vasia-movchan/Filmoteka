const checkbox = document.querySelector('#th-sw-toggle');
checkbox.addEventListener('change', changeTheme);

const Theme = {
  LIGHT: 'lt-theme',
  DARK: 'dk-theme',
};

const bodyHtml = document.querySelector('body');

function changeTheme(evt) {
  if (evt.target.checked) {
    bodyHtml.classList.toggle(Theme.DARK);
    bodyHtml.classList.toggle(Theme.LIGHT);
  } else if (!evt.target.checked) {
    bodyHtml.classList.toggle(Theme.LIGHT);
    bodyHtml.classList.toggle(Theme.DARK);
  }
}
