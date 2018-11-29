$(function () {

    // Initialize Material Components Web Framework
    window.mdc.autoInit();
    initializeTopBarNav();

    const router = new ViewRouter('#routed-content');
    router.addRoute('map', new MapPage()); //man-page.js
    router.addRoute('testRoute', new TestPage()); //test-page.js
    router.routeContent('map');

    $('.nav-link').on('click', (evt) => router.routeContent($(evt.target).data('route')));

    /* Moved to map-page.js
    //Run() after fetching geolocation
    services.sta.initialize(updateUI());

    function updateUI() {
        services.sta.loadBusMap();
        services.sta.loadServicingRoutes();

        // Example usage for getting time information for given stop
        services.sta.loadUpcomingBuses("s-c2kqk8mrkf-betz~alogdonway");
    }*/

    function initializeTopBarNav() {
        const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        topAppBar.listen('MDCTopAppBar:nav', () => {
            drawer.open = !drawer.open;
        });
    }
});