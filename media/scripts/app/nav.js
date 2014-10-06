define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    
    var Nav = Backbone.View.extend({

        initialize: function() {

            $(document).on('click', 'a', this.handleClick.bind(this));

            var router = new Backbone.Router(),
                routes = [],
                links = $('nav').find('a[href]');

            router.on('route', this.dispatchRoute.bind(this));
            links.each(function() {
                var route = this.href.split('?page=')[1];
                if (route && !_.contains(routes, route)) {
                    routes.push(route);
                    router.route(route);
                }
                this.href = '/' + route;
            });

            this.router = router;
            this.routes = routes;

            Backbone.history.start({
                pushState: true
            });

            setTimeout(function() {
                this.dispatchRoute(Backbone.history.fragment);
            }.bind(this), 0);
        },

        containsRoute: function(route) {
            return this.routes.indexOf(route) > -1;
        },

        dispatchRoute: function(route) {
            this.trigger('route', route);
        },

        handleClick: function(e) {
            var href = $(e.currentTarget).attr('href'),
                route = href && href.indexOf('/') === 0 && href.slice(1);
            if (route) {
                e.preventDefault();
                Backbone.history.navigate(route);
                this.dispatchRoute(route);
            }
        }
    });
    return Nav;
});