(function (services) {

    services.sta = new STAService();

    function STAService() {

        var location;
        var nearbyStops;

        this.initialize = function (done) {
            getLocation(done);
        };

        this.loadBusMap = function () {
            var options = {
                zoom: 16,
                center: new google.maps.LatLng(location.latitude, location.longitude)
            }
            var map = new google.maps.Map(document.getElementById('map'), options);

            //map wouldn't load for me when style="position: relative;" so I forced it to absolute for testing
            //document.getElementById('map').style="position: absolute;";

            var transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);
            
            //Creates markers for every stop within 1000 meters of current lat/long
            $.when(getNearbyStops()).done(function(){
                  for(ix = 0; ix < nearbyStops.length; ix++)
                  {
                      var lat = nearbyStops[ix].geometry.coordinates[1];
                      var lng = nearbyStops[ix].geometry.coordinates[0];

                      var marker = new google.maps.Marker({
                          position: new google.maps.LatLng(lat, lng),
                          map: map,
                          title: nearbyStops[ix].name    
                      });
                  }
            });
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
                //added error handler in the event that the user
                //blocks location access
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    location = {
                        'latitude': position.coords.latitude,
                        'longitude': position.coords.longitude
                    };
                    done();
                }, function(error){
                        location = {
                            'latitude': 47.491127,
                            'longitude': -117.581512
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
        
        function getNearbyStops()
        {
            return $.ajax({
                url: "https://transit.land/api/v1/stops",
                type: "GET",
                dataType: 'json',
                data: {"lat": location.latitude, "lon": location.longitude, "r": "1000"},
                success: function (response)
                {
                    nearbyStops = response["stops"];
                },
                error: function (xhr)
                {
                    console.error("Failed to get nearby stops");
                }
            });
        }
    }

})(window.services = window.services || {});