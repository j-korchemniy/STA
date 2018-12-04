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
            map.clearMarkers();

            const youAreHereMarker = new google.maps.InfoWindow;
            const pos = {
                lat: location.latitude,
                lng: location.longitude
            };
            youAreHereMarker.setPosition(pos);
            youAreHereMarker.setContent('You Are Here');
            youAreHereMarker.open(map);

            var transitLayer = new google.maps.TransitLayer();
            transitLayer.setMap(map);
            
            buildMarkers(map);
           
        }

        this.loadSpecificStop = function (stopName, stopLat, stopLong) {
            var options = {
                zoom: 16,
                center: new google.maps.LatLng(stopLat, stopLong)
            };
            var map = new google.maps.Map(document.getElementById('map'), options);
            map.clearMarkers();

            const youAreHereMarker = new google.maps.InfoWindow;
            const pos = {
                lat: location.latitude,
                lng: location.longitude
            };
            youAreHereMarker.setPosition(pos);
            youAreHereMarker.setContent('You Are Here');
            youAreHereMarker.open(map);
            
            // var transitLayer = new google.maps.TransitLayer();
            // transitLayer.setMap(map);
            
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(stopLat, stopLong),
                map: map,
                title: stopName  
            });
        }

        this.loadServicingRoutes = function () {
            var options = {
                "lat": location.latitude,
                "lon": location.longitude,
                "r": "1000",
            };

            return $.ajax({
                url: "https://transit.land/api/v1/stops?",
                type: "GET",
                dataType: 'json',
                data: options,
            });
        }

        this.loadUpcomingBuses = function (busStopId) {
            var options = {
                "origin_onestop_id": busStopId,
            };

            return $.ajax({
                url: "https://transit.land/api/v1/schedule_stop_pairs?",
                type: "GET",
                dataType: 'json',
                data: options
            });
        }

        this.currentLocation = () => location;

        // Private helper functions
        function getLocation(done) {
                //added error handler in the event that the user blocks location access
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
        
        function buildMarkers(map)
        {
            var infowindow = new google.maps.InfoWindow({
                        content: ""
                    });

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

                    const stopId = nearbyStops[ix].onestop_id;

                    marker.addListener('click', function(evt){
                        infowindow.setContent(
                        "<div>" +
                            "<h1>" +
                                this.title +
                            "</h1>" +
                            "<a class=\"nav-link mdc-list-item\" data-route=\"nearbyStop\" data-stop-id=\"" + stopId + "\" href=\"#\">" +
                                "View Bus Stop" +
                            "</a>" +
                        "</div>");

                        infowindow.open(map, this);
                    });
                }
            });
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

    //Clear Markers Functionality for Maps
    google.maps.Map.prototype.clearMarkers = function() {
        if(this.markers) {
            for(var i=0; i < this.markers.length; i++){
                this.markers[i].setMap(null);
            }
            this.markers = new Array();
        }
    };


})(window.services = window.services || {});