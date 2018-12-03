class NearbyStopPage {
    constructor(uiRouter) {
        this.uiRouter = uiRouter;
        this.$busInfoDiv = $('<div>').attr('id', 'bus-info');
    }

    initialize() {
        const self = this;
        window.services.sta.initialize(updateUI);

        function updateUI() {
            window.services.sta.loadServicingRoutes().then((data) => {
                const sortedStops = self.formatData(data.stops);
                self.renderStops(sortedStops);
            });
        }
    }

    //https://www.geodatasource.com/developers/javascript
    distance(lat1, lon1, lat2, lon2, unit) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            const radlat1 = Math.PI * lat1/180;
            const radlat2 = Math.PI * lat2/180;
            const theta = lon1-lon2;
            const radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }

    formatData(stops) {
        const self = this;
        const location = this.currentLocation;
        function compare(a, b) {
            const aDistance = self.distance(location.latitude, location.longitude, a.geometry.coordinates[1], a.geometry.coordinates[0], 'K');
            const bDistance = self.distance(location.latitude, location.longitude, b.geometry.coordinates[1], b.geometry.coordinates[0], 'K');
            return aDistance - bDistance;
        }

        const storted = stops.sort(compare);
        return storted;
    }

    get currentLocation() {
        return window.services.sta.currentLocation();
    }

    renderCard($contentDiv, title, actions) {
        const $outerDiv = $('<div>').addClass('mdc-card');
        const $cardMediaSquare = $('<div>').addClass('card-title');
        const $title = $('<h3>').addClass('mdc-typography--headline6').text(title);
        $cardMediaSquare.append($title);
        $outerDiv.append($cardMediaSquare);

        if($contentDiv !== null && $contentDiv !== undefined)
            $outerDiv.append($contentDiv);
        

        const $cardActions = $('<div>').addClass('mdc-card__actions');
        const $cardActionButtons = $('<div>').addClass('mdc-card__action-buttons');
        for(const action of actions) {
            const $cardAction = $('<button>').addClass('mdc-button mdc-card__action mdc-card__action--button');
            $cardAction.text(action.name);
            $cardAction.on('click', () => action.handler());
            $cardActionButtons.append($cardAction);
        }
        $cardActions.append($cardActionButtons);
        $outerDiv.append($cardActions);

        return $outerDiv;
    }

    renderStops(stops) {
        stops.forEach(stop => this.renderStop(stop));
    }

    renderStop(stop) {
        const self = this;
        const title = stop.tags.stop_desc;
        const $cardBody = $('<div>').addClass('card-body mdc-typography--body2');
        const $routesHeader = $('<h5>').text('Routes Servicing Stop:');
        $cardBody.append($routesHeader);
        const routes = stop.routes_serving_stop.map(route => ({ 
            'name': route.route_name 
        }));
        $cardBody.append(this.renderRoutes(routes));

        const actions = [
            {
                name: 'View On Map',
                handler() {
                    self.uiRouter.routeContent('map', {
                        stop: {
                            name: stop.tags.stop_desc,
                            latitude: stop.geometry.coordinates[1],
                            longitude: stop.geometry.coordinates[0]
                        }
                    });
                }
            },
            {
                name: 'Stop Schedule',
                handler() {
                    self.uiRouter.routeContent('scheduleInfo', {
                        //TODO: Add parameters to filter the schedule info by stop
                    });
                }
            }
        ];
        this.$busInfoDiv.append(this.renderCard($cardBody, title, actions));
    }

    renderRoutes(routes) {
        const $chipSet = $('<div>').addClass('mdc-chip-set');
        routes.forEach(route => {
            const $chip = $('<div>').addClass('mdc-chip');
            const $chipText = $('<div>').addClass('mdc-chip__text');
            $chipText.text(route.name);
            $chip.append($chipText);
            $chipSet.append($chip);
        });
        return $chipSet;
    }

    render() {
        const $mainDiv = $('<div>');
        $mainDiv.append($('h2').text('Nearby Bus Stop Information:'));
        $mainDiv.append(this.$busInfoDiv);
        return $mainDiv;
    }
}