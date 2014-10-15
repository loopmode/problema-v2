define([
    'jquery',
    'backbone',
    'app/views/page',
    'app/views/poster',
    'app/views/spinner',
    'utils/mailto'
], function($, Backbone, Page, Poster, Spinner, Mailto) {

    var AppView = Backbone.View.extend({

        el: 'body',

        defaults: {
            minContentHeight: 600,
            scrollDuration: 1000
        },

        events: {
            'click a[href^="/"]': 'handleLink',
            'click .nav-top a[href^="/"]': 'scrollToContent'
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

            $('.nav-bottom').on('hide.bs.dropdown', function(e) {
                e.preventDefault();
            })

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
            this.hilightNavLink(this.currentRoute);

            var page = Page.create({
                route: route
            });


            if (this.currentPage) {
                this.$main.css('min-height', this.getMinPageHeight(this.currentPage.$el));
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
                                this.$main.css('min-height', this.getMinPageHeight(page.$el));
                                this.trigger('page:shown', page);
                            }.bind(this));
                        }.bind(this));
                }.bind(this));
        },

        getContentScreenTop: function() {
            return this.$('nav.nav-bottom').offset().top- 100;
        },
        getMinPageHeight: function(el) {
            return Math.max(el.height(), $(window).height() - (this.getContentScreenTop() - $(window).scrollTop() ) ) - $('body > footer').outerHeight(true) - $('.nav-bottom').outerHeight(true) - 100;
        },
        hilightNavLink: function(route) {
            this.$('> nav a').removeClass('active').filter('[href$="'+route+'"]').addClass('active');
            this.$('> .nav-bottom .dropdown').removeClass('open');
            this.$('> .nav-bottom a.active').closest('.dropdown').addClass('open');
        },
        scrollToContent: function(duration) {
        

            var body = $("html, body").stop().unbind(".e"),
                targetScroll = this.getContentScreenTop();

                 
            body.bind("scroll mousedown DOMMouseScroll keyup", function() {
                body.stop().unbind("scroll mousedown DOMMouseScroll keyup");
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
                var route = a.href.split('?page=')[1];
                if (route !== undefined) {
                    a.href = route;
                }
            });
        }
    });

    return AppView;
});
