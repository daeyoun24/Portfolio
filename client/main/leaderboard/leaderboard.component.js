angular.module('portfolio').directive('leaderboard', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/main/leaderboard/leaderboard.html',
        controllerAs: 'leaderboard',
        controller: leaderboardController
    }
});

function leaderboardController($scope, $reactive) {
    $reactive(this).attach($scope);

    //this.subscribe('leaderboard');
    //
    //this.helpers({
    //    users: () => {
    //        return Inventories.find();
    //    }
    //});
}