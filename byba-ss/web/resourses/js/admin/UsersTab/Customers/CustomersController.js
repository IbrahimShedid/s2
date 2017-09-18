angular.module('helpdeskApp').controller("CustomerController", function (CustomersServices, $scope, $http) {
    $scope.customer = {};
    $scope.CustomersSiteList = [];
    $scope.CustomersContactList = [];
    $scope.choosenIndex;
    CustomersServices.getAllCustomer($scope, $http);

    $scope.showCustomerData = function (user, index) {
        $scope.choosenIndex = index;
        CustomersServices.getCustomerSite($scope, $http, user);
        CustomersServices.getCustomerContacts($scope, $http, user);
        $scope.alerts = [];
        $scope.customer = user;
    };
    $scope.addSite = function () {
        var newSite = {
            customerSiteName: $scope.customerSiteName
        };
        $scope.CustomersSiteList.push(newSite);
    };
    $scope.addContact = function () {
        var contact = {
            contactName: $scope.contactName
        };
        $scope.CustomersContactList.push(contact);
    };
    $scope.SaveCustomerSiteData = function (customersite) {
        if ($scope.customer.userId === undefined) {
            $scope.alerts = [{'type': 'danger', msg: ' you should choose Customer first.'}];
            customersite.showLabel = !customersite.showLabel;
            return;
        }
        var CustomerSite = {};
        CustomerSite.customerSiteId = customersite.customerSiteId;
        CustomerSite.customerSiteName = customersite.customerSiteName;
        CustomerSite.customer = {};
        CustomerSite.customer = $scope.customer;
        CustomersServices.saveCustomerSite($scope, $http, CustomerSite);
        customersite.showLabel = !customersite.showLabel;

    };

    $scope.deleteCustomerSite = function (index) {
        if ($scope.CustomersSiteList[index].customerSiteId === undefined) {
            $scope.CustomersSiteList.splice(index, 1);
            //    $scope.alerts = [{'type': 'success', msg: 'Customer Site deleted  .'}];
            //  return;
        } else {
            var CustomerSite = {};
            CustomerSite.customerSiteId = $scope.CustomersSiteList[index].customerSiteId;
            CustomerSite.customerSiteName = $scope.CustomersSiteList[index].customerSiteName;
            CustomerSite.customer = {};
            CustomerSite.customer = $scope.customer;
            $scope.CustomersSiteList.splice(index, 1);
            CustomersServices.DeleteCustomerSite($scope, $http, CustomerSite);
        }

    };
    // customer contact data
    $scope.SaveCustomerContactData = function (customercontact) {
        if ($scope.customer.userId === undefined) {
            $scope.alerts = [{'type': 'danger', msg: ' you should choose Customer first.'}];
            customercontact.showLabel = !customercontact.showLabel;
            return;
        }
        var CustomerContact = {};
        CustomerContact.contactId = customercontact.contactId;
        CustomerContact.contactName = customercontact.contactName;
        CustomerContact.customer = {};
        CustomerContact.customer = $scope.customer;
        CustomersServices.saveCustomerContact($scope, $http, CustomerContact);
        customercontact.showLabel = !customercontact.showLabel;
    };
    $scope.deleteCustomerContact = function (index) {
        if ($scope.CustomersContactList[index].contactId === undefined) {
            $scope.CustomersContactList.splice(index, 1);
//            $scope.alerts = [{'type': 'success', msg: 'Customer Contact deleted  .'}];
//            return;
        } else {
            var CustomerContact = {};
            CustomerContact.contactId = $scope.CustomersContactList[index].contactId;
            CustomerContact.contactName = $scope.CustomersContactList[index].contactName;
            CustomerContact.customer = {};
            CustomerContact.customer = $scope.customer;
            CustomersServices.DeleteCustomerContact($scope, $http, CustomerContact);
        }
    };
    //Add Remove Row customerContacts /
    $scope.edit = function (index) {
        index.showLabel = !index.showLabel;
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.showError = function () {
        $scope.alerts = [{'type': 'warning', msg: ' you should choose Customer first.'}];
    };
    $scope.NewCustomer = function () {
        $scope.customer = {};
        $scope.CustomersSiteList = [];
        $scope.CustomersContactList = [];
        $scope.customerForm.$setPristine();
        $scope.alerts = [];
         $scope.choosenIndex ='';
    };

});

