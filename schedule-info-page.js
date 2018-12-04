class ScheduleInfoPage {

    constructor() {
        this.$pageHeader = $('<div>').attr('class', 'page-title');
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
                const $title = $('<h2>').addClass('mdc-typography--headline4').text("Upcoming Bus Times: " + $target.data('stop_name'));
                $title.css('padding-left', '30px');
                self.$pageHeader.html("");
                self.$pageHeader.append($title);
            });
        }
    }

    renderArrivalTimes(arrivalTimes) {
        $(this.$busScheduleDiv).html("");
        arrivalTimes.forEach(arrivalTime => this.renderArrivalTime(arrivalTime));
        if(arrivalTimes.length === 0) {
            this.$busScheduleDiv.append("<p style='padding-left:30px;'>No arrival times found. Please try another bus stop.</p>");
        }
    }

    renderArrivalTime(arrivalTime) {
        const $outerDiv = $('<div>').addClass('mdc-card');
        const $cardBody = $('<div>').addClass('card-body mdc-typography--body2');
        const $title = $('<h2>').addClass('mdc-typography--headline4').text(arrivalTime);
        const $subTitle = $('<p>').addClass('mdc-typography--headline8').text("Arrival Time");
        $cardBody.append($title);
        $cardBody.append($subTitle);
        $outerDiv.append($cardBody);

        this.$busScheduleDiv.append($outerDiv);
    }

    render() {
        const $mainDiv = $('<div>');
        $mainDiv.append(this.$pageHeader);
        $mainDiv.append(this.$busScheduleDiv);
        return $mainDiv;
    }
}