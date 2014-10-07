define(['underscore', 'jquery', 'backbone'], function(_, $, Backbone) {

    var Spinner = Backbone.View.extend({
        delay: 500,
        initialize: function(options) {
            this._super.call(this, options);
            this.container = options.container;
        },
        show: function() {
            var dfd = $.Deferred();

            window.clearTimeout(this.showTimeout);
            this.showTimeout = window.setTimeout(function() {
                this.$el.prependTo(this.container).stop().animate({
                    opacity: 1
                }, 'fast', function() {
                    dfd.resolve();
                });
            }.bind(this), this.delay);

            return dfd.promise();
        },
        hide: function() {
            var dfd = $.Deferred();

            window.clearTimeout(this.showTimeout);
            this.$el.stop().animate({
                opacity: 0
            }, 'fast', function() {
                this.$el.remove();
                dfd.resolve();
            }.bind(this));
            delete this.showTimeout;

            return dfd.promise();
        }
    });

    return Spinner;
});
