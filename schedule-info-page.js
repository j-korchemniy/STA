class ScheduleInfoPage {

    constructor() {
    }

    initialize(target) {
        window.services.sta.initialize(updateUI);

        function updateUI() {
            const $target = $(target);
            window.services.sta.loadUpcomingBuses($target.data('stopId'));
        }
    }

    render() {
        const $mainDiv = $('<div>');
        $mainDiv.append($('h2').text('Schedule Information Example:'));
        $mainDiv.append($('<div>').attr('id', 'schedule-info-dump'));
        return $mainDiv;
    }
}