(function (services) {

    // Google API key... Should be good for map, transit, and places apis
    // AIzaSyC6Bmqdj6b6GsrGyOsawtQscPwcGgzBF8g

    services.sta = new STAService();

    function STAService() {

        var location;

        this.initialize = function (done) {
            getLocation(done);
        };

        this.loadBusMap = function () {
            var options = {
                zoom: 16,
                center: new google.maps.LatLng(location.latitude, location.longitude)
            }
            var map = new google.maps.Map(document.getElementById('map'), options);
            var transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);

            infowindow = new google.maps.InfoWindow();
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
                location: options.center,
                radius: 1000,
                types: ['bus_station', 'transit_station']

            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // for (var i = 0; i < results.length; i++) {
                    //     createMarker(results[i]);
                    // }
                    JSON.stringify(results);
                }
            }
        }

        this.loadServicingRoutes = function () {

            var options = {
                "location": location.latitude + ',' + location.logitude,
                "sensor": true,
                "key": "AIzaSyC6Bmqdj6b6GsrGyOsawtQscPwcGgzBF8g",
                "rankby": "distance",
                "types": "bus_station"
            };

            $.ajax({
                url: "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
                type: "GET",
                dataType: 'jsonp',
                data: options,
                success: function (response) {
                    console.log(JSON.stringify(response));
                },
                error: function (xhr) {
                    console.error("Failed to get nearby bus stop information.");
                }
            });

            console.log("Loading servicing buses information. " + JSON.stringify(location));
        }

        this.loadUpcomingBuses = function () {
            console.log("Loading upcoming buses. " + JSON.stringify(location));
        }

        // Private helper functions
        function getLocation(done) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    location = {
                        'latitude': position.coords.latitude,
                        'longitude': position.coords.longitude
                    };
                    done();
                });
            } else {
                // Default current location to cheney
                location = {
                    'latitude': 47.491127,
                    'longitude': -117.581512
                };
                done();
            }
        }

    }

})(window.services = window.services || {});