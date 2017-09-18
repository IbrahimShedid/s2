angular.module('helpdeskApp').service('MediaSpaceService', function ($http, uiServices, webService) {
    var service = this;
    this.getAllMediaSpaces = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/mediaspace/getAllMediaSpaces',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.allMediaSpaces = data;
            uiServices.show();
            service.getActiveMediaSpace($scope, $http);
        }).error(function (data, status, headers, config) {
        });
    };
    this.getMediaSpaceDetails = function ($scope, $http, mediaSpace) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/mediaspace/getMediaSpaceDetails',
            method: "POST",
            data: mediaSpace,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.choosenMediaSpace = data;
        }).error(function (data, status, headers, config) {
        });
    };
    this.getActiveMediaSpace = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/mediaspace/getActiveMediaSpace',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.ActiveMediaSpace = data;
        }).error(function (data, status, headers, config) {
        });
    };
    this.saveMediaSpace = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/mediaspace/saveMediaSpace',
            method: "POST",
            data: $scope.choosenMediaSpace,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.choosenMediaSpace.mediaName + ' Media Space Data Saved .'}];
                if (!$scope.choosenMediaSpace.mediaId) {
                    $scope.choosenMediaSpace.mediaId = data.id;
                }
                service.getAllMediaSpaces($scope, $http);
            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry  Media Space isnot saved .'}];
            }

        }).error(function (data, status, headers, config) {
        });
    };

    this.DeleteMediaSpace = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/mediaspace/DeleteMediaSpace',
            method: "POST",
            data: $scope.choosenMediaSpace,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + $scope.choosenMediaSpace.mediaName + ' Media Space Deleted .'}];
                service.getAllMediaSpaces($scope, $http);
                $scope.renewMediaSpaceObject();
            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry  Media Space isnot Deleted  .'}];
            }

        }).error(function (data, status, headers, config) {
        });
    };
    this.replaceMediaSpace = function ($scope, $http, space) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/mediaspace/replaceMediaSpace',
            method: "POST",
            data: [$scope.choosenMediaSpace, space],
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === '1')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! attachment from ' + $scope.choosenMediaSpace.mediaName + ' Media Space Moved to ' + space.mediaName}];
                service.getAllMediaSpaces($scope, $http);
                //    $scope.renewMediaSpaceObject();
            } else if (data.result === '0') {
                $scope.alerts = [{'type': 'danger', msg: 'sorry  Media Space was not Repalaced  .'}];
            } else {

                $scope.alerts = [{'type': 'info', msg: 'there were no Media Space to be  Repalaced  .'}];
            }
            $("#reopen_issue").modal('hide');
        }).error(function (data, status, headers, config) {
        });
    };
//    this.checkIsActiveValidation = function ($scope) {
//        var result = false;
//        if ($scope.choosenMediaSpace.mediaId === $scope.ActiveMediaSpace.mediaId) {
//
//        } else {
//            
//        }
//        return result;
//    };
//    this.getActiveMediaSpace = function ($scope) {
//
//        angular.forEach($scope.allMediaSpaces, function (value, key) {
//            if (value.isActive) {
//                $scope.ActiveMediaSpace = value;
//            }
//        })
//    };
    this.checkActiveMedia = function ($scope) {
        var result = true;
        if ($scope.choosenMediaSpace.mediaId === $scope.ActiveMediaSpace.mediaId) {
            $scope.alerts = [{'type': 'danger', msg: 'this Media Space Is the Active one You sholud Choose another active media space first  .'}];
            result = false;
        }
        return result;
    };
});
