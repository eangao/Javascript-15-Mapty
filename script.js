'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

////////////////////////////////////////////////////////////
// How to Plan a Web Project
////////////////////////////////////////////////////////////
//SEE PDF LECTURE OR VIDEOS

///////////////////////////////////////////////////////////
// Using the Geolocation API
///////////////////////////////////////////////////////////
// So let's now learn how to use the Geolocation API.
// And the Geolocation API is called an API
// because it is in fact, a browser API
// just like for example, internationalization
// or timers, or really anything that the browser gives us.

// And so Geolocation is just another API
// like that, but it's also a very modern one,
// and actually there are many other modern APIs
// like that, for example, to access the user's camera
// or even to make a user's phone vibrate.
// So there's all kinds of crazy stuff that you can do,
// but in this project, let's simply focus on Geolocation.
// And geolocation is actually very, very easy to use.

// All you have to do is navigator.geolocation.
// So VS code is already showing it
// to me and then get
// current position.
// And now this function here takes
// as an input to Callback functions.
// And the first one is to Callback function
// that will be called on success.

// So whenever the browser successfully got the coordinates
// of the current position of the user
// and to second callback is the Error Callback
// which is the one that is gonna
// be called when there happened an error
// while getting the coordinates.
// So let's simply define two functions here.

// And let's actually simply start with this one.

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    // So this is the success one
    function (position) {
      console.log(position);

      // const latitude = position.coords.latitude;

      //using destructuring
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(latitude, longitude);
      console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    },

    // and this is the error one.
    function () {
      alert('Could not get your position');
    }
  );
}
