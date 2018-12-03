$(function () {

    // Initialize Material Components Web Framework
    window.mdc.autoInit();
    initializeTopBarNav();

    const router = new ViewRouter('#main-content');
    router.addRoute('map', new MapPage()); //man-page.js
    router.addRoute('nearbyStop', new NearbyStopPage(router)); //nearby-stop-page.js
    router.addRoute('scheduleInfo', new ScheduleInfoPage()); //schedule-info-page.js
    router.routeContent('map');

    $('.nav-link').on('click', (evt) => {
        router.routeContent($(evt.target).data('route'));
    });

    function initializeTopBarNav() {
        const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        topAppBar.listen('MDCTopAppBar:nav', () => {
            drawer.open = !drawer.open;
        });
    }
});