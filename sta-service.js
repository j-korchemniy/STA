(function (services) {

    services.sta = new STAService();

    function STAService() {

        this.getSomething = function () {
            return "Hello World";
        }

    }

})(window.services = window.services || {});