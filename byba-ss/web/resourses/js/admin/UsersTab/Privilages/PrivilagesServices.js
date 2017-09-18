/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('helpdeskApp').service('PrivilagesService', function ($http,webService) {
    var x = this;
    this.getRoleAttributePrivilages = function ($scope, $http, value) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/attributesprivilages/getRoleAttributePrivilages',
            method: "POST",
            data: value,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.loading = false;
        //    $scope.choosenRole = value;
            $scope.choosenRole.roleAttributePrivileges = data;
        }).error(function (data, status, headers, config) {
        });
    };


    this.sortReadFeiled = function ($scope) {
        var filtered = [];
        if ($scope.hiddenreverse === false) {
            getAllfiledswithReadField($scope, filtered);
            getAllFieldsWithoutReadField($scope, filtered);
            $scope.hiddenreverse = true;

        } else {
            getAllFieldsWithoutReadField($scope, filtered);
            getAllfiledswithReadField($scope, filtered);
            $scope.hiddenreverse = false;

        }
        $scope.choosenRole.roleAttributePrivileges = filtered;
        $scope.sortType = '';

    };
    getAllfiledswithReadField = function ($scope, array) {
        angular.forEach($scope.choosenRole.roleAttributePrivileges, function (value, key) {
            if (value.privilege.privilegeId === 2) {
                array.push(value);
            }

        })
    }
    getAllFieldsWithoutReadField = function ($scope, array) {
        angular.forEach($scope.choosenRole.roleAttributePrivileges, function (value, key) {
            if (value.privilege.privilegeId !== 2) {
                array.push(value);
            }
        })
    }
//    addRoleToAttributesPrivilages = function ($scope) {
//        var roleObject = {"roleId":$scope.choosenRole.roleId ,"roleName":$scope.choosenRole.roleName};
//        angular.forEach($scope.choosenRole.roleAttributePrivileges, function (value, key) {
//            value.role = roleObject ;
//
//        })
//    }
    this.saveNewChanges = function ($scope, $http) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/attributesprivilages/SaveRoleAttributePrivilages',
            method: "POST",
            data: $scope.choosenRole,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.loading = false;
            $scope.alerts = [{'type': 'success', msg: 'changes saved to ' + $scope.choosenRole.roleName + ' Role .'}];
            x.getRoleAttributePrivilages($scope, $http, $scope.choosenRole);
        }).error(function (data, status, headers, config) {

        });
    }
    this.RestToDefault = function ($scope) {
        angular.forEach($scope.choosenRole.roleAttributePrivileges, function (value, key) {
            if (value.privilege.privilegeId !== 2) {
                value.privilege.privilegeId = 2;
            }

        })
    }
//    this.updatePrivilageByAttPriID = function ($scope, $http, object, role) {
//        $http({
//            url: webService.url+'helpdeskWebServices/webresources/attributesprivilages/SavePrivilages',
//            method: "POST",
//            data: object,
//            headers: {'Content-Type': 'application/json'}
//        }).success(function (data, status, headers, config) {
//            $scope.loading = false;
//            $scope.alerts = [{'type': 'success', msg: 'field ( ' + role.attribute.attributeName +
//                            ' ) in Role ( ' + $scope.choosenRole.roleName + ' ) altered successfully'}];
//            x.getRoleAttributePrivilages($scope, $http, $scope.choosenRole);
//        }).error(function (data, status, headers, config) {
//
//        });
//    }
});

