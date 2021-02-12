
import {fetchGetJson} from "./network";

const today = new Date().toISOString().slice(0, 10);
const dailyMenuUrl = 'https://www.sodexo.fi/ruokalistat/output/daily_json/152/'+today;

let coursesEn = [];
let coursesFi = [];



const ParseSodexoMenu = (sodexoMenu) => {
  const courses = Object.values(sodexoMenu);
  for (const course of courses) {
    coursesEn.push(`${course.title_en} (${course.dietcodes})`);
    coursesFi.push(`${course.title_fi} (${course.dietcodes})`);
  }
};


const init = async () => {
  try{
    const sodexoDailyMenuJSON = await fetchGetJson(dailyMenuUrl);
    ParseSodexoMenu(sodexoDailyMenuJSON.courses);
  }catch(e){
    console.error(e);
  }


};

const SodexoModule = {init, coursesFi, coursesEn, dailyMenuUrl};
export default SodexoModule;

