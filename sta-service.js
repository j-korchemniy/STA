(function (services) {

    // Google API key... Should be good for map, transit, and places apis
    // AIzaSyC6Bmqdj6b6GsrGyOsawtQscPwcGgzBF8g

    services.sta = new STAService();

    function STAService() {

        this.getSomething = function () {
            return "Hello World";
        }

    }

})(window.services = window.services || {});