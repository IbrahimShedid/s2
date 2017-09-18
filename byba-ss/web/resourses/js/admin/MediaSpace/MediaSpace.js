angular.module('helpdeskApp').controller("MediaSpaceController", function (MediaSpaceService, $scope, $http, $timeout) {
    $scope.choosenMediaSpace = {};
    $scope.choosenMediaSpace.isActive = false;
    $scope.ActiveMediaSpace = {};
    $scope.choosenIndex;
    MediaSpaceService.getAllMediaSpaces($scope, $http);
    $scope.showMediaDetails = function (mSpace, index) {
        $scope.choosenIndex = index;
        $scope.alerts = [];
        //    $scope.choosenMediaSpace = mSpace;
        var mediaSpace = {};
        mediaSpace.mediaId = mSpace.mediaId;
        MediaSpaceService.getMediaSpaceDetails($scope, $http, mediaSpace);
    };
    $scope.renewMediaSpaceObject = function () {
        $scope.choosenIndex = '';
        $scope.alerts = [];
        $scope.choosenMediaSpace = {};
        $scope.choosenMediaSpace.isActive = false;
        $scope.mediaSpaceForm.$setPristine();
    };
    $scope.saveMediaSpace = function () {
        if ($scope.choosenMediaSpace.mediaId === $scope.ActiveMediaSpace.mediaId && $scope.choosenMediaSpace.isActive === false) {
            $scope.alerts = [{'type': 'danger', msg: 'One Media Sapce Should be active, you should active another media Space before Deactivating this one.'}];
        } else {
            MediaSpaceService.saveMediaSpace($scope, $http);
        }
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.deleteMediaSpaceObject = function () {
        if ($scope.choosenMediaSpace.mediaId === $scope.ActiveMediaSpace.mediaId) {
            $scope.alerts = [{'type': 'danger', msg: 'One Media Sapce Should be active, you should active another media Space before Deactivating this one.'}];
       //     $scope.closeAlertwithTimeOut();
        } else {
            MediaSpaceService.DeleteMediaSpace($scope, $http);
        }

    };
//    $scope.activateThisMediaSpaceandDeactivateOther = function () {
//        angular.forEach($scope.allMediaSpaces, function (value, key) {
//            if ($scope.choosenMediaSpace.mediaId !== value.mediaId)
//                value.isActive = false;
//        });
//    };
    // modal 
    $scope.ReplaceMediaSpace = function (space) {
        MediaSpaceService.replaceMediaSpace($scope, $http, space);
    };

//    $scope.closeAlertwithTimeOut = function () {
//        $timeout(function () {
//            $scope.alerts = [];
//        }, 3000);
//    };


});