
var launchName = document.getElementById("launchName");
var missionDescription = document.getElementById("missionDescription");
var launchLocation = document.getElementById("launchLocation");
var agencyName = document.getElementById("agencyName");
var launchTime = document.getElementById("launchTime");
var rocketInfo = document.getElementById("rocketInfo");
var launchImgBtn = document.getElementById("launchImgBtn");
var launchVidBtn = document.getElementById("launchVidBtn");
var viewWindow = document.getElementById("map");
var showMap = document.getElementById("showMapBtn");
var launchVid = document.getElementById("launchVid");
var launchPrev = document.getElementById("previousLaunch");
var launchNext = document.getElementById("nextLaunch");
var queryURL = "https://launchlibrary.net/1.2/launch/next/20";
var launchNum = 0;


// Create the parallax function.
function parallax(){
  var parallax_layer1_rocket = document.getElementById('parallax_layer1_rocket');
  var parallax_layer2_4clouds = document.getElementById('parallax_layer2_4clouds');
    var parallax_layer3_5clouds = document.getElementById('parallax_layer3_5clouds');
  // Dividing the pageYOffset by a positive number will slow down the parallax effect.
  // Adding a '-' before (window.pageYOffset) makes the parallax
  // layer move up instead of down when scrolling.
  parallax_layer1_rocket.style.top = -(window.pageYOffset*2)+'px';
  parallax_layer2_4clouds.style.top = -(window.pageYOffset/10)+'px';
    parallax_layer3_5clouds.style.top = -(window.pageYOffset/10)+'px';
}
// Add an event listener which will detect scrolling and run
// the parallax function.
window.addEventListener("scroll",parallax);

var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  // var latlng = new google.maps.LatLng(28.396837, ‎-80.605659);
  var latlng = new google.maps.LatLng(35.787743, -78.644257);
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

  launchName.textContent = response.launches[num].name;
  missionDescription.textContent = response.launches[num].missions[0].description;
  launchLocation.textContent = response.launches[num].location.name;
  agencyName.textContent = response.launches[num].rocket.agencies[0].name;
  launchTime.textContent = response.launches[num].net;
  rocketInfo.textContent = response.launches[num].rocket.agencies[0].wikiURL;
  rocketInfo.setAttribute("href",response.launches[num].rocket.agencies[0].wikiURL)



  // displayLocation();
  // initialize();
  // codeAddress(response.launches[num].location.name);
  showingMap(response, num);
  showRocketImg(response, num);
  showVideo(response, num);
}




$.ajax({
          url: queryURL,
          method: "GET"
        })

        .done(function(response) {
          console.log(response);
          displayLaunchInfo(launchNum, response);
          previousLaunch(response);
          nextLaunch(response);
        });


function previousLaunch(response, num) {
  var win = $("#map");
  launchPrev.addEventListener("click", function() {
    console.log("previous");
    if (launchNum > 0) {
      launchNum--;
      displayLaunchInfo(launchNum, response);
      win.empty();
      win.css({
        "background-image":"url('assets/images/cartoonRocketLaunchingWithText.png')",
        "background-size": "100%"
      });
      // showingMap(response, num);

    }
  });
}

function nextLaunch(response, num) {
  var win = $("#map");
  launchNext.addEventListener("click", function() {
    if(launchNum < 20) {
      launchNum++;
      displayLaunchInfo(launchNum, response);
      win.empty();
      win.css({
        "background-image":"url('assets/images/cartoonRocketLaunchingWithText.png')",
        "background-size": "100%"
      });
      // showingMap(response, num);
    }
  });
}

function showingMap(response, num) {
  showMap.addEventListener("click", function() {
    initialize();
    codeAddress(response.launches[num].location.name);
  })
}

function showRocketImg(response, num) {
  var win = $("#map");
  var url = response.launches[num].rocket.imageURL;
  launchImgBtn.addEventListener("click", function() {
    win.empty();
    win.css({
      "background-image": "url(" + url + ")",
      "background-size":"cover"
    });
    // viewWindow.style.backgroundImage = "url("+ url + ")";
  })
}

function showVideo(response, num) {
  var url = response.launches[num].vidURLs[0];
  launchVidBtn.addEventListener("click", function() {
    window.open(url);
  })
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
    var nextCounter = 0;
    var previousCounter = 0;
    var mapCounter = 0;
    var launchImg = 0;
    var launchVid = 0;
    // FUNCTIONS + EVENTS

    // On Click of nextLaunch button
    $("#nextLaunch").on("click", function() {
      console.log("wasClicked");
      // Add to clickCounter
      nextCounter++;

      //  Store Click Data to Firebase in a JSON property called nextCount
      database.ref().set({
        nextCount: nextCounter
      });
    });

    // On Click of previousLaunch Button
    $("#previousLaunch").on("click", function() {
      console.log("wasClicked");
      // Add to previousCounter
      previousCounter++;

      //  Store Click Data to Firebase in a JSON property called previous Count
      database.ref().set({
        previousCount: previousCounter
      });
    });

// On Click of showMapBtn Button
    $("#showMapBtn").on("click", function() {
      console.log("wasClicked");
      // Add to previousCounter
      mapCounter++;

      //  Store Click Data to Firebase in a JSON property called mapCount
      database.ref().set({
        mapCount: mapCounter
      });
    });

// On Click of launchImgBtn Button
    $("#launchImgBtn").on("click", function() {
      console.log("wasClicked");
      // Add to previousCounter
      launchImg++;

      //  Store Click Data to Firebase in a JSON property called imgCount
      database.ref().set({
        imgCount: launchImg
      });
    });

    // On Click of launchVidBtn Button
    $("#launchVidBtn").on("click", function() {
      console.log("wasClicked");
      // Add to previousCounter
      launchVid++;

      //  Store Click Data to Firebase in a JSON property called imgCount
      database.ref().set({
        vidCount: launchVid
      });
    });