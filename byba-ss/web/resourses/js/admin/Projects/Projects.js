angular.module('helpdeskApp').controller("ProjectsController", function (ProjectServices, $scope, $http, $compile, UserService) {
    $scope.choosenProject = {};
    $scope.projectAttributesOptionsAndOptionId = [];
    $scope.projectAttributesFieldsValue = [];
    $scope.ProjectLookUpOptions = [];
    $scope.ProjectFieldsValue = [];
    $scope.choosenProject.allProjectMembers = [];
    $scope.allProjects = [];
    $scope.choosenIndex;
    ProjectServices.load($scope, $http, $compile);
    UserService.getAllRoles($scope, $http);
    UserService.getAllUsers($scope, $http);

    $scope.showProjectDetails = function (project, index) {
        $scope.choosenIndex = index
        $scope.alerts = [];
        $scope.choosenProject = project;
        var projectToSend = {};
        projectToSend.projectId = project.projectId;
        ProjectServices.getProjectInformations($scope, $http, projectToSend);
    };
    $scope.deleteUserRole = function (index, member) {
        if (member.id === undefined) {
            $scope.choosenProject.allProjectMembers.splice(index, 1);
        } else {
            ProjectServices.deleteUserRoleInProject($scope, $http, member);
            $scope.choosenProject.allProjectMembers.splice(index, 1);
        }
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.addMember = function () {
        var newMember = {};
        newMember.user = {};
        newMember.role = {};
        newMember.project = {};
//        if ($scope.choosenProject.projectId)
//            newMember.project.projectId = $scope.choosenProject.projectId;

        $scope.choosenProject.allProjectMembers.push(newMember);
    };
    $scope.chooseThatUser = function (member, user) {
        member.user = user;
    };
    $scope.chooseThatrole = function (member, role) {
        member.role = role;
    };
    $scope.ChooseThatOption = function (object, option) {
        if (!option) {
            delete object.lookUp.optionName;
            delete object.lookUp.optionId;
        } else {
            object.lookUp.optionName = option.optionName;
            object.lookUp.optionId = option.optionId;
        }
    };
    $scope.renewProject = function () {
        $scope.alerts = [];
        $scope.choosenProject = {};
        $scope.choosenProject.allProjectMembers = [];
        $scope.ProjectLookUpOptions = [];
        $scope.ProjectFieldsValue = [];
        angular.forEach($scope.projectAttributesOptionsAndOptionId, function (value, key) {
            value.lookUp = {};
            value.projectLookupId ? delete value.projectLookupId : true;
        });
        angular.forEach($scope.projectAttributesFieldsValue, function (value, key) {
            value.fieldValue ? delete value.fieldValue : true;
            value.projectAttributeId ? delete value.projectAttributeId : true;
        });
        $scope.projectForm.$setPristine();
        $scope.choosenIndex = '';
    };
    $scope.deleteProject = function () {
        if (!$scope.choosenProject.projectId) {
            $scope.renewProject();
            return;
        }
        var project = {};
        project.projectId = $scope.choosenProject.projectId;
        project.projectTitle = $scope.choosenProject.projectTitle;
        ProjectServices.deleteProject($scope, $http, project);
    };

    $scope.saveClick = function () {
        if (!$scope.validationOnEmptyUserRoles()) {
            return;
        }
        if (!$scope.validationOnRepeatedUserRoles()) {
            return;
        }
        // code to check the required feilds and options 
        if (!$scope.validationOnRequiredLookOptions()) {
            return;
        }
        if (!$scope.validationOnRequiredfielsValues()) {
            return;
        }

        angular.forEach($scope.projectAttributesOptionsAndOptionId, function (value, key) {
            if (value.projectLookupId === undefined && value.lookUp.optionId) {
                // to check if we have new  options were choosen 
                var newObject = {};
                newObject.project = {};
                newObject.project.projectId = $scope.choosenProject.projectId;
                newObject.project.projectTitle = $scope.choosenProject.projectTitle;
                newObject.attribute = value.attribute;
                newObject.lookupOption = value.lookUp;
                $scope.ProjectLookUpOptions.push(newObject);
            } else if (value.projectLookupId) {
                // to update the list which come from data base with the new one admin modified 
                for (var i = 0; i < $scope.ProjectLookUpOptions.length; i++) {
                    if ($scope.ProjectLookUpOptions[i].projectLookupId === value.projectLookupId)
                    {
                        $scope.ProjectLookUpOptions[i].project = {};
                        $scope.ProjectLookUpOptions[i].project.projectId = $scope.choosenProject.projectId;
                        $scope.ProjectLookUpOptions[i].project.projectTitle = $scope.choosenProject.projectTitle;
                        $scope.ProjectLookUpOptions[i].attribute = value.attribute;
                        $scope.ProjectLookUpOptions[i].lookupOption = value.lookUp;
                        break;
                    }
                }
            }
        });
        angular.forEach($scope.projectAttributesFieldsValue, function (value, key) {
            if (value.projectAttributeId === undefined && value.fieldValue) {
                // to check if we have new  options were choosen 
                var newObject = {};
                newObject.project = {};
                newObject.project.projectId = $scope.choosenProject.projectId;
                newObject.project.projectTitle = $scope.choosenProject.projectTitle;
                newObject.attribute = value.attribute;
                newObject.fieldValue = value.fieldValue;
                $scope.ProjectFieldsValue.push(newObject);
            } else if (value.projectAttributeId) {
                // to update the list which come from data base with the new one admin modified 
                for (var i = 0; i < $scope.ProjectFieldsValue.length; i++) {
                    if ($scope.ProjectFieldsValue[i].projectAttributeId === value.projectAttributeId)
                    {
                        $scope.ProjectFieldsValue[i].project = {};
                        $scope.ProjectFieldsValue[i].project.projectId = $scope.choosenProject.projectId;
                        $scope.ProjectFieldsValue[i].project.projectTitle = $scope.choosenProject.projectTitle;
                        //  $scope.ProjectFieldsValue[i].attribute = value.attribute;
                        $scope.ProjectFieldsValue[i].fieldValue = value.fieldValue;
                        break;
                    }
                }
            }
        });

        var project = {};
        project.projectTitle = $scope.choosenProject.projectTitle;
        project.projectId = $scope.choosenProject.projectId;
        project.projectLookupOptions = $scope.ProjectLookUpOptions;
        project.projectFieldsValueses = $scope.ProjectFieldsValue;
        project.usersRolesSet = $scope.choosenProject.allProjectMembers;
        ProjectServices.saveProject($scope, $http, project);
    };

    $scope.validationOnEmptyUserRoles = function () {
        var result = true;
        angular.forEach($scope.choosenProject.allProjectMembers, function (value, key) {
            if (!value.user.userId || !value.role.roleId)
            {
                $scope.alerts = [{'type': 'danger', msg: 'complete Project Members first. Pick option for ' + (value.user.username || value.role.roleName || ' user  and role ')}];
                result = false;
                return result;
            }
        });
        return result;
    };
    $scope.validationOnRepeatedUserRoles = function () {
        var result = true;
        angular.forEach($scope.choosenProject.allProjectMembers, function (value, key) {
            for (var i = 0; i < $scope.choosenProject.allProjectMembers.length; i++) {
                if ($scope.choosenProject.allProjectMembers[i].user.userId === value.user.userId && $scope.choosenProject.allProjectMembers[i].role.roleId === value.role.roleId && key !== i) {
                    $scope.alerts = [{'type': 'danger', msg: value.user.username + ' with the role ' + value.role.roleName + ' is repeated in Project Members'}];
                    result = false;
                    return result;
                }
            }
        });
        return result;
    };
    $scope.validationOnRequiredLookOptions = function () {
        var result = true;
        angular.forEach($scope.projectAttributesOptionsAndOptionId, function (value, key) {
            if (value.isRequired && !value.lookUp.optionId) {
                $scope.alerts = [{'type': 'danger', msg: value.attribute.attributeName + ' Is required '}];
                result = false;
                return result;
            }
        });
        return result;
    };
    $scope.validationOnRequiredfielsValues = function () {
        var result = true;
        angular.forEach($scope.projectAttributesFieldsValue, function (value, key) {
            if (value.isRequired && !value.fieldValue) {
                $scope.alerts = [{'type': 'danger', msg: value.attribute.attributeName + ' Is required '}];
                result = false;
                return result;
            }
        });
        return result;
    };
    $scope.check = function (no) {
//        var name = 'fieldAtt'+no ;
//     var x=    angular.element(document).find('projectForm.fieldAtt0');
//    var y = x.context.projectForm.find("fieldAtt0")
//     var c ="";
//        if ($scope.projectForm.$valid) {
//            return true;
//        } else {
//            return false ;
//        }

    };
});