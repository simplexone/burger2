//////////Оверлей меню
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

/////////Команда аккордион
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

/////////////Меню аккордион
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


///////////Слайдер
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
    setTransform(300);
    
  }

  function next (){
    pos == itemCount.length - 1 ? pos= 0 : pos++;
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

///////////Оверлей
// let overlayBtn = (function () {
  const openButton = document.querySelector("#review-btn");
  const bodyOverlay = document.querySelector("body");
  const template = document.querySelector("#overlayTemplate").innerHTML;
  const overlay = createOverlay(template);
  openButton.addEventListener("click", function(e) {
    e.preventDefault();
    overlay.open();
    bodyOverlay.classList.add('body-active-menu'); 
  });

  function createOverlay(template) {
    const fragment = document.createElement('div');

    fragment.innerHTML = template;

    const overlayElement = fragment.querySelector(".overlay-modal");
    const contentElement = fragment.querySelector(".overlay-modal__content");
    const closeElement = fragment.querySelector(".overlay-modal__close");
    
    overlayElement.addEventListener("click", e => {
      if (e.target === overlayElement) {
        closeElement.click();
      }
    });
    closeElement.addEventListener("click", e => {
      e.preventDefault();
      document.body.removeChild(overlayElement);
      bodyOverlay.classList.remove('body-active-menu');
    });

    return {
      open() {
        document.body.appendChild(overlayElement);
      },
      close() {
        closeElement.click();
      },
      setContent(content) {
        contentElement.innerHTML = content;
      }
    };
  }
// })();
// overlayBtn();


///////////Отправка формы
const  orderForm = document.querySelector("#order");
const  orderButton = document.querySelector('#orderBtn');

orderButton.addEventListener('click', function(e){
  e.preventDefault();

  if (validateForm(orderForm)) {
    const data = {
        name: orderForm.elements.name.value,
        phone: orderForm.elements.phone.value,
        comment: orderForm.elements.comment.value
    }
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/fail');
    xhr.send(JSON.stringify(data));
    xhr.addEventListener('load', () => {
        console.log(xhr.response.message);
    });
  }
});

//////////Валидация формы

function validateForm(orderForm) {
  let valid = true;

  if(!validateOrder(orderForm.elements.name)){
    valid = false;
  }

  if(!validateOrder(orderForm.elements.phone)){
    valid = false;
  }

  if(!validateOrder(orderForm.elements.comment)){
    valid = false;
  }

  return valid;
}

function validateOrder(field){
  field.nextElementSibling.textContent = field.validationMessage;
  return field.checkValidity();
}

////////// YMap

ymaps.ready(init);

let placemarks = [
  {
    latitude: 59.90206953, 
    longitude: 30.29132307,
    hintContent: 'Лучшие бургеры только по этому адресу',
    ballonContent: 'это балун'
  },
  {
    latitude: 59.96022496,
    longitude: 30.29117468,
    hintContent: 'Лучшие бургеры только по этому адресу',
    ballonContent: 'это балун'
  },
  {
    latitude: 59.97100874,
    longitude: 30.34763114,
    hintContent: 'Лучшие бургеры только по этому адресу',
    ballonContent: 'это балун'
  },
  {
    latitude: 59.92869803, 
    longitude: 30.41332978,
    hintContent: 'Лучшие бургеры только по этому адресу',
    ballonContent: 'это балун'
  }
];


function init(){
  let map = new ymaps.Map('map', {
    center: [59.93442889, 30.32332694],
    zoom: 12,
    controls: ['zoomControl'],
    behaviors: ['drag']
  });

  placemarks.forEach(function (obj){
      let placemark = new ymaps.Placemark([obj.latitude, obj.longitude], {
      hintContent: obj.hintContent,
      ballonContent: obj.ballonContent
    },
    {
      iconLayout:'default#image',
      iconImageHref: 'img/icons/map-marker.svg',
      iconImageSize: [50,50],
      iconImageOffset: [-25,-50]
    });
    map.geoObjects.add(placemark);
  });
}

//////////OnePageScroll
const sections = $('.section');
const display = $('.maincontent');
let inScroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const trasitionOver = 1000; //время смены секции 

const performTransition = sectionEq => {
  if(inScroll === false){
    inScroll = true;
    const position = sectionEq*-100;

    sections.eq(sectionEq).addClass('is-active').siblings().removeClass('is-active');

    display.css({
      transform: `translateY(${position}%)`
    });

   setTimeout(() => {
    $('.fixed-menu__item').eq(sectionEq).addClass('is-active').siblings().removeClass('is-active');
    inScroll = false;
   }, trasitionOver) 
  }
  
}

const scrollSection = direction => {
  const activeSection = sections.filter('.is-active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if(nextSection.length && direction ==='next'){
    performTransition(nextSection.index());
  }

  if(prevSection.length &&  direction ==='prev'){
    performTransition(prevSection.index());
  }
}

$(window).on('wheel', e =>{
  const deltaY = e.originalEvent.deltaY;

  if(deltaY > 0){
    scrollSection('next');
    
  }

  if(deltaY < 0){
    scrollSection('prev');
  }
});

$(document).on('keydown', e => {
  const tagName = e.target.tagName.toLowerCase();

  if(tagName !== 'input' && tagName !== 'textarea'){
    switch (e.keyCode) {
      case 38:
        scrollSection('prev');
        break;
      case 40:
        scrollSection('next');
        break;
    }
  }
})

$("[data-scroll-to]").on("click", (e) => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");

  performTransition(target);
});

if (isMobile) {
  $("body").swipe({
    swipe: (event, direction) => {
      let scrollDirection;

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      scrollSection(scrollDirection);
    }
  });
}

