angular.module('portfolio').directive('portfolio', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/portfolio/portfolio.html',
        controllerAs: 'portfolio',
        controller: portfolioController
    }
});

function portfolioController($scope, $reactive, $state, authService) {
    $reactive(this).attach($scope);

    this.state = $state;

    this.restart = () => {
        authService.reset();
        $state.go('auth');
    };
}