var openMenu = document.querySelector(".main-nav--open");
var menu = document.querySelector(".main-nav__site-list");
var closeMenu = document.querySelector(".main-nav--close");

openMenu.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.add("site-list--open");

});

closeMenu.addEventListener("click", function(evt) {
  evt.preventDefault();
  menu.classList.remove("site-list--open");
});
