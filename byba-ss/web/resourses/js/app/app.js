// Define the `phonecatApp` module
angular.module('helpdeskApp', ['minicolors-angular','ngRoute','ngMessages','ui.bootstrap','datePicker','ngAnimate',
    'ngSanitize','ngCookies','angularUtils.directives.dirPagination','ngScrollbars']);

angular.module('helpdeskApp').run(function ($rootScope, $http) {
    console.log("***************in run*******************");
    $rootScope.lang = 'en';

    $rootScope.default_float = 'left';
    $rootScope.opposite_float = 'right';

    $rootScope.default_direction = 'ltr';
    $rootScope.opposite_direction = 'rtl';
    
    // scroll bar theme
    $rootScope.scrollbarConfig = {
				theme: 'dark-3'
			}
//
//    $rootScope.$on('$routeChangeStart', function (event, next) {
//        console.log("***************changing*******************");
//        console.log(next.authorizedRoles);
//    });
});
angular.module('helpdeskApp').config(function (ScrollBarsProvider) {
			// scrollbar defaults
			ScrollBarsProvider.defaults = {
				autoHideScrollbar: false,
				setHeight: 300,
				scrollInertia: 0,
				advanced: {
					updateOnContentResize: true
				},
				scrollButtons: {
					scrollAmount: 'auto', // scroll amount when button pressed
					enable: true // enable scrolling buttons by default
				}
			};
		});

		
                
//$(document).ready(function () {
//    $(".mCustomScrollbar").mCustomScrollbar({
//        setHeight: 300,
//        theme: "dark-3"
//    });
//   //  console.log("asd asd asd");
//    $('.color-input').minicolors({
//        change: function (value, opacity) {
//            if (!value) return;
//            if (opacity) value += ', ' + opacity;
//            if (typeof console === 'object') {
//                    console.log(value);
//            }
//        },
//        theme: 'bootstrap',
//        control: 'wheel'
//    })
//
//});
//angular.module('helpdeskApp').value('cgBusyDefaults',{
//  message:'Loading Stuff',
//  backdrop: false,
//  templateUrl: 'resourses/views/layout/custom-template.html',
//  delay: 300,
//  minDuration: 700,
//  wrapperClass: 'my-class my-class2'
//});
