angular.module('helpdeskApp').controller("SystemRolesController", function (RoleService, $scope, $http) {
    $scope.SystemRoles = [];
    $scope.chossenRole = {};
    $scope.chossenRole.assignedUsers = [];
    $scope.chossenRole.linkerRoles = [];
    $scope.roleIndex;
   
//    $scope.chossenRole.roleProfile = {};
    $scope.add = false;
    // to be replaced 
    $scope.creator = {"userId": 1, "username": "admin"};
    RoleService.loadRolePage($scope, $http);
    $scope.showRoleData = function (role, index) {
        $scope.roleIndex = index;
        $scope.alerts = [];
        RoleService.showMemberData($scope, $http, role);
    };
    $scope.showAvilableRolesToLink = function () {
        $scope.add = true;
        $scope.avilableRoles = [];
        $scope.avilableRoles = $scope.avilableRoles.concat($scope.SystemRoles);
        angular.forEach($scope.avilableRoles, function (value1, key1) {
            angular.forEach($scope.chossenRole.linkerRoles, function (value, key) {
                if (value1.roleId === value.roleId) {
                    $scope.avilableRoles.splice(key1, 1);
                    return;
                }
            });
        });
    };
    $scope.removeLink = function () {
        $scope.add = false;
        $scope.avilableRoles = [];
        $scope.avilableRoles = $scope.avilableRoles.concat($scope.chossenRole.linkerRoles);
    };
    $scope.addToLink = function (role) {
        angular.forEach($scope.avilableRoles, function (value, key) {
            if (role.roleId === value.roleId) {
                $scope.avilableRoles.splice(key, 1);
                return;
            }
        });
        $scope.chossenRole.linkerRoles.push(role);
    };
    $scope.removeThisLink = function (index) {
        $scope.avilableRoles.splice(index, 1);
        $scope.chossenRole.linkerRoles.splice(index, 1);
    };


//    $scope.chooseProfile = function (profile) {
//        $scope.chossenRole.roleProfile = profile;
//    };
    $scope.makeNewRole = function () {
        RoleService.reNew($scope);
    };
    $scope.saveNewRole = function () {
        RoleService.SaveRole($scope, $http);
    };
    $scope.deleteRole = function () {
        if ($scope.chossenRole.assignedUsers.length > 0) {
            $scope.alerts = [{'type': 'danger', msg: 'sorry ' + $scope.chossenRole.roleName + '  canot be deleted it assigned for users as default role.'}];
            return;
        } else {
            RoleService.DeleteRole($scope, $http);
        }

    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});

