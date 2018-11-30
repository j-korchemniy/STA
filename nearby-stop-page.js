class NearbyStopPage {
    constructor() {

    }

    initialize() {
        window.services.sta.initialize(updateUI);

        function updateUI() {
            window.services.sta.loadServicingRoutes();
        }
    }

    render() {
        const $mainDiv = $('<div>');
        $mainDiv.append($('h2').text('Nearby Bus Stop Information:'));
        $mainDiv.append($('<div>').attr('id', 'bus-info-dump'));
        return $mainDiv;
    }
}