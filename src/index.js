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
import HSLData from './assets/modules/hsl-data';

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
const hslData = document.querySelector(".hsl-data");

if (localStorage.getItem('darkMode') === 'on') {
  mainCssFile.setAttribute('href', './assets/stylesDark.css');
  darkMode.textContent = 'Lightmode';
}

let lang = 1;


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
  if (menuData.length == 0) {
    let p = document.createElement('p');
    p.innerHTML += "No data available";
    renderRestaurant.appendChild(p);
  }
  for (const course of menuData) {

    let p = document.createElement('p');
    p.innerHTML += course + "<br>";
    renderRestaurant.appendChild(p);

  }


};

const loadHSLData = async () => {
  hslData.textContent = "";
  const result = await HSLData.getRidesByStopId(2132208);
  const stopData = result.data.stop;

  console.log('loadHSL: ', stopData);
  const stopElement = document.createElement('div');
  stopElement.innerHTML = `<h3>Seuraavat vuorot pysäkiltä ${stopData.name}</h3><ul>`;

  for (const ride of stopData.stoptimesWithoutPatterns) {
    stopElement.innerHTML += `<li>${ride.trip.routeShortName},
${ride.trip.tripHeadsign},
${HSLData.formatTime(ride.scheduledDeparture)},</li>`;

  }
  stopElement.innerHTML += `</ul>`;
  hslData.appendChild(stopElement);

};


const localstorageCheck = () => {
  if (localStorage.getItem('darkMode') === 'on') {
    mainCssFile.setAttribute('href', './assets/stylesDark.css');
    darkMode.textContent = 'Lightmode';
  }

  if (localStorage.getItem('lang') === 'fi') {
    lang = 1;
    createMenu(Sodexomodule.coursesFi, FazerModule.coursesFi);

  } else {
    lang = 0;
    createMenu(Sodexomodule.coursesEn, FazerModule.coursesEn);


  }
};

const initialMenuLoad = async () => {
  try {

    await Sodexomodule.init();
  } catch (e) {
    console.error(e);
  }

  try {

    await FazerModule.init();
  } catch (e) {
    console.error(e);

  }
};

const init = async () => {
  await initialMenuLoad();
  localstorageCheck();
  loadHSLData();
};

init();

