angular.module('helpdeskApp').controller("PrivilagesController", function (UserService, PrivilagesService, $log, $scope, $http) {
    $scope.choosenRole = {};
    $scope.choosenRole.roleAttributePrivileges = [];
    UserService.getAllRoles($scope, $http);
    $scope.sortType = 'attribute.attributeName'; // set the default sort type
    $scope.sortReverse = false;
    $scope.hiddenreverse = false;
    $scope.reset = false;
    $scope.loading = false;
//    $scope.promise = null;
//    $scope.myPromise = $http.get('resourses/views/layout/custom-template.html');
 //   
    
    $scope.chooseRoleAttributePrivilages = function (role) {
        $scope.reset = false;
        $scope.loading = true;
        //   $scope.myPromise = 
        $scope.alerts = [];
 //       $scope.choosenRole = role;
        PrivilagesService.getRoleAttributePrivilages($scope, $http, role);
    };
    $scope.ReadFieldSort = function () {
        PrivilagesService.sortReadFeiled($scope);
    };
    $scope.saveRolesAttributePrivilages = function () {
        $scope.reset = false;
        $scope.loading = true;
        PrivilagesService.saveNewChanges($scope, $http);
    };
    $scope.RestToDefault = function () {
        PrivilagesService.RestToDefault($scope);
        $scope.reset = true;
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.updatePrivilage = function () {
//        $scope.loading = true;
//        var PrivilageToSave = {};
//        PrivilageToSave.privilege = {};
//        PrivilageToSave.roleAttributeId = role.roleAttributeId;
//        PrivilageToSave.privilege.privilegeId = role.privilege.privilegeId
//        PrivilagesService.updatePrivilageByAttPriID($scope, $http, PrivilageToSave, role);
        $scope.reset = true;

    };

    $scope.showError = function () {
        $scope.alerts = [{'type': 'warning', msg: 'choose Role first .'}];
    };
});

