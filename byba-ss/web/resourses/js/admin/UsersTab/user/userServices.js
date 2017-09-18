angular.module('helpdeskApp').
        service('UserService', function ($http, uiServices, webService) {
            var x = this;
            this.loadPageService = function ($scope, $http) {
                $scope.loading = true;
                x.getAllUsers($scope, $http);
                x.getAllRoles($scope, $http);
                x.getAllManager($scope, $http);
            };
            this.showUserData = function ($scope, $http, user) {

                x.getUserRoleAndManagerAndData($scope, $http, user);
                x.getUserProjectsRoles($scope, $http, user);

            };
//            this.chooseRoleId = function ($scope, role, $http) {
//                $scope.ShowedUser.defaultRole.roleId = role.roleId;
//            };
//            this.chooseManagerId = function ($scope, Manager, $http) {
//                $scope.ShowedUser.manager.userId = Manager.userId;
//            };
            this.CheckNameService = function ($scope, $http) {
                $scope.notvalidname = false;
                $scope.UserControlForm.$setValidity('required', true);
                angular.forEach($scope.Users, function (value, key) {
                    if (value.username === $scope.ShowedUser.username) {
                        if ($scope.ShowedUser.userId === value.userId) {
                            $scope.notvalidname = false;
                            $scope.UserControlForm.$setValidity('required', true);

                        } else {
                            $scope.notvalidname = true;
                            $scope.UserControlForm.$setValidity('required', false);
                        }

                    }
//                    else {
////                        x.CheckName($scope, $http, $scope.ShowedUser.username);
//                        $scope.notvalidname = false;
//                        $scope.UserControlForm.$setValidity('required', true);
//                    }
                });
            };
            x.clearData = function ($scope) {
                $scope.UserControlForm.$setPristine();
                $scope.UserControlForm.$setUntouched();
                $scope.notvalidname = false;
                $scope.ShowedUser = {};
//                $scope.selectedRole = '';
//                $scope.selectedManager = '';
                $scope.projectRoles = {};
                $scope.ShowedUser.suspended = false;
                $scope.alerts = [];
                $scope.userIndex ='';
            };
            this.getAllUsers = function ($scope, $http) {
                $http({
                    url: webService.url + 'helpdeskWebServices/webresources/user/getAllUser',
                    method: "GET",
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    $scope.loading = false;
                    $scope.Users = data;
                    uiServices.show();
                }).error(function (data, status, headers, config) {
                });
            };
            this.getAllRoles = function ($scope, $http) {
                $http({
                    url: webService.url + 'helpdeskWebServices/webresources/role/getAllRoles',
                    method: "GET",
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    $scope.SystemRoles = data;
                    uiServices.show();
                }).error(function (data, status, headers, config) {
                });
            };
            this.getAllManager = function ($scope, $http) {
                $http({
                    url: webService.url + 'helpdeskWebServices/webresources/user/getAllManager',
                    method: "GET",
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    $scope.Managers = data;
                }).error(function (data, status, headers, config) {
                });
            };


            this.getUserRoleAndManagerAndData = function ($scope, $http, value) {
                $http({
                    url: webService.url + 'helpdeskWebServices/webresources/user/getUserData',
                    method: "POST",
                    data: value.userId,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    $scope.ShowedUser = data;
                    $scope.UserControlForm.$setPristine();
                    $scope.UserControlForm.$setUntouched();
                    $scope.notvalidname = false;
                    x.getUserManager($scope, $http, value);
                }).error(function (data, status, headers, config) {
                });
            };
            x.getUserManager = function ($scope, $http, user) {
                $http({
                    url: webService.url + 'helpdeskWebServices/webresources/user/getUserManager',
                    method: "POST",
                    data: user,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    $scope.ShowedUser.manager = data;
                }).error(function (data, status, headers, config) {
                });
            };
            this.getUserProjectsRoles = function ($scope, $http, value) {
                $http({
                    url: webService.url + 'helpdeskWebServices/webresources/userProjectRoles/getUserProjectsRoles',
                    method: "POST",
                    data: value.userId,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    $scope.projectRoles = data;
                }).error(function (data, status, headers, config) {
                });
            };

            x.CheckName = function ($scope, $http, username) {
                $http({
                    url: webService.url + 'helpdeskWebServices/webresources/user/CheckNewName?name=' + username,
                    method: "GET",
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    if (data.result === 'false')
                    {
                        $scope.notvalidname = true;
                        $scope.UserControlForm.$setValidity('required', false);
                    } else {
                        $scope.notvalidname = false;
                        $scope.UserControlForm.$setValidity('required', true);
                    }
                }).error(function (data, status, headers, config) {
                });
            };

            x.UpdateUser = function ($scope, $http, user) {
                $http({
                    url: webService.url + 'helpdeskWebServices/webresources/user/updateUserInfo',
                    method: "POST",
                    data: user,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    //  $scope.notvalidname = data.result ;
//                    $scope.UserControlForm.$setPristine();
//                    $scope.UserControlForm.$setUntouched();
                    if (data.result === 'false')
                        $scope.alerts = [{'type': 'danger', msg: 'sorry user isnot saved .'}];
                    else {
                        $scope.alerts = [{'type': 'success', msg: 'Well done! User Saved .'}];
                        x.getAllUsers($scope, $http);
                        if (!$scope.ShowedUser.userId) {
                            $scope.ShowedUser.userId = data.id;
                        }
                    }
                }).error(function (data, status, headers, config) {
                });
            };
            x.suspendUser = function ($scope, $http, user) {
                $http({
                    url: webService.url + 'helpdeskWebServices/webresources/user/Suspend',
                    method: "POST",
                    data: user,
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data, status, headers, config) {
                    $scope.UserControlForm.$setPristine();
                    $scope.UserControlForm.$setUntouched();
                    if (data.result === 'false')
                        $scope.alerts = [{'type': 'danger', msg: 'sorry user wasnot deleted .'}];
                    else {
                        x.clearData($scope);
                        $scope.alerts = [{'type': 'success', msg: 'User deleted .'}];
                        x.getAllUsers($scope, $http);
                    }
                }).error(function (data, status, headers, config) {
                });
            };
        });

