angular.module('helpdeskApp').controller("SysLokupController", function ($scope, $http, SystemLookupService) {
    SystemLookupService.loadPage($scope, $http);
       $scope.choosenIndex;
       $scope.submitted = true ;
    $scope.showlookUpDetails = function (lookUp,index) {
        $scope.choosenIndex= index;
        $scope.alerts = [];
        $scope.choosenAttribute = lookUp;
        SystemLookupService.getSystemLookupDetails($scope, $http, lookUp);
    };

    $scope.reNew = function () {
        SystemLookupService.reNew($scope);
    };
    $scope.addLookupColor = function () {
        var ColorOption = {
            optionName: $scope.optionName,
            color: $scope.color,
            isDefault: false,
            closesIssue: false,
            optionOrder: $scope.choosenAttribute.lookupOptions.length
        };
        $scope.choosenAttribute.lookupOptions.push(ColorOption);
    };
    $scope.edit = function (index) {
        $scope.showLabel[index] = !$scope.showLabel[index];
    };
    $scope.save = function () {
        if (IsDefaultValidation()) {
            SystemLookupService.saveSystemLookUp($scope, $http);
        } else {
             $scope.alerts = [{'type': 'danger', msg: 'sorry Data  not Saved  you should choose default option .'}];
        }

    };
    $scope.deleteLookupColor = function (lookUpObject, index) {
        
        
//        if (lookUpObject.isDefault || lookUpObject.optionId === $scope.DefaultOption.optionId) {
//            $scope.alerts = [{'type': 'danger', msg: 'sorry Data  not Deleted  you should choose another default option first.'}];
//            return;
//        }
        if (lookUpObject.optionId) {
            lookUpObject.lookup = {};
            lookUpObject.lookup.attributeId = $scope.choosenAttribute.attributeId;
            SystemLookupService.deletelookupOptions($scope, $http, lookUpObject, index);
        } else {
            $scope.choosenAttribute.lookupOptions.splice(index, 1);
        }
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    var move = function (origin, destination) {
//        var temp = $scope.choosenAttribute.lookupOptions[destination].optionOrder;
//        $scope.choosenAttribute.lookupOptions[destination].optionOrder = $scope.choosenAttribute.lookupOptions[origin].optionOrder;
//        $scope.choosenAttribute.lookupOptions[origin].optionOrder = temp;
        angular.forEach($scope.choosenAttribute.lookupOptions, function (value, key) {
            if (value.optionOrder === destination) {
                value.optionOrder = origin;
                return;
            }
            if (value.optionOrder === origin) {
                value.optionOrder = destination;
                return;
            }
        });

//        var temp2 = $scope.choosenAttribute.lookupOptions[destination];
//        $scope.choosenAttribute.lookupOptions[destination] = $scope.choosenAttribute.lookupOptions[origin];
//        $scope.choosenAttribute.lookupOptions[origin] = temp2;
    };
    $scope.moveUp = function (index) {
        move(index, index - 1);
    };
    $scope.moveDown = function (index) {
        move(index, index + 1);
    };
    $scope.ChooseThisAsDefault = function (obj) {
        obj.isDefault = true;
        angular.forEach($scope.choosenAttribute.lookupOptions, function (value, key) {
            if (value.optionId !== obj.optionId)
                value.isDefault = false;
        })
    };
    var IsDefaultValidation = function () {
        var result = false;
        angular.forEach($scope.choosenAttribute.lookupOptions, function (value, key) {
            if (value.isDefault === true)
                result = true;
        })
        return result;
    };
//    $scope.scrollbarConfig = {
//				theme: 'dark-3'
//			}
});

