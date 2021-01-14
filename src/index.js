const coursesEn = ["Hamburger, cream sauce and boiled potatoes",
  "Goan style fish curry and whole grain rice",
  "Vegan Chili sin carne and whole grain rice",
  "Broccoli puree soup, side salad with two napas",
  "Lunch baguette with BBQ-turkey filling",
  "Cheese / Chicken / Vege / Halloumi burger and french fries"];
const coursesFi = ["Jauhelihapihvi, ruskeaa kermakastiketta ja keitettyä perunaa",
  "Goalaista kalacurrya ja täysjyväriisiä",
  "vegaani Chili sin carne ja täysjyväriisi",
  "Parsakeittoa,lisäkesalaatti kahdella napaksella",
  "Lunch baguette with BBQ-turkey filling",
  "Juusto / Kana / Kasvis / Halloumi burgeri ja ranskalaiset"];

const langFinnish = document.getElementById("finnish");
const langEnglish = document.getElementById("english");
const menu = document.getElementById("menu");
const sort = document.getElementById("sort");
const sortDesc = document.getElementById("sortDesc");
const randomDish = document.getElementById("random");
let lang = 1;

function createMenu(lang){
  menu.textContent = "";
  console.log("clicked");
 for (const course of lang) {
   menu.innerHTML += course + "<br> <br>";

 }
};







const init = () => {

  createMenu(coursesFi);

  randomDish.addEventListener('click', () => {
    if(lang == 0){
      alert(coursesEn[Math.floor(Math.random() * coursesEn.length)]);
    }else{
      alert(coursesFi[Math.floor(Math.random() * coursesFi.length)]);
    }
  });


  langFinnish.addEventListener('click', () => {
    lang = 1;
    createMenu(coursesFi);
  });

  langEnglish.addEventListener('click', () => {
    lang = 0;
    createMenu(coursesEn);
  });


  sort.addEventListener('click', () => {
    if (lang == 0) {
      coursesEn.sort();
      createMenu(coursesEn);
    }
    if (lang == 1) {
      coursesFi.sort();
      createMenu(coursesFi);
    }
  });

  sortDesc.addEventListener('click', () => {
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
  });
};

init();
