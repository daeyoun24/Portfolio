angular.module('portfolio', [
    'angular-meteor',
    'ui.router',
    'ngMaterial'
]);

angular.module('portfolio').config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('indigo');
    $mdThemingProvider.theme('default').dark();
});

function onReady() {
    angular.bootstrap(document, ['portfolio'], {
        strictDi: true
    });
}

if (Meteor.isCordova)
    angular.element(document).on("deviceready", onReady);
else
    angular.element(document).ready(onReady);