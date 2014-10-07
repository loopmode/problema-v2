  define(['underscore', 'jquery'], function(_, $) {

      var list = [],
          map = {};

      $('a[href*="?page"]').each(function() {
          var route = '/' + this.href.split('?page=')[1];
          if (!_.contains(list, route)) {
              list.push(route);
              map[route] = route;
          }
      });

      return {
          getList: function() {
              return list;
          },
          getMap: function() {
              return map;
          },
          contains: function(route) {
              return _.contains(routes, route);
          },
          scan: function() {
              retrieveRoutes();
          }
      };

  });
