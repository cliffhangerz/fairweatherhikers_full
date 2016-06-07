
module.exports = function(app) {
  app.controller('MapController', function($scope, uiGmapGoogleMapApi) {
    var centerLatitude = document.getElementById('startPointLat') || 47.6205063;
    var centerLongitude = document.getElementById('startPointLon') || -122.3493;
    var zoom = document.getElementById('startZoom') || 7;
    var drivingRadius = document.getElementById('drivingRadius') || 80450;

    $scope.map = {
      center: {
        latitude: centerLatitude,
        longitude: centerLongitude
      },
      zoom: zoom
    };

    $scope.circles = [
      {
        id: 1,
        center: {
            latitude: centerLatitude,
            longitude: centerLongitude
        },
        radius: drivingRadius,
        stroke: {
            color: '#000000',
            weight: 2,
            opacity: 0.5
        },
        fill: {
            color: '#BADA55',
            opacity: 0.2
        },
        geodesic: true, // optional: defaults to false
        draggable: false, // optional: defaults to false
        clickable: false, // optional: defaults to true
        editable: false, // optional: defaults to false
        visible: true, // optional: defaults to true
        control: {}

      }
    ];





    uiGmapGoogleMapApi.then(function(maps) {
    });
  });
};

//
// // TODO: models/forecast to be written
// -      // var chanceOfRain = require('/../models/forecast').currentPrecipitationProbability || 0.1;
// -      var chanceOfRain = 0.1;
// -
// -      //  NOTE: drivingRadius is in meters, 80450 = 50 miles
// -      var drivingRadius = document.getElementById('drivingRadius') || 80450;
// -
// -      // NOTE: Insert your starting point coordinates here
// -      //       This one is for the UFO on stilts.
// -      var centerLatitude = document.getElementById('startPointLat') || 47.6205063;
// -      var centerLongitude = document.getElementById('startPointLon') || -122.3493;
// -      var zoom = 8;
// -
// -      // Create a mapmaking function
// -
// -      // use trailMarker in the Marker definition
// -        var trailMarker = function() {
// -          if (chanceOfRain < 0.20) {
// -            return trailMarker = '/view/sunny.png';
// -          }
// -          if (chanceOfRain > 0.20 && chanceOfRain < 0.50) {
// -            return trailMarker = '/view/partly_cloudy.png';
// -          }
// -          return trailMarker = '/view/rainy.png';
// -        };
// -
// -      function makeMap() {
// -
// -        var map = new google.maps.Map(document.getElementById('map'), {
// -          zoom: zoom,
// -          center: {lat: centerLatitude, lng: centerLongitude},
// -          // stretch goal: give user option for maptype
// -          // mapTypeId: google.maps.MapTypeId.TERRAIN
// -          mapTypeId: google.maps.MapTypeId.ROADMAP
// -          // mapTypeId: google.maps.MapTypeId.HYBRID
// -        });
// -
// -      // Adds markers to the map, function defined below.
// -        setMarkers(map);
// -
// -        //Place circle on map
// -        var circleDefinition = new google.maps.Circle({
// -          center: {lat: centerLatitude, lng: centerLongitude},
// -          radius:80450, // in meters, equals 50 miles
// -          strokeColor:"#000000",
// -          strokeOpacity:0.5,
// -          strokeWeight:2,
// -          fillColor:"#BADA55",
// -          fillOpacity:0.2
// -        });
// -        circleDefinition.setMap(map);
// -      }
// -
// -      // Data for the trail markers consist of a name, a LatLng and a zIndex for the
// -      // order in which these markers should display on top of each other.
// -
// -      var trails = [
// -
// -        ['UFO on stilts', 47.6205063, -122.3493, 1],
// -        ['Stately Troy Manor', 47.547284, -122.389856, 2],
// -        ['Rattlesnake Ledge', 47.435545, -121.771740, 3],
// -        ['Wallace Falls', 47.867065, -121.678380, 4],
// -        ['Bridal Veil Falls', 47.809015, -121.573967, 5]
// -      ];
// -
// -      function setMarkers(map) {
// -      // Marker sizes are expressed as a Size of X,Y where the origin of the image
// -      // (0,0) is located in the top left of the image.
// -
// -      // Origins, anchor positions and coordinates of the marker increase in the X
// -      // direction to the right and in the Y direction down.
// -
// -        var image = {
// -          url: trailMarker,
// -          // This marker is 64 pixels wide by 64 pixels high.
// -          size: new google.maps.Size(64, 64),
// -          // The origin for this image is (0, 0).
// -          origin: new google.maps.Point(0, 0),
// -          // The anchor for this image is the base at (0, 64).
// -          anchor: new google.maps.Point(0, 64)
// -        };
// -
// -        // Shapes define the clickable region of the icon. The type defines an HTML
// -        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
// -        // The final coordinate closes the poly by connecting to the first coordinate.
// -        var shape = {
// -          coords: [1, 1, 1, 20, 18, 20, 18, 1],
// -          type: 'poly'
// -        };
// -        for (var i = 0; i < trails.length; i++) {
// -          var trail = trails[i];
// -          var marker = new google.maps.Marker({
// -            draggable: true,
// -            animation: google.maps.Animation.DROP,
// -            position: {lat: trail[1], lng: trail[2]},
// -            map: map,
// -            icon: image,
// -            shape: shape,
// -            title: trail[0],
// -            zIndex: trail[3],
// -          });
// -        }
// -      }
// -      makeMap();
// -    };
// -  }]);
