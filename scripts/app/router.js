define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {

    var AppRooter = Backbone.Router.extend({

        defaultRoutes: {
            '': 'home',
            '*notFound': '404'
        },

        _knownRoutes: [],

        initialize: function(navRoutes) {

            _.each(this.getAllRoutes(), this.addRoute.bind(this));

            Backbone.history.start({
                pushState: true
            });
        },

        getAllRoutes: function() {
            var routes = {};
            $('a[href^="/"]').each(function() {
                var route = this.pathname.slice(1);
                if (!routes.hasOwnProperty(route)) {
                    routes[route] = route;
                }
            });
            return $.extend({}, this.defaultRoutes, routes);
        },

        addRoute: function(route, name) {
            if (_.contains(this._knownRoutes, route)) {
                return false;
            }
            this._knownRoutes.push(route);
            console.log('route created', route);
            this.route(route, name || route);
        }
    });

    return AppRooter;
});
