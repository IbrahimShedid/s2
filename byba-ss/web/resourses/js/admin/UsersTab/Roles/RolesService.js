angular.module('helpdeskApp').service('RoleService', function ($http, uiServices, UserService, ProfileServices, webService) {
    var service = this;
    this.showMemberData = function ($scope, $http, role) {
        service.showRoleInformations($scope, $http, role);
    };
    this.loadRolePage = function ($scope, $http) {
        UserService.getAllRoles($scope, $http);
        ProfileServices.getAllProfilesByCreator($scope, $http);
    }
    this.reNew = function ($scope) {
        $scope.chossenRole = {};
        $scope.chossenRole.assignedUsers = [];
        $scope.chossenRole.linkerRoles = [];
        $scope.chossenRole.roleProfile = {};
        $scope.RoleCntrlForm.$setPristine();
        $scope.alerts = [];
        $scope.roleIndex ='';
    };
    this.showRoleInformations = function ($scope, $http, value) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/role/getRolesinformations',
            method: "POST",
            data: value,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.chossenRole = data;
            service.getLinkedRoles($scope, $http, value);
            uiServices.show();
        }).error(function (data, status, headers, config) {
        });
    };

    this.getLinkedRoles = function ($scope, $http, value) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/role/getLinkedRoles',
            method: "POST",
            data: value,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.chossenRole.linkerRoles = data;
            uiServices.show();
        }).error(function (data, status, headers, config) {
        });
    };
    this.SaveRole = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/role/SaveNewRole',
            method: "POST",
            data: $scope.chossenRole,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.chossenRole.roleName + '  Data saved .'}];
                UserService.getAllRoles($scope, $http);
                if (!$scope.chossenRole.roleId) {
                    $scope.chossenRole.roleId = data.id;
                }
            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry' + $scope.chossenRole.roleName + '  Data  not saved .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    this.DeleteRole = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/role/DeleteRole',
            method: "POST",
            data: $scope.chossenRole,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            { var name=  $scope.chossenRole.roleName
                service.reNew($scope);
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + name+ '  Data Deleted .'}];
                UserService.getAllRoles($scope, $http);

            }
            else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + name+ '  Data  not Delete .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };

});

