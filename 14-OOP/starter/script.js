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

//ES6 classes : different from traditoional classes of oop

//class expression
const PersonClExp = class {};

//class decoration
class PersonCl {
  //this is the method of the class. define prop in its args
  constructor(firstName, birthYear) {
    this.fullName = firstName;
    this.birthYear = birthYear;
  }

  //all these methods out of constructor is on the prototype of the object and not for the object
  //prototypal inheritance
  //methods added to .prototypr property
  calcAgeMethod() {
    console.log(2022 - this.birthYear);
  }

  greetWorksSameAsBelowGreet() {
    console.log(`Hey ${this.firstName}`);
  }

  //instance methods as it would be available to all the instances.
  get age() {
    return 2022 - this.birthYear;
  }

  //getters and setter for validation

  //we got conflict as setter and constructor are both trying to set the same prop
  //so by convension, when we try to set the existing prop, we create a new prop by adding a _ (by convension)
  //on doing this, fullName would rename undefined, so we would have to create a getter for the same
  //see, the name of the method is same as that of the prop name that we wanna set ! that is why there's a conflict b/t constructor and fullName()
  set fullName(name) {
    // if (name.includes(' ')) this._fullName = name;
    // else alert('The given name is not the full name');
  }

  get fullName() {
    return this._fullName;
  }
}

const deva = new PersonCl('devansheee vankani', 2000);
console.log(deva.__proto__ === PersonCl.prototype); // true

PersonCl.prototype.greet = function () {
  console.log(`Hey ${this.firstName}`);
};

deva.greetWorksSameAsBelowGreet();
deva.greet();
// 1. classes are NOT hoisted
// 2. classes are also first -class citizens (bcz these are just the special type of functions)
// 3. these are always executed in strict mode (irrespective of if you write use strict at the start of the script file)

console.clear();

//SETTERS and GETTERS : accessors props and not data props
//normal js obj
const account = {
  owner: 'devanshee',
  movements: [100, 200, 200, 300],

  get latest() {
    return this.movements.slice(-1).pop();
  },
  set latest(mov) {
    this.movements.push(mov);
  },
};
//use it like property
console.log(account.latest);
account.latest = 50;

//getrs nd setrs in classes
console.log(deva.age);
// const dhwani2 = new PersonCl('Dhoni', 2002);

console.clear();

//static methods
/*  
Array.from()  => is actually attached to the array constructor so it couldnt be used on the array . so all arrays do not inherit this. 
so, from is static method, which is not attached to [] but only with 'Array' constuctr
*/

//static method
PersonCl.hey = function () {
  console.log('Hey there');
  console.log(this); //points to PersonCl constructor
};

//so deva.hey() will not work.
////////////////////////////////////////////////////////
// 3rd way to implement prototypal instantiation or deligation : Object.create

//manually set the prototype of any object. prototype chain remains the same.

const PersonProto = {
  calcAgeMethod() {
    console.log(2022 - this.birthYear);
  },

  //this has nothing to do with constructor function, coz we arent using new operator!!!
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

//harsha's prototype would be linked to the prototype of PersonProto
const harsha = Object.create(PersonProto);
harsha.name = 'Harsha';
harsha.birthYear = 2000;
harsha.calcAgeMethod();

console.log(harsha.__proto__ === PersonProto);

const adi = Object.create(PersonProto);
adi.init('Aditya', 2014);
adi.calcAgeMethod();
console.clear();

///////////////////////

//inheritance b/w classes
// A. using constructor functions

const StudentC = function (firstName, birthYear, course) {
  //   this.firstName = firstName;
  //   this.birthYear = birthYear;
  Person.call(this, firstName, birthYear); //this is not set as called as a function, so we ll use call : to set this and also invoke the function silmultaneously

  this.course = course;
};
//Linking prototypes
StudentC.prototype = Object.create(Person.prototype);
// StudentC.prototype = Person.prototype; this will not work :)
//why? : because this would be similar to copying complex objects which are stored on the heap. both student and person would be MERELY pointing to the same Person.prototype object and not the different .prototype prop on the memory, which we do not f want.

StudentC.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course} course`);
};

const dhruvi = new StudentC('Dhruvi', 2000, 'Computer');
dhruvi.introduce();
dhruvi.calcAge();

/* now we want to set the inheritance.  we want child.__proto__ to be equal to that of person
CONSTRUCTOR FUNCTION                Prototype
    [Person()]              =>    [Person.prototype]  

                                ^
                                |   -__proto__ : Person.prototype

Constructor function
    [Student()]              =>      Prototype
                                [Student.prototype]

                                __proto__ : Person.prototype

                            
                            ^
                            |  .__proto__

                                Object
                                [dhruvi]

                                __proto__ : Student.prototype

                     
 */
console.clear();
//to fix the issue below
StudentC.prototype.constructor = StudentC;
console.dir(StudentC.prototype.constructor); //it should actually point to StudentC() but is pointing to Person nd so this needs to be fixed.

console.log(dhruvi instanceof StudentC);
console.log(dhruvi instanceof Person); // both would be true bcz of prototype chainign

// B. using ES6 classes

console.clear();
//prototypes linked behind the scenes
class StudentESC extends PersonCl {
  constructor(firstName, birthYear, course) {
    //needs to happen first. to get this
    super(firstName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(
      `My name is ${this.firstName} and I study ${this.course} course`
    );
  }

  //override calcAge
  calcAge() {
    console.log('Calc age overwritten by student');
  }
}

const shivani = new StudentESC('Shivani', 2001, 'Computer');
shivani.introduce();
shivani.calcAge();

// C. using Object.create
console.clear();

const PersonProtoIn = {
  calcAgeMethod() {
    console.log(2022 - this.birthYear);
  },

  //this has nothing to do with constructor function, coz we arent using new operator!!!
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const khushi = Object.create(PersonProtoIn);

//prototype chainS
const StudentProto = Object.create(PersonProtoIn);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProtoIn.init.call(this, firstName, birthYear);
  this.course = course;
};
StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course} course`);
};
const jay = Object.create(StudentProto);
jay.init('Jay Shetty', 1980, 'Philosophy');
jay.introduce();

//just another example for class

console.clear();

class Account {
  // 1. Public fields : present on all the instances but not on the prototypes
  locale = navigator.language;

  // 2. Private fields
  #movements = [];
  #pin;
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //Protected field
    this.#pin = pin;
    //possible to create extra props
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  deposit(val) {
    this.#movements.push(val);
  }
  withdraw(val) {
    this.deposit(-val);
  }

  // 4. private method
  #approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log('Load approved');
    }
  }

  //public interface
  getMovements() {
    return this.#movements;
  }

  //static methods
  static helper() {
    console.log('I am defined on class cons and not on all instances');
  }

  //to chain the methods, lets return the object
  depositChain(val) {
    this.#movements.push(val);
    return this;
  }
  withdrawChain(val) {
    this.deposit(-val);
    return this;
  }
  approveLoanChain(val) {
    console.log('Loan approved');
    return this;
  }
}

const acc1 = new Account('Dev', 'INR', 1111);

//do not interact with props directly. rather create methods to interact with them
acc1.deposit(2000);
acc1.withdraw(200);
acc1.requestLoan(1000);
// acc1.approveLoan(1000); //this should actually not be allowed!
console.log(acc1);

// console.log(acc1.#movements); //so movements no accessible outside the class

////////////////////
console.clear();
//Data encapsulation and Privacy
//convension : _variableName : this is not supposed to be touched outside the class. protecting fields from unwanted access

//private class fields and methods. : class fields. not yet the part of js language

//traditonal oop : props are called class fields.

// 1. Public fields
// 2. private fields
// 3. public methods
// 4. private methods
// 5. static methods

//chaining methodsss
console.clear();
acc1
  .depositChain(100)
  .depositChain(1000)
  .withdrawChain(20)
  .approveLoanChain(200);

console.clear();
