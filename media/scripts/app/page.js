define([
    'jquery',
    'backbone'
], function($, Backbone) {
    var cache = {};

    var Page = Backbone.View.extend({
        className: 'content-page',
        defaults: {
            animDuration: 500
        },
        initialize: function(options) {
            this._super.apply(this, options);
            this.options = $.extend(true, {}, this.defaults, options);
        },
        show: function() {
            this.$el.appendTo('#content');
            return this.animate({
                opacity: 1
            }, this.options.animDuration);
        },
        hide: function() {
            return this.animate({
                opacity: 0
            }, this.options.animDuration).then(function() {
                this.remove();
            }.bind(this));
        },
        animate: function(props, duration) {
            var dfd = $.Deferred();
            this.$el.stop().animate(props, duration, dfd.resolve.bind(this));
            return dfd.promise();
        },
        load: function() {
            var dfd = $.Deferred(),
                route = this.options.route,
                el = this.$el;
            
            el.css('opacity', 0);

            if (cache[route]) {
                el.html(cache[route]);
                dfd.resolve(cache[route]);
            } else {
                $.ajax({
                        url: 'index.php?page=' + this.options.route,
                        type: 'get',
                        dataType: 'html'
                    })
                    .done(function(result) {
                        cache[route] = result;
                        el.html(result);
                        dfd.resolve(result);
                    })
                    .fail(function(res) {
                        dfd.reject(res);
                    })
            }
            return dfd.promise();
        }
    });
return Page;
});