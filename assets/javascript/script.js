console.log("test");

var launchName = document.getElementById("launchName");
var missionDescription = document.getElementById("missionDescription");
var launchLocation = document.getElementById("launchLocation");
var agencyName = document.getElementById("agencyName");
var launchTime = document.getElementById("launchTime");
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
          initialize();
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


function previousLaunch(response, num) {
  launchPrev.addEventListener("click", function() {
    console.log("previous");
    if (launchNum > 0) {
      launchNum--;
      displayLaunchInfo(launchNum, response);
      // showingMap(response, num);

    }
  });
}

function nextLaunch(response, num) {
  launchNext.addEventListener("click", function() {
    if(launchNum < 20) {
      launchNum++;
      displayLaunchInfo(launchNum, response);
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
  var url = response.launches[num].rocket.imageURL;
  launchImgBtn.addEventListener("click", function() {
    viewWindow.textContent = "";
    viewWindow.style.backgroundImage = "url("+ url + ")";
  })
}

function showVideo(response, num) {
  var url = response.launches[num].vidURLs[0];
  launchVidBtn.addEventListener("click", function() {
    window.open(url);
  })
}
