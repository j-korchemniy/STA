class ScheduleInfoPage {

    constructor() {
        this.$busScheduleDiv = $('<div>').attr('id', 'schedule-info');
    }

    initialize(target) {

        const self = this;
        window.services.sta.initialize(updateUI);

        function updateUI() {
            const $target = $(target);
            window.services.sta.loadUpcomingBuses($target.data('stop_id')).then((data) => {
                if (data.schedule_stop_pairs) {
                    let arrivalTimes = window.services.sta.getSortedArrivalTimes(data.schedule_stop_pairs);
                    self.renderArrivalTimes(arrivalTimes);
                }
            });
        }
    }

    renderArrivalTimes(arrivalTimes) {
        $(this.$busScheduleDiv).html("");
        arrivalTimes.forEach(arrivalTime => this.renderArrivalTime(arrivalTime));
    }

    renderArrivalTime(arrivalTime) {

        this.$busScheduleDiv.append("<p>" + arrivalTime + "</p>");
    }

    render() {
        const $mainDiv = $('<div>');
        $mainDiv.append(this.$busScheduleDiv);
        return $mainDiv;
    }
}