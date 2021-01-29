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


import Sodexomodule from './assets/modules/sodexo-data';
import FazerModule from "./assets/modules/fazer-module";

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




function createMenu(sodexo, fazer){
  menuSodexo.textContent = "";
  menuFazer.textContent = "";
  console.log("clicked");
  for (const course of sodexo) {
    menuSodexo.innerHTML += course + "<br> <br>";

  }
  for (const course of fazer) {
    menuFazer.innerHTML += course + "<br> <br>";

  }
};
/*
* App chooses random dish for user
* */
const randomDishFunc = () => {
  if(lang == 0){
    const combinedMenu = FazerModule.coursesEn.concat(Sodexomodule.coursesEn);
    alert(combinedMenu[Math.floor(Math.random() * combinedMenu.length)]);
  }else{
    const combinedMenu = FazerModule.coursesFi.concat(Sodexomodule.coursesFi);
    alert(combinedMenu[Math.floor(Math.random() * combinedMenu.length)]);  }
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
  if(sortABC == 0){
    sortListAsc();
  }else{
    sortListDesc();
  }

});




const init = () => {
  FazerModule.init(0);
  Sodexomodule.init();
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


