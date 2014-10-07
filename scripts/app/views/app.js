define([
    'jquery',
    'backbone',
    'app/views/page',
    'app/views/poster',
    'app/views/spinner'
], function($, Backbone, Page, Poster, Spinner) {

    var AppView = Backbone.View.extend({

        el: 'body',

        defaults: {
            minContentHeight: 400
        },

        initialize: function(options) {

            this._super.call(this, options);
            this.options = $.extend(true, {}, this.defaults, options);

            this.contentElement = this.$('main');
            this.poster = new Poster();
            this.spinner = new Spinner({
                el: '#content .spinner-container',
                container: $('#content')
            });

            this.sweepLinks();
            $(document).on('click', 'a[href^="/"]', this.handleLink.bind(this));


            setTimeout(function() {
                // initial route handling
                this.showPage('/' + Backbone.history.fragment);
            }.bind(this), 0);

        },

        handleLink: function(e) {
            var href = $(e.currentTarget).attr('href');
            if (href && href.indexOf('/') === 0) {
                e.preventDefault();
                Backbone.history.navigate(href);
                this.showPage(href);
            }
        },

        showPage: function(route) {

            if (route && route !== this.currentRoute) {

                this.currentRoute = route;

                var content = this.contentElement,
                    oldPage = this.currentPage,
                    newPage = new Page({
                        route: route // === '/' ? 'home' : route
                    });

                var showNewPage = function() {
                    this.currentPage = newPage;
                    this.spinner.show();
                    newPage.load().then(function() {
                        content.css('min-height', Math.max(this.options.minContentHeight, newPage.$el.height()));
                        this.spinner.hide().then(function() {
                            newPage.show();
                        });
                        this.sweepLinks(newPage.$el);
                    }.bind(this));
                }.bind(this);

                if (oldPage) {
                    content.css('min-height', Math.max(this.options.minContentHeight, oldPage.$el.height()));
                    oldPage.hide().then(showNewPage);
                } else {
                    showNewPage();
                }
            }

        },


        sweepLinks: function(target) {
            $(target || 'body').find('a[href*="?page="]').each(function(i, a) {
                var fragment = a.href.split('?page=')[1];
                if (fragment !== undefined) {
                    a.href = '/' + fragment;
                }
            });
        }
    });

    return AppView;
});
