class ScheduleInfoPage {
    constructor() {

    }

    initialize() {
        window.services.sta.initialize(updateUI);

        function updateUI() {
            window.services.sta.loadUpcomingBuses("s-c2kqk8mrkf-betz~alogdonway");
        }
    }

    render() {
        const $mainDiv = $('<div>');
        $mainDiv.append($('h2').text('Schedule Information Example:'));
        $mainDiv.append($('<div>').attr('id', 'schedule-info-dump'));
        return $mainDiv;
    }
}