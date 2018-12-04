class MapPage {
    constructor() {

    }

    initialize(target) {
        //Run() after fetching geolocation
        window.services.sta.initialize(updateUI);

        function updateUI() {
            const $target = $(target);
            if($target && $target.data('stop-name'))
                window.services.sta.loadSpecificStop($target.data('stop-name'), $target.data('latitude'), $target.data('longitude'));
            else
                window.services.sta.loadBusMap();
        }
    }

    render() {
        return $('<div>').attr('id', 'map');
    }
}