const refs = {
    scrollBtn: document.querySelector(".scrollBtn"),
    rootElement: document.documentElement,
}

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 2500 || document.documentElement.scrollTop > 2500) {
    refs.scrollBtn.classList.add("showBtn");
  } else {
    refs.scrollBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  refs.rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
refs.scrollBtn.addEventListener("click", scrollToTop);