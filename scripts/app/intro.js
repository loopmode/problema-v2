define(['jquery', 'amplify', 'backbone'], function($, amplify, Backbone) {

    var body = $('body');

    var intro = {

        minAwayTime: window.location.href.match(/localhost/) ? 2000 : 60000,

        run: function() {

            var introType;

            if ((new Date().getTime()) - (amplify.store('unloadedTime') || 0) > this.minAwayTime && !Backbone.history.fragment) {
                introType = 'intro-long';
            } else {
                introType = 'intro-short';
            }


            body.addClass(introType);

            window.setTimeout(function() {
                body.removeClass('empty').addClass('intro-run');
            }, 10);



/*
            window.setTimeout(function() {
                body.removeClass('intro-long intro-short intro-run');
            }, introType === 'intro-short' ? 1000 : 5000);
*/

            //body.bind("transitionend.intro webkitTransitionEnd.intro oTransitionEnd.intro MSTransitionEnd.intro", function() {
            //    body.unbind('.intro').removeClass('intro-long intro-short intro-run');
            //});

        }
    };

    $(window).on('beforeunload', function() {
        amplify.store('unloadedTime', new Date().getTime());
    });

    return {
        run: intro.run.bind(intro)
    };
});
