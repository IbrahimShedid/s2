angular.module('helpdeskApp').controller("FeedbackController", function ($scope, $http, FeedbackServices) {
    FeedbackServices.getAllFeedBack($scope, $http);
    $scope.BindDataToModel = function (obj) {
        $scope.ModelObj = obj;
    };
});