


const today = new Date().toISOString().slice(0, 10);
const dailyMenuUrl = 'https://www.sodexo.fi/ruokalistat/output/daily_json/152/'+today;

let coursesEn = [];
let coursesFi = [];



const ParseSodexoMenu = (sodexoMenu) => {
  const courses = Object.values(sodexoMenu);
  for (const course of courses) {
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
  }
};

const init = (menu) => {
  ParseSodexoMenu(menu.courses);
};

const SodexoModule = {init, coursesFi, coursesEn, dailyMenuUrl};
export default SodexoModule;

