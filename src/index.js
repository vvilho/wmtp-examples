import Lunchmenu from './assets/fazer.json';

console.log('Week2 teht 2');

//A
const list = [
  {name: 'Lingonberry jam', price: 4.00},
  {name: 'Mushroom and bean casserole', price: 5.50},
  {name: 'Chili-flavoured wheat', price: 3.00},
  {name: 'Vegetarian soup', price: 4.80},
  {name: 'Pureed root vegetable soup with smoked cheese', price: 8.00}
];

const regex = /^[A-ZÖÄÅ]{1}[A-ZÖÄÅa-zöäå0-9-/,;() ]{4,64}$/;

const validateMeal = (menu) => {
  for (const i of menu) {
    console.log(regex.test(i.name), i.name);
  }
};


const sortPrice = (menu) => {
  const sortedMenu = menu.sort((a, b) => {
    return b.price - a.price;
  });
  console.log(sortedMenu);

};

const underFiveEuros = (menu) => {
  const underFive = menu.filter(price => price.price < 5);
  console.log(underFive);
};


const raisePrice = (menu) => {
  const newPrice = menu.map(course => {
    course.price = (course.price * 1.15).toFixed(2);
    return course;
  });
  console.log(newPrice);

};

const sumMenu = (menu) => {
  const sum = menu.reduce((total, current) => {
    return total + parseFloat(current.price);
  }, 0);
  console.log('All items on menu together cost: ' + sum + '€');
};


//B

const fazerVege = (Lunchmenu) => {
  console.log('Vegaaniannokset:');
    for (const days of Lunchmenu.LunchMenus) {
      if(days.DayOfWeek != 'Maanantai'){
        break;
      }
      for (const menus of days.SetMenus) {
        for (const courses of menus.Meals) {
          if (courses.Diets.includes('Veg')) {
            console.log(courses.Name);
          }
        }
      }
    }
};


validateMeal(list);
sortPrice(list);
underFiveEuros(list);
raisePrice(list);
sumMenu(list);
fazerVege(Lunchmenu);










