define([
        'app/intro',
        'utils/responsive',
        'app/router',
        'app/views/app-view',
        'app/views/page'
    ],
    function(intro, responsive, AppRouter, AppView, Page) {
 
        responsive.watch('body');

        $(function() {

            var router = new AppRouter();
            var appView = new AppView();

            if (Backbone.history.fragment) {
                appView.setRoute('/' + Backbone.history.fragment);
            }
            else {
                var defaultContent = '/introduction';
                appView.setCurrentPage(Page.create({
                    route: defaultContent
                }));
                appView.currentRoute = defaultContent;
            }

            appView.on('page:shown', function() {
                if (Backbone.history.fragment) {
                    appView.scrollToContent();
                }
            });
            router.on('route', appView.setRoute, appView);
            window.setTimeout(intro.run, 0);
 
            require(['utils/phpcache']);
            window.app = appView;

        });
    });
