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

      const coords = [latitude, longitude];

      //https://leafletjs.com/index.html
      //map is the id in the html
      const map = L.map('map').setView(coords, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker(coords)
        .addTo(map)
        .bindPopup('A pretty CSS popup.<br> Easily customizable.')
        .openPopup();
    },

    // and this is the error one.
    function () {
      alert('Could not get your position');
    }
  );
}

/////////////////////////////////////////////////////////////////////
// Displaying a Map Using Leaflet
/////////////////////////////////////////////////////////////////////
// we gonna learn how to display
// a map using a third party library called Leaflet.
// So to start let's quickly Google Leaflet
// and probably the first result will already
// be for this library.

// So you'll see that Leaflet
// is an open source JavaScript library
// for mobile-friendly interactive maps.
// So essentially this is a library
// that some other developers wrote
// and that we can now include
// for free our own code and use it.

// And in this case,
// we can use it to display in maps
// and whenever we use a third-party library,
// the first thing to do is to basically include it
// in our site.

// And so let's come here to the Downloads Page.
// And so here we can download Leaflet
// to our computer if we wanted
// or we can also use a hosted version of Leaflet.

// And this basically means that we can use
// a version of this library that is already hosted
// by someone else.
// So in this case,
// it is a CDN which is a Content Delivery Network.
// And so it has this URL here.
// So that stands for unpackaged.com.

// And then here we have the Leaflet Library.
// So actually we will need a CSS file
// and we will also need a JavaScript file.
// Now, there are also a bit more elegant ways
// of including JavaScript,
// for example using a package manager like NPM.

// And then all we would have to do
// is NPM install Leaflet into our application.
// And actually this is how we will do it in the future.
// So in one of the next sections,
// we will actually learn how to do this
// using the NPM package manager,
// but for now probably the easiest way
// to get started is to simply include
// a hosted version that is on a CDN.

// And so let's grab this code here
// and paste it in our HTMLs' hat.
// So right here and to before our own script
// and that's very important.
// All right, so this here is our script
// and of course it is in our script
// where we will then use the Leaflet Library.

// And so by the time that our script loads,
// the browser must already have downloaded
// the Leaflet Library because otherwise
// our code will not be able to work without library.

// And that makes sense, right?
// Now here we also want to specify actually
// the Differ Attribute.
// So as we learned previously,
// we should never put any JavaScript
// in the header without any of the Differ or Async Attributes.
// And since the order matters here,
// remember, we must then use the Differ Attribute.
// And so this is actually a perfect example
// for when we need to use Differ because again
// here the order in which the scripts are downloaded
// is actually very important.
