  define(['jquery', 'backbone'], function($, Backbone) {

      var routes = [];

      var Navi = function() {
          this.initialize();
      };

      Navi.prototype = {
          initialize: function() {
              $('body > nav').find('a[href*="?page="]').each(function() {
                  var route = '/' + this.href.split('?page=')[1];
                  if (!_.contains(routes, route)) {
                      routes.push(route);
                  }
              });
          },

          /**
           * @return {Array<String>}
           */
          getRoutes: function() {
              return routes;
          },
          isKnownRoute: function(route) {
              return _.contains(routes, route);
          }
      };

      return Navi;

  });
