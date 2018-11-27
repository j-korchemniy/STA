(function (services) {

    // Google API key... Should be good for map, transit, and places apis
    // AIzaSyC6Bmqdj6b6GsrGyOsawtQscPwcGgzBF8g

    services.sta = new STAService();

    function STAService() {

        let location;

        this.initialize = function (done) {
            getLocation(done);
        };

        this.loadBusMap = function () {
            console.log("Loading bus map. " + JSON.stringify(location));
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