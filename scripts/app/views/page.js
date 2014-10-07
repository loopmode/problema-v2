define([
    'jquery',
    'backbone'
], function($, Backbone) {

    var cache = {};

    var Page = Backbone.View.extend({
        className: 'content-page',

        /**
         * @name options
         * @property options.route {String}
         */
        defaults: {
            animDuration: 500
        },
        
        initialize: function(options) {
            this._super.apply(this, options);
            this.options = $.extend(true, {}, this.defaults, options);
        },
        
        show: function() {
            $('#content').empty().append( this.$el );
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
            this.$el.stop().transition(props, duration, dfd.resolve.bind(this));
            return dfd.promise();
        },

        load: function() {

            this.abort();

            var dfd = $.Deferred(),
                route = this.options.route,
                el = this.$el;

            el.css('opacity', 0);

            if (cache[route]) {
                el.html(cache[route]);
                dfd.resolve(cache[route]);
            } else {
                this.xhr = $.ajax({
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
                    });
            }
            return dfd.promise();
        },

        abort: function() {
            if (this.xhr) {
                this.xhr.abort();
            }
            this.xhr = undefined;
        },
        
        remove: function() {
            this.abort();
            this._super();
        }
    });
    return Page;
});
