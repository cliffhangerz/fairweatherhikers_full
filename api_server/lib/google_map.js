// TODO: is this pointing to the right thing?
var chanceOfRain = require('/../model/forecast.js').precipitationProbability;
// TODO: TIE DRIVING RADIUS TO THE APPROPRIATE BUTTON
// I just put in a plug "button.distance" for now
// note: drivingRadius is in meters
var drivingRadius = button.distance || 80450;

// Create a mapmaking function
// note: zoom of 15 encompasses most trails we care about
function makeMap() {
  var zoom = 15;

// Insert your starting point coordinates here
// TODO: TIE LAT, LONG TO THE APPROPRIATE BUTTON
// this one is for the UFO on stilts
  var latitude = 47.622100;
  var longitude = -122.352077;

// Rattlesnake Ledge: use this one for a test
  // var latitude = 47.435545;
  // var longitude = -121.771740;

  var mapProp = {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: zoom,
    // TODO: WHAT KIND OF MAP SHOULD BE THE DEFAULT?
    // mapTypeId: google.maps.MapTypeId.ROADMAP
    // mapTypeId: google.maps.MapTypeId.HYBRID
    mapTypeId: google.maps.MapTypeId.TERRAIN
  };

  // Create a new map object
  var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);

  // use icon in the Marker definition
  var icon = function() {
    if (chanceOfRain <= 0.20) {
      return icon = 'http://maps.google.com/mapfiles/kml/shapes/sunny.png';
    }
    if (chanceOfRain > 0.20 && chanceOfRain < 0.50) {
      return icon = 'http://maps.google.com/mapfiles/kml/shapes/partly_cloudy.png';
    }
    return icon = 'http://maps.google.com/mapfiles/kml/shapes/rainy.png';
  };

  var marker = new google.maps.Marker({
    draggable: true,
    animation: google.maps.Animation.DROP,
    icon: icon,
    position: { lat: latitude, lng: longitude }
  });
  // Place the marker on the map
  marker.setMap(map);

  // Place circle on map
  var radius = new google.maps.Circle({
    center: { lat: latitude, lng: longitude },
    radius: drivingRadius,
    strokeColor: '#000000',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: '#BADA55',
    fillOpacity: 0.2
  });
  radius.setMap(map);


  // Bounce function!
  function toggleBounce() {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    }
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }

  // Make the marker bounce when clicked
  marker.addListener('click', toggleBounce);
}

// Event listener to load the map
google.maps.event.addDomListener(window, 'load', makeMap);
