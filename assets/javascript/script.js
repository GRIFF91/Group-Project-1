console.log("test");

var launchName = document.getElementById("launchName");
var missionDescription = document.getElementById("missionDescription");
var launchLocation = document.getElementById("launchLocation");
var agencyName = document.getElementById("agencyName");
var launchTime = document.getElementById("launchTime");
var launchPrev = document.getElementById("previousLaunch");
var launchNext = document.getElementById("nextLaunch");
var queryURL = "https://launchlibrary.net/1.2/launch/next/20";
var launchNum = 0;


// Create the parallax function.
function parallax(){
  var parallax_layer1 = document.getElementById('parallax_layer1');
  var parallax_layer2 = document.getElementById('parallax_layer2');
  // Dividing the pageYOffset by a positive number will slow down the parallax effect.
  // Adding a '-' before (window.pageYOffset) makes the parallax
  // layer move up instead of down when scrolling.
  parallax_layer1.style.top = -(window.pageYOffset/20)+'px';
  parallax_layer2.style.top = -(window.pageYOffset/6)+'px';
}
// Add an event listener which will detect scrolling and run
// the parallax function.
window.addEventListener("scroll",parallax);

var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  // var latlng = new google.maps.LatLng(28.396837, ‎-80.605659);
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function codeAddress(location) {
  var address = location;
  geocoder.geocode( {"address": location}, function(results, status) {
    if (status == "OK") {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function displayLaunchInfo(num, response) {
  // var launchName = document.getElementById("launchName");
  // var missionDescription = document.getElementById("missionDescription");
  // var launchLocation = document.getElementById("launchLocation");
  // var agencyName = document.getElementById("agencyName");
  // var launchTime = document.getElementById("launchTime");

  launchName.textContent = response.launches[num].name;
  missionDescription.textContent = response.launches[num].missions[0].description;
  launchLocation.textContent = response.launches[num].location.name;
  agencyName.textContent = response.launches[num].rocket.agencies[0].name;
  launchTime.textContent = response.launches[num].net;

  // displayLocation();
  initialize();
  // setTimeout(codeAddress, 200, response.launches[num].location.name);
  codeAddress(response.launches[num].location.name);
}

// function displayLocation() {
//   initialize();
//
// }




$.ajax({
          url: queryURL,
          method: "GET"
        })

        .done(function(response) {
          console.log(response);
          displayLaunchInfo(launchNum, response);
          previousLaunch(response);
          nextLaunch(response);

          console.log(queryURL);
          console.log(response);
          // mission name
          console.log(response.launches[0].name);

          // mission description
          console.log(response.launches[0].missions[0].description);

          // launch location
          console.log(response.launches[0].location.name);
          // Agency
          console.log(response.launches[0].rocket.agencies[0].name);

          // ImageURL
          console.log(response.launches[0].rocket.imageURL);
          // VidioURL
          console.log(response.launches[0].vidURLs[0]);
          // Launch Date and Time
          console.log(response.launches[0].net);

        });

        // <li id="changeInfoBtns">
        //   <button type="button" id="previousLaunch" class="btn btn-default">Previous Launch</button>
        //   <button type="button" id="nextLaunch" class="btn btn-default">Next Launch</button>
        // </li>

function previousLaunch(response) {
  launchPrev.addEventListener("click", function() {
    if (launchNum > 0) {
      launchNum--;
      displayLaunchInfo(launchNum, response);
    }
  });
}

function nextLaunch(response) {
  launchNext.addEventListener("click", function() {
    if(launchNum < 20) {
      launchNum++;
      displayLaunchInfo(launchNum, response);
    }
  });
}

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyA8w3DD9wCgqrCcouP8uzH8tli7diUXS8s",
    authDomain: "group-project-1-d6af2.firebaseapp.com",
    databaseURL: "https://group-project-1-d6af2.firebaseio.com",
    projectId: "group-project-1-d6af2",
    storageBucket: "",
    messagingSenderId: "837337550423"
  };
  firebase.initializeApp(config);

    // VARIABLES

    // Get a reference to the database service
    var database = firebase.database();
    var clickCounter = 0;
    // FUNCTIONS + EVENTS
    // --------------------------------------------------------------------------------

    // On Click of Button
    $("#nextLaunch").on("click", function() {
      console.log("wasClicked");
      // Add to clickCounter
      clickCounter++;

      //  Store Click Data to Firebase in a JSON property called clickCount
      // Note how we are using the Firebase .set() method
      database.ref().set({
        nextCount: clickCounter
      });
    });

    // On Click of Button
    $("#previousLaunch").on("click", function() {
      console.log("wasClicked");
      // Add to clickCounter
      clickCounter++;

      //  Store Click Data to Firebase in a JSON property called clickCount
      // Note how we are using the Firebase .set() method
      database.ref().set({
        previousCount: clickCounter
      });
    });