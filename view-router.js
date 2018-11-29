class ViewRouter {
    constructor(contentViewSelector) {
        this.routes = {};
        this.$contentView = $(contentViewSelector);
    }

    addRoute(handlerName, handler) {
        this.routes[handlerName] = handler;
    }

    routeContent(handlerName) {
        this.$contentView.empty();
        const content = this.routes[handlerName].render();
        this.routes[handlerName].initialize();
        this.$contentView.append(content);
    }
}