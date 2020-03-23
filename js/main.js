let menuOpenBurger = (function (options) {
  let button = document.querySelector(options.button);
  let hidden = document.querySelector(options.hidden);
  let cross = document.querySelector(options.cross);
  let menu = document.querySelector(options.menu);
  let body = document.querySelector('body');
  let _toggleMenu = function (e) {
    hidden.classList.toggle('hamburger-menu_hidden');
    cross.classList.toggle('cross_visible');
    menu.classList.toggle('overlay--open');
    body.classList.toggle('body-active-menu');
  }

  let addListeners = function () {
    button.addEventListener('click', _toggleMenu);
  }

  return {
    openMenu: addListeners,
  };

})({
  button:'#toggle',
  hidden:'#hidden',
  cross:'#cross',
  menu: '#overlay'
});
menuOpenBurger.openMenu();
