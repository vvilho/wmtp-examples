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
const modal = document.getElementById("menuModal");
const closeModal = document.querySelector(".closeModal");
const restaurantLogo = document.querySelectorAll(".restaurantLogo");
const modalIFrame = document.getElementById("modalIFrame");

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

/**
 *Modal functionality
 */


restaurantLogo.forEach(logo => logo.addEventListener('click', event => {
  modalIFrame.textContent = "";
  if (logo.alt.split(' ')[0] == "Sodexo") {
    modalIFrame.innerHTML = `<iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1979.2925872863293!2d24.843278252252233!3d60.25861908190529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46920a1e5e4bb8c3%3A0x1dabe03ba3a83a2c!2sMetropolia%20Ammattikorkeakoulu%20-%20Myyrm%C3%A4en%20kampus!5e0!3m2!1sfi!2sfi!4v1613548459228!5m2!1sfi!2sfi"
        width="100%" height="400px" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
        tabindex="0"></iframe>`;
  }
  if (logo.alt.split(' ')[0] == "Fazer") {
    modalIFrame.innerHTML = `<iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.4086878247851!2d25.07615685225142!3d60.22361448189217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469208cda130006f%3A0xa777acdeae7ab784!2sMetropolia%20Ammattikorkeakoulu%20%E2%80%94%20Myllypuron%20kampus!5e0!3m2!1sfi!2sfi!4v1613550123046!5m2!1sfi!2sfi"
        width="100%" height="400px" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false"
        tabindex="0"></iframe>`;
  }
  document.body.classList.add('modal-open');
  modal.style.display = "block";
}));

closeModal.addEventListener ('click', () => {
  modal.style.display = "none";
  document.body.classList.remove('modal-open');

});

window.addEventListener('click', (event) => {
  if (event.target == modal){
    modal.style.display = "none";
    document.body.classList.remove('modal-open');

  }
});

document.addEventListener('keydown', (event) =>{
  if(event.key === "Escape"){
    modal.style.display = "none";
    document.body.classList.remove('modal-open');
  }
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
};

init();

