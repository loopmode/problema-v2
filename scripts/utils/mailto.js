define(['jquery'], function($) {
	$('a.email').each(function() {
		var email = $(this).text().replace(' at ', '@');
		$(this).attr('href', 'mailto:' + email);
		$(this).text(email);
	})
});