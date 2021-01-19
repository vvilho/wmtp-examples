console.log('Hello console!');
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
  const newPrice = menu.map(i => {
    (i.price*1.15).toFixed(2);
    return i;
  });

  console.log(newPrice);

};
validateMeal(list);
sortPrice(list);
underFiveEuros(list);
raisePrice(list);


