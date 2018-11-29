$(function () {

    // Initialize Material Components Web Framework
    window.mdc.autoInit();
    initializeTopBarNav();

    const router = new ViewRouter('#routed-content');
    router.addRoute('testRoute1', () => $('<p>').text('Testing 123'));
    router.addRoute('testRoute2', () => $('<p>').text('Testing 456'));
    router.addRoute('testRoute3', () => $('<p>').text('Testing 789'));

    router.routeContent('testRoute1');

    $('.nav-link').on('click', (evt) => router.routeContent($(evt.target).data('route')));

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