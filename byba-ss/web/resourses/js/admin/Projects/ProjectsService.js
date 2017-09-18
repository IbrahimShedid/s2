angular.module('helpdeskApp').service('ProjectServices', function ($http, uiServices, webService) {
    var Service = this;
    this.load = function ($scope, $http, $compile) {
        Service.getAllProjectAttributes($scope, $http, $compile);
        Service.getAllProjects($scope, $http);
    };
    this.getProjectInformations = function ($scope, $http, project) {
        Service.getAllProjectMembersRoles($scope, $http, project);
        Service.getLookupOtionsByProject($scope, $http, project);
        Service.getFieldsValueByProject($scope, $http, project);
    };
    this.getAllProjectAttributes = function ($scope, $http, $compile) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/attribute/getProjectAttributeList',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            Service.drawThisPageByJS(data, $scope, $compile);
        }).error(function (data, status, headers, config) {
        });
    };
    this.getAllProjects = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/project/getAllProjects',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.allProjects = data;
            uiServices.show();
        }).error(function (data, status, headers, config) {
        });
    };
    this.getAllProjectMembersRoles = function ($scope, $http, project) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/userProjectRoles/getAllProjectMembersRoles',
            method: "POST",
            data: project,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
        //    $scope.choosenProject.allProjectMembers = [];
            $scope.choosenProject.allProjectMembers = data;
        }).error(function (data, status, headers, config) {
        });
    };
    this.getLookupOtionsByProject = function ($scope, $http, project) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/projectlookupoption/getLookupOtionsByProject',
            method: "POST",
            data: project,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.ProjectLookUpOptions = data;
            Service.refactorData($scope, data);
        }).error(function (data, status, headers, config) {
        });
    };
    this.getFieldsValueByProject = function ($scope, $http, project) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/projectfieldsvalues/getFieldsValueByProject',
            method: "POST",
            data: project,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.ProjectFieldsValue = data;
            Service.refactorProjectFieldsValueData($scope, data);
        }).error(function (data, status, headers, config) {
        });
    };
    this.deleteUserRoleInProject = function ($scope, $http, member) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/userProjectRoles/deleteUserRoleInProject',
            method: "POST",
            data: member,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true') {
                $scope.alerts = [{'type': 'success', msg: member.user.username + ' with  the Role ' + member.role.roleName + ' Removed successfully .'}];
                $scope.choosenProject.allProjectMembers = [];
                var project = {};
                project.projectId = member.project.projectId;
                Service.getAllProjectMembersRoles($scope, $http, project);
            } else {
                $scope.alerts = [{'type': 'danger', msg: 'user wasnot deleted.'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    this.deleteProject = function ($scope, $http, project) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/project/deleteProject',
            method: "POST",
            data: project,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true') {
                $scope.alerts = [{'type': 'success', msg: project.projectTitle + ' Removed successfully .'}];
                $scope.renewProject();
                Service.getAllProjects($scope, $http);
            } else {
                $scope.alerts = [{'type': 'danger', msg: project.projectTitle + ' wasnot deleted.'}];
            }

        }).error(function (data, status, headers, config) {
        });
    };
    this.saveProject = function ($scope, $http, project) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/project/saveProject',
            method: "POST",
            data: project,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true') {
                $scope.alerts = [{'type': 'success', msg: project.projectTitle + ' Saved successfully .'}];
                Service.getAllProjects($scope, $http);
             
                if (!$scope.choosenProject.projectId) {
                    $scope.choosenProject.projectId = data.id;
                }
                var projectToSend = {};
                projectToSend.projectId = $scope.choosenProject.projectId;
                Service.getProjectInformations($scope, $http, projectToSend);


            } else {
                $scope.alerts = [{'type': 'danger', msg: project.projectTitle + ' wasnot Saved.'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    this.drawThisPageByJS = function (data, $scope, $compile) {
        var drawcounter = 1;
        var counter = 0;
        var counter2 = 0;

        document.getElementById('forTheDynamicHtml').innerHTML = '';
        var rowDivStart = '<div class="row">';
        var rowDivEnd = '</div>';
        // combo box div
        var div1NotRequred = '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4"><div class="form-group"><label for="managerName">';
        var div2 = '</label><select  class="form-control minimal" name="nameAtt" ng-model="projectAttributesOptionsAndOptionId[';
        var div3 = '].lookUp"  ng-options="optionObj.optionName for optionObj in  projectAttributesOptionsAndOptionId[';
        var div4 = '].lookupOptions track by optionObj.optionId "> <option value=""> please select</option> </select></div></div>';

//        var validatiobDiv= '<div ng-messages="MyForm.nameAtt.$error"  role="alert" ng-if="MyForm.nameAtt.$dirty">'+
//              '<div style="color : red" ng-message="required">Please Enter Valid Version Name.</div></div>';

        var div1Requred = '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4"><div class="form-group"><label for="managerName"><span class="text-danger">*</span>';
        var div4Required = '].lookupOptions track by optionObj.optionId " required="required"></select></div></div>';



        // fields div

        var FieldDiv1 = '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4" ><div class="form-group"><label for="exampleInputEmail1">';
        var FieldDiv2Reuired = '<span class="text-danger">*</span>';//+name
        var FieldDiv3 = '</label><input  type="'; //object type
        var FieldDiv4 = ' class="form-control" ng-model="projectAttributesFieldsValue['; //model
        var FieldDiv5 = '].fieldValue" integer name="fieldAtt'//+key // " ></div>';
        var FieldDiv5Required = '].fieldValue" integer required name="fieldAtt'//+key;
        //    var fieldDiv6 = ' "> </div>';

//       var validationDiv = '"> <div role="alert" ng-hide="projectForm.fieldAtt'//+key ;
        var validationDiv = '"> <div role="alert"><div style="color : red" ng-show="projectForm.fieldAtt'//+key ;

        var validationDiv2 = '.integer.$error" >Not Valid Number</div></div> </div>';







        angular.forEach(data, function (value, key) {
            if (drawcounter % 3 == 0) {
                angular.element(document.getElementById('forTheDynamicHtml')).append(rowDivStart);
            }
            if (value.lookupOptions.length > 1) {
                $scope.projectAttributesOptionsAndOptionId[counter] = {};
                $scope.projectAttributesOptionsAndOptionId[counter].lookupOptions = [];
                $scope.projectAttributesOptionsAndOptionId[counter].lookupOptions = value.lookupOptions;
                $scope.projectAttributesOptionsAndOptionId[counter].attribute = {};
                $scope.projectAttributesOptionsAndOptionId[counter].attribute.attributeId = value.attributeId;
                $scope.projectAttributesOptionsAndOptionId[counter].attribute.attributeName = value.attributeName;
                $scope.projectAttributesOptionsAndOptionId[counter].lookUp = {};
                $scope.projectAttributesOptionsAndOptionId[counter].isRequired = value.isRequired;
                var btn;

                if (value.isRequired === true) {
                    btn = $compile(div1Requred + value.attributeName + div2 + counter + div3 + counter + div4Required + counter)($scope);
                    //    $scope.projectAttributesOptionsAndOptionId[counter].isRequired = true;
                } else {
                    btn = $compile(div1NotRequred + value.attributeName + div2 + counter + div3 + counter + div4 + counter)($scope);
                }
                counter++;
            }
            else if (value.dataType !== 'LOOKUP' && value.dataType !== 'OBJ') {
                $scope.projectAttributesFieldsValue[counter2] = {};
                $scope.projectAttributesFieldsValue[counter2].attribute = {};
                $scope.projectAttributesFieldsValue[counter2].attribute.attributeId = value.attributeId;
                $scope.projectAttributesFieldsValue[counter2].attribute.attributeName = value.attributeName;
                $scope.projectAttributesFieldsValue[counter2].fieldValue;
                $scope.projectAttributesFieldsValue[counter2].isRequired = value.isRequired;

                if (value.dataType === 'Alphanumeric') {
                    if (value.isRequired) {
                        btn = $compile(FieldDiv1 + FieldDiv2Reuired + value.attributeName + FieldDiv3 + 'text"' + FieldDiv4 + counter2 + FieldDiv5Required + counter2 + validationDiv + counter2 + validationDiv2)($scope);
//                        $scope.projectAttributesFieldsValue[counter2].isRequired = true;
                    } else
                        btn = $compile(FieldDiv1 + value.attributeName + FieldDiv3 + 'text"' + FieldDiv4 + counter2 + FieldDiv5 + counter2 + validationDiv + counter2 + validationDiv2)($scope);

                } else if (value.dataType === 'Numeric') {
                    if (value.isRequired) {
                        btn = $compile(FieldDiv1 + FieldDiv2Reuired + value.attributeName + FieldDiv3 + 'text" min="1"' + FieldDiv4 + counter2 + FieldDiv5Required + counter2 + validationDiv + 0 + validationDiv2)($scope);
//                        $scope.projectAttributesFieldsValue[counter2].isRequired = true;
                    } else
                        btn = $compile(FieldDiv1 + value.attributeName + FieldDiv3 + 'text" min="1"' + FieldDiv4 + counter2 + FieldDiv5 + counter2 + validationDiv + 0 + validationDiv2)($scope);

                } else if (value.dataType === 'Date') {
                    if (value.isRequired) {
                        btn = $compile(FieldDiv1 + FieldDiv2Reuired + value.attributeName + FieldDiv3 + 'date"' + FieldDiv4 + counter2 + FieldDiv5Required + counter2 + validationDiv + counter2 + validationDiv2)($scope);
//                        $scope.projectAttributesFieldsValue[counter2].isRequired = true;
                    } else
                        btn = $compile(FieldDiv1 + value.attributeName + FieldDiv3 + 'date"' + FieldDiv4 + counter2 + FieldDiv5 + counter2 + validationDiv + counter2 + validationDiv2)($scope);


                } else if (value.dataType === 'DateTimeStamp') {
                    if (value.isRequired) {
                        btn = $compile(FieldDiv1 + FieldDiv2Reuired + value.attributeName + FieldDiv3 + 'datetime"' + FieldDiv4 + counter2 + FieldDiv5Required + counter2 + validationDiv + counter2 + validationDiv2)($scope);
//                        $scope.projectAttributesFieldsValue[counter2].isRequired = true;
                    } else
                        btn = $compile(FieldDiv1 + value.attributeName + FieldDiv3 + 'datetime"' + FieldDiv4 + counter2 + FieldDiv5 + counter2 + validationDiv + counter2 + validationDiv2)($scope);

                }
                counter2++;
            }
            if (btn) {
                angular.element(document.getElementById('forTheDynamicHtml')).append(btn);
                if (drawcounter % 3 == 2) {
                    angular.element(document.getElementById('forTheDynamicHtml')).append(rowDivEnd);
                }
                drawcounter++;
            }

        });
    };

    this.refactorData = function ($scope, data) {
        angular.forEach($scope.projectAttributesOptionsAndOptionId, function (value, key) {
            value.projectLookupId ? delete value.projectLookupId : true;
            value.lookUp ? value.lookUp = {} : true;
        });
        angular.forEach(data, function (value, key) {
            for (var i = 0; i < $scope.projectAttributesOptionsAndOptionId.length; i++) {
                if (value.attribute.attributeId === $scope.projectAttributesOptionsAndOptionId[i].attribute.attributeId) {
                    $scope.projectAttributesOptionsAndOptionId[i].lookUp.optionName = value.lookupOption.optionName;
                    $scope.projectAttributesOptionsAndOptionId[i].lookUp.optionId = value.lookupOption.optionId;
                    $scope.projectAttributesOptionsAndOptionId[i].projectLookupId = value.projectLookupId;
                    break;
                }
            }
        });
    };
    this.refactorProjectFieldsValueData = function ($scope, data) {
        angular.forEach($scope.projectAttributesFieldsValue, function (value, key) {
            value.fieldValue ? delete value.fieldValue : true;
            value.projectAttributeId ? delete value.projectAttributeId : true;
        });
        angular.forEach(data, function (value, key) {
            for (var i = 0; i < $scope.projectAttributesFieldsValue.length; i++) {
                if (value.attribute.attributeId === $scope.projectAttributesFieldsValue[i].attribute.attributeId) {
                    $scope.projectAttributesFieldsValue[i].fieldValue = (parseInt(value.fieldValue) || value.fieldValue);// check with date numbers and
                    $scope.projectAttributesFieldsValue[i].projectAttributeId = value.projectAttributeId;
                    break;
                }
            }
        });
    };

});
