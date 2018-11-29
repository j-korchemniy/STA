(function (services) {

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

            // TODO: Could use the data from transit land to draw markers
            var transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);
        }

        this.loadServicingRoutes = function () {

            var options = {
                "lat": location.latitude,
                "lon": location.longitude,
                "r": "1000",
            };

            $.ajax({
                url: "https://transit.land/api/v1/stops?",
                type: "GET",
                dataType: 'json',
                data: options,
                success: function (response) {
                    $("#bus-info-dump").html(JSON.stringify(response));
                },
                error: function (xhr) {
                    console.error("Failed to get nearby bus stop information.");
                }
            });
        }

        this.loadUpcomingBuses = function (busStopId) {
            var options = {
                "origin_onestop_id": busStopId,
            };

            $.ajax({
                url: "https://transit.land/api/v1/schedule_stop_pairs?",
                type: "GET",
                dataType: 'json',
                data: options,
                success: function (response) {
                    $("#schedule-info-dump").html(JSON.stringify(response));
                },
                error: function (xhr) {
                    console.error("Failed to get bus schedule information");
                }
            });
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