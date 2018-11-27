$(function () {

    // Run() after fetching geolocation
    services.sta.initialize(run);

    // Loads everything then updates upcoming bus info every 20 seconds
    function run() {
        updateUI();

        // TODO: Might not be nessesary
        setInterval(function () {
            services.sta.loadUpcomingBuses();
        }, 20000);
    }

    function updateUI() {
        services.sta.loadBusMap();
        services.sta.loadServicingRoutes();
        services.sta.loadUpcomingBuses();
    }

});