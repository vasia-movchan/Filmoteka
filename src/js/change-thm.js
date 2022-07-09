const checkbox = document.querySelector('#th-sw-toggle');
checkbox.addEventListener('change', changeTheme);

const Theme = {
  LIGHT: 'lt-theme',
  DARK: 'dk-theme',
};

// let THEME = 'current-theme';

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

// saveTheme();
// function saveTheme() {
//   const saveKey = localStorage.getItem(THEME);
//   if (!saveKey) {
//     bodyHtml.classList.add(Theme.LIGHT);
//     localStorage.setItem(THEME, bodyHtml.classList);
//   } else {
//     bodyHtml.classList.add(saveKey);
//     if (saveKey === Theme.DARK) {
//       checkbox.checked = true;
//     }
//   }
// }
