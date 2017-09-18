angular.module('helpdeskApp').service('FeedbackServices', function ($http, uiServices, webService) {
    var service = this;
    this.getAllFeedBack = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/feedback/getAllFeedBack',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
           service.ConvertedDateFromDataBase(data);
            $scope.feedBacks = data;
        }).error(function (data, status, headers, config) {
        });
    };

    this.ConvertedDateFromDataBase = function (data) {

        angular.forEach(data, function (value, key) {
            if (value.creationDate) {
                value.creationDate = new Date(value.creationDate).toDateString();//	Sun Dec 27 2009
   //           value.creationDate = new Date(value.creationDate).toString();//Sun Dec 27 2009 11:02:56 GMT+0200 (Egypt Standard Time)
  //              value.creationDate = new Date(value.creationDate).toLocaleString(); //12/27/2009, 11:02:56 AM
//                value.creationDate = new Date(value.creationDate).toISOString(); //2009-12-27T09:02:56.157Z

            }
        });
    };

});