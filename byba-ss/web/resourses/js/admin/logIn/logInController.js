
angular.module('helpdeskApp')

        .controller('LoginController',
                ['$scope', '$rootScope', '$location', 'AuthenticationService',
                    function ($scope, $rootScope, $location, AuthenticationService) {
                        // reset login status
                        $scope.user = {};

                        AuthenticationService.ClearCredentials();

                        $scope.login = function () {
                          //  $scope.dataLoading = true;
                          
                            AuthenticationService.Login($scope.user, function (response) {
                                if (response.result === 'true') {
                                    AuthenticationService.SetCredentials($scope.user.username, $scope.user.password);
                                   
                                    $location.path('/users');
                                } else {
                                    $scope.notLoged = 'sorry username or password is not correct';
                                    $scope.alerts = [{'type': 'danger', msg: 'sorry username or password is not correct'}];
                            //        $scope.dataLoading = false;
                                }
                            });
                        };
                        $scope.closeAlert = function (index) {
                            $scope.alerts.splice(index, 1);
                        };
                    }
                ]);