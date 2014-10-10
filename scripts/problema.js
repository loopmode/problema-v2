define([
        'app/intro',
        'utils/responsive',
        'app/views/app',
        'app/router'
    ],
    function(intro, responsive, AppView, AppRouter) {
 
        responsive.watch('body');

        $(function() {

            var appView = new AppView();
            var router = new AppRouter();

            if (Backbone.history.fragment) {
                appView.setRoute('/' + Backbone.history.fragment);
            }

            appView.on('page:shown', appView.scrollToContent);
            router.on('route', appView.setRoute, appView);
            
            window.setTimeout(intro.run, 0);
 
            //require(['utils/phpcache']);
            window.app = appView;

        });
    });
