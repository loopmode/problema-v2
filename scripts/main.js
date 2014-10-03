(function() {
 
	requirejs.config({
		baseUrl: './scripts',
		paths : {
			'text' : 'lib/require-text',
			'templates': '../templates',
			'data': '../data',
			'backbone' : 'lib/backbone-min',
			'backbone-super' : 'lib/backbone-super-min',
			'underscore' : 'lib/underscore-min',
			'jquery' : 'lib/jquery-1.11.0',
			'bootstrap': 'lib/bootstrap.min',
			'normalize': 'lib/normalize',
			'backstretch': 'lib/jquery.backstretch.min',
			'handlebars' : 'lib/handlebars-v1.3.0',
			'magnific-popup' : 'lib/jquery.magnific-popup.min',
			'image-center': 'lib/jquery.blImageCenter'
		},
		shim : {
			'backbone' : {
				deps : [ 'underscore', 'jquery' ],
				exports : 'Backbone'
			},
			'backbone-super': {
				deps : [ 'backbone' ]
			},
			'underscore' : {
				exports : '_'
			},
			'jquery': {
	            exports: '$'
	        },
        	'bootstrap' : {
        		deps : ['jquery']
        	},
        	'backstretch' : {
        		deps : ['jquery'],
        		exports: '$.fn.backstretch'
        	},
        	'normalize' : {
        		deps :['jquery']
        	},
        	'handlebars': {
        		init: function() { return Handlebars; }
        	}
		}
	});
	
	require(['app/utils/normalize', 'backbone-super', 'bootstrap'], function() {
		
	});

}());