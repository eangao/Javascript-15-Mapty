'use strict';

class Workout {
  date = new Date();

  //   So instead any object should have some kind
  // of unique identifier
  // so that we can then later identify it using that ID.
  // So let's create a field for ID here as well
  // and always keep in mind that what we're doing here
  // so here and actually also here is using
  // a very modern specification of JavaScript
  // which is not even yet part
  // of the official JavaScript language.
  // Remember how I talked about that in the last section.
  // And so if we want to make sure that this is gonna work
  // at least with ES6 then we would have to do,
  // this dot date and then define that here
  // and the same here this dot ID
  // and then define that here as well. Right?
  // However, here I'm simply using cutting edge JavaScript
  // and so something that's probably gonna become part
  // of JavaScript pretty soon.

  // And so I think that it's perfectly fine to use
  // these class fields here already.
  // but now back to the ID and in the real world,
  // we usually always use some kind of library

  // in order to create good and unique ID numbers.
  // So usually we should never create IDs on our own
  // but always let some library take care of that because
  // this is a very important part of any application.
  // However right now I'm not gonna include
  // any library like that
  // and I will simply use the current date to create a new ID
  // so a new date, and then I will convert that
  // to a string and then simply take the last 10 numbers.
  // And so that should then be unique enough.All right.
  // So converting to a string
  // and then I can say slice then the last 10 numbers basically.
  // id = (new Date() + '').slice(-10);

  //   the current time stamp of right now.
  // And so that will now hopefully fix it.
  // And to see that here we have this ID
  // and then here we also have the ID
  // but right now they are actually exactly the same.
  // And so basically that happened because
  // they were created at the same time.
  // But then later in the real world
  // as we used our application of course
  // it's gonna be impossible to create two new objects
  // at the same time.
  // And so then that's gonna work just fine.
  // However as I said previously,
  // when you are really working on the real world
  // then probably you have many users using
  // the same application, right?
  // And then of course some users can create objects
  // at the same time
  // and so by then relying
  // on the time to create ID's is gonna be a really bad idea.
  id = (Date.now() + '').slice(-10);

  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    //     And by the way, I have this comment here,
    // which is something that we can use
    // to tell Prettier, so that Prettier extension
    // that we are using to format our code,
    // so this comment here we can use whenever we want
    // to tell prettier to ignore the next line.

    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;

    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    //pace -> min/km
    //adding new property
    this.pace = this.duration / this.distance;

    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;

    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    //speed -> km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

///////////////////////////////////////////////////////////
//APPLICATION  ARCHITECTURE
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user's position
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    //Attach event handlers
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

    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
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

    // console.log(this);

    //https://leafletjs.com/index.html
    //map is the id in the html
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
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

    // render workouts from local storage.
    // it place here after the map is loaded
    // because it will not work if directly place in _getLocalStorage
    // becuase the method set the marker with out the map was loaded successfullly
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    //empty inputs
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
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
    //Helper functions

    //     And remember that when we use rest parameters like this(...),
    // then we get an array.
    const validInputs = (...inputs) =>
      // So inputs is an array
      // and we now want to loop over this array,
      // and basically check if all of them are positive.
      // Now there's actually already a predefined method
      // in JavaScript, that is very helpful for that.
      // So remember that we have a nice little method called every.
      // And so let's use it here.
      // And then I will quickly explain what it does.
      // So the current input,
      // and then Number.IsFinite, the current input.
      // So basically, this will loop over the array,
      // and then each of them,
      // it will check whether the number is finite or not.
      // And then in the end, the every method
      // will only return true if this value here
      // was true for all of them.
      // So for all elements in the array.
      // But if only one of these values here was not finite,
      // so if the result here was false
      // for one of the elements of the array,
      // then every will return false.
      // And so that will then be the return value
      // of this arrow function, right?
      inputs.every(inp => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value; // add + to the begining  convert to string
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout  running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)

        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout  cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // Check if data is valid
      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration) //elevation might be negative
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add  new object to workout array
    this.#workouts.push(workout);
    // console.log(this.#workouts);

    // Render workout on map as marker
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + Clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    //Docs
    //https://leafletjs.com/reference.html#popup
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
              workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
            }</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
        `;

    if (workout.type === 'running')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>
       `;

    if (workout.type === 'cycling')
      html += `
          <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
       `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');
    // console.log(workoutEl);

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    // console.log(workout);

    //see docs of https://leafletjs.com
    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });

    // using the public interface
    // workout.click();
  }

  _setLocalStorage() {
    //     Now, I just want to mention that local storage
    // is a very simple API.
    // And so it is only advised to use
    // for small amounts of data, all right.
    // That's because local storage is blocking,
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));
    // console.log(data);

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });

    //     I just want to show you one problem that we have now.
    // And that has to do with local storage.
    // So, remember that when I click here
    // on one of these workouts,
    // it will move the map to the workout,
    // and so that's gonna be fine,
    // but what also happens is that this clicks property
    // is gonna be increased by using the click method
    // that is inherited from the workout class.
    // But watch what happens now as I try to do that.
    // And so we get workout.click is not a function.
    // So, why do you think that is?
    // Well, let's try to take a look at the objects
    // that we get back from local storage.
    // So that's this one here.
    // And I know that right now
    // we have a ton of console.logs here,
    // so we should get rid of them at some point,
    // but anyway, for now let's take a look
    // at the objects that we basically have right now.
    // And so this is currently also the data
    // that is in this .workouts, right?
    // Now, if we take a look at this,
    // then here everything works okay.
    // But now if we take a look at the prototype chain,
    // you see that now it's no longer an object
    // of the type of running,
    // and also not of the type of workout, right.
    // So the entire prototype chain that we had before is gone.
    // So contrast that to one of these objects.
    // So again, the data is fine,
    // but here, we actually have the prototype with calcPace,
    // and then that has the click entities,
    // that description methods in the workout prototype, right.
    // So, the problem here is that basically,
    // when we converted our objects to a string,
    // and then back from the string to objects,
    // we lost the prototype chain.
    // And so these new objects here
    // that we recovered from the local storage
    // are now just regular objects.
    // They are now no longer objects
    // that were created by the running
    // or by the cycling class.
    // And so therefore,
    // they will not be able to inherit
    // any of their methods.
    // And so in the end,
    // that's the reason why workout.click
    // is now not a function anymore.
    // So, again, because the object now no longer has it
    // in its prototype.
    // So you see that this is just the regular methods
    // that are available on any object, all right.
    // So this can be a big problem
    // when you work with local storage
    // and object oriented programming
    // like we are doing here.

    // Now to fix this problem, we could go ahead
    // and restore the object right here.
    // So, in our getLocalStorage,
    // we could now loop over this data here,
    // and then restore the objects
    // by creating a new object using the class,
    // based on the data that is coming here from local storage.

    // But that's a little bit of work
    // and so we're not gonna do that here.
    // And so instead what I will do
    // is to simply disable the functionality
    // of counting the clicks.

    // from _moveToPopup(e) function
    // using the public interface
    // workout.click();

    // So remember that when I first introduced this method here,
    // I told you that one of the reasons for it
    // is that I also wanted to show you something
  }

  reset() {
    localStorage.removeItem('workouts');

    //     And with this we removed our workouts
    // from the local storage,
    // and now we can then reload the page programmatically.
    // And so then the application will look completely empty.
    // And we can do this with location.reload.
    // And location is basically a big object
    // that contains a lot of methods
    // and properties in the browser.
    // And so one of the methods
    // is the ability to reload the page.
    location.reload();
  }
}

const app = new App();

/////////////////////////////////////////////////////////
// Project Architecture
/////////////////////////////////////////////////////////
//SEE PDF LECTURE AND VIDEO

///////////////////////////////////////////////////////
// Final Considerations
///////////////////////////////////////////////////////
//SEE PDF LECTURE AND VIDEO

// � Ability to edit a workout;
// � Ability to delete a workout;
// � Ability to delete all workouts;
// � Ability to sort workouts by a certain field (e.g. distance);
// � Re-build Running and Cycling objects coming from Local Storage;
// � More realistic error and confirmation messages;
// � Ability to position the map to show all workouts [very hard];
// � Ability to draw lines and shapes instead of just points [very hard];
// � Geocode location from coordinates (“Run in Faro, Portugal”) [only after
// asynchronous JavaScript section];
// � Display weather data for workout time and place [only after asynchronous
// JavaScript section]
