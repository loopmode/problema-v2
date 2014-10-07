define(['jquery', 'utils/log'], function($, log) {

    var phpcache = {
        clear: function() {
            var location = window.location;
            var url = location.protocol + '//' + location.hostname + '/?clearcache';
            return $.ajax({
                url: url,
                dataType: 'json'
            }).then(function(response) {
                log('cache flushed', response);
                location.reload();
            });
        }
    };


    $(document).on('click.phpcache', 'a.clear-cache', function(event) {
        phpcache.clear();
        event.preventDefault();
    });
});
