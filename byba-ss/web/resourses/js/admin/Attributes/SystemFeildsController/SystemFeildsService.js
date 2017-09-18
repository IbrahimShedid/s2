angular.module('helpdeskApp').service('SystemFeildsService', function ($http,uiServices,webService) {
    var service = this;
    this.loadPage = function ($scope, $http) {
        service.getAllSystemFields($scope, $http);
        service.reNew($scope);
    };
    this.reNew = function ($scope) {
        $scope.choosenAttribute = {};
        $scope.choosenAttribute.isKbAttribute = false;
        $scope.choosenAttribute.isRequired = false;
        $scope.choosenAttribute.isCustom = false;
        $scope.showLabel = [];
        $scope.alerts =[];
        if ($scope.SysLokuForm )
            $scope.SysLokuForm.$setPristine();
        $scope.alerts = [];
         $scope.choosenIndex ='';
    };
    this.getAllSystemFields = function ($scope, $http) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/attribute/getAllSystemFields',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.AllSystemFields = data;
                 uiServices.show();
        }).error(function (data, status, headers, config) {
        });
    };

    this.getSystemFieldDetails = function ($scope, $http, Field) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/attribute/getSystemLookupDetails',
            method: "POST",
            data: Field,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.choosenAttribute = data;
        }).error(function (data, status, headers, config) {
        });
    };
    this.saveSystemfield = function ($scope, $http) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/attribute/saveSystemLookUp',
            method: "POST",
            data: $scope.choosenAttribute,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.choosenAttribute.attributeName + '  Data saved .'}];
                if (!$scope.choosenAttribute.attributeId) {
                     $scope.choosenAttribute.attributeId = data.id;
                } 
                    var Field = {};
                    Field.attributeId = $scope.choosenAttribute.attributeId;
                    service.getAllSystemFields($scope, $http);
                    service.getSystemFieldDetails($scope, $http, Field);

            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + $scope.choosenAttribute.attributeName + '  Data  not saved .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
});