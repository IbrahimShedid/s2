angular.module('helpdeskApp').controller("CustomFeildsController", function ($scope, $http, customeFeildService) {
    customeFeildService.loadPage($scope, $http);
    $scope.choosenIndex ;
    $scope.showFieldDetails = function (Field,index) {
        $scope.choosenIndex= index;
        $scope.alerts = [];
        $scope.choosenAttribute = Field;
        customeFeildService.getcustomeFieldDetails($scope, $http, Field);
    };
    $scope.reNew = function () {
        $scope.alerts = [];
        customeFeildService.reNew($scope);
    };
    $scope.save = function () {
        customeFeildService.saveCustomfield($scope, $http);
    };
    $scope.Delete = function () {
        if (!$scope.choosenAttribute.attributeId) {
            $scope.alerts = [{'type': 'danger', msg: 'sorry ' + $scope.choosenAttribute.attributeName + '  Should Saved First  .'}];
        } else {
           
            customeFeildService.DeleteCustomfield($scope, $http);
        }

    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

});