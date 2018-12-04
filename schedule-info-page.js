class ScheduleInfoPage {
    constructor() {

    }

    initialize() {
        const self = this;
        window.services.sta.initialize(updateUI);

        function updateUI() {
            window.services.sta.loadUpcomingBuses('s-c2kqk8mrkf-betz~alogdonway').then((response) => {
                const todaysArrivals = self.filterByToday(response.schedule_stop_pairs);
                const sortedArrivalsToday = self.sortByProperty(todaysArrivals, 'origin_arrival_time');
                $("#schedule-info-dump").html(JSON.stringify(sortedArrivalsToday));
            });
        }
    }
    
    filterByToday(arrivals) {
        const currentDate = new Date();
        currentDate.setUTCHours(0, 0, 0, 0);
        const todaysDateAndTime = currentDate.toISOString();
        const todaysDateWithoutTime = todaysDateAndTime.replace('T00:00:00.000Z', '');

        return arrivals.filter(arrival => arrival.service_added_dates.includes(todaysDateWithoutTime));
    }

    sortByProperty(arrivals, sortProperty) {
        function compare(a,b) {
            if (a[sortProperty] < b[sortProperty])
                return -1;
            if (a[sortProperty] > b[sortProperty])
                return 1;
            return 0;
        }
        return arrivals.sort(compare);
    }

    render() {
        const $mainDiv = $('<div>');
        $mainDiv.append($('h2').text('Schedule Information Example:'));
        $mainDiv.append($('<div>').attr('id', 'schedule-info-dump'));
        return $mainDiv;
    }
}