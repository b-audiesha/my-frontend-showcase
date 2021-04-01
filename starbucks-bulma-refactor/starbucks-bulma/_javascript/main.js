/*document.addEventListener('DOMContentLoaded', () => {
  console.log('Hello Bulma!');
});*/
"use strict"

let tbody = document.querySelector('#coffees');
let roastSelection = document.querySelector('#roast-selection');
let coffeeSelection = document.querySelector('#myInput');

/*adding new coffee upon clicking*/

let createCoffee = document.querySelector('#submit');
createCoffee.addEventListener('click', function () {

  let addCoffeeRoast = document.getElementById("add-coffee");
  let newCoffeeName = document.getElementById('newDrinkSearch');

  if (newCoffeeName !== "") {
    newCoffee(addCoffeeRoast.value, newCoffeeName.value);
    newCoffeeName();
  }
});

function renderCoffee(coffee) {

}



function renderCoffees(coffees) {
  let html = '';
  for (let i = 0; i < coffees.length; i++) {
    html += renderCoffee(coffees[i]);
  }

  return html;
}

/*filter coffee*/
let refreshCoffees = function () {
  let selectedRoast = roastSelection.value;
  let selectedCoffee = coffeeSelection.value;
  let filteredCoffees = [];

  coffees.forEach(function (coffee) {
    if ((coffee.roast === selectedRoast) || selectedRoast === "All") {
      if (coffee.name.toLowerCase().startsWith(selectedCoffee.toLowerCase())) {
        filteredCoffees.push(coffee);
      }
    }
  });
  tbody.innerHTML = renderCoffees(filteredCoffees);
};

let newCoffee = function (type, name) {
  let newCoffeeObj = {id: coffees.length + 1, name: name, roast: type};
  console.log(newCoffeeObj);
  coffees.push(newCoffeeObj);
  console.log(coffees);
};

let coffees = [
  {id: 1, name: 'Light City', roast: 'Drip'},
  {id: 2, name: 'Half City', roast: 'Drip'},
  {id: 3, name: 'Cinnamon', roast: 'Drip'},
  {id: 4, name: 'City', roast: 'Iced'},
  {id: 5, name: 'American', roast: 'Iced'},
  {id: 6, name: 'Breakfast', roast: 'Iced'},
  {id: 7, name: 'High', roast: 'Iced'},
  {id: 8, name: 'Continental', roast: 'Frozen'},
  {id: 9, name: 'New Orleans', roast: 'Frozen'},
  {id: 10, name: 'European', roast: 'Frozen'},
  {id: 11, name: 'Espresso', roast: 'Frozen'},
  {id: 12, name: 'Viennese', roast: 'Tea'},
  {id: 13, name: 'Italian', roast: 'Tea'},
  {id: 14, name: 'French', roast: 'Tea'},
];

tbody.innerHTML = renderCoffees(coffees);

roastSelection.addEventListener('change', refreshCoffees);
coffeeSelection.addEventListener("keydown", function () {
  refreshCoffees(coffeeSelection.value);
});

function imgSlider(anything){
  document.querySelector('.starbucks').src = anything;
}
function changeCircleColor(color){
  const  circle = document.querySelector('.circle');
  circle.style.background = color;
}
