angular.module('helpdeskApp').service('ProfileServices', function (uiServices, webService) {
    var service = this;
    this.loadProfileTab = function ($scope, $http) {
        service.getAllProfilesByCreator($scope, $http);
        service.getGeneralNotification($scope, $http);
        service.getProjectRelatedNotification($scope, $http);
        service.getIssueListType($scope, $http);
        service.getAttributeList($scope, $http);
    };

    this.loadProfileNotificationsList = function ($scope, $http, profile) {
        service.getGeneralProfileNotificationsList($scope, $http, profile);
        service.getProjectRelatedProfileNotificationsList($scope, $http, profile);
    };
    // to be modified after login implmentation 
    this.getAllProfilesByCreator = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/profile/getAllProfilesByCreator',
            method: "POST",
            data: $scope.creator,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.profileList = data;
            uiServices.show();
        }).error(function (data, status, headers, config) {
        });
    };

    this.getGeneralNotification = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/notification/getGeneralNotification',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.GeneralProfileNotifications = service.getNotificationAsProfileNotificationObj(data);
        }).error(function (data, status, headers, config) {
        });
    };

    this.getGeneralProfileNotificationsList = function ($scope, $http, profile) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/profilenotifications/getGeneralProfileNotification',

            method: "POST",
            data: profile,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            //  service.refactorDataToProfileNotifications($scope.GeneralProfileNotifications, data, profile);
            $scope.GeneralProfileNotifications = data;

        }).error(function (data, status, headers, config) {
        });
    };
    this.getProjectRelatedProfileNotificationsList = function ($scope, $http, profile) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/profilenotifications/getProjectRelatedProfileNotification',
            //            http://localhost:8097/helpdeskWebServices/webresources/profi   getProjectRelatedNotification
            method: "POST",
            data: profile,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            //    service.refactorDataToProfileNotifications($scope.projectRelatedProfileNotificationList, data, profile);
            $scope.projectRelatedProfileNotificationList = data;
        }).error(function (data, status, headers, config) {
        });
    };
    this.getProjectRelatedNotification = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/notification/getProjectRelatedNotification',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.projectRelatedProfileNotificationList = service.getNotificationAsProfileNotificationObj(data);
        }).error(function (data, status, headers, config) {
        });
    };

    this.getIssueListType = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/issuelisttype/getIssueListType',

        method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.issuelisttype = data;
            if (data.length > 0)
                $scope.choosenIssue = data[0];
        }).error(function (data, status, headers, config) {
        });
    };

    this.getAttributeList = function ($scope, $http) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/attribute/getAttributeList',
            method: "GET",
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            $scope.attributeList = data;
        }).error(function (data, status, headers, config) {
        });
    };

    this.getProfileListAttribute = function ($scope, $http, Profile) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/profile/getProfileAttributes',
            method: "POST",
            data: Profile,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            service.getprofileIssueListsSeparated($scope, data);
            $scope.getprofileIssueAttributesList();
        }).error(function (data, status, headers, config) {
        });
    };
//    this.updateProfileIssueAttribute = function ($scope, $http, profileIssueAttribute) {
//        $http({
//            url: webService.url+'helpdeskWebServices/webresources/profilelistattribute/saveProfileAttributes',
//            method: "POST",
//            data: profileIssueAttribute,
//            headers: {'Content-Type': 'application/json'}
//        }).success(function (data, status, headers, config) {
//
//        }).error(function (data, status, headers, config) {
//        });
//    };
//    this.updateFieldOrder = function ($scope, $http, profileIssueAttribute) {
//        $http({
//            url: webService.url+'helpdeskWebServices/webresources/profilelistattribute/updateFieldOrder',
//            method: "POST",
//            data: profileIssueAttribute,
//            headers: {'Content-Type': 'application/json'}
//        }).success(function (data, status, headers, config) {
//
//        }).error(function (data, status, headers, config) {
//        });
//    };

//    this.saveProfileNotification = function ($scope, $http, profilenotifications) {
//        $http({
//            url: webService.url+'helpdeskWebServices/webresources/profilenotifications/saveProfileNotification',
//            method: "POST",
//            data: profilenotifications,
//            headers: {'Content-Type': 'application/json'}
//        }).success(function (data, status, headers, config) {
//            service.loadProfileNotificationsList($scope, $http, $scope.choosenProfile)
//        }).error(function (data, status, headers, config) {
//        });
//    };

    this.getNotificationAsProfileNotificationObj = function (data) {
        var ProfileNotifications = [];
        var len = data.length;
        for (var i = 0; i < len; i++) {
            ProfileNotifications[i] = {};
            ProfileNotifications[i].notification = data[i];
            ProfileNotifications[i].notificationValue = false;
        }
        return ProfileNotifications;
    };

    this.saveProfile = function ($scope, $http, profile) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/profile/saveProfile',
            method: "POST",
            data: profile,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + profile.profileName + '  Data Saved .'}];

                if (!$scope.choosenProfile.profileId) {
                    $scope.choosenProfile.profileId = profile.profileId = data.id;
                }
                service.getAllProfilesByCreator($scope, $http);
                service.loadProfileNotificationsList($scope, $http, profile);
                service.getProfileListAttribute($scope, $http, profile);

            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry' + profile.profileName + '  Data  not Saved .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    this.deleteProfile = function ($scope, $http, profile) {
        $http({
            url: webService.url + 'helpdeskWebServices/webresources/profile/deleteProfile',
            method: "POST",
            data: profile,
            headers: {'Content-Type': 'application/json'}
        }).success(function (data, status, headers, config) {
            if (data.result === 'true')
            {
                $scope.makeNewProfile();
                $scope.alerts = [{'type': 'success', msg: 'Done! ' + profile.profileName + '  Data Deleted .'}];
                service.getAllProfilesByCreator($scope, $http);


            } else {
                $scope.alerts = [{'type': 'danger', msg: 'sorry' + profile.profileName + '  Data  not Deleted .'}];
            }
        }).error(function (data, status, headers, config) {
        });
    };
    ////////////////////////////////////////////////////////////

//    this.refactorDataToProfileNotifications = function (ourModel, datafromServer, profile) {
//        var changed = false;
//        angular.forEach(ourModel, function (value, key) {
//            changed = false;
//            for (var i = 0; i < datafromServer.length; i++) {
//                if (value.notification.notificationId === datafromServer[i].notification.notificationId && changed === false)
//                {
//                    value.notificationValue = datafromServer[i].notificationValue;
//                    value.profileNotificationId = datafromServer[i].profileNotificationId;
//                    value.profile = profile;
//                    changed = true;
//                }
//            }
//            if (changed === false)
//            {
//                value.notificationValue = false;
//                value.profile = profile;
//            }
//        })
//    };




    this.getprofileIssueListsSeparated = function ($scope, data) {
        $scope.profileIssueAttributesTheBigList = [];
        angular.forEach($scope.issuelisttype, function (value, key) {
            $scope.profileIssueAttributesTheBigList[key] = {};
            $scope.profileIssueAttributesTheBigList[key].id = value.listId;
            $scope.profileIssueAttributesTheBigList[key].fields = [];
            angular.forEach(data, function (value2, key2) {
                if (value2.fieldListType.listId === value.listId) {
                    $scope.profileIssueAttributesTheBigList[key].fields.push(value2);
                }
            });
        });
    };
});

