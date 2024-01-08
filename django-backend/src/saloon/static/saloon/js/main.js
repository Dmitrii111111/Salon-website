//Margin на гамбургере
window.addEventListener('resize', function() {
    let containerWidth = document.querySelector('.container').offsetWidth;
    let containerMargin = parseInt(window.getComputedStyle(document.querySelector('.container')).marginRight);
    let menuOpen = document.querySelector('.menu-open');
    let menu = document.querySelector('.menu');
    menuOpen.style.right = (containerMargin) + 'px';
});
window.dispatchEvent(new Event('resize'));


//Открытие изакрытие меню
document.addEventListener("DOMContentLoaded", function() {
  let menuOpenBtn = document.querySelector('.menu-open');
  let menu = document.querySelector('.menu');
  let isMenuOpen = false; // Переменная для отслеживания состояния меню

  menuOpenBtn.addEventListener('click', function() {
    menu.classList.toggle('show-menu');
    isMenuOpen = !isMenuOpen; // Изменение состояния меню при каждом клике
    if (isMenuOpen) {
      menu.style.display = 'block';
      setTimeout(function() { menu.style.transform = "translateX(0%)"; }, 0);
      menuOpenBtn.innerHTML = '<img src="static/saloon/images/menu_close.svg" alt="Close menu">';
    } else {
      menu.style.transform = "translateX(100%)"; // Скрываем меню
      // Задержка для завершения анимации перед скрытием меню
      setTimeout(function() {
        menu.style.display = 'none';
      }, 500);
      menuOpenBtn.innerHTML = '<img src="static/saloon/images/menu_open.svg" alt="Open menu">';
    }
  });
});


// меняем + на крестик в таблице
document.querySelectorAll(".plus").forEach(item => {
  item.addEventListener('click', event => {
      event.target.innerHTML = event.target.innerHTML == '+' ? '&times' : '+';
  });
});

// прилет улет услуг и цен внизу таблицы
let tableWrappers = document.querySelectorAll('.table-wrapper');

tableWrappers.forEach(wrapper => {
  let plusCrossIcon = wrapper.querySelector('.pluscross');
  let hiddenTable = wrapper.querySelector('.hiddenTable');
  let mainTable = wrapper.querySelector('.tables');

  plusCrossIcon.addEventListener('click', function() {
  if (hiddenTable.classList.contains('hidden')) {
        hiddenTable.classList.remove('hidden');
        // при адаптации
        if (window.matchMedia("(max-width: 1199px)").matches) {
            setTimeout(function() { hiddenTable.style.transform = "translateX(6.5%)"; }, 0); // меняем translateX на 3% при ширине <= 1199px
        } else {
            setTimeout(function() { hiddenTable.style.transform = "translateX(135px)"; }, 0); // оставляем translateX равным 135px при других разрешениях
        }
        mainTable.classList.add('dark');
  } else {
    hiddenTable.style.transform = "translateX(-150%)";
    setTimeout(function(){ hiddenTable.classList.add('hidden'); }, 500);
    plusCrossIcon.classList.remove('cross');
    plusCrossIcon.classList.add('plus');
    mainTable.classList.remove('dark');
  }
});
});


// 3D Слайдер
let radius = 400; // оставляем первоначальное значение
let imgWidth = 205;
let imgHeight = 205;
const smallerScreenMediaQuery = window.matchMedia("(max-width: 991px)");

function handleScreenSizeChange(e) {
  if (e.matches) {
    // Применяем новое значение радиуса, если условие для медиа-запроса истинно
    radius = 300; // Для размера экрана до 991px значение будет 300
    if (e.matches && window.matchMedia("(max-width: 767px)").matches) {
        radius = 250;
        imgWidth = 205;
        imgHeight = 205;
    }
    if (e.matches && window.matchMedia("(max-width: 540px)").matches) {
        radius = 210;
        imgWidth = 205;
        imgHeight = 205;
    }
    if (e.matches && window.matchMedia("(max-width: 460px)").matches) {
        radius = 200; // Для размера экрана до 767px значение будет 200
    }
    if (e.matches && window.matchMedia("(max-width: 430px)").matches) {
        radius = 170;
        imgWidth = 130;
        imgHeight = 130;
    }
    if (e.matches && window.matchMedia("(max-width: 377px)").matches) {
        radius = 160;
        imgWidth = 120;
        imgHeight = 120;
    }
    if (e.matches && window.matchMedia("(max-width: 355px)").matches) {
        radius = 150;
        imgWidth = 110;
        imgHeight = 110;
    }
    if (e.matches && window.matchMedia("(max-width: 310px)").matches) {
        radius = 140;
        imgWidth = 100;
        imgHeight = 100;
    }
  } else {
    // Возвращаем изначальное значение радиуса
    radius = 400;
    imgWidth = 205;
    imgHeight = 205;
  }
}
smallerScreenMediaQuery.addListener(handleScreenSizeChange); // добавляем слушателя
handleScreenSizeChange(smallerScreenMediaQuery); // Обработка текущего размера экрана

//if (window.innerWidth < 470) {
//	radius = 100;
//}

let autoRotate = true;
let rotateSpeed = -100;
//let imgWidth = 205;
//let imgHeight = 205;
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let carousel = document.getElementById("carousel");
let aImg = ospin.getElementsByTagName("a");
ospin.style.width = imgWidth + "px";
ospin.style.height = imgHeight + "px";
let ground = document.getElementById("ground");
ground.style.width = radius * 3 + "px";
ground.style.height = radius * 3 + "px";
function init(delayTime) {
    for (let i = 0; i < aImg.length; i++) {
        aImg[i].style.transform =
        "rotateY(" +
        i * (360 / aImg.length) +
        "deg) translateZ(" +
        radius +
        "px)";
        aImg[i].style.transition = "transform 1s";
        aImg[i].style.transitionDelay =
        delayTime || (aImg.length - i) / 4 + "s";
    }
}
function applyTranform(obj) {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;
    obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
}
function playSpin(yes) {
    ospin.style.animationPlayState = yes ? "running" : "paused";
}
let sX,
sY,
nX,
nY,
desX = 0,
desY = 0,
tX = 0,
tY = 10;
if (autoRotate) {
    let animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
    ospin.style.animation = `${animationName} ${Math.abs(
    rotateSpeed
    )}s infinite linear`;
}
carousel.onpointerdown = function(e) {
    clearInterval(odrag.timer);
    e = e || window.event;
    let sX = e.clientX,
    sY = e.clientY;
    this.onpointermove = function(e) {
        e = e || window.event;
        let nX = e.clientX,
        nY = e.clientY;
        desX = nX - sX;
        desY = nY - sY;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTranform(odrag);
        sX = nX;
        sY = nY;
    };
    this.onpointerup = function(e) {
        odrag.timer = setInterval(function() {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
            playSpin(false);
            if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                clearInterval(odrag.timer);
                playSpin(true);
            }
        }, 17);
        this.onpointermove = this.onpointerup = null;
    };
    return false;
};

let observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
		setTimeout(init, 300);
    });
});
observer.observe(carousel);


//// индекс для голереи
let currentCategory; // объявляем переменные здесь
let currentImgIndex;

// Открыть фото голереи
document.querySelectorAll('.spin-container img').forEach((img, index) => {
    img.onclick = () => {
        currentCategory = img.className;  // сохраняем текущую категорию
        console.log(currentCategory);

        currentImgIndex = index; // сохраняем индекс изображения

        document.querySelector('.pop-up').style.display = 'block';
        document.querySelector('.pop-up img').src = imageGalleries[currentCategory][0];
        console.log(imageGalleries);
    }
});


// функции для кнопок назад и вперед
function prevImage() {
  if (currentImgIndex > 0) {
    currentImgIndex--;
  } else {
    // Если достигнута первая фотография, перейти к последней
    currentImgIndex = imageGalleries[currentCategory].length - 1;
  }
  document.querySelector('.pop-up img').src = imageGalleries[currentCategory][currentImgIndex];
}

function nextImage() {
    if (currentImgIndex < imageGalleries[currentCategory].length - 1) {
        currentImgIndex++;
    } else {
        currentImgIndex = 0;
    }
    document.querySelector('.pop-up img').src = imageGalleries[currentCategory][currentImgIndex];
}


document.querySelector('.pop-up .prev').onclick = prevImage;
document.querySelector('.pop-up .next').onclick = nextImage;


// закрытие фото галереи спомощью крестика
document.querySelector('.pop-up span').onclick = () => (
        document.querySelector('.pop-up').style.display = 'none'
)


        // навигация 2gis
let map;
    DG.then(function () {
        map = DG.map('map', {
            center: [53.754476, 127.272744], /* Координаты центра карты */
            zoom: 18, /* Масштаб */
            scrollWheelZoom: false /* Запрет прокрутки карты колесом мыши */
        });
        mapicon = DG.icon({
            iconUrl: 'static/saloon/images/marker.png', /* Иконка маркера */
            iconAnchor: [32, 64],
            popupAnchor: [0, 24],
            className: 'map-icon',
            iconSize: [64, 64] /* Размер иконки */
        });
        DG.marker([53.754476, 127.272744], {icon: mapicon}).addTo(map).bindPopup('<div class="map-popup"><h2>Queen Cosmo</h2><br/>Студия красоты<br/>Алены Ковалевой</div>');     /* Координаты маркера и текст попапа */
    });


                 //кнопка на вверх
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
    if (window.innerWidth > 991) {
      document.getElementById("scrollTopBtn").style.display = "block";
    } else {
      document.getElementById("scrollTopBtn").style.display = "none";
    }
  } else {
    document.getElementById("scrollTopBtn").style.display = "none";
  }
}
//плавное вверх
document.getElementById("scrollTopBtn").addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


            //меню плавное опускание
document.addEventListener("DOMContentLoaded", function() {
  // Находим все ссылки из меню
  let menuLinks = document.querySelectorAll('a[href^="#"]');

  // Для каждой ссылки в меню
  menuLinks.forEach(function(menuLink) {
    menuLink.addEventListener("click", function(event) {
      // Предотвращаем стандартное поведение ссылки
      event.preventDefault();

      // Получаем id якоря из href атрибута ссылки
      let targetId = this.getAttribute("href");

      // Находим нужный пункт меню на странице
      let targetSection = document.querySelector(targetId);

      // Определяем смещение для прокрутки (например, 75px вниз от верха)
      let offset = -75;

      // Плавно скроллим страницу до нужного пункта меню с дополнительным отступом
      if (targetId === "#about" || targetId === "#catalog" || targetId === "#price") {
        window.scroll({
            top: targetSection.offsetTop - offset,
            behavior: 'smooth'
        });
      }
      else if (targetId === "#peeling" || targetId === "#depilation" || targetId === "#mechanical" || targetId === "#brows") {
            targetSection.scrollIntoView({ behavior: 'smooth' });

          if (targetId === "#peeling"){
              const button = document.querySelector('#btn1');
              button.click();
          }
          if (targetId === "#depilation"){
              const button = document.querySelector('#btn2');
              button.click();
          }
          if (targetId === "#mechanical"){
              const button = document.querySelector('#btn3');
              button.click();
          }
          if (targetId === "#brows"){
              const button = document.querySelector('#btn4');
              button.click();
          }
      }
      else {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }

    });
  });
});