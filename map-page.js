class MapPage {
    constructor() {

    }

    initialize(params) {
        //Run() after fetching geolocation
        window.services.sta.initialize(updateUI);

        function updateUI() {
            if(params && params.stop)
                window.services.sta.loadSpecificStop(params.stop.name, params.stop.latitude, params.stop.longitude);
            else
                window.services.sta.loadBusMap();
        }
    }

    render() {
        return $('<div>').attr('id', 'map');
    }
}