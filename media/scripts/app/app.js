define([
    'jquery',
    'backbone',
    'app/page',
    'app/nav'
], function($, Backbone, Page, Nav) {

    var App = Backbone.View.extend({

        el: $('body'),

        initialize: function() {
            this._super();
            this.contentElement = this.$('main');
            this.nav = new Nav();
            this.nav.on('route', this.setRoute.bind(this));
        },

        setRoute: function(route) {

            if (route && route !== this.currentRoute) {
                this.currentRoute = route;

                var content = this.contentElement,
                    oldPage = this.currentPage,
                    newPage = new Page({
                        route: this.nav.containsRoute(route) ? route : '404'
                    });

                var showNewPage = function() {
                    this.currentPage = newPage;
                    newPage.load().then(function() {
                        content.css('min-height', newPage.$el.height());
                        newPage.show();
                    });
                }.bind(this);

                if (oldPage) {
                    content.css('min-height', oldPage.$el.height());
                    oldPage.hide().then(showNewPage);
                } else {
                    showNewPage();
                }
            }

        }
    });

    return App;
});