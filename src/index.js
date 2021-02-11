//Register the generated service worker

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}


import Sodexomodule from './assets/modules/sodexo-module';
import FazerModule from "./assets/modules/fazer-module";
import moment from 'moment';
import {fetchGetJson} from "./assets/modules/network";

const mobileNav = document.querySelector('.mobileNav');
const barsIconDiv = document.querySelector('.barsIcon');
const barsIcon = document.querySelector('#mobileNavIcon');


const langFinnish = document.getElementById("finnish");
const langEnglish = document.getElementById("english");
const menuSodexo = document.getElementById("menuSodexo");
const menuFazer = document.getElementById("menuFazer");
const darkMode = document.querySelector(".darkMode");
const darkmodeMobile = document.querySelector(".darkModeMobile");
const mainCssFile = document.getElementById("mainStylesheet");

const sort = document.getElementById("sort");
const randomDish = document.getElementById("random");
let lang = 1;
let sortABC = 1;


/*
* Mobilenavigation bar
* */
barsIconDiv.addEventListener('click', () => {
  mobileNav.classList.toggle('hide');
  barsIcon.classList.toggle('fa-caret-down');
});


function createMenu(sodexo, fazer) {
  menuSodexo.textContent = "";
  menuFazer.textContent = "";
  renderMenu(sodexo, 'sodexo');

  renderMenu(fazer, 'fazer');


};

darkMode.addEventListener('click', () => {

  if (mainCssFile.getAttribute('href') == './assets/stylesDark.css') {
    mainCssFile.setAttribute('href', './assets/styles.css');
    localStorage.setItem('darkMode', 'off');
    darkMode.textContent = 'Darkmode';
  } else {
    mainCssFile.setAttribute('href', './assets/stylesDark.css');
    localStorage.setItem('darkMode', 'on');
    darkMode.textContent = 'Lightmode';
  }
});

darkmodeMobile.addEventListener('click', () => {

  if (mainCssFile.getAttribute('href') == './assets/stylesDark.css') {
    mainCssFile.setAttribute('href', './assets/styles.css');
    localStorage.setItem('darkMode', 'off');
    darkmodeMobile.textContent = 'Darkmode';
  } else {
    mainCssFile.setAttribute('href', './assets/stylesDark.css');
    localStorage.setItem('darkMode', 'on');
    darkmodeMobile.textContent = 'Lightmode';
  }
});

/**
 *Change language
 */

langFinnish.addEventListener('click', () => {
  lang = 1;
  createMenu(Sodexomodule.coursesFi, FazerModule.coursesFi);
  localStorage.setItem('lang', 'fi');

});

langEnglish.addEventListener('click', () => {
  lang = 0;
  createMenu(Sodexomodule.coursesEn, FazerModule.coursesEn);
  localStorage.setItem('lang', 'en');

});


const renderMenu = (menuData, restaurant) => {

  let renderRestaurant;

  if (restaurant === 'sodexo') {
    renderRestaurant = menuSodexo;
  } else {
    renderRestaurant = menuFazer;
  }
  let h3 = document.createElement('h3');
  if (lang == 1) {
    moment.locale("fi");
    h3.innerHTML += moment().format('dddd') + "<br>";
  } else {
    moment.locale("en");
    h3.innerHTML += moment().format('dddd') + "<br>";
  }

  renderRestaurant.appendChild(h3);

  for (const course of menuData) {

    let p = document.createElement('p');
    p.innerHTML += course + "<br>";
    renderRestaurant.appendChild(p);

  }
};

/*
* App chooses random dish for user
* */
const randomDishFunc = () => {
  if (lang == 0) {
    const combinedMenu = FazerModule.coursesEn.concat(Sodexomodule.coursesEn);
    alert(combinedMenu[Math.floor(Math.random() * combinedMenu.length)]);
  } else {
    const combinedMenu = FazerModule.coursesFi.concat(Sodexomodule.coursesFi);
    alert(combinedMenu[Math.floor(Math.random() * combinedMenu.length)]);
  }
};

/**
 * Random dish eventlistener
 *
 */

randomDish.addEventListener('click', randomDishFunc);
/*
* Sorts list ascending so in this case alphabetical order
* */
const sortListAsc = () => {
  if (lang == 0) {
    Sodexomodule.coursesEn.sort();
    FazerModule.coursesEn.sort();
    createMenu(Sodexomodule.coursesEn, FazerModule.coursesEn);


  }
  if (lang == 1) {
    Sodexomodule.coursesFi.sort();
    FazerModule.coursesFi.sort();
    createMenu(Sodexomodule.coursesFi, FazerModule.coursesFi);
  }

  sortABC = 1;
};
/*
* Sorts list descending so in this case reverse alphabetical order
* */
const sortListDesc = () => {
  if (lang == 0) {
    Sodexomodule.coursesEn.sort();
    Sodexomodule.coursesEn.reverse();
    FazerModule.coursesEn.sort();
    FazerModule.coursesEn.reverse();
    createMenu(Sodexomodule.coursesEn, FazerModule.coursesEn);
  }
  if (lang == 1) {
    Sodexomodule.coursesFi.sort();
    Sodexomodule.coursesFi.reverse();
    FazerModule.coursesFi.sort();
    FazerModule.coursesFi.reverse();
    createMenu(Sodexomodule.coursesFi, FazerModule.coursesFi);
  }

  sortABC = 0;
};

sort.addEventListener('click', () => {
  if (sortABC == 0) {
    sortListAsc();
  } else {
    sortListDesc();
  }

});


const init = async () => {

  if (localStorage.getItem('darkMode') === 'on') {
    mainCssFile.setAttribute('href', './assets/stylesDark.css');
    darkMode.textContent = 'Lightmode';
  }

  try {
    const sodexoDailyMenuJSON = await fetchGetJson(Sodexomodule.dailyMenuUrl);
    Sodexomodule.init(sodexoDailyMenuJSON);
  } catch (e) {
    console.error(e);
    //notify user
  }

  try {

    await FazerModule.init();
  } catch (e) {
    console.error(e);
    //notify user
  }

if (localStorage.getItem('lang') === 'fi'){
  createMenu(Sodexomodule.coursesFi,  FazerModule.coursesFi);

}else {
  createMenu(Sodexomodule.coursesEn,  FazerModule.coursesEn);
  lang = 0;

}


};

init();

