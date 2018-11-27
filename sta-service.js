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
        }

        this.loadServicingRoutes = function () {
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