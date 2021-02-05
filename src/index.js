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
import {getJSON} from "./assets/modules/getJSON-module";
import moment from 'moment';

const mobileNav = document.querySelector('.mobileNav');
const barsIconDiv = document.querySelector('.barsIcon');
const barsIcon = document.querySelector('#mobileNavIcon');


const langFinnish = document.getElementById("finnish");
const langEnglish = document.getElementById("english");
const menuSodexo = document.getElementById("menuSodexo");
const menuFazer = document.getElementById("menuFazer");

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

const renderMenu = (menuData, restaurant) => {

  let renderRestaurant;

  if (restaurant === 'sodexo') {
    renderRestaurant = menuSodexo;
  } else {
    renderRestaurant = menuFazer;
  }

  let h3 = document.createElement('h3');
  if(lang == 1){
    moment.locale("fi");
    h3.innerHTML += moment().format('dddd') + "<br>";
  }else{
    moment.locale("en");
    h3.innerHTML += moment().format('dddd') + "<br>";
  }

  renderRestaurant.appendChild(h3);

  if (menuData.length == 0){
    menuData.push('No menudata');
  }
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


  try {
    const sodexoDailyMenuJSON = await getJSON(Sodexomodule.dailyMenuUrl);
    Sodexomodule.init(sodexoDailyMenuJSON);
  } catch (e) {
    console.error(e);
    //notify user
  }

  try {
    // Due cors anywhere not working ----> https://github.com/Rob--W/cors-anywhere/issues/301
    // const a = await fetch('https://cors-anywhere.herokuapp.com/https://www.fazerfoodco.fi/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=2020-01-14');
    // console.log(a);
    // FazerModule.init();
  } catch (e) {
    console.error(e);
    //notify user
  }


  createMenu(Sodexomodule.coursesFi, FazerModule.coursesFi);


  randomDish.addEventListener('click', randomDishFunc);


  langFinnish.addEventListener('click', () => {
    lang = 1;
    createMenu(Sodexomodule.coursesFi, FazerModule.coursesFi);
  });

  langEnglish.addEventListener('click', () => {
    lang = 0;
    createMenu(Sodexomodule.coursesEn, FazerModule.coursesEn);
  });


};

init();


