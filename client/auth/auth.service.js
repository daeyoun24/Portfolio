angular.module('portfolio').service('authService', function () {
    this.isGuest = false;

    this.setGuest = () => {
        this.isGuest = true;
    };

    this.reset = () => {
        this.isGuest = false;
    };
});