angular.module('helpdeskApp').service('CustomersServices', function ($http,uiServices,webService) {
    var x = this;
    this.getAllCustomer = function ($scope, $http) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/user/getallCustomers',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.CustomersList = data;
            uiServices.show();
        }).error(function (data, status, headers, config) {
        });
    };

    this.getCustomerSite = function ($scope, $http, user) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/customersite/getCustomerSiteList',
            method: "POST",
            data: user,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.CustomersSiteList = data;
        }).error(function (data, status, headers, config) {
        });
    }
    this.getCustomerContacts = function ($scope, $http, user) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/customercontact/getCustomerContactsList',
            method: "POST",
            data: user,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.CustomersContactList = data;
        }).error(function (data, status, headers, config) {
        });
    }

    this.saveCustomerSite = function ($scope, $http, customerSite) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/customersite/saveCustomerSiteData',
            method: "POST",
            data: customerSite,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.alerts = [{'type': 'success', msg: 'Customer Site Saved  .'}];
            x.getCustomerSite($scope, $http, $scope.customer);
        }).error(function (data, status, headers, config) {
        });
    }

    this.DeleteCustomerSite = function ($scope, $http, customerSite) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/customersite/DeleteCustomerSiteData',
            method: "POST",
            data: customerSite,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.alerts = [{'type': 'success', msg: 'Customer Site deleted  .'}];
            x.getCustomerSite($scope, $http, $scope.customer);
        }).error(function (data, status, headers, config) {
        });
    }
    this.saveCustomerContact = function ($scope, $http, customerSite) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/customercontact/saveCustomerContactData',
            method: "POST",
            data: customerSite,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.alerts = [{'type': 'success', msg: 'Customer Contact Saved  .'}];
          x.getCustomerContacts($scope, $http, $scope.customer);
        }).error(function (data, status, headers, config) {
        });
    }

    this.DeleteCustomerContact = function ($scope, $http, customerSite) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/customercontact/DeleteCustomerContactData',
            method: "POST",
            data: customerSite,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.alerts = [{'type': 'success', msg: 'Customer Site deleted  .'}];
           x.getCustomerContacts($scope, $http, $scope.customer);
        }).error(function (data, status, headers, config) {
        });
    }
});
