'use strict';

angular.module('minicolors-angular', [])
  .directive('minicolors', function () {
    return {
      require: 'ngModel',
      priority: 1,
      scope: {
        ngModel: '='
      },
      link: function postLink(scope, element, attrs, ngModel) {
        var options;
        try {
          options = scope.$eval(attrs.minicolors);
        } catch(err) {
          console.error("invalid option object");
          options = null;
        }
        element.minicolors(options);

        ngModel.$render = function () {
          element.minicolors('value', ngModel.$viewValue);
        };
      }
    };
  });
