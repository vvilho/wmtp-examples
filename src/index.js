import Lunchmenu from './assets/menu.json';
import Sodexomodule from './modules/sodexo-data';
import FazerModule from "./modules/fazer-module";




const langFinnish = document.getElementById("finnish");
const langEnglish = document.getElementById("english");
const menuSodexo = document.getElementById("menuSodexo");
const menuFazer = document.getElementById("menuFazer");

const sort = document.getElementById("sort");
const sortDesc = document.getElementById("sortDesc");
const randomDish = document.getElementById("random");
let lang = 1;


/*
* Parse menu from JSON from sodexo website
* */




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
};




const init = () => {
  FazerModule.init();
  Sodexomodule.ParseSodexoMenu(Lunchmenu.courses);
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


  sort.addEventListener('click', sortListAsc);

  sortDesc.addEventListener('click', sortListDesc);
};

init();
