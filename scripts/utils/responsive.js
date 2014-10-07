/*
 * Sets a CSS class to indicate the current
 * Bootstrap3 layout mode (xs/sm/md/lg) and
 * watches for changes of the window dimensions 
 * to update that class.
 * When the mode has changed, a 'responsiveChange'
 * event is dispatched on $(window).
 * @author Jovica Aleksic
 */
define(['jquery', 'underscore'], function($, _) {
	
	function Watcher(target) {
		this.target = $(target);
		this.modes = ['xs', 'sm', 'md', 'lg'];
		this.initialize();
	}

	Watcher.prototype = {
		mode: null,

		initialize: function() {
			_.each(this.modes, function(mode) {
				var el = $('<span></span>')
					.attr('class', 'visible-' + mode)
					.data('class', mode)
					.insertAfter('body')
				;
			}, this);
			this.elements = $('body').nextAll('[class^="visible-"]')
		},
		
		start: function() { 
			this.update();
			$(window).on('resize.layout', $.proxy(this.update, this));
		},
		stop: function() {
			$(window).off('resize.layout');
		},

		update: function() {

			var target = this.target;
			this.elements.each(function() {
				target[$(this).is(':visible') ? 'addClass' : 'removeClass']($(this).data('class'));
			});

			var mode = this.elements.filter(':visible').data('class');
			if (mode !== this.mode) {
				this.mode = mode;
				$(window).triggerHandler('responsiveChange', mode);
			}
  
		}
	}; 

	Watcher.watch = function(target) {
		var instance = new Watcher(target);
		instance.start();
		return instance;
	};

	return Watcher;
});