angular.module('helpdeskApp').controller("UsersController", function (UserService, $log, $scope, $http) {
    $scope.ShowedUser = {};
    $scope.ShowedUser.suspended = false;
//    $scope.ShowedUser.manager = {};
 //   $scope.ShowedUser.defaultRole = {};
    $scope.notvalidname = false;
    $scope.GeneralError = false;
    $scope.loading = false;
    $scope.isRequried = true;
    $scope.userIndex ;

    UserService.loadPageService($scope, $http);
    $scope.showUser = function (name , index) {
       $scope.userIndex = index ;
        $scope.alerts = [];
        UserService.showUserData($scope, $http, name);
        
    };
    $scope.CreateNewUser = function () {
        UserService.clearData($scope);
    };
    $scope.checkIfManagerRequired = function (role) {
        if (role.roleName === 'Customer') {
            $scope.isRequried = false;
        } else {
            $scope.isRequried = true;
        }

    //    $scope.ShowedUser.defaultRole = role;
        //        UserService.chooseRoleId($scope, role, $http);
    };
//    $scope.chooseManager = function (manger) {
//        $scope.ShowedUser.manager = manger;
//    };
    $scope.CheckName = function () {
        UserService.CheckNameService($scope, $http);
    };
    $scope.SaveUser = function (User) {

        UserService.UpdateUser($scope, $http, User);
    };
    $scope.DeleteUser = function (user) {
        UserService.suspendUser($scope, $http, user);
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


});


