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
                    let arrivals = window.services.sta.getSortedArrivalTimes(data.schedule_stop_pairs);
                    self.renderArrivalTimes(arrivals);
                }
                const $title = $('<h2>').addClass('mdc-typography--headline4').text("Upcoming Bus Times: " + $target.data('stop_name'));
                $title.css('padding-left', '30px');
                self.$pageHeader.html("");
                self.$pageHeader.append($title);
            });
        }
    }

    renderArrivalTimes(arrivals) {
        $(this.$busScheduleDiv).html("");
        arrivals.forEach(arrival => this.renderArrivalTime(arrival));
        if(arrivals.length === 0) {
            this.$busScheduleDiv.append("<p style='padding-left:30px;'>No arrival times found. Please try another bus stop.</p>");
        }
    }

    renderArrivalTime(arrival) {
        const $outerDiv = $('<div>').addClass('mdc-card');
        const $cardBody = $('<div>').addClass('card-body mdc-typography--body2');
        const $title = $('<h2>').addClass('mdc-typography--headline4').text(arrival.trip_headsign);
        const $subTitle = $('<p>').addClass('mdc-typography--headline8').text("Arrival Time: " + arrival.origin_arrival_time);
        const $routeLabel = $('<span>').addClass('mdc-typography--headline8').text("Route: ");
        const $chip = $('<span>').addClass('mdc-chip');
        const $chipText = $('<div>').addClass('mdc-chip__text');
        $chipText.text(this.extractRouteFromRouteId(arrival.route_onestop_id));
        $chip.append($chipText);

        $cardBody.append($title);
        $cardBody.append($subTitle);
        $cardBody.append($routeLabel);
        $cardBody.append($chip);
        $outerDiv.append($cardBody);

        this.$busScheduleDiv.append($outerDiv);
    }

    extractRouteFromRouteId(routeId) {
        const indexOfLastDash = routeId.lastIndexOf('-');
        return routeId.substring(indexOfLastDash + 1, routeId.length);
    }

    render() {
        const $mainDiv = $('<div>');
        $mainDiv.append(this.$pageHeader);
        $mainDiv.append(this.$busScheduleDiv);
        return $mainDiv;
    }
}