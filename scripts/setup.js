/**
 * initial requirejs and application setup
 */
(function() {

    /**
     * magic notation for paths in dev mode.
     * anything in the path that comes after a pipe character will be ignored on localhost.
     * @param {Object<String.String>}
     * @return {Object<String.String>}
     */
    function paths(source) {
        var search = /\|([-,.](min))/;
        var replace = window.location.hostname == 'localhost' ? '' : '$1';
        for (var key in source) {
            source[key] = source[key].replace(search, replace);
        }
        return source;
    }

    requirejs.config({
        baseUrl: 'scripts',
        paths: paths({
            'backbone': 'lib/backbone|-min',
            'backbone-super': 'lib/backbone-super-min',
            'underscore': 'lib/underscore|-min',
            'jquery': 'lib/jquery-1.11.0|-min',
            'bootstrap-dropdown': 'lib/bootstrap/dropdown',
            'bootstrap-hover-dropdown': 'lib/bootstrap-hover-dropdown|.min',
            'magnific-popup': 'lib/jquery.magnific-popup|.min',
            'amplify': 'lib/amplify|.min',

            /**
             * use $.transition() instead of $.animate()!
             */
            'transit': 'lib/jquery.transit|.min'
        }),
        shim: {
            'underscore': {
                exports: '_'
            },
            'jquery': {
                exports: '$'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'backbone-super': {
                deps: ['backbone']
            },
            'bootstrap-dropdown': {
                deps: ['jquery']
            },
            'bootstrap-hover-dropdown': {
                deps: ['bootstrap-dropdown']
            },
            'amplify': {
                exports: 'amplify'
            }
        }
    });

    require(['backbone-super', 'bootstrap-hover-dropdown', 'utils/normalize', 'transit'], function() {

        // setup is done, any anonymous dependencies should be loaded. 
        require(['problema']);

    });

}());
