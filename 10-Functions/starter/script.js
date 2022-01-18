'use strict';

const bookings = [];

const createBooking = function (
  flightnum,
  numPassenger = 1,
  price = 199 * numPassenger
) {
  //   numPassenger = numPassenger || 1;
  //   price = price || 199;

  const booking = {
    flightnum,
    numPassenger,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('DEVA123');
createBooking('DEV567', 2, 400);
//skip a param, put undefined
createBooking('DEVA434', undefined, 1000);

////////////////////////
//passing primitive v/s passing object. primitive : value unchanged, object: value changes

console.clear();

const flight = 'JWA123';
const devanshee = {
  name: 'Devanshee Vankani',
  passport: 1234567,
};

const checkIn = function (flightnum, passenger) {
  flightnum = 'SON123';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 1234567) alert('Checked In');
  else alert('Wrong passport');
};

//checkIn(flight, devanshee);
console.log(flight); //JWA123 , this is primitive so unchanged
console.log(devanshee); //affected by the above as this is obj

const newPassport = function (person) {
  //obj's prop value is changed by the function. so be careful.
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(devanshee);
//checkIn(flight, devanshee);

//passing by value v/s pass by reference.
//js : always passed by value. in case og objs, we pass the reference which are again the values on the stack.

//FIRST-CLASS FUNCTIONS :  functions are simply values. it's type is object which are the value itself.
//methods which could be called on functions (like methods which could be called on the object)
//higher order function (like listerners) - functions which takes functions as the arguments , && functions which return the function

//------------functions accepting callback functions-----------------//
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//higher order function
const transformer = function (str, fn) {
  console.log(`Transformed: ${fn(str)}`);
  console.log(`Transformed by : ${fn.name}`);
};
//just pass the name of the func without ()
transformer('Javascript is a good lang', upperFirstWord);
transformer('Javascript is a good lang', oneWord);

//js uses call back almost all the times. it allows to create abstraction
const high5 = function () {
  console.log('Hi');
};
//higher order function
document.body.addEventListener('click', high5);
['dev', 'rac', 'aad'].forEach(high5);

console.clear();
/////////////////

//functions whuch returns function

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet('Hey');
greeterHey('Devanshee');
greeterHey('Dev');

greet('Hello')('Rachit');

//this is useful for functional programming mainly

const greetWithArrow = function (greetings) {
  return name => {
    console.log(`${greetings} ${name}`);
  };
};

const greetArrow = greetings => {
  return name => {
    console.log(`${greetings} ${name}`);
  };
};
//you can also avoid {} block

console.clear();
greetWithArrow("Hey, what's up")('Deva');
greetArrow("Hey, what's up")('Devanshee');

console.clear();
////////////

/////////////////////////////////////
//the call and apply methods

const airindia = {
  airline: 'airindia',
  iatacodeL: 'AI',
  bookings: [],
  book(flightnum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iatacodeL}${flightnum}`
    );
    this.bookings.push({ flight: `${this.iatacodeL} ${this.flightnum}`, name });
  },
};

const book = airindia.book;

airindia.book(234, 'Devanshee');
airindia.book(543, 'Dhwani');

const indiaflight = {
  airline: 'indiaflight',
  iatacodeL: 'if',
  bookings: [],
};

// book(23, 'Rachit Vankani'); this will give error coz book is now a function as defined above and not just the method. in it's method defination, the this keyword is now poiting to undefined. so
//we would need something : call, apply or bind

book.call(indiaflight, 23, 'Rachit Vankani'); //this keyword is now pointing to indiaflight
console.log(indiaflight);

book.call(airindia, 456, 'Cupper');
console.log(airindia);

//apply method. same as call but with [] args as the list of args.
const fligtData = [324, 'Aditya'];
book.apply(airindia, fligtData);
//apply is not much used as we can do it better the other way

book.call(airindia, ...fligtData);

//bind : more imp than call and apply
//bind doesnt immediately call the function, instead it returns a new function where the this keyword is bound : it is set to whatever value we pass in bind
console.clear();
const bookInFli = book.bind(indiaflight);
bookInFli(345, 'Dipti');

//first arg of book is preset to 23: partial application
const bookInFli23 = book.bind(indiaflight, 23);
bookInFli23('Devanshee');
bookInFli23('Nilesh');

console.clear();

// event listeners
airindia.planes = 300;
airindia.buyPlane = function () {
  console.log(this);
  console.log(++this.planes);
};

//when the button will call buyPlane function, this keyword would point to the button! so we need to bind this to some object when the function is called. so we would have to use bind
document
  .querySelector('.buy')
  .addEventListener('click', airindia.buyPlane.bind(airindia));

//////////////////////

//Partial application : bind() - preset params

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//here we are presetting rate to 23%. we do not need to bind it to anything so we ll write null
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100)); //find value added tax on value =100;

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.23); //use it likethis : addVAT2(value)
addVAT2(100);

console.clear();

/////////////////////////////////

// when we need function to execute it only once and immedietly : immedietly invoked function expression

//iife
(function () {
  console.log('Run only once');
})();

(() => console.log('Run only once'))();

//closures : happens automatically
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    console.log(++passengerCount);
  };
};

//theoritically speaking : secureBooking has already completed it execution and so it doesnt have it's execution context on the call stack.
// then why is passengerCount able to increment????
//this is f closure.

//booker is in global scope and has somehow access to the variables declared in the function scope
//closure : makes a function remember the variables at the function's birthplace.
//bts : any function always has the access to the variable env of exe context in which it is created.
//it's this connection which is closure.
//closure defination :::: variable env to the function, exactly as it was at the time and place the function was created even after that execution context is gone

const booker = secureBooking();
booker();
booker();
booker();

//----------closure has priority over scope chain-------//
console.dir(booker);

console.clear();

//some more closures
//ex - 1
let f;

const g = function () {
  const a = 45;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 100;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); //closed over env of g function, even after completion of g();

// reassigning f
h();
f();

console.dir(f); // f no longer has value of 'a'. old closure has disappeared.

// ex -2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;
  setTimeout(function () {
    console.log(`We are boarding all ${n} passengers`);
    console.log(`There are 3 groups , each with ${perGroup} passengers`);
  }, 1000 * wait);
  console.log(`will start boarding in ${wait} seconds`);
};

const perGroup = 10000; //closure has priority over scope chain :)
boardPassengers(180, 3);

console.clear();
