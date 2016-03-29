angular.module('portfolio')
    .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $stateProvider
            .state('auth', {
                url: '/welcome',
                template: '<auth layout="row" flex></auth>'
            })
            .state('main', {
                url: '/portfolio',
                templateUrl: 'client/main/main.html',
                onEnter: function () {
                    window.portfolioGame.main();
                }
            });

        $urlRouterProvider.otherwise("/welcome");
    });

