angular.module('helpdeskApp').controller("SystemFeildsController", function ($scope, $http, SystemFeildsService) {
    SystemFeildsService.loadPage($scope, $http);
       $scope.choosenIndex;
    $scope.showlookUpDetails = function (Field,index) {
        $scope.choosenIndex= index;
        $scope.alerts = [];
        $scope.choosenAttribute = Field;
        SystemFeildsService.getSystemFieldDetails($scope, $http, Field);
    };
    $scope.reNew = function () {
        SystemFeildsService.reNew($scope);
    };
     $scope.save = function () {
        SystemFeildsService.saveSystemfield($scope, $http);
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
   
});