//import Lunchmenu from '../menu.json';
import getJSON from './getJSON-module';

let coursesEn = [];
let coursesFi = [];


const Lunchmenu = getJSON.dataOut('https://www.sodexo.fi/ruokalistat/output/daily_json/152/');
console.log(Lunchmenu);

const ParseSodexoMenu = (sodexoMenu) => {
  const courses = Object.values(sodexoMenu);
  for (const course of courses) {
    coursesEn.push(course.title_en);
    coursesFi.push(course.title_fi);
  }
};

const init = () => {
  ParseSodexoMenu(Lunchmenu.courses);
};

const SodexoModule = {init, coursesFi, coursesEn};
export default SodexoModule;
