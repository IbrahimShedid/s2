
angular.module('helpdeskApp').service('CustomLookupService', function ($http, uiServices, webService) {
    var service = this;
    this.loadPage = function ($scope, $http) {
        service.getAllCustomLookUps($scope, $http);
        service.reNew($scope);
    };
    this.reNew = function ($scope) {
        $scope.choosenAttribute = {};
        $scope.choosenAttribute.isKbAttribute = false;
        $scope.choosenAttribute.isRequired = false;
        $scope.choosenAttribute.closeParentObj = false;
        $scope.choosenAttribute.lookupOptions = [];
        $scope.choosenAttribute.isCustom = true;
        $scope.showLabel = [];
        if ($scope.SysLokuForm)
            $scope.SysLokuForm.$setPristine();
        $scope.alerts = [];
         $scope.choosenIndex ='';
         $scope.submitted = true;
    };
    this.loadAttributeDetails = function ($scope, $http, lookUp) {
        service.getCustomLookupDetails($scope, $http, lookUp);
    };
    this.getAllCustomLookUps = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/attribute/getAllCustomLookUps',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.AllCustomeLookUps = data;
            uiServices.show();
        }).error(function (data, status, headers, config) {
        });
    };

    this.getCustomLookupDetails = function ($scope, $http, lookUp) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/attribute/getSystemLookupDetails',
            method: "POST",
            data: lookUp,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.choosenAttribute = data;
            service.getCustomLookUpOptions($scope, $http, lookUp);
            uiServices.show2();
        }).error(function (data, status, headers, config) {
        });
    };
    this.getCustomLookUpOptions = function ($scope, $http, lookUp) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/attribute/getLookupOptions',
            method: "POST",
            data: lookUp,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.choosenAttribute.lookupOptions = [];
            $scope.choosenAttribute.lookupOptions = data;
            service.getDefaultOption(data, $scope);
            uiServices.show2();
        }).error(function (data, status, headers, config) {
        });
    };
    this.saveSystemLookUp = function ($scope, $http) {
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
                    $scope.choosenAttribute.attributeId = data.id;
                }
                var lookUp = {};
                lookUp.attributeId = $scope.choosenAttribute.attributeId;
                service.getAllCustomLookUps($scope, $http);
                $scope.showLabel = [];
                service.loadAttributeDetails($scope, $http, lookUp);

            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + $scope.choosenAttribute.attributeName + '  Data  not saved .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    this.deletelookupOptions = function ($scope, $http, lookUpObject, index) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/lookupoption/deletelookupOptions',
            method: "POST",
            data: lookUpObject,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + lookUpObject.optionName + '  Data Deleted .'}];
                $scope.choosenAttribute.lookupOptions.splice(index, 1);
            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + lookUpObject.optionName + '  Data  not Deleted .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    this.DeleteCustomAttribute = function ($scope, $http, attribute) {
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
                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + $scope.choosenAttribute.attributeName + '  Data  not Delete .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    this.getDefaultOption = function (data, $scope) {
        angular.forEach(data, function (value, key) {
            if (value.isDefault === true) {
                $scope.DefaultOption = {};
                $scope.DefaultOption = value;
                return;
            }
        });
    };
});


