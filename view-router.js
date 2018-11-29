class ViewRouter {
    constructor(contentViewSelector) {
        this.routes = {};
        this.$contentView = $(contentViewSelector);
    }

    addRoute(handlerName, handlerFunction) {
        this.routes[handlerName] = handlerFunction;
    }

    routeContent(handlerName) {
        this.$contentView.empty();
        const content = this.routes[handlerName](this.$contentView);
        this.$contentView.append(content);
    }
}