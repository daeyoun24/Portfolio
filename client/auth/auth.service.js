angular.module('portfolio').service('authService', function () {

    this.isGuest = localStorage.getItem("guest");

    this.setGuest = () => {
        localStorage.setItem("guest", true);
        this.isGuest = true;
    };

    this.reset = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("guest");
        this.isGuest = false;
        Meteor.logout();
    };
});