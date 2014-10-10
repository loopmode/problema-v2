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
            minContentHeight: 600,
            scrollDuration: 1000
        },

        events: {
            'click a[href^="/"]': 'handleLink',
            'click .nav-dropdown a[href^="/"]': 'scrollToContent'
        },

        currentPage: undefined,
        currentRoute: undefined,

        poster: undefined,
        spinner: undefined,

        $main: $('main'),

        initialize: function(options) {
            this.options = $.extend(true, {}, this.defaults, options);

            this.createChildren();
            this.sanitizeLinks('nav');

            this.$el.addClass('app-ready');
        },

        createChildren: function() {
            this.poster = new Poster();
            this.spinner = new Spinner();
        },

        handleLink: function(e) {
            var route = $(e.currentTarget).attr('href');
            if (route && route.indexOf('/') === 0) {
                e.preventDefault();
                Backbone.history.navigate(route);
                this.setRoute(route);
            }
        },

        setRoute: function(route) {

            if (route === undefined || route === this.currentRoute) {
                return;
            }
            this.currentRoute = route;

            var page = Page.create({
                route: route
            });

            if (this.currentPage) {
                this.$main.css('min-height', Math.max(this.currentPage.$el.height(), this.options.minContentHeight));
                this.currentPage.abort();
                this.currentPage.hide()
                    .then(function() {
                        this.setCurrentPage(page);
                    }.bind(this));
            } else {
                this.setCurrentPage(page);
            }
        },

        setCurrentPage: function(page) {
            this.spinner.show();
            this.currentPage = page;
            this.currentPage.load()
                .then(function() {
                    this.sanitizeLinks(page.$el);
                    this.trigger('page:loaded', page);
                    this.spinner.hide()
                        .then(function() {
                            $('body').removeClass('empty');
                            page.show().then(function() {
                                this.$main.css('min-height', Math.max(page.$el.height(), this.options.minContentHeight));
                                this.trigger('page:shown', page);
                            }.bind(this));
                        }.bind(this));
                }.bind(this));
        },

        scrollToContent: function(duration) {
        


            var body = $("html, body").stop().unbind(".e"),
                targetScroll = this.$('nav.nav-tabs').offset().top - 100;

                 
            body.bind("scroll.e mousedown.e DOMMouseScroll.e body.e keyup.e", function() {
                body.stop().unbind(".e");
            });
            
            if (this.isScrolling) {
                return;
            }
            this.isScrolling = true;

            body.animate({
                scrollTop: targetScroll
            }, isNaN(duration) ? this.options.scrollDuration : duration, function() {
                this.isScrolling = false;
                body.unbind(".e");
            }.bind(this));

        },


        /** TODO: get rewriting done serverside and get rid off "sanitizing" insane shit! */
        sanitizeLinks: function(target) {
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
