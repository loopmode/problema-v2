define(['app/views/app', 'utils/responsive', 'app/router'], function(AppView, Responsive, AppRouter) {

    Responsive.watch('body');

    $(function() {

        var appView = new AppView();
        var router = new AppRouter();
        
        router.on('route', appView.showPage, appView);

        require(['utils/phpcache']);

    });
});
