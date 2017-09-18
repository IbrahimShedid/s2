angular.module('helpdeskApp').controller('ProfileController', function (ProfileServices, $scope, $http) {
    $scope.choosenProfile = {};
    $scope.choosenIssue = {};
    $scope.profileListAttribute = [];
    $scope.profileListAttribute = [];
    $scope.profileIssueAttributesTheBigList = [];
    $scope.issuelisttype = [];
    //to be replaced  >>>>>>
    $scope.creator = {"userId": 1, "username": "admin"};
    $scope.counter = 0;
     $scope.profileIndex;
    ProfileServices.loadProfileTab($scope, $http);



    $scope.showProfileData = function (profile,index) {
        $scope.profileIndex=  index;
        $scope.alerts = [];
        //    $scope.profileIssueAttributesList = [];
        $scope.profileIssueAttributesTheBigList = [];
        //    $scope.choosenIssue = {};
        $scope.choosenProfile = profile;
        ProfileServices.loadProfileNotificationsList($scope, $http, profile);
        ProfileServices.getProfileListAttribute($scope, $http, profile);
    };
//    $scope.saveChangesToNotificationValue = function (notification) {
//        if ($scope.choosenProfile.profileId) {
//            ProfileServices.saveProfileNotification($scope, $http, notification);
//        } else {
//            $scope.alerts = [{'type': 'danger', msg: ' you have to choose profile first .'}];
//        }
//    };
    $scope.getprofileIssueAttributesList = function () {
        //  $scope.choosenIssue = issue;
        //   $scope.profileListAttribute = [];
        if (!$scope.choosenProfile.profileId && $scope.profileIssueAttributesTheBigList.length < 1) {
            var data = [];
            ProfileServices.getprofileIssueListsSeparated($scope, data);
        }
        angular.forEach($scope.profileIssueAttributesTheBigList, function (value, key) {
            if (value.id === $scope.choosenIssue.listId)
                $scope.profileListAttribute = value.fields;

        });
        $scope.counter = $scope.profileListAttribute.length;
    };
    $scope.updateprofileIssueAttribute = function (profileIssueAttribute, attributeObj, index) {

        var repeated = false;
        angular.forEach($scope.profileListAttribute, function (value, key) {
            if ( value.fieldattribute && value.fieldattribute.attributeId === attributeObj.attributeId) {
                $scope.alerts = [{'type': 'danger', msg: 'sorry ' + attributeObj.attributeName + ' cannot be repeated.'}];
                repeated = true;
            }
        });
        if (repeated) {
            $scope.deleteProfileListAttribute(index, profileIssueAttribute.fieldOrder);
        } else {
            profileIssueAttribute.fieldattribute = attributeObj;
            profileIssueAttribute.fieldListType = {};
            profileIssueAttribute.fieldListType.listId = $scope.choosenIssue.listId;
        }

    };

    //Add new Row in lookupTables //
    $scope.addNewRow = function () {
        if ($scope.profileIssueAttributesTheBigList.length < 1) {
            $scope.getprofileIssueAttributesList();
        }
        var NewProfileIssueAttribute = {
            fieldListType: $scope.choosenIssue,
            fieldattribute: $scope.attributeObj,
            fieldOrder: $scope.counter + 1
        };
        $scope.profileListAttribute.push(NewProfileIssueAttribute);
        $scope.counter += 1;



    };
    // move lookupColorTables items up and down
    var move = function (origin, destination) {
        var temp = $scope.profileListAttribute[destination].fieldOrder;
        $scope.profileListAttribute[destination].fieldOrder = $scope.profileListAttribute[origin].fieldOrder;
        $scope.profileListAttribute[origin].fieldOrder = temp;

        var temp2 = $scope.profileListAttribute[destination];
        $scope.profileListAttribute[destination] = $scope.profileListAttribute[origin];
        $scope.profileListAttribute[origin] = temp2;

    };


    // just in case the list wasnot  ordered by correctly 
    // we  search about the next or the previous object with the previous or next field order and send it's index to be changed coorecltyy 

    $scope.moveUp = function (index, fieldorder, obj) {
        var acutual_index = $scope.profileListAttribute.indexOf(obj);
        var otherIndex;
        var x = 1;
        var found = false;
        for (; x < $scope.profileListAttribute.length - 1; x++) {
            if (!found) {
                angular.forEach($scope.profileListAttribute, function (value, key) {
                    if (value.fieldOrder === fieldorder - x) {
                        otherIndex = key;
                        found = true;
                        return;
                    }
                });
            }
        }
        move(acutual_index, otherIndex);
    };
    $scope.moveDown = function (index, fieldorder) {
        var acutual_index = $scope.profileListAttribute.indexOf(obj);
        var otherIndex;
        var x = 1;
        var found = false;
        for (; x < $scope.profileListAttribute.length - 1; x++) {
            if (!found) {
                angular.forEach($scope.profileListAttribute, function (value, key) {
                    if (value.fieldOrder === fieldorder + x) {
                        otherIndex = key;
                        found = true;
                        return;
                    }
                });
            }
        }
        move(acutual_index, otherIndex);
    };
    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.makeNewProfile = function () {
        $scope.alerts = [];
        angular.forEach($scope.GeneralProfileNotifications, function (value, key) {
            value.notificationValue = false;
            delete value.profileNotificationId;
        });
        angular.forEach($scope.projectRelatedProfileNotificationList, function (value, key) {
            value.notificationValue = false;
            delete value.profileNotificationId;
        });
        $scope.choosenProfile = {};
        if ($scope.issuelisttype.length > 0)
            $scope.choosenIssue = $scope.issuelisttype[0];
        $scope.profileListAttribute = [];
        $scope.profileIssueAttributesTheBigList = [];
        $scope.profileCntrlForm.$setPristine();
        $scope.profileIndex ='';
    };

    $scope.saveProfile = function () {
        var profileToSave = {};
        profileToSave.profileCreator = $scope.creator;
        profileToSave.profileName = $scope.choosenProfile.profileName;
        if ($scope.choosenProfile.profileId) {
            profileToSave.profileId = $scope.choosenProfile.profileId;
        }
        profileToSave.listPageSize = $scope.choosenProfile.listPageSize;
        profileToSave.profileListAttributes = [];

        var empty = false;
        angular.forEach($scope.profileIssueAttributesTheBigList, function (value, key) {
            // profileToSave.profileListAttributes.push(value.fields);
            if (!empty)
                angular.forEach(value.fields, function (value2, key2) {
                    if (value2.fieldattribute === undefined) {
                        // alert('empty') ;
                        empty = true;
                        return;
                    }
                    if ($scope.choosenProfile.profileId) {
                        value2.fieldProfile = {};
                        value2.fieldProfile.profileId = $scope.choosenProfile.profileId;
                    }
                    profileToSave.profileListAttributes.push(value2);

                });
            else {
                return empty;
            }
        });
        if (empty) {
             $scope.alerts = [{'type': 'danger', msg: 'Profile Issue Attribute List  cannot contain empty choices .'}];
        } else {
        

        profileToSave.profileNotificationses = [];
        angular.forEach($scope.GeneralProfileNotifications, function (value, key) {
            profileToSave.profileNotificationses[key] = {};
            profileToSave.profileNotificationses[key].notification = {};
            profileToSave.profileNotificationses[key].notification.notificationId = value.notification.notificationId;
            profileToSave.profileNotificationses[key].notification.notificationType = value.notification.notificationType;
            profileToSave.profileNotificationses[key].notificationValue = value.notificationValue;
            if (value.profileNotificationId) {
                profileToSave.profileNotificationses[key].profileNotificationId = value.profileNotificationId;
            }
        });
        var counter = profileToSave.profileNotificationses.length;
        angular.forEach($scope.projectRelatedProfileNotificationList, function (value, key) {
            profileToSave.profileNotificationses[counter + key] = {};
            profileToSave.profileNotificationses[counter + key].notification = {};
            profileToSave.profileNotificationses[counter + key].notification.notificationId = value.notification.notificationId;
            profileToSave.profileNotificationses[counter + key].notification.notificationType = value.notification.notificationType;
            profileToSave.profileNotificationses[counter + key].notificationValue = value.notificationValue;
            if (value.profileNotificationId) {
                profileToSave.profileNotificationses[counter + key].profileNotificationId = value.profileNotificationId;
            }
        });
        ProfileServices.saveProfile($scope, $http, profileToSave);
      //  console.log(profileToSave);
        }
    };
    $scope.deleteProfile = function () {
        var profileToDelete = {};
        profileToDelete.profileName = $scope.choosenProfile.profileName;
        profileToDelete.profileId = $scope.choosenProfile.profileId;
        ProfileServices.deleteProfile($scope, $http, profileToDelete);
    };

    $scope.deleteProfileListAttribute = function (index, field_Order) {
        $scope.profileListAttribute.splice(index, 1);
        angular.forEach($scope.profileListAttribute, function (value, key) {
            if (value.fieldOrder > field_Order) {
                value.fieldOrder -= 1;
            }
        });
        $scope.counter = $scope.profileListAttribute.length;
    };

////////////////////////////////////////////////////////////// 













});