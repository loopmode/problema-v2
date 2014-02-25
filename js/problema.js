(function() {
 
    function createTopNav() {
        $('<div></div>')
            .html( $('#main-nav').html() )
            .attr('id', 'top-nav')
            .prependTo('#intro')
        ;
    }
 
    
    createTopNav();
 }(jQuery));