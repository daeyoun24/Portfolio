angular.module('portfolio')
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('auth', {
                url: '/welcome',
                template: '<auth></auth>'
            })
            .state('main', {
                url: '/portfolio',
                templateUrl: 'client/main/main.html'
            });

        $urlRouterProvider.otherwise("/welcome");
    });