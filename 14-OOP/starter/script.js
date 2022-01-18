'use strict';

//OOP
/* 

4 PILLARS
    A. Abstraction
    B. Encapsulation
    C. Inheritance
    D. Polymorphism

OOP is JS is a lil different from traditional OOP

> each object (instance) has a prototype (class)
    . prototypal inheritance :  all objects linked to a prototype could use all the methods and props of that prototype. 
    . behaviour is deligated to the linked prototype object (same as above). in traditonal oop, the methods of classes are actually copied in it's instances, however this is not the case here. here it is deligated i.e parent's methods itself is used directly

> 3 ways of implementing prototypal inheritance

    A. constructor functions: there is ntg as such in the lang, but just a way some developers use it and thus a convension.
    B. ES6 classes : layer of abstraction over A.
    C. Object.create() 

*/

//constructor and new keyword

//constructor fun : start with capital letter
const Person = function (firstName, birthYear) {
  //   console.log(this); it should be the empty object

  //set the instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //never create method inside constuctor. coz it will be created for each and every instance of this class.
  //so, we ll use Protoypes and prototype inheritance.
  /* this.calcAge = function () {
    console.log(2022 - this.birthYear);
  }; */
};

const devanshee = new Person('Deva', 2000);
console.log(devanshee);
/*
BTS : 1. New {} is created
      2. function is called, this = {}
      3. {} linked to prototype (__proto__ is set and points to Person.prototype)
      4. function automatically returns {}
*/

const dhwani = new Person('Dhwani', 2002);
const ruchi = new Person('Ruchi', 2000);
console.log(dhwani, ruchi);

console.log(devanshee instanceof Person);
console.clear();

///////////////////////////////
//prototypes and prototypal inheritance   >>>  'Person.prototype'  : so all the instance of the Person can access the methods and props defined on it. deligation over creating copies of methods for each instance

Person.prototype.calcAge = function () {
  console.log(2022 - this.birthYear);
};

devanshee.calcAge();
console.log(devanshee.__proto__ === Person.prototype); //true :O. so, Person.prototype is the prototype that all it's instances would have. and devanshee.__proto__ is the prototype of devanshee.
console.log(Person.prototype.isPrototypeOf(devanshee));
console.log(Person.prototype.isPrototypeOf(Person)); //false.

Person.prototype.species = 'Homo Sapiens';
console.log(devanshee.species);
console.log(devanshee.hasOwnProperty('species'));

//hasOwnProperty is actually the prop defined on Object.prototype.
//so, it is JS engine going up the prototype chain from devanshee -> person -> Object.
/* 

PROTOTYPE CHAIN

CONSTRUCTOR FUNCTION                Prototype
    [Obejct()]              =>    [Object.prototype]  

                                ^
                                |   -__proto__ : null

Constructor function
    [Person()]              =>      Prototype
                                [Person.prototype]

                                __proto__ : Object.prototype

                            
                            ^
                            |  .__proto__

                                Object
                                [devanshee]

                                __proto__ : Person.prototype

                    

*/

console.clear();
console.log(devanshee.__proto__);
console.log(devanshee.__proto__.__proto__);
console.log(devanshee.__proto__.__proto__.__proto__); //null

console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

console.clear();

const arr = [2, 3, 4, 5, 6];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.__proto__); //true, indeed!

//any array method that you see in the documentation : Array.prototype.filter()   ==> i.e each of the methods are defined on the prototype constructor for making it reusable! this is beautiful ^_^

/* so, now you could use this for all the arrays. however, extending the prototype of built-in object is not a good idea.
for the following reasons : 
    A) if new version of JS has the method with same name but diff feature, then code would break.
    B) if multiple developers create methods with this name but diff implementations, it would create many bugs!
*/
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());
console.clear();

// const h1 = document.querySelector('h1');
// console.dir(x => x+1); look into prototype of both of these.
