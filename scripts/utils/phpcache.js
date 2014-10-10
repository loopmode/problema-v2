define(['jquery', 'utils/log'], function($, log) {

    var phpcache = {
        clear: function() {
            log('clear php cache');
            var location = window.location;
            return $.ajax({
                url: 'clearcache.php',
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
