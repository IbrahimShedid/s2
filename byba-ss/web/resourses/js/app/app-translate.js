angular.module('helpdeskApp').config(['$translateProvider', function ($translateProvider) {
    $translateProvider
            .useStaticFilesLoader({
                prefix: '../../json/',
                suffix: '.json'
            })
            .preferredLanguage('en')
            .useLocalStorage()
            .useMissingTranslationHandlerLog()
            .useSanitizeValueStrategy(null);

}]);

angular.module('helpdeskApp').controller('LanguageSwitchController', ['$scope', '$rootScope', '$translate',
    function ($scope, $rootScope, $translate) {
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

        $rootScope.$on('$translateChangeSuccess', function (event, data) {
            var language = data.language;
            $rootScope.lang = language;

            $rootScope.default_direction = language === 'ar' ? 'rtl' : 'ltr';
            $rootScope.opposite_direction = language === 'ar' ? 'ltr' : 'rtl';

            $rootScope.default_float = language === 'ar' ? 'right' : 'left';
            $rootScope.opposite_float = language === 'ar' ? 'left' : 'right';

        });
    }
]);