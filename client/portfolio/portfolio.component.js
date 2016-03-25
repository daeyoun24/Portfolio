angular.module('portfolio').directive('portfolio', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/portfolio/portfolio.html',
        controllerAs: 'portfolio',
        controller: portfolioController
    }
});

function portfolioController($scope, $reactive) {
    $reactive(this).attach($scope);

    this.restart = () => {
        // TODO: redirect to index page
        console.log("restart");
    };
}