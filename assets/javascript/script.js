console.log("test");

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
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function codeAddress() {
  var address = document.getElementById("address").value;
  geocoder.geocode( {"address": address}, function(results, status) {
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

var queryURL = "https://launchlibrary.net/1.2/launch/next/5";


$.ajax({
          url: queryURL,
          method: "GET"
        })

        .done(function(response) {
          console.log(queryURL);
          console.log(response)
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
