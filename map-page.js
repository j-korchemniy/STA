class MapPage {
    constructor() {

    }

    initialize() {
        //Run() after fetching geolocation
        services.sta.initialize(updateUI());

        function updateUI() {
            services.sta.loadBusMap();
            services.sta.loadServicingRoutes();

            // Example usage for getting time information for given stop
            services.sta.loadUpcomingBuses("s-c2kqk8mrkf-betz~alogdonway");
        }
    }

    render() {
        return $('<div>').attr('id', 'map');
    }
}