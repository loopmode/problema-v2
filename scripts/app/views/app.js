define([
    'amplify',
    'jquery',
    'backbone',
    'app/views/page',
    'app/views/poster',
    'app/views/spinner'
], function(amplify, $, Backbone, Page, Poster, Spinner) {

    var AppView = Backbone.View.extend({

        el: 'body',

        defaults: {
            minContentHeight: 600,
            introDebounceTime: 5000,
            scrollDuration: 500
        },

        events: {
            'click a[href^="/"]': 'handleLink',
            'click .nav-dropdown a[href^="/"]': 'scrollToContent'
        },

        currentPage: undefined,
        currentRoute: undefined,
        currentlyLoadingPage: undefined,

        initialize: function(options) {
            this.options = $.extend(true, {}, this.defaults, options);
            this.createChildren();
            this.sanitizeLinks('nav');

            setTimeout(this.intro.bind(this), 0);
        },

        intro: function() {
            var now = new Date().getTime(),
                lastStarted = amplify.store('lastStarted'),
                elapsedTime = now - (lastStarted || 0),
                introDuration = 'short';

            if (Backbone.history.fragment) {
                this.scrollToContent(0);

            } else {
                if (elapsedTime > this.options.introDebounceTime) {
                    introDuration = 'long';
                }
            }

            this.$el.addClass('intro-' + introDuration + ' ready');
            this.showPage('/' + Backbone.history.fragment);

            amplify.store('lastStarted', now);
            this.lastStarted = lastStarted;
        },

        createChildren: function() {
            this.$main = this.$('main');
            this.poster = new Poster();
            this.spinner = new Spinner();
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

            if (route === undefined || route === this.currentRoute) {
                return;
            }

            var self = this,
                minHeight = this.options.minContentHeight,
                oldPage = this.currentPage,
                newPage = new Page({
                    route: route
                });

            function showNewPage() {
                if (self.currentlyLoadingPage) {
                    self.currentlyLoadingPage.abort();
                }

                self.currentlyLoadingPage = newPage;
                self.currentRoute = route;
                self.currentPage = newPage;
                self.spinner.show();
              //  self.scrollToContent();

                newPage
                    .load()
                    .then(function() {
                        self.currentlyLoadingPage = undefined;
                        self.$main.css('min-height', Math.max(minHeight, newPage.$el.height()));
                        self.spinner
                            .hide()
                            .then(function() {
                                newPage.show();
                            });
                        self.sanitizeLinks(newPage.$el);
                    });
            }

            if (oldPage === undefined) {
                showNewPage();
            } else {
                this.$main.css('min-height', Math.max(minHeight, oldPage.$el.height()));
                oldPage
                    .hide()
                    .then(function() {
                        showNewPage();
                    });
            }
        },

        scrollToContent: function() {

            var body = $("html, body").stop().unbind(".e"),
                dfd = $.Deferred(),
                targetScroll = this.$('nav.nav-tabs').offset().top - 100;

            // abort if user scrolls manually while animating!
            body.bind("scroll.e mousedown.e DOMMouseScroll.e body.e keyup.e", function() {
                body.stop().unbind(".e");
            });

            body.animate({
                scrollTop: targetScroll
            }, this.options.scrollDuration, function() {
                body.unbind(".e");
            });

        },

        /** TODO: should be obsolete in time... */
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
