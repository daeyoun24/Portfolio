angular.module('portfolio')
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('main', {
                url: '/portfolio',
                templateUrl: 'client/main/main.html'
            });
        // TODO: create welcome status

        $urlRouterProvider.otherwise("/portfolio");
    });