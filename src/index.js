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


/*
* Yritin saada toimimaan funktiona, mutta en löytänyt ratkaisua ettei suorittaisi funktiota suoraan.
*
* langFinnish.addEventListener('click', createMenu(coursesFi);
* langEnglish.addEventListener('click', createMenu(coursesEn);
*
* */
createMenu(coursesFi);
langFinnish.addEventListener('click', () => {
  lang = 1;
  menu.textContent = "";
  for (const course of coursesFi) {
    menu.innerHTML += course + "<br> <br>";
  }
} );
langEnglish.addEventListener('click', () => {
  lang = 0;
  menu.textContent = "";
  for (const course of coursesEn) {
    menu.innerHTML += course + "<br> <br>";
  }
} );

sort.addEventListener('click', () => {
  if (lang == 0) {
    menu.textContent = "";
    for (const course of coursesEn.sort()) {
      menu.innerHTML += course + "<br> <br>";
    }
  }
  if (lang == 1) {
    menu.textContent = "";
    for (const course of coursesFi.sort()) {
      menu.innerHTML += course + "<br> <br>";
    }
  }
});

sortDesc.addEventListener('click', () => {
  if (lang == 0) {
    menu.textContent = "";
    coursesEn.sort();
    coursesEn.reverse();
    for (const course of coursesEn) {
      menu.innerHTML += course + "<br> <br>";
    }
  }
  if (lang == 1) {
    menu.textContent = "";
    coursesFi.sort();
    coursesFi.reverse();
    for (const course of coursesFi) {
      menu.innerHTML += course + "<br> <br>";
    }
  }
});

randomDish.addEventListener('click', () => {
  if(lang == 0){
    alert(coursesEn[Math.floor(Math.random() * coursesEn.length)]);
  }else{
    alert(coursesFi[Math.floor(Math.random() * coursesFi.length)]);
  }
});
