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


let teamAccoTeam = () => {
  let team = document.querySelector(".team-acco");
  team.addEventListener("click", function(e) {
    e.preventDefault();
    const link = e.target;
    if(link.classList.contains('team-acco__trigger')){
      let active = team.querySelector(".team-acco__item.is-active")
      if(active){
        let activeText = active.querySelector(".team-acco__content");
        activeText.style.height = "0px";
        active.classList.remove("is-active");
      }

      if(!active || active.querySelector(".team-acco__trigger") !== link){
        let current = link.closest(".team-acco__item");
        current.classList.add("is-active");
        let currentText = current.querySelector(".team-acco__content");
        currentText.style.height = currentText.scrollHeight + "px";
      }
    }
  }) 
}
teamAccoTeam();


let teamAccoMenu = () => {
  let links = document.querySelectorAll(".menu-acco__trigger");
  let body = document.querySelector('body');

  let calculateWidth = () => {
    let windowsWidth = window.innerWidth;
    let linksWidth = links[0].offsetWidth;
    let reqWidth = windowsWidth - linksWidth * links.length;
    return reqWidth > 550 ? 550:reqWidth;
  };

  function closeItem (activeElement){
    let activeText = activeElement.querySelector(".menu-acco__content");
        activeText.style.width = "0px";
        activeElement.classList.remove("is-active");
  }

  links.forEach(function(elem){
    elem.addEventListener("click", function(e){
      e.preventDefault();
      let link = e.target.closest(".menu-acco__trigger");
      let active = document.querySelector(".menu-acco__item.is-active");
      if (active){
        closeItem(active);
      }

      if (!active || active.querySelector(".menu-acco__trigger") !== link){
        let current = link.closest(".menu-acco__item");
        current.classList.add("is-active");
        let currentText = current.querySelector(".menu-acco__content");
        if(body.offsetWidth > 480){
          currentText.style.width = calculateWidth () +'px';
        } else {
          currentText.style.width = '100%';
        }
      }
    })
  })
}
teamAccoMenu();

const slide = (function(){
  const left = document.querySelector('.slider__btn_prev'); 
  const right = document.querySelector('.slider__btn_next'); 
  const slider = document.querySelector('.slider__list'); 
  const itemCount = document.querySelectorAll('.slider__item');
  let pos = 0;
  let flag = true;

  function setTransform(ms = 100) {
    if (flag){
      flag = false;

      slider.style.transform = `translateX(${-pos * slider.offsetWidth}px)`;

      setTimeout(() => flag = true, ms);
    }
  }

  function prev (){
    pos == 0 ? pos = itemCount.length - 1 : pos--;
    console.log(pos,itemCount);
    setTransform(300);
    
  }

  function next (){
    pos == itemCount.length - 1 ? pos= 0 : pos++;
    console.log(pos,itemCount);
    setTransform(300);
  }

  left.addEventListener("click", function(e){
    e.preventDefault();
  })
  right.addEventListener("click", function(e){
    e.preventDefault();
  })
   
  function addListeners(){
    left.addEventListener("click", prev);
    right.addEventListener("click", next);
    window.addEventListener("resize", setTransform);
  } 

  return{
    init:addListeners
  }
  
})();
slide.init();