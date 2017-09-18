angular.module('helpdeskApp').service('ProductServices', function ($http, uiServices, webService) {
    var service = this;
    this.loadProductPage = function ($scope, $http) {
        service.getAllProductManagers($scope, $http);
        service.getAllProducts($scope, $http);
    };
    this.move = function ($scope, origin, destination) {
        //   if ($scope.choosenProduct.productId === undefined) {

        var temp = $scope.choosenProduct.productVersions[destination].versionOrder;
        $scope.choosenProduct.productVersions[destination].versionOrder = $scope.choosenProduct.productVersions[origin].versionOrder;
        $scope.choosenProduct.productVersions[origin].versionOrder = temp;

        var temp2 = $scope.choosenProduct.productVersions[destination];
        $scope.choosenProduct.productVersions[destination] = $scope.choosenProduct.productVersions[origin];
        $scope.choosenProduct.productVersions[origin] = temp2;
        //   return;
        //   }
    };
    this.getAllProductManagers = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/user/getProductManagers',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.allManagers = data;
        }).error(function (data, status, headers, config) {
        });

    };
    this.getAllProducts = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/product/getAllProduct',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.allProducts = data;
            uiServices.show();
        }).error(function (data, status, headers, config) {
        });
    };
    this.deleteProduct = function ($scope, $http, productToDelete) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/product/deleteProduct',
            method: "POST",
            data: productToDelete,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.makeNewProduct();
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + productToDelete.productTitle + '  Data Deleted .'}];
                service.getAllProducts($scope, $http);
            }
            else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + productToDelete.productTitle + '  Data  not Delete .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };

    this.saveNewProduct = function ($scope, $http, product) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/product/saveNewProduct',
            method: "POST",
            data: product,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.alerts = [{'type': 'success', msg: 'New Product Saved Successfully.'}];
            if (data.result === 'true')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.choosenProduct.productTitle + '  Data Saved Successfully .'}];
                service.getAllProducts($scope, $http);
                $scope.deletedVersions = [];
                if (!$scope.choosenProduct.productId) {
                    $scope.choosenProduct.productId = data.id;
                }
                service.getProductVersions($scope, $http, $scope.choosenProduct);
            }
            else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + $scope.choosenProduct.productTitle + '  Data  not Saved .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    this.getProductVersions = function ($scope, $http, product) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/productversion/getProductVersions',
            method: "POST",
            data: product,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.choosenProduct.productVersions = data;
        }).error(function (data, status, headers, config) {
        });
    };


//
//    this.UpdateChoosenProduct = function ($scope) {
//        if (!$scope.choosenProduct.productId) {
//            angular.forEach($scope.allProducts, function (value, key) {
//                if (value.productTitle === $scope.choosenProduct.productTitle) {
//                    $scope.choosenProduct.productId = value.productId;
//                    service.getProductVersions($scope, $http, $scope.choosenProduct);
//                }
//            });
//
//        }
//    };


    //  for immediate update of the sort order 
//        var temp = $scope.choosenProduct.productVersions[destination].versionOrder;
//        $scope.choosenProduct.productVersions[destination].versionOrder = $scope.choosenProduct.productVersions[origin].versionOrder;
//        $scope.choosenProduct.productVersions[origin].versionOrder = temp;
//
//        service.updateProductVersionSortOrder($scope, $scope.choosenProduct.productVersions[destination],
//                $scope.choosenProduct.productVersions[origin]);
//        var temp2 = $scope.choosenProduct.productVersions[destination];
//        $scope.choosenProduct.productVersions[destination] = $scope.choosenProduct.productVersions[origin];
//        $scope.choosenProduct.productVersions[origin] = temp2;
//    this.updateProductVersionSortOrder = function ($scope, destination, origin) {
//        var newDestinationObj = service.PrepareProductVersionToSendToWebService($scope, destination);
//        var neworiginObj = service.PrepareProductVersionToSendToWebService($scope, origin);
//        service.updateProductVersionSortOrders($scope, $http, newDestinationObj);
//        service.updateProductVersionSortOrders($scope, $http, neworiginObj);
//    };
//    this.saveVersionChanges = function ($scope, ProductVersion) {
//        var newObj = service.PrepareProductVersionToSendToWebService($scope, ProductVersion);
//        service.updateProductVersionSortOrders($scope, $http, newObj);
//        service.getProductVersions($scope, $http, newObj.product);
//    };
//    this.deleteProductVersion = function ($scope, index) {
//        var newObj = service.PrepareProductVersionToSendToWebService($scope, $scope.choosenProduct.productVersions[index]);
//        service.deleteProductVersions($scope, $http, newObj);
//        //    service.getProductVersions($scope, $http, newObj.product);
//    };

//    this.PrepareProductVersionToSendToWebService = function ($scope, oldObject) {
//        var newobject = {};
//        newobject.product = {};
//        newobject.product.productId = $scope.choosenProduct.productId;
//        newobject.versionId = oldObject.versionId;
//        newobject.versionCode = oldObject.versionCode;
//        newobject.versionOrder = oldObject.versionOrder;
//        return  newobject;
//    };

//    this.updateProductVersionSortOrders = function ($scope, $http, productVersion) {
//        $http({
//            url: webService.url+'helpdeskWebServices/webresources/productversion/updateProductVersionSortOrders',
//            method: "POST",
//            data: productVersion,
//            headers: {'Content-Type': 'application/json'}
//        }).success(function (data, status, headers, config) {
//
//        }).error(function (data, status, headers, config) {
//        });
//    };
//    this.deleteProductVersions = function ($scope, $http, productVersion) {
//        $http({
//            url: webService.url+'helpdeskWebServices/webresources/productversion/deleteProductVersion',
//            method: "POST",
//            data: productVersion,
//            headers: {'Content-Type': 'application/json'}
//        }).success(function (data, status, headers, config) {
//            if (data.result === 'true')
//            {
//                $scope.alerts = [{'type': 'success', msg: 'Done! ' + productVersion.versionCode + '  Data ProductVersions Deleted Successfully.'}];
//            }
//            else {
//                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + productVersion.versionCode + '  Data ProductVersions not Delete .'}];
//            }
//        }).error(function (data, status, headers, config) {
//        });
//    };

});