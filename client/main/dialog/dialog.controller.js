angular.module('portfolio').controller('dialogController', function($mdDialog) {

    this.cancel = function () {
        $mdDialog.cancel();
    };
});