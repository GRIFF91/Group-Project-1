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
