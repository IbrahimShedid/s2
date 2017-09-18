angular.module('helpdeskApp').controller("CustomLookupController", function ($scope, $http, CustomLookupService) {
    CustomLookupService.loadPage($scope, $http);
    $scope.choosenIndex;
    $scope.submitted = true;
    $scope.showlookUpDetails = function (lookUp, index) {
        $scope.choosenIndex = index;
        $scope.alerts = [];
        $scope.choosenAttribute = lookUp;
        CustomLookupService.loadAttributeDetails($scope, $http, lookUp);
    };

    $scope.reNew = function () {
        CustomLookupService.reNew($scope);
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
            CustomLookupService.saveSystemLookUp($scope, $http);
        } else {
            $scope.alerts = [{'type': 'danger', msg: 'Sorry Data not Saved, you should choose options for this custom type and one of them should be  default .'}];
        }
    };
    $scope.deleteLookupColor = function (lookUpObject, index) {
        if (lookUpObject.optionId) {
            lookUpObject.lookup = {};
            lookUpObject.lookup.attributeId = $scope.choosenAttribute.attributeId;
            CustomLookupService.deletelookupOptions($scope, $http, lookUpObject, index);
        } else {
            $scope.choosenAttribute.lookupOptions.splice(index, 1);
        }
    };
    $scope.Delete = function () {
        if (!$scope.choosenAttribute.attributeId) {
            $scope.alerts = [{'type': 'danger', msg: 'sorry ' + $scope.choosenAttribute.attributeName + '  Should Saved First  .'}];
        } else {
            CustomLookupService.DeleteCustomAttribute($scope, $http);
        }
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    var move = function (origin, destination) {
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
        });
    };
    var IsDefaultValidation = function () {
        var result = false;
        angular.forEach($scope.choosenAttribute.lookupOptions, function (value, key) {
            if (value.isDefault === true)
                result = true;
        });
        return result;
    };


    $scope.showError = function () {
        $scope.SysLokuForm.$pristine = false
        var lenghtt = $scope.choosenAttribute.lookupOptions.length;
//        for (var x = 0; x < lenght; x++) {
        //          var varname = 'SysLokuForm.repeatform'+x ;
//            
//            
//            $scope.SysLokuForm.varname.valueof().$pristine = false ;
//            console.log(varname.valueOf() );
//            console.log($scope.SysLokuForm.["repeatform" + x ] );
        //           var xyz = '' ;
        //       }

        //   var xforms = angular.element.find("[name='repeatForm']");
        for (var x = 0; x < lenghtt; x++) {
//            xforms[x].$pristine = false ;
      //      var varname = 'SysLokuForm.repeatform' + x;
            var xforms = angular.element.find("[name='repeatForm"+x+"']");
            console.log(xforms);
            xforms.$dirty = true ;
   //         var xforms = angular.element.find("[name='varname.valueOf()']");
    //        console.log(xforms);
        }
        // console.log(x);

    };
});