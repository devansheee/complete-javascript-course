'use strict';

// let and const : blocked scoped. var : function scoped
/* SCOPING : 3 types of scope in js : global, function, blocked
> scope chain  : every scope has access to variables from all its outer scope
> variable lookup : when a variable is not in the current scope, the engine looks up in the scope chain until it finds the variable it's looking for. this is variable look up
> scope chain is one way street : a scope has no access to variables in the inner scops
> scope chain in a certain scope is equal to adding together all the variable environments of the all parents scope
> the scope chain has nothing to do with the order of function calls 
*/

function cc(message) {
  console.log(message);
}

function calcAge(birthYear) {
  const age = 2026 - birthYear;
  console.log(firstName);

  function printAge() {
    //global variable firstName can be accessed in here
    // const output = `${firstName} - you are ${age} years old`;
    let output = `${firstName} - you are ${age} years old`;
    console.log(output);

    var millenial = true;

    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = 'Devanshee';
      //o/p will be Devanshee and not deva based on variable lookup
      const str = `and, you are a millenial. ${firstName}`;
      console.log(str);

      output = 'NEW OUTPUT';
      function add(a, b) {
        return a + b;
      }
    }
    //str is blocked scope
    // console.log(str);

    //functions are blocked scope in strict mode!
    // add(2,3);

    //var millenial - function scoped!
    console.log(millenial);
    //output : NEW OUTPUT
    console.log(output);
  }
  printAge();
  return age;
}

//global scopped
const firstName = 'deva';
calcAge(2000);
//cannot access age as its function scopped
//console.log(age);

console.clear();

//varible HOISTING
//accessing variables before its declaration : variables lifted to the top of their scopes is what it seems like
// how it works ? : code scanned for variable declaraitions and for each variable, a  new prop is created in variable env obj.

/* .
                            hoisted     initial-value                         scope
function declarations        yes        actual function        block (if strict mode, else function)
var variables                yes        undefined                           function
let and const variables      no         <uninitialized>, TDZ        block
                                            (Temporal Dead Zone)    
function expressions /
        arror functions  ----- same as variables (let, const or var)
 */

/* temporal dead zone

 > region of the scope where the variable is defined but cant be used in any
 > each and every 'let' and 'const' variables have their TDZ which starts from the beginning of the scope where it is defined till the line of it's defined.
 > why TDZ? : makes it easy to avoid and catch errors


 why hoisting ? 
    > to use functions before its declarations (mutual recurssions)
    > var hoisting is possible (but it is just a byproduct) so we use let and const as a walk around

*/

//VARIABLE HOISTING
console.log(me);
// console.log(job);  cannot be used before initialization (js engine has already read the code and knows that its initialized in the upcoming code)
// console.log(year); same as job variable

var me = 'Deva';
let job = 'sde';
const year = 2000;

//FUNCTION HOISTING

cc(addDeclaration(2, 3)); // you could call function declaration before its defination :)
// cc(addExpression(2, 4));  cannot access this before initializations
// cc(addArrow(2, 5)); same as above
// cc(addExpressionV(2, 6)); this is not a function. why? any variable hoisted with 'var' will be initilized to undefined : undefined(2,3) this is what we are doing

function addDeclaration(a, b) {
  return a + b;
}

const addExpression = function (a, b) {
  return a + b;
};

var addExpressionV = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => a + b;

console.clear();

//in the scenerio below : all the products are deleted even if there are 10 products in all because of hoisting as numProdut is undefined and not 10.
if (!numProducts) deleteShoppingCard();

var numProducts = 10;

function deleteShoppingCard() {
  console.log('All products deleted');
}

console.clear();

//MAJOR Take-aways

/*  
> avoid declaring variables using var
> clean code : declare variables on the top
> declare functions up and then use them
*/

var x = 1;
let y = 2;
const z = 3;

//this object will contain property x=1, but you wont find y and z.
console.log(window.x === x);
console.log(window.y === y);
console.log(window.z === z);

console.clear();

//THIS KEYWORD
/* 
Created for every execution context( every function ).
points to the owner of the function.
it's value isnt static. it's value is assgined only when the function is actually called.

function can be called in 4 ways.

A. method (as attached to the object) : this >> the object that is calling this method
B. simple function call : this >> undefined, if in strict mode, else : points to the global object ( window )
C. arrow functions : this >> this of the surrounding function (lexical this), arror function don't get their own this keyword
D. event listener : this >> dom element that the handler is attached to

this will never point to the function in which we are using it.
this will never point to the variable environment of the function.

E. new, call, apply, bind : other ways to call functions
*/

console.log(this);

const calculateAge = function (birthYear) {
  cc(2022 - birthYear);
  cc('this from function expression: ' + this);
};
calculateAge(1999);

const calculateAgeArrow = birthYear => {
  cc(2022 - birthYear);
  //here, this is of the lexical this i.e this of the parent function or it's parent's scope
  cc('this from arrow function: ' + this);
};
calculateAgeArrow(1999);

const devanshee = {
  year: 2000,
  caluAge: function () {
    //this keyword here is the owner of the method i.e the object to which the method belong to!
    cc(this);
    cc(2022 - this.year);
  },
};

devanshee.caluAge();
console.clear();

const dhwani = {
  year: 1991,
};

//method borrowing
dhwani.calcuAge = devanshee.caluAge;
dhwani.calcuAge();

const f = devanshee.caluAge;
// f(); cannot find prop year bcz f doesnt not have year prop and 'this.year' => undefined

console.clear();

var fname = 'harsha';

//REGULAR FUNCTIONS V/S ARROW FUNCTIONS
const devu = {
  fname: 'Devanshee',
  year: 2000,
  caluAge: function () {
    //this keyword here is the owner of the method i.e the object to which the method belong to!
    cc(this);
    cc(2022 - this.year);
  },

  greet: () => {
    //this : window object.
    cc(this);
    cc(`Hey, ${this.fname}`);
  },
};

//o/p : Hey undefined! coz arrow function doesnt have its own this keyword and so it uses its parent scope's this : window obj in this case. it wont give any error
devu.greet();
//after defining var fname, we get hello harsha.

//take away : avoid using arrow functionssss

console.clear();

const kalpesh = {
  fname: 'Kalpesh',
  year: 2000,
  caluAge: function () {
    //this keyword here is the owner of the method i.e the object to which the method belong to!
    cc(this);
    cc(2022 - this.year);

    /* 
    Solution A.
    const self = this; // this : kalpesh
    const isMillenial = function () {
      //cc(this); this is a regular function CALL, this keyword is undefined accourding to the error message.
      //cc(this.year >= 1981 && this.year <= 1996);
      //Solution to the above problem : use self { not in the modern javascript}
      cc(self.year >= 1981 && self.year <= 1996);
    };
    */

    // Solution B. ( Modern JS ;) imp usecase of arrow function
    const isMillenial = () => {
      //arrow function inherits the this keyword of the parent scope and so here , this : kalpesh
      cc(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
  },

  greet: () => {
    //this : window object.
    cc(this);
    cc(`Hey, ${this.fname}`);
  },
};

kalpesh.caluAge();

console.clear();

//Arguments keyword
const adddExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};

var adddArrow = (a, b) => {
  //   cc(arguments); arguments keyword exists only for the regular function and not for arrow functions
  return a + b;
};

adddExpr(2, 3);
//this is legal but not used much in modern js!
adddExpr(2, 3, 8, 12);

console.clear();

//primitive v/s object reference types
let agee = 30;

//BEHAVIOUR WITH THE PRIMITIVE VALUES
//VALUES are stored on the 'CALL STACK'
//oldAge points to the memory address that's pointed by agee
let oldAge = agee;

//value at certain memory address is immutable i.e it cannot be changed.
//new memory is allocated and agee points to the new address which is holding the new value i.e 35
agee = 35;
cc(agee);
cc(oldAge);

//BEHAVIOUR WITH THE REFERENCE VALUES
// VALUES are stored on the 'HEAP' bcz the obj may be large nd so it is better to store in the infinite memory pool in the heap
//mee created on Call stack and it has the value of the address of the HEAP where the real object is stored.
const mee = {
  name: 'Devu',
  myage: 30,
};

//just like primitive types, friend will be created on call stack and it will point to the address of mee. so the friend obj is exactly same as the mee object.
const friend = mee;
//value on the heap is changed. friend being const, we are still changing the value and it makes sense coz friend contains address and we arent changing the address that friend is holding.
friend.myage = 27;

cc('Friend: ' + friend);
cc('Me : ' + mee);

//so all objects declared const are muttable. all primitive values declared const are immutable.

//SO WHENEVER YOU COPY ANY OBJECT, you are simply creating a new variable that points to the exact same object.

//primitive types
let lname = 'Vankani';
let oldlname = lname;
lname = 'Shah';
cc(lname);
cc(oldlname);

//reference types
const devansheeee = {
  fname: 'Devanshee',
  lname: 'Vankani',
  age: 22,
};

const jimmy = devansheeee;
jimmy.lname = 'Shah';
cc(jimmy);
cc(devansheeee);

//i already know why has this happened! making changes in the heap has nothing to do with const/let
// jimmy = {}; this doesnt work coz this will be stored at the different position in the memory => the reference to that mem will have to change in this variable bcz this is in the stack and thus its value cannot be chnaged.

//copying objects
const devansheeee2 = {
  fname: 'Devanshee',
  lname: 'Vankani',
  age: 22,
  family: ['Kalpesh', 'Harsha'],
};

console.clear();
const devansheeeeCopy = Object.assign({}, devansheeee2); //this is the real copy. new object was created on heap
devansheeeeCopy.lname = 'Shah';
devansheeeeCopy.family.push('Sonal');
devansheeeeCopy.family.push('Chirag');
cc(devansheeee2);
cc(devansheeeeCopy);

//however assign works only on the first level. if we have obj inside obj, the inner obj will still be the same : it creates the shallow copy and not a deep clone

//deep clone could be made using external lib : Lo-dash
