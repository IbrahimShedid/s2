angular.module('helpdeskApp').
    service('Session', function () {
    var    isLoginPage = true;
     var   isAdminModule = false;
        this.create = function ( userId, userRole,lang) {
            //this.id = sessionId;
            this.userId = userId;
            this.userRole = userRole;
            this.lang = lang;
        };
        this.destroy = function () {
           // this.id = null;
            this.userId = null;
            this.userRole = null;
        };
    });