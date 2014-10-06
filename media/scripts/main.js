(function() {
 
	requirejs.config({
		baseUrl: 'media/scripts',
		paths : {
			//'text' : 'lib/require-text',
			'backbone' : 'lib/backbone-min',
			'backbone-super' : 'lib/backbone-super-min',
			'underscore' : 'lib/underscore-min',
			'jquery' : 'lib/jquery-1.11.0-min',
			'bootstrap-dropdown': 'lib/bootstrap/dropdown',
			'magnific-popup' : 'lib/jquery.magnific-popup.min',
			//'image-center': 'lib/jquery.blImageCenter'
		},
		shim : {
			'underscore' : {
				exports : '_'
			},
			'jquery': {
	            exports: '$'
	        },
			'backbone' : {
				deps : [ 'underscore', 'jquery' ],
				exports : 'Backbone'
			},
			'backbone-super': {
				deps : [ 'backbone' ]
			},
        	'bootstrap-dropdown' : {
        		deps : ['jquery']
        	}
		}
	});
	
	require(['backbone-super', 'bootstrap-dropdown', 'app/utils/normalize'], function() {
		require(['app/app', 'app/utils/responsive'], function(App, Responsive) {
			$(function() {
				Responsive.watch('body');
				window.app = new App();
			});
		});
	});

}());