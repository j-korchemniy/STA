class ViewRouter {
    constructor(contentViewSelector) {
        this.routes = {};
        this.$contentView = $(contentViewSelector);
    }

    addRoute(handlerName, handler) {
        this.routes[handlerName] = handler;
    }

    routeContent(handlerName, params) {
        this.$contentView.empty();
        const content = this.routes[handlerName].render(params);
        this.$contentView.append(content);
        this.routes[handlerName].initialize(params);
    }
}