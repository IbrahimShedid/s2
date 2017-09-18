angular.module('helpdeskApp')
        .controller("IndexController", function ($rootScope, $scope, $http) {
            $scope.Login = true;
            $rootScope.rooooot= true;
            
            $rootScope.activeClassName = 'Users';
            $scope.setActiveCLass = function (name) {
                $rootScope.activeClassName = name;
            };
            $rootScope.ActiveHeaderName = 'Users';
            $scope.setMainActiveTabCLass = function (name, activeCLass) {
                $rootScope.ActiveHeaderName = name;
                if (activeCLass) {
                    $rootScope.activeClassName = activeCLass;
                }
            };

//            $rootScope.isLoginPage = true;
//            $rootScope.isAdminModule = false;
//            $http.get('resourses/json/local/bundle-en.json')
//                    .success(function (data) {
//                        console.log("before loading json");
//                        $rootScope.enLabels = data;
//                        $scope.labels = $rootScope.enLabels;
//                        console.log($rootScope.enLabels);
//                        console.log("after loading json");
//                    });
//
//            $http.get('resourses/json/local/bundle-ar.json')
//                    .success(function (data) {
//                        console.log("before loading json2");
//                        $rootScope.arLabels = data;
//                        console.log($rootScope.arLabels);
//                        console.log("after loading json2");
//                    });
//
//            console.log("indexxxxxxxxxxxxx");
//            console.log($scope.labels);
//            console.log($rootScope.enLabels);
        });

//$(document).ready(function () {
//    $(".mCustomScrollbar").mCustomScrollbar({
//        setHeight: 300,
//        theme: "dark-3"
//    });
//});

