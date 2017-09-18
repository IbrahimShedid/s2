angular.module('helpdeskApp').service('AgingService', function ($http, uiServices,webService) {
    var service = this;
    this.startAging = function ($scope, $http) {
        if ($scope.ChoosenObj.projectId) {
            service.ProjectAging($scope, $http);
        } else if ($scope.ChoosenObj.productId) {
            var product = {};
            product.productTitle = $scope.ChoosenObj.productTitle;
            product.productId = $scope.ChoosenObj.productId;
            service.productAging($scope, $http, product);
        }
    };
    this.getAllIssues = function ($scope, $http) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/issuelisttype/getAllIssues',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.allIssues = data.result;
        }).error(function (data, status, headers, config) {
        });
    };

    this.ageByDate = function ($scope, $http) {
        //  $http({
        //      url: webService.url+'helpdeskWebServices/webresources/mediaspace/saveMediaSpace',
        //      method: "POST",
        //      data: $scope.choosenMediaSpace,
        //      headers: {'Content-Type': 'application/json'}
        //  }).success(function (data, status, headers, config) {
        //      if (data.result === 'true')
        //      {
        //          $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.choosenMediaSpace.mediaName + ' Media Space Data Saved .'}];
        //          service.getAllMediaSpaces($scope, $http);
        //      } else {
        //          $scope.alerts = [{'type': 'danger', msg: 'sorry  Media Space isnot saved .'}];
        //      }
        //
        //  }).error(function (data, status, headers, config) {
        //  });
    };
    this.ProjectAging = function ($scope, $http) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/project/startAgingProject',
            method: "POST",
            data: $scope.ChoosenObj,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === '-1')
            {
                 $scope.alerts = [{'type': 'danger', msg: 'sorry  ' + $scope.ChoosenObj.projectTitle + ' data wasnot aged because of open issues  .'}];
            } else if (data.result === '0') {
                $scope.alerts = [{'type': 'danger', msg: 'sorry  ' + $scope.ChoosenObj.projectTitle + ' have no issues  .'}];
            } else if (data.result === '1') {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.ChoosenObj.projectTitle + ' data aged successfuly .'}];
            }
            service.getAllIssues($scope, $http);
        }).error(function (data, status, headers, config) {
        });
    };
    this.productAging = function ($scope, $http, product) {
        $http({
            url: webService.url+'helpdeskWebServices/webresources/product/startAgingProduct',
            method: "POST",
            data: product,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === '-1')
            {
                 $scope.alerts = [{'type': 'danger', msg: 'sorry  ' + $scope.ChoosenObj.productTitle + ' data wasnot aged because of open issues  .'}];
            } else if (data.result === '0') {
                $scope.alerts = [{'type': 'danger', msg: 'sorry  ' + $scope.ChoosenObj.productTitle + ' have no issues  .'}];
            } else if (data.result === '1') {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.ChoosenObj.projectTitle + ' data aged successfuly .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
});