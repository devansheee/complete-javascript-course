'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';
const weekdayss = ['mon', 'tue', 'wed', 'thur'];

//now we want this inside restaurent
const openingHoursEnhanced = {
  thu: {
    open: 12,
    close: 22,
  },
  //3. ES6 object literal enhancement
  [weekdayss[3]]: {
    open: 12,
    close: 22,
  },
  [`day-{2+3}`]: {
    open: 12,
    close: 22,
  },
  fri: {
    open: 11,
    close: 23,
  },
  sat: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //2. with enhaced object ES6 you could write the above function as
  orderEnhanced(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  /*  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  }, */

  //1. ES6 enhanced object lireral : openingHours: openingHours, we wont write it this way now.
  openingHoursEnhanced,

  /* orderDelivery: function (obj) {
    console.log(obj);
  }, */
  //destructure it then and there itself. we have passed only 1 object and not 4 args. order of the 4 things doesnt matter so it is easier to use and understand.
  orderDelivery: function ({
    time = '20:00',
    starterIndex = 1,
    mainIndex = 0,
    address,
  }) {
    console.log(time, starterIndex, mainIndex, address);
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizzaV2: function (mainIng, ...otherIngs) {
    console.log(mainIng);
    console.log(otherIngs);
  },
};

//destructuring : break complex ds into simple ds

//A. destruc ARRAYS.
const arr = [2, 3, 4];
const [x, y, z] = arr; //need to declare using const. this will not affect the origin array
console.log(x, y, z);

const [first, second] = restaurant.categories;
console.log(first, second);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

//switch main & sec
/* const temp = main;
main = secondary;
secondary = temp; */
[main, secondary] = [secondary, main];

const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

console.clear();

//Nested destructuring
const nested = [2, 3, [4, 5]];
const [i, , j] = nested;
console.log(i, j);

const [a, , [b, c]] = nested;
console.log(a, b, c);

//Default values : in real world apps wherein you do not know the length of the array
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

//---------------------------------//

//B. Destructure objects
//you gotta write the exact prop names that you want to extract
//seq doesnt matter
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);
console.clear();

//you could rename the property
const { name: restNames, openingHours: hours, categories: tags } = restaurant;
console.log(restNames, hours, tags);

//default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//mutating variables while working with objects
let d = 111;
let js = 777;
const obj = { d: 33, js: 44, s: 14 };
//when starting with { , js considers it as a code block and we could not assign anything to a code block, so simply wrap it with a ()
({ d, js } = obj);
console.log(d, js);

//nested objects
const {
  fri: { open: o, close: cl },
} = openingHoursEnhanced;
console.log(o, cl);

//function call with args as : destructed obj maybe
restaurant.orderDelivery({
  time: '22:30pm',
  address: 'xyz abc',
  mainIndex: 2,
  starterIndex: 1,
});

console.clear();

//---------------------------------------------------//
//SPREAD OPERATOR : for array extension, for logging individual elements of any array
const arr1 = [4, 5, 6];
const badNewArray = [1, 2, arr1[0], arr1[1], arr1[2]];

const newGoodArray = [1, 2, ...arr1];
console.log(newGoodArray);
console.log(...newGoodArray);

//here we are creating a completely new array w/o affecting the original array as seen from the '[]'
const newMenu = [...restaurant.mainMenu, 'SomethingNew'];
console.log(newMenu);

//spread op takes all the elements from the array and prints the individual items. it also doesnt create a new variable

//create shallow copies
const newMenuCopy = [...restaurant.mainMenu];
//join arrays
const menuJoined = [...restaurant.mainMenu, ...restaurant.starterMenu];
console.log(menuJoined);

console.clear();
//Iterables : arrays, strings, maps, sets but NOT OBJECTS
const strr = 'deva';
const letters = [...strr, ' ', 'S'];
console.log(letters);
console.log(...strr);
// console.log(` ${...strr} devanshee`);// this will not work

console.clear();

/* const ingredients = [
  prompt("Let's make pasta. Ing1 : ?"),
  prompt('Ing2 : ?'),
  prompt('Ing3 : ?'),
];

//so, the spread operator will destructure the array in the form of 3 arguments.
restaurant.orderPasta(...ingredients);
 */
// objects are not itterables then too it will work here in modern js
const newRest = { foundedIn: 2000, ...restaurant, founder: 'Someone' };
console.log(newRest);

//shallow copy
const restCopy = { ...restaurant };
restCopy.name = 'New name';

console.clear();

//---------------------------------//
//REST OPERATOR : OPP OF SPREAD OP

// 1. destructuring

//SPREAD bcz its on rhs of the =
const arrr = [1, 2, ...[3, 4]];

//REST bcz its on lhs of =. it basically collects the unused elements in the destructuring assignments. so the rest pattern must always be the last. and there can be only 1 rest .

const [aa, bb, ...others] = [1, 2, 3, 4, 5];
console.log(aa, bb, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

//objects
const { sat, ...weekdays } = restaurant.openingHoursEnhanced;
console.log(weekdays);

// 2. functions

//rest params : variable length arguments
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  return sum;
};

console.log(add(2, 3));
console.log(add(3, 4, 5));
console.log(add(1, 2, 3, 4, 5, 6));

const xx = [23, 45, 67];
add(...xx);

restaurant.orderPizzaV2('olives', 'halepinos', 'onion', 'tomato');
console.clear();

//----------------------------//
//SHORT CIRCUTING

// logical ops :  use any datatype, return any data type and can shortcircuit calcs
console.log('OR');
console.log(3 || 'Deva');
console.log('' || 'Deva');
console.log(true || 0);
console.log(undefined || null);

console.log(undefined || 0 || '' || 'Hello' || 23 || null); //o/p : hello, coz its the first truthy value.

const guest1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guest1);

//the below will be done faster and easy and better.
const guests2 = restaurant.numGuests || 10;
//but if nu of guest =0, then || will still assign it a value of 10 :()
console.log(guests2);

console.log('And');
console.log(0 && 'Jones');
console.log(7 && 'Hello');

//call the function if its declared.
restaurant.orderPizza && restaurant.orderPizzaV2('mushroom', 'olives');

console.clear();

//--------------------------------------------//
//Null coalesing op : will solve the issue of 0 with || which is addressed above. works with the idea of null values ( null and undefined) over falsy values.
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

//Logical assignments
const rest1 = {
  name: 'r1',
  //numGuest: 20,
  numGuest: 0,
};

const rest2 = {
  name: 'r2',
  owner: 'Dkv',
};

// rest1.numGuests = rest1.numGuest || 10;
// rest2.numGuests = rest2.numGuest || 10;

// rest1.numGuests ||= 10;
// rest1.numGuests ||= 10;

//nullish assignment will assign the value if the value is nullish
rest1.numGuests ??= 10;
rest1.numGuests ??= 10;

// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';

rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';

console.log(rest1, rest2);

//-------------------------------------------------//
//for-of loops
const menuloop = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menuloop) console.log(item);

for (const item of menuloop.entries()) {
  console.log(`${item[0] + 1} : ${item[1]}`);
}
//destructuring the array item
for (const [i, el] of menuloop.entries()) {
  console.log(`${i + 1} : ${el}`);
}

console.log(...menuloop.entries());

//enhanced object literals : 1,2,3 on the top

//------------------Optional chaining-----------------------------------//
// console.log(restaurant.openingHoursEnhanced.mon.open); //this will give us error coz mon is undefined

console.log(restaurant.openingHoursEnhanced.mon?.open); //on if mon exists, open will be read else undefined will be returned anf not error!
console.log(restaurant?.openingHoursEnhanced.mon?.open); //openingHoursEnhanced and mon are optional

console.clear();

const days = ['mon', 'tue', 'wed', 'thu'];

for (const day of days) {
  // console.log(day);
  const open = restaurant.openingHoursEnhanced[day]?.open ?? 'closed';
  console.log(`We open at ${open} on ${day}`);
}

//Methods
console.log(restaurant.order?.(0, 1) ?? 'Method doesnt exists');
console.log(restaurant.orderResoto?.(0, 1) ?? 'Method doesnt exists');

//Arrays
const users = [{ namee: 'deva', mail: 'devemail' }];
console.log(users[0]?.namee ?? 'User array is empty');

console.clear();

//looping objects : values, keys, entries

for (const day of Object.keys(openingHoursEnhanced)) {
  console.log(day);
}
const properties = Object.keys(openingHoursEnhanced);
console.log(properties);
let openStr = `we are open on ${properties.length}`;

for (const day of properties) {
  openStr += `${day}, `;
}

console.log(openStr);

//property values
const values = Object.values(openingHoursEnhanced);
console.log(values);

//Entries object
const entries = Object.entries(openingHoursEnhanced);
console.log(entries);

//[key, {value1, value2}] : wohoo
for (const [key, { open, close }] of entries) {
  console.log(`on ${key} we open at ${open} and close at ${close}`);
}

console.clear();

//-------------------------SETS-----------

//duplicates gone. these are iterables. order of elements doesnt matter
const orderSet = new Set(['Pasta', 'Pizza', 'Pizza', 'Risotto']);
console.log(orderSet);
console.log(new Set('Deva'));
console.log(orderSet.size);
console.log(orderSet.has('Pizza'));
orderSet.add('Garlic Bread');
// orderSet.clear(); to delete all the elements
orderSet.delete('Risotto');
// console.log(orderSet[0]); //this will be undefined

for (const order of orderSet) console.log(order);

//Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef'];
//to remove duplicates we have created set;
const staffUniq = new Set(staff);
console.log(staffUniq);
//to know the num of diff positions and so you wouldnt need to create the array
console.log(new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef']).size);

//you could also create array using spread op over set
const staffUniqArray = [...new Set(staff)];
console.log(staffUniqArray);

console.clear();

//-------------MAPS---------------
//store values in the form of key-value pair. how diff from obj? >> keys could be of any datatype

const restMap = new Map();
restMap.set('name', 'Tomatoes');
restMap.set(1, 'Rajkot');
restMap.set(2, 'Vadodara');
console.log(restMap.set(2, 'Baroda'));
//chain the set method
restMap
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 22)
  .set(true, 'We are open')
  .set(false, 'We are close');

console.log(restMap.get('name'));
console.log(restMap.get(true));

const time = 21;
//this is really smart but not readable though!
console.log(
  restMap.get(time > restMap.get('open') && time < restMap.get('close'))
);

//check of map contains something
console.log(restMap.has('categories'));
restMap.delete(2);
restMap.set([1, 2], 'Test');
console.log(restMap);
console.log(restMap.size);
// console.log(restMap.get([1, 2])); this will give us undefined as [1,2] are not the same object in the heap so we gotta create an array variable and then use that to set and get the values
// restMap.clear();
let array1 = [1, 2];
restMap.set(array1, 'test');
console.log(array1);

restMap.set(document.querySelector('h1'), 'Heading'); // so when you will hoverover this, it will point to exactly the same dom element and you could exploit this to achieve some advanced functionality
console.clear();

//-------maps iterations----------

const question = new Map([
  ['question', "What's the best PL?"],
  [1, ['C']],
  [2, 'Python'],
  [3, 'JS'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'False'],
]);

console.log(question);
console.clear();

//Converting obj => maps
console.log(Object.entries(openingHoursEnhanced));
const hoursMap = new Map(Object.entries(openingHoursEnhanced));
console.log(hoursMap);

for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value} `);
}

const answer = 3;
// const answer = Number(prompt('Your answer'));
//console.log(answer);

console.log(question.get(answer === question.get('correct')));

//map to array
console.log([...question]);
console.clear();

//-------------------------when to use which DS---------------//
/* 

Sources of data
  A. from prog itseld
  B. from UI
  C. external sources : web API
    (mainly in the form of JSON objs)

  => to store collections of this data
    a. simple list : array or set
    b. key/value pairs : objects/ maps

    (weakmap, weakset also build-in in js)


    arrays : order and duplicates there.
            when needed to manipulate data 
    sets : unique values, remove duplicates, need high performance

    -------------

    [key/value store]

    objects : tradional , easy to write/read
              when need functions as values => methods
              json objects, use objects
    maps : better performance, keys of any ds, easy to iterate, easy to compute size

*/

console.clear();

//------------------STRING-----------------------//

const airline = 'Indigo India';
const plane = 'AD320';

console.log(plane[0]);
console.log('BD123'[0]);
console.log(airline.length);

console.log(airline.indexOf('g')); //only first occurance
console.log(airline.lastIndexOf('g'));
console.log(airline.indexOf('India'));

console.log(airline.slice(4)); //get sub string. original string is immutable
console.log(airline.slice(4, 8)); //length : 8-4 = 4;

//extract first word and last word
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
//start from last and print in reverse
console.log('here ' + airline.slice(-2));
console.log(airline.slice(1, -1));

/////////////////////////
const checkMiddleSeat = function (seat) {
  //consider B and E are middle seats
  //check last char nd see if its b or e

  //get the last charector
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('Middle seat :(');
  else console.log('lucky');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');

//BTS : js will convert the primitive-string to objects at the back when any of the methods is called on string : 'BOXKING'
console.clear();
console.log(airline.toLocaleLowerCase());
console.log(airline.toUpperCase());

//fix capitalization in name
const passenger = 'dEva';
const passLower = passenger.toLocaleLowerCase();
const passCorrect = passLower[0].toUpperCase() + passLower.slice(1);
console.log(passCorrect);

//compare email
const email = 'hell@gmail.com';
const loginEmail = 'Hello@Gmail.com\n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();

const normalizedEmail = loginEmail.toLowerCase().trim();

//replacing
const priceUS = '12,345$ ';
const priceRS = priceUS.replace('$', 'rs').replace(',', '.');
console.log(priceRS);

const announcement = 'All passgr come to boarding door 20, door 20';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));
console.log(announcement.replace(/door/g, 'gate')); //using regex

//Booleans

const planeNew = 'Deva777';
console.log(planeNew.includes('va7'));
console.log(planeNew.startsWith('Dev'));

if (planeNew.startsWith('Deva') && planeNew.endsWith('77')) {
  console.log('part of new airbus family');
}

console.clear();

const checkBag = function (items) {
  const baggage = items.toLowerCase(); // always do thi always while working with the strings
  if (baggage.includes('knife') || baggage.includes('gun'))
    console.log('Not allowed to board');
  else console.log('Welcome onboard');
};
checkBag('I have a laptop, bottle, Pocket Knife');
checkBag('Pencil, socks, Jewellery');
checkBag('Got gun for protection');

console.clear();
/////////////////////////
//---------split-----join
console.log('a+very+fine+art'.split('+'));

const [fname, lname] = 'Deva Vankani'.split(' ');

const newName = ['Ms.', fname, lname.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    //namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

const passengerr = 'devanshee kalpesh vankani';
console.clear();
capitalizeName(passengerr);

//padding a string to desired length
const msg = 'go to gate 77';
console.log(msg.padStart(25, '+').padEnd(35, '+'));

//example : credit card number display
const maskCreditCard = function (number) {
  const str = number + ''; //all the ops would get converted to string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(123456789));
console.log(maskCreditCard('12345678909876'));

//repeat

const message = 'Bad weather... all departures delayed';
console.log(message.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'planeEmoji '.repeat(n)}`);
};
planesInLine(5);
planesInLine(6);

///////////// checkout more on mozilla developers /////////////
console.clear();

console.log(flights.split('+'));

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  //console.log(flight.split(';'));
  //destructuring
  const [type, from, to, time] = flight.split(';');
  const op = `${
    type.startsWith('_Delayed') ? 'redEmoji ' : ''
  }${type.replaceAll('_', ' ')} ${getCode(from)} ${getCode(to)} ${time.replace(
    ':',
    'h'
  )}`.padStart(45);
  console.log(op);
}
