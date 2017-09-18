angular.module('helpdeskApp').controller("AgainIssuesController", function ($scope, $http, AgingService, ProjectServices, ProductServices) {
    //  $scope.updatedProduct = true;
    $scope.allIssues = '';
    ProjectServices.getAllProjects($scope, $http);
    ProductServices.getAllProducts($scope, $http);
    AgingService.getAllIssues($scope, $http);
    $scope.ProjectORproductChoosen = false;
    $scope.choosenProjectIndex;
    $scope.choosenProductIndex;
    $scope.chooseThisProduct = function (obj, index) {
        $scope.choosenProjectIndex = '';
        $scope.choosenProductIndex = index;
        $scope.ProjectORproductChoosen = true;
        $scope.ChoosenObj = obj;
        $scope.minDate = '';
        $scope.maxDate = '';
    };
    $scope.chooseThisProject = function (obj, index) {
        $scope.choosenProjectIndex = index;
        $scope.choosenProductIndex = '';
        $scope.ProjectORproductChoosen = true;
        $scope.ChoosenObj = obj;
        $scope.minDate = '';
        $scope.maxDate = '';
    };
    $scope.startAging = function () {
        if ($scope.ProjectORproductChoosen) {
            AgingService.startAging($scope, $http);
        } else if (true) {
            //  AgingService.ageByDate($scope, $http);
        }

    };
    $scope.ResetChoosenOBj = function () {
        $scope.choosenProjectIndex = '';
        $scope.choosenProductIndex = '';
        $scope.ChoosenObj = {};
    };
    //Datepicker
    $scope.dates = {
        today: moment.tz('UTC').hour(12).startOf('h'), //12:00 UTC, today.
        minDate: moment.tz('UTC').add(-4, 'd'), //12:00 UTC, four days ago.
        maxDate: moment.tz('UTC').add(4, 'd'), //12:00 UTC, in four days.

    };
    $scope.views = ['year', 'month', 'date'];

    $scope.options = {
        view: 'month',
        format: 'DD MMM YYYY',
        maxView: 'year',
        minView: 'date',
    };
    $scope.formats = [
        "MMMM YYYY",
        "DD MMM YYYY",
        "ddd MMM DD YYYY"
    ];
    //   $scope.minDate = $scope.dates.minDate;
    $scope.maxDate = $scope.dates.maxDate;
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };


});
