const themeSwitcher = document.querySelector('#th-sw-toggle');
themeSwitcher.checked = false;
themeSwitcher.addEventListener('click', changeTheme);

const Theme = {
  LIGHT: 'lt-theme',
  DARK: 'dk-theme',
};

function changeTheme() {
  if (this.checked) {
    document.body.classList.remove(Theme.LIGHT);
    document.body.classList.add(Theme.DARK);
    localStorage.setItem('theme', Theme.DARK);
  } else {
    document.body.classList.add(Theme.LIGHT);
    document.body.classList.remove(Theme.DARK);
    localStorage.setItem('theme', Theme.LIGHT);
  }
}

window.onload = checkTheme();

function checkTheme() {
  const localStorageTheme = localStorage.getItem('theme');
  if (localStorageTheme !== null && localStorageTheme === Theme.DARK) {
    document.body.className = localStorageTheme;

    const themeSwitch = document.getElementById('th-sw-toggle');
    themeSwitch.checked = true;
  }
}
