class MapPage {
    constructor() {

    }

    initialize() {
        //Run() after fetching geolocation
        window.services.sta.initialize(updateUI);

        function updateUI() {
            window.services.sta.loadBusMap();
            // Example usage for getting time information for given stop
            window.services.sta.loadUpcomingBuses("s-c2kqk8mrkf-betz~alogdonway");
        }
    }

    render() {
        return $('<div>').attr('id', 'map');
    }
}