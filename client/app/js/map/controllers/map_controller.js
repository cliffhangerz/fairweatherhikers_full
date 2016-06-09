var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.controller('MapController', ['fwhResource', '$scope', 'uiGmapGoogleMapApi', function(fwhResource, $scope, uiGmapGoogleMapApi) {

    var trailArray = fwhResource.get();
                              // Seattle Center is at the following lat, long
    var centerLatitude = document.getElementById('startPointLat') || 47.6205063;
    var centerLongitude = document.getElementById('startPointLon') || -122.3493;
    var zoom = document.getElementById('startZoom') || 7;
                                                      // 50 miles = 80450 meters
    var drivingRadius = document.getElementById('drivingRadius') || 80450;

    $scope.map = {
      center: {
        latitude: centerLatitude,
        longitude: centerLongitude
      },
      zoom: zoom,
      bounds: {}
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

    var generateTrailMarkers = function(trailArray) {
      $scope.trailMarkers = [];

      for (var i = 0; i < trailArray.length; i++) {
        var marker = {
          title: trailArray[i].trailName,
          latitude: trailArray[i].lat,
          longitude: trailArray[i].lon,
          options: { draggable: false },
          id: i,
          hikeDist: trailArray[i].hikeDistance,

          events: {
            mouseover: function (markere, eventName, args) {
              console.log('marker mouseover');
              console.log(markere);
              $scope.hikeDist = markere.model.hikeDist;
              $scope.trailName = markere.model.title;
               $scope.coords = {
                latitude: markere.model.latitude,
                longitude: markere.model.longitude
              };
              $scope.windowshow = true;
           }
         }
        };
        $scope.trailMarkers.push(marker);
      }

      $scope.map.trailMarkers = $scope.trailMarkers;
    };
    //generateTrailMarkers(trailArray);
    // hikeDistance = hikeDistance[i];
    // hikeTime = hikeTime[i];
    // difficulty = difficulty[i];


    // function attachInfoMessage(marker, infoMessage) {
    //   var infoWindow = new google.maps.InfoWindow({
    //     content: {
    //
    //     }
    //   });
    //
    //   marker.addListener('click', function() {
    //     infowindow.open(marker.get('map'), marker);
    //   });
    // }


    uiGmapGoogleMapApi.then(function(maps) {
        generateTrailMarkers(trailArray);
    });
  }]);
};
