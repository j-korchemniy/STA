$(function () {

    // Initialize Material Components Web Framework
    window.mdc.autoInit();
    initializeTopBarNav();

    // Run() after fetching geolocation
    services.sta.initialize(updateUI());

    function updateUI() {
        services.sta.loadBusMap();
        services.sta.loadServicingRoutes();

        // Example usage for getting time information for given stop
        services.sta.loadUpcomingBuses("s-c2kqk8mrkf-betz~alogdonway");
    }

    function initializeTopBarNav() {
        const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        topAppBar.listen('MDCTopAppBar:nav', () => {
            drawer.open = !drawer.open;
        });
    }
});