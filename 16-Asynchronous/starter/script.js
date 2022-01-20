'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

//sync code : code executed line by line in the exact order in which it is defined
//AJAX : async js and xml. allows us to communicate with remote web servers in an async way. with ajax calls, we can request data from web servers dynamically
// most api uses json objects for data exachange over xml.
//https://restcountries.com/v2/

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  //countriesContainer.style.opacity = 1;
};

const renderCountry = function (first, className = '') {
  const html = `
    <article class="country ${className}">
    <img class="country__img" src="${first.flag}" />
    <div class="country__data">
      <h3 class="country__name">${first.name}</h3>
      <h4 class="country__region">${first.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +first.population / 1000000
      ).toFixed(1)}</p>
     <p class="country__row"><span>🗣️</span>${first.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${first.currencies[0].name}</p>
    </div>
  </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountry = function (country) {
  //old school way to make xmp http request
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  // const data = request.send(); //this happens async. so lets not do this
  request.send();
  //request is send in background and on completion, load event is fired
  request.addEventListener('load', function () {
    // console.log(this.responseText); //this is json string

    const data = JSON.parse(this.responseText);
    const first = data[0];
    console.log(data);
    console.log(first);
    renderCountry(first);
  });
};

const getCountryAndNeighbour = function (country) {
  //old school way to make xmp http request
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  // const data = request.send(); //this happens async. so lets not do this
  request.send();
  //request is send in background and on completion, load event is fired
  request.addEventListener('load', function () {
    //console.log(this.responseText); //this is json string

    const data = JSON.parse(this.responseText);
    const first = data[0];
    // console.log(data);
    // console.log(first);

    //renderCountry 1;
    renderCountry(first);

    //get neighbour country 2;
    const [neighbour] = first.borders;
    console.log(neighbour);
    if (!neighbour) return;

    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data = JSON.parse(this.responseText);
      console.log(data.languages);
      renderCountry(data, 'neighbour');
    });
  });
};

//the sequence of these countries would be diff bcz of async behaviour
// getCountry('canada');
// getCountry('usa');
// getCountry('Republic of India');

//web requests and response

//sequence of AJAX calls so that the sequence of the calls is maintained
// getCountryAndNeighbour('portugal');
//getCountryAndNeighbour('usa');

//nested callbacks : callback hell > in order to handle async task in sequence

//identified by this triangle formed on lhs.
//diff to understand and diff to reason => bad code. more bugs
// setTimeout(() => {
//   console.log('1 s passed');
//   setTimeout(() => {
//     console.log('2 s passed');
//     setTimeout(() => {
//       console.log('3 s passed');
//     }, 3000);
//   }, 2000);
// }, 1000);

////------------Promises---------- to solve callback hell

//for get request, use fetch directly
const request3 = fetch('https://restcountries.com/v2/name/canada');
console.log('Req3 ', request3);

/* 
primises : obj that is used as a placeholder for the future result of an async operation
         : container for an async desired value
         : a container for future value
         
         +> We wont need to rely on events and callbacks passed into async funcs to handle async results
         +> instead of nesting callbacks, we can chain promises for a sequence of async ops : >>> escaping callback hell

        promise lifecycle : pending -> settled {fulfilled , rejected}


        build promise -> consume promise :)
              
*/

console.clear();
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(function (response) {
      //this then method is handling the promise returned by fetch
      console.log(response);
      //this is a promise that we returning !
      return response.json(); //this method is available to all the responses coming from fetch method
    })
    .then(function (data) {
      //this then is handling the promise returned by the function handler above
      console.log('here', data);
      renderCountry(data[0]);
    });
};

const getCountryDataSimplified = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};

// getCountryData('canada');
// getCountryDataSimplified('republic of india');
console.clear();

/////////////////
// chaining the promises

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    //Country not found (${response.status})`
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);
    return response.json();
  });
};

const getCountryDataSimplifiedAndChained = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    //handling rejected promises
    .then(
      response => response.json(),
      err => alert(err)
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log(neighbour);
      if (!neighbour) return;

      //country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
      //do not write then() here, immedietly after fetch, coz it is again inside another then and writing it here will eventually lead to callaback hell
    })
    .then(
      response => {
        if (!response.ok)
          throw new Error(`Country not found (${response.status})`);
        return response.json();
        //the effect of throwing an error would be that : the promise would be immediately reject
      }
      //err => alert(err)   > writing this everywhere makes your code dirty! instead, write a catch function
    )
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong ${err}`);
    })
    .finally(() => {
      console.log('This is called always');
      countriesContainer.style.opacity = 1; //nyc idea ;D
    }); //this will catch any error in the chain. err will propagate down the chain untill it finds a catch
};

// getCountryDataSimplifiedAndChained('pakistan');
const getCountryDataSimplifiedAndChainedAndRefactored = function (country) {
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(err);
      renderError(`Something went wrong ${err}`);
    })
    .finally(() => {
      console.log('This is called always');
      countriesContainer.style.opacity = 1; //nyc idea ;D
    }); //this will catch any error in the chain. err will propagate down the chain untill it finds a catch
};

// getCountryDataSimplifiedAndChained('canada');
// getCountryDataSimplifiedAndChainedAndRefactored('usa');
console.clear();

////////////////////////////////////////
//handing rejected promises : fetch promise is generally rejected when user looses internet connection

btn.addEventListener('click', function () {
  getCountryData('canada');
});

// getCountryDataSimplifiedAndChained('colambia');  this will also show the error again but promise is still fulfilled :|
console.clear();
// getCountryDataSimplifiedAndChainedAndRefactored('canada'); //need to fix this

/* console.log('Test start');
setTimeout(() => console.log('0 s'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
con sole.log('Test end'); */

//Test Start, Test End, Resolved promise 1, 0s. fantastic!!!!!!

console.clear();
//Microtasks Queue has a prioprity over Callback Queue. so if the MTQ takes more time, then Callback Q might starve
/* console.log('Test start');
setTimeout(() => console.log('0 s'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));
Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 10; i++) {}
  console.log(res);
}); 
console.log('Test end');
*/

//promise takes the argument as  : executer function. as soon as a promise is created, the executor will be automatically executed
/* const lotteryPromise = new Promise(function (resolve, reject) {
  //this contains asyc behaviour
  console.log('Lottery drow happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You win'); //from the function arg. this will mark the promise as fulfilled promise
    } else {
      reject(new Error('You lost your money'));
    }
  }, 2000);
}); */

//consuming the promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//mostly, we consume the promises.
//At times we wrap the callbacks with the promises => promisifying(callback based async behaviour to promised based transition)

//Promisifying setTimeout
const wait = function (seconds) {
  //create and return promise

  //here, timer will never fail, so we will not pass reject arg.
  /* return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  }); */

  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

//chain of async behaviour occuring in sequence w/o f callback hell
/* wait(2)
  .then(() => {
    console.log('I waited for 2 s');
    return wait(1);
  })
  .then(() => console.log('Handling the 1s wait'));
 */
console.clear();

/* Promise.resolve('Pass the result value. this will be resolved immedietly').then(
  res => console.log(res)
);
 */

/////////////////////////
//Consuming promises using Async/Await

//this function will keep running in the bg while executing it's code, and when done, return a Promise
//inside this, you could have 1-more await
//this being said, it is running in the bg and not in the main execution thread, so it will still have the non-blocking behaviour
const whereAmI = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    //await will stop the exec of this fun from this line of code untill the data is fetched.
    // console.log(res);
    const data = await res.json();
    // console.log('data :', data[0]);
    renderCountry(data[0]);
  } catch (err) {
    console.error(err);
    renderError(`Something went wrong :( ${err}`);
    //this is not sufficient. we have to re-throw the error to propagate it down
    //Reject promise returned
    throw err;
  }

  return `You are in ${country}`;
};
// whereAmI('canada');
// console.log('Devanshee, first');
console.clear();

//////////////
///Error handling using try catch

/* try {
  const x = 2;
  x = 3;
} catch (err) {
  alert(err);
} */

//returning values from async functions
// console.log('get the location');
// const countryyy = whereAmI('canada');
// console.log(countryyy);

//its never a good idea to use try catch nd promises and stuff altogether coz it simply reduces code readablity

/* whereAmI('canada')
  .then(city => console.log(city))
  .catch(err => console.error(err))
  .finally(() => console.log('got the location')); */

// doin the same using iife
/* (async function () {
  try {
    city = await whereAmI('canada');
    console.log(city);
  } catch (error) {
    console.error(error);
  } finally {
    console.log('got the location');
  }
})();
 */

// running promises in parallel

/* const get3countries = async function (c1, c2, c3) {
  try {
    const data1 = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    // console.log(data1);
    const data2 = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const data3 = await getJSON(`https://restcountries.com/v2/name/${c3}`);
    // console.log(data1[0].capital, data2.capital, data3.capital);
  } catch (error) {
    console.error(error);
  }
}; */

const get3Countries = async function (c1, c2, c3) {
  try {
    //concequently running promises
    const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
    const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
    const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

    //console.log([data1.capital, data2.capital, data3.capital]);

    //takes array of promise and returns a promise which will return all the i/p array promise at the same time
    //receives and returns array
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    //if one of the promise is rejected, the entire promise would be rejected
    //console.log(data);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
// get3Countries('portugal', 'canada', 'tanzania');

// get3Countries('canada', 'canada', 'canada');
//ALWAYS RUN INDEPENDENT ASYNC OPS IN PARALLEL AND IMPROVE THE CODE PERFORMANCE

//other promise combinators
// a. Promise.race : starts asa one of the promise is settles i.e value is available irrespective of it being fulfilled or rejected.
// first settled promise wins
//fulfillment value of the race promise is the fullfilment value of the winning promise
//so you ll get only one result and not the array.
//used for unending or long running promises

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/canada`),
    getJSON(`https://restcountries.com/v2/name/usa`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);

  // console.log(res[0]); //different o/p
})();

//timeout due to poor connection

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long'));
    }, s * 1000);
  });
};

/* Promise.race([
  getJSON(`https://restcountries.com/v2/name/canada`),
  // timeout(0.1),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));
 */
//Promise.allSettled
//i/p : array of promises and returns an array of settled promises : both rejected or not
//Promise.all will shortcircuit of one of the promise is rejected, which is not the case with this

/* Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
 */
//Promise.any
//returns first success
Promise.any([
  // Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Success'),
  Promise.reject('Error'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
