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

class App {
  #map;
  #mapEvent;

  constructor() {
    this._getPosition();

    form.addEventListener(
      'submit',

      //     ow, keep in mind that this method here is basically
      // an event handler function.
      // So it's a function that's gonna be called
      // by an event listener.
      // Now, do you remember what the this keyword looks like
      // inside of an event listener function
      // or of an event handler function?
      // Well, just to make it really clear, let's take a look at it.
      // So let's log the this keyword, now right?
      // So again, we need to wait for the map to load
      // and now as I click somewhere, then you see,
      // we get some error here.
      // So that's on line 60 cannot write private member map event.
      // Okay, so let's go to line 60 and see what happens there.
      // And so that's right here in this event handler function
      // of the event listener on clicking on the map.
      // So remember this is basically the add event listener
      // equivalent from the leaflet library.
      // So we need to fix this next, but for now,
      // let's go back to the newWorkout method
      // that we were working on and so I was trying to take a look
      // at the this keyword here,
      // but apparently that's not possible for now,
      // so let's just remove it here
      // and I will just tell you the solution.
      // So I was asking you,
      // what do you think the this keyword will be like
      // in this method now, because this is an event handler
      // function and so an event handler function
      // will always have the this keyword of the dumb element
      // onto which it is attached.
      // And so in this case, that's gonna be the form Element.
      // So again, inside of this method here,
      // the this keyword is gonna point to Form
      // and no longer to the App object.
      // And so once again, we need to fix that using bind,
      // all right?
      // And this is actually a real pain point of working
      // with event handlers in classes like we are doing right now.
      // So even when you're working in the real world
      // and you have event listeners inside of a class,
      // you will be binding the this keywords all the time
      // because otherwise many parts of your code
      // are not gonna work.
      // So again, in this case, because right
      // in this method call, here did this keyword
      // will simply point to the Form,
      // but that's just not where we want.
      // In most of these methods, we want this keyword
      // to still point to the object itself.
      // So in this case, the app object,
      // which is what this is currently pointing to.
      // And so here again, we will need to use the bind keyword
      this._newWorkout.bind(this)
    );

    inputType.addEventListener(
      'change',

      //     Now this one here actually does not use
      // the this keyword anywhere
      // and so here, it doesn't matter
      // what the this keyword will be like.
      // And so therefore we don't have to bind it manually here
      // because as I just said, it doesn't really matter.
      this._toggleElevationField
    );
  }

  _getPosition() {
    if (navigator.geolocation) {
      //       this loadMap method is actually called
      // by function here, right?
      // So that's right here and in fact this is actually treated
      // as a regular function call, not as a method call.
      // So again, since this is a callback function,
      // we are not calling it ourselves.
      // It is to getCurrentPosition function that we'll call
      // this callback function once that it gets
      // the current position of the user.
      // And when it calls this method, so this function here,
      // then it does so, as a regular function call.
      // And as we learned before in a regular function call,
      // the this keyword is set to undefined.

      // And so that's why in here that this keyword is undefined.
      // But fortunately for us, there is a good solution
      // that we already know about.
      // And that solution is to manually bind the this keyword
      // to whatever we need.

      // And in this case, that is simply this.
      // So right here, this points to the current object.
      // All right?
      // And so that's exactly the this keyword
      // that we also want inside of loadMap.
      // And so here we explicitly say that, okay?
      // And remember that binds will simply return a new function
      // and so all of this here is still a function that JavaScript
      // can then call whenever it needs to.
      navigator.geolocation.getCurrentPosition(
        // So this is the success one

        // And so in JavaScript, we'll then call
        // this callback function here and pass
        // in the position argument, as soon as the current position
        // of the user is determined, all right?
        this._loadMap.bind(this),

        // and this is the error one.
        function () {
          alert('Could not get your position');
        }
      );
    }
  }

  _loadMap(position) {
    // console.log(position);

    // const latitude = position.coords.latitude;

    //using destructuring
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(latitude, longitude);
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    console.log(this);

    //https://leafletjs.com/index.html
    //map is the id in the html
    this.#map = L.map('map').setView(coords, 13);
    // console.log(map);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //handling clicks on map
    //map is the object generated by leaflet
    //on is the event listener from leaflet library
    this.#map.on(
      'click',

      //     but now if we run this code, then we will actually
      // get the same error that we already saw the last time
      // that we inspected our code.
      // So the error that we saw previously, when I clicked
      // on the map, and so that's gonna be this one.
      // And so it says, again, that we cannot write this mapEvent
      // property onto this object that we are trying to currently.
      // And so once again, the reason for that
      // is a incorrectly set this keyword.
      // So again, this method here is right now being used
      // as an event handler function right here.
      // And so just like in regular JavaScript,
      // the this keyword in this function here will then be set
      // to the object onto which the event handler is attached.
      // And so that's gonna be simply the map itself, okay.
      // And so here we are trying to write mapEvent on the map.
      // So again, the this keyword points to the map
      // because this is where we attached the event handler on.
      // And so once again, the solution to that is
      // to bind the this keywords because the this keyword
      // is the App object and so then here,
      // this will also be the App object.
      // And of course that's where we have the mapEvent property,
      this._showForm.bind(this)
    );
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  //     Now this one here actually does not use
  // the this keyword anywhere
  // and so here, it doesn't matter
  // what the this keyword will be like.
  // And so therefore we don't have to bind it manually here
  // because as I just said, it doesn't really matter.
  _toggleElevationField() {
    //one is hidden one is visible
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    e.preventDefault();

    //Clear input fields

    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    //Display marker
    const { lat, lng } = this.#mapEvent.latlng;

    //Docs
    //https://leafletjs.com/reference.html#popup
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }
}

const app = new App();

/////////////////////////////////////////////////////////
// Project Architecture
/////////////////////////////////////////////////////////
//SEE PDF LECTURE AND VIDEO
