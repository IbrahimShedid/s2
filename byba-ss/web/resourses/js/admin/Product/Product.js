angular.module('helpdeskApp').controller('ProductController', function (ProductServices, $scope, $http) {
    $scope.choosenProduct = {};
    $scope.deletedVersions = [];
    $scope.choosenProduct.productVersions = [];
    $scope.choosenIndex;
    $scope.submitted = true;
    ProductServices.loadProductPage($scope, $http);

    $scope.showProductVersions = function (product, index) {
        $scope.choosenIndex=index;
        $scope.alerts = [];
        $scope.choosenProduct = product;
        ProductServices.getProductVersions($scope, $http, product);
    };

    $scope.addNewVersion = function () {
        var productVersion = {
            versionCode: $scope.versionCode,
            versionOrder: $scope.choosenProduct.productVersions.length + 1,
            versionEnabled: true
        };
        $scope.choosenProduct.productVersions.push(productVersion);
    };
    $scope.moveUp = function (index) {
        ProductServices.move($scope, index, index - 1);
    };
    $scope.moveDown = function (index) {
        ProductServices.move($scope, index, index + 1);
    };
    $scope.edit = function (index) {
        index.showLabel = !index.showLabel;
    };
    $scope.saveVersionChanges = function (index) {
        index.showLabel = !index.showLabel;
//        if ($scope.choosenProduct.productId === undefined) {
//            return;
//        }
//        $scope.choosenProduct.productVersions = [];
//        ProductServices.saveVersionChanges($scope, index);
    };

    $scope.makeNewProduct = function () {
  
        $scope.choosenIndex =''; 
        $scope.submitted = true;
        $scope.alerts = [];
        $scope.deletedVersions = [];
        $scope.choosenProduct = {};
        $scope.choosenProduct.productVersions = [];
        $scope.versionCodeForm.$setPristine();
//        $scope.repeatForm.$setPristine();
    };

//no need for that method now

//    $scope.pickThatManager = function (manager) {
//        $scope.choosenProduct.productManager = manager;
//    };

    $scope.saveNewProduct = function () {
        for (var i = 0; i < $scope.choosenProduct.productVersions.length; i++) {
            delete   $scope.choosenProduct.productVersions[i].showLabel;
        }
        $scope.choosenProduct.productVersions = $scope.choosenProduct.productVersions.concat($scope.deletedVersions)
        ProductServices.saveNewProduct($scope, $http, $scope.choosenProduct);
    };
    $scope.deleteVersion = function (index, productVersion) {
        productVersion.versionEnabled = false;
        if (productVersion.versionId) {
            $scope.deletedVersions.push(productVersion);
        }
        $scope.choosenProduct.productVersions.splice(index, 1);

        while (index < $scope.choosenProduct.productVersions.length)
        {
            $scope.choosenProduct.productVersions[index].versionOrder -= 1;
            index++;
        }
//        if ($scope.choosenProduct.productId === undefined) {
//            $scope.choosenProduct.productVersions.splice(index, 1);
//        }
        // for immediate deleting the version and rearrange the table with the new sort order 
//        else {
//            ProductServices.deleteProductVersion($scope, index);
//            index += 1;
//            while (index < $scope.choosenProduct.productVersions.length) {
//                delete   $scope.choosenProduct.productVersions[index].showLabel;
//                $scope.choosenProduct.productVersions[index].versionOrder -= 1;
//                $scope.choosenProduct.productVersions[index].product = {};
//                $scope.choosenProduct.productVersions[index].product.productId = $scope.choosenProduct.productId;
//                ProductServices.updateProductVersionSortOrders($scope, $http, $scope.choosenProduct.productVersions[index]);
//                index += 1;
//            }
//            $scope.showProductVersions($scope.choosenProduct);
//        }
    };
    $scope.deleteProduct = function () {
        var productToDelete = {};
        productToDelete.productId = $scope.choosenProduct.productId;
        productToDelete.productTitle = $scope.choosenProduct.productTitle;
        ProductServices.deleteProduct($scope, $http, productToDelete);

    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
});

