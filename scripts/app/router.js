define(['underscore', 'backbone', 'app/nav-routes'], function(_, Backbone, NavRoutes) {

    var AppRooter = Backbone.Router.extend({

        defaultRoutes: {
            '': 'home',
            '*notFound': '404'
        },

        initialize: function(navRoutes) {
            this._routes = [];
            _.each(
                $.extend({},
                    this.defaultRoutes,
                    NavRoutes.getMap()),
                this.addRoute, this
            );
            Backbone.history.start({
                pushState: true
            });
        },


        addRoute: function(route, name) {
            if (_.contains(this._routes, route)) {
                return;
            }
            this._routes.push(route);
            this.route(route, name || route);
        }
    });

    return AppRooter;
});
