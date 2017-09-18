angular.module('helpdeskApp').
//  config(['$locationProvider' ,'$routeProvider','USER_ROLES',
        config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
//      $locationProvider.hashPrefix('!');
                $routeProvider.
                        when('/login', {
                            controller: 'LoginController',
                            templateUrl: 'resourses/views/login/login.html'
                        }).
                        when('/users', {
                            templateUrl: 'resourses/views/admin/user/Users/user-list.template.html',
                            controller: 'UsersController',
                            controllerAs: 'usrCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/roles', {
                            templateUrl: 'resourses/views/admin/user/Roles/Roles.html',
                            controller: 'SystemRolesController',
                            controllerAs: 'rolesCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/privileges', {
                            templateUrl: 'resourses/views/admin/user/Privilages/privilages.html',
                            controller: 'PrivilagesController',
                            controllerAs: 'privilCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/customers', {
                            templateUrl: 'resourses/views/admin/user/Customers/Customers.html',
                            controller: 'CustomerController',
                            controllerAs: 'CustCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/Profile', {
                            templateUrl: 'resourses/views/admin/user/Profiles/Profiles.html',
                            controller: 'ProfileController',
                            controllerAs: 'profilCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/product', {
                            templateUrl: 'resourses/views/admin/Product/Product.html',
                            controller: 'ProductController',
                            controllerAs: 'productCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/Projects', {
                            templateUrl: 'resourses/views/admin/Projects/Projects.html',
                            controller: 'ProjectsController',
                            controllerAs: 'projectCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/MediaSpaces', {
                            templateUrl: 'resourses/views/admin/MediaSpace/MediaSpace.html',
                            controller: 'MediaSpaceController',
                            controllerAs: 'MediaCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/Attributes', {
                            templateUrl: 'resourses/views/admin/Attributes/Attributes.html',
                            controller: 'AttributesController',
                            controllerAs: 'AttCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/Aging', {
                            templateUrl: 'resourses/views/admin/AgainIssues/AgainIssues.html',
                            controller: 'AgainIssuesController',
                            controllerAs: 'AgIssueCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/FeedBacks', {
                            templateUrl: 'resourses/views/admin/Feedback/Feedback.html',
                            controller: 'FeedbackController',
                            controllerAs: 'FBackCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/systemLookup', {
                            templateUrl: 'resourses/views/admin/Attributes/System Lookup/System Lookup.html',
                            controller: 'SysLokupController',
                            controllerAs: 'sysLookUpCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/systemFeilds', {
                            templateUrl: 'resourses/views/admin/Attributes/System Feilds/System Feilds.html',
                            controller: 'SystemFeildsController',
                            controllerAs: 'sysFieldsCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/customLookup', {
                            templateUrl: 'resourses/views/admin/Attributes/Custom Lookup/Custom Lookup.html',
                            controller: 'CustomLookupController',
                            controllerAs: 'custLookUpCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/customFeilds', {
                            templateUrl: 'resourses/views/admin/Attributes/Custom Feilds/Custom Feilds.html',
                            controller: 'CustomFeildsController',
                            controllerAs: 'custFieldsCtrl',
//            authorizedRoles: [USER_ROLES.ADMIN]
                        }).
                        when('/', {
                            redirectTo: '/login'
                        })
                        .otherwise({redirectTo: '/login'});
            }
        ])
        .run(['$rootScope', '$location', '$cookieStore', '$http','AuthenticationService',
            function ($rootScope, $location, $cookieStore, $http,AuthenticationService) {
                // keep user logged in after page refresh
                $rootScope.globals = $cookieStore.get('globals') || {};
                if ($rootScope.globals.currentUser) {
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
                  //  $rootScope.rooooot ;
                   
                }

                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    // redirect to login page if not logged in
                    if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                        $location.path('/login');
                    }
                    else if ($location.path() === '/login'){
                        AuthenticationService.ClearCredentials();
                    }
                     if ($location.path() !== '/login'){
                       $rootScope.rooooot = false;
                    }
                });
            }]);



