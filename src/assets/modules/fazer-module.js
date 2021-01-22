import menuFinnish from '../fazer-menu-fi.json';
import menuEnglish from '../fazer-menu-en.json';


let coursesEn = [];
let coursesFi = [];

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


const FazerModule = {init, coursesFi, coursesEn};

export default FazerModule;
