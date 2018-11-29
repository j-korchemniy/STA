$(function () {

    //Initialize Material Components Web Framework
    window.mdc.autoInit();
    initializeTopBarNav();

    const router = new ViewRouter('routed-content');
    router.addRoute('testRoute1', () => $('<p>').text('Testing 123'));

    router.routeContent('testRoute1');

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

    function initializeTopBarNav() {
        const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        topAppBar.listen('MDCTopAppBar:nav', () => {
          drawer.open = !drawer.open;
        });
    }
});