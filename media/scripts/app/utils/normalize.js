/* @author Jovica Aleksic */
if (!Function.prototype.bind && window.jQuery) {
	Function.prototype.bind = function(scope) {
		return window.jQuery.proxy(this, scope);
	};
}