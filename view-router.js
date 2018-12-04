class ViewRouter {
    constructor(contentViewSelector) {
        this.routes = {};
        this.$contentView = $(contentViewSelector);
    }

    addRoute(handlerName, handler) {
        this.routes[handlerName] = handler;
    }

    routeContent(handlerName, target) {
        this.$contentView.off("*").empty();
        const content = this.routes[handlerName].render(target);
        this.$contentView.append(content);
        this.routes[handlerName].initialize(target);
    }
}