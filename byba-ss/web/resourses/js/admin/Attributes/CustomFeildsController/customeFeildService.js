
angular.module('helpdeskApp').service('customeFeildService', function ($http, uiServices, webService) {
    var service = this;
    this.loadPage = function ($scope, $http) {
        service.getAllCustomFields($scope, $http);
        service.reNew($scope);
    };
    this.reNew = function ($scope) {
        $scope.choosenAttribute = {};
        $scope.choosenAttribute.isKbAttribute = false;
        $scope.choosenAttribute.isRequired = false;
        $scope.choosenAttribute.isCustom = true;
        $scope.showLabel = [];
        if ($scope.SysLokuForm)
            $scope.SysLokuForm.$setPristine();
        $scope.alerts = [];
        $scope.choosenIndex ='';
    };
    this.getAllCustomFields = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/attribute/getAllCustomFields',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.AllSystemFields = data;
            uiServices.show();
        }).error(function (data, status, headers, config) {
        });
    };

    this.getcustomeFieldDetails = function ($scope, $http, Field) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/attribute/getSystemLookupDetails',
            method: "POST",
            data: Field,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.choosenAttribute = data;

        }).error(function (data, status, headers, config) {
        });
    };
    this.saveCustomfield = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/attribute/saveSystemLookUp',
            method: "POST",
            data: $scope.choosenAttribute,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.choosenAttribute.attributeName + '  Data saved .'}];
                if (!$scope.choosenAttribute.attributeId) {
                    //   service.loadPage($scope, $http);
                    $scope.choosenAttribute.attributeId = data.id;
                }
                var Field = {};
                Field.attributeId = $scope.choosenAttribute.attributeId;
                service.getAllCustomFields($scope, $http);
                service.getcustomeFieldDetails($scope, $http, Field);


            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + $scope.choosenAttribute.attributeName + '  Data  not saved .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    this.DeleteCustomfield = function ($scope, $http, attribute) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/attribute/DeleteCustomfield',
            method: "POST",
            data: $scope.choosenAttribute,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.choosenAttribute.attributeName + '  Data Deleted .'}];
                service.loadPage($scope, $http);
            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry' + $scope.choosenAttribute.attributeName + '  Data  not Delete .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
});