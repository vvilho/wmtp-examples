import Lunchmenu from './assets/menu.json';

let coursesEn = [];
let coursesFi = [];

const langFinnish = document.getElementById("finnish");
const langEnglish = document.getElementById("english");
const menu = document.getElementById("menu");
const sort = document.getElementById("sort");
const sortDesc = document.getElementById("sortDesc");
const randomDish = document.getElementById("random");
let lang = 1;


/*
* Parse menu from JSON from sodexo website
* */
const parseSodexoMenu = (sodexoMenu) => {
  const courses = Object.values(sodexoMenu);
  for (const course of courses) {
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
  }
};



function createMenu(lang){
  menu.textContent = "";
  console.log("clicked");
  for (const course of lang) {
    menu.innerHTML += course + "<br> <br>";

  }
};
/*
* App chooses random dish for user
* */
const randomDishFunc = () => {
  if(lang == 0){
    alert(coursesEn[Math.floor(Math.random() * coursesEn.length)]);
  }else{
    alert(coursesFi[Math.floor(Math.random() * coursesFi.length)]);
  }
};
/*
* Sorts list ascending so in this case alphabetical order
* */
const sortListAsc = () => {
  if (lang == 0) {
    coursesEn.sort();
    createMenu(coursesEn);
  }
  if (lang == 1) {
    coursesFi.sort();
    createMenu(coursesFi);
  }
};
/*
* Sorts list descending so in this case reverse alphabetical order
* */
const sortListDesc = () => {
  if (lang == 0) {
    coursesEn.sort();
    coursesEn.reverse();
    createMenu(coursesEn);
  }
  if (lang == 1) {
    coursesFi.sort();
    coursesFi.reverse();
    createMenu(coursesFi);
  }
};




const init = () => {
  parseSodexoMenu(Lunchmenu.courses);
  createMenu(coursesFi);

  randomDish.addEventListener('click', randomDishFunc);


  langFinnish.addEventListener('click', () => {
    lang = 1;
    createMenu(coursesFi);
  });

  langEnglish.addEventListener('click', () => {
    lang = 0;
    createMenu(coursesEn);
  });


  sort.addEventListener('click', sortListAsc);

  sortDesc.addEventListener('click', sortListDesc);
};

init();
