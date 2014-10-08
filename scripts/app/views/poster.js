define([
    'underscore',
    'jquery',
    'backbone'
], function(_, $, Backbone) {

    var Poster = Backbone.View.extend({
        el: 'header div.poster',
        initialize: function(options) {
            //this.options = $.extend(true, {}, this.defaults, options);
            this._super.call(this, options);

           // $(window).on('scroll', _.debounce(this.updatePosition.bind(this), 1000));
        },

        updatePosition: function(e) {
          //  console.log(this.$el);
        }
    });

    return Poster;
});
