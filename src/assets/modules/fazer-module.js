
import {fetchGetJson} from "../modules/network";


const today = +new Date().toISOString().slice(0, 10);
const dailyMenuUrlFi = '/api/restaurant/menu/week?language=fi&restaurantPageId=270540&weekDate=2020-01-14';
const dailyMenuUrlEn = '/api/restaurant/menu/week?language=en&restaurantPageId=270540&weekDate=2020-01-14';


let coursesEn = [];
let coursesFi = [];


/**
 * My first version of fazer daily menu from json data
 * Changed it and used the idea from the teachers sample version because it's just better and simpler
 * @param {object}
 * @param {Array}

  const fazerMenu = (menu, langMenu) => {
  for (const days of menu.LunchMenus) {
    if (days.Date != '13.1.2020') {
      break;
    }
    let append = '';
    for (const [u, menus] of (days.SetMenus).entries()) {

      if (append == ''){
      }else{
        langMenu.push(append.slice(0, -2));
      }
      append = '';


      for (const [i, courses] of (menus.Meals).entries()) {
        append += courses.Name + ", ";
        console.log(courses.Name, i);
        if(i == (menus.Meals).length - 1 && u == (days.SetMenus).length -1){
          langMenu.push(append.slice(0, -2));
        }
      }
    }
  }
};

 const init = () => {
  fazerMenu(menuEnglish, coursesEn);
  fazerMenu(menuFinnish, coursesFi);


};
 */

/*******************************************************************************************************

 /**
 *
 * Parse daily menu from JSON data with choosable week day
 * @param {Object} menuData
 * @param {Number} weekDay 0-6
 * @returns {Array} menu
 */
const parseDailyMenuFromJSON = (menuData, weekDay, lang) => {

  let dailyMenu = menuData.LunchMenus[weekDay].SetMenus.map(setMenu => {
    let mealName = setMenu.Name;

    let dishes = setMenu.Meals.map(dish => {
      return `${dish.Name} (${dish.Diets.join(", ")})`;

    });
    if (lang === 'fi') {
      coursesFi.push(mealName ? `${mealName}: ${dishes.join(", ")}` : `${dishes.join(", ")}`);
    } else {
      coursesEn.push(mealName ? `${mealName}: ${dishes.join(", ")}` : `${dishes.join(", ")}`);
    }
  });

};
/**
 * Initializes the menus
 * @param {Number} weekDay
 */
const init = async (weekDay = 0) => {
  try {
    // const fazerDailyMenuJSONFi = await fetchGetJson(dailyMenuUrlFi, true);
    // const fazerDailyMenuJSONEn = await fetchGetJson(dailyMenuUrlEn, true);
    const fazerDailyMenuJSONFi = await fetchGetJson(dailyMenuUrlFi, true);
    const fazerDailyMenuJSONEn = await fetchGetJson(dailyMenuUrlEn, true);

    parseDailyMenuFromJSON(fazerDailyMenuJSONFi, weekDay, 'fi');
    parseDailyMenuFromJSON(fazerDailyMenuJSONEn, weekDay, 'en');
  } catch (e) {
    console.error(e);

  }
};


const FazerModule = {init, coursesFi, coursesEn};

export default FazerModule;
