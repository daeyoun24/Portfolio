angular.module('portfolio').directive('auth', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/auth/auth.html',
        controllerAs: 'auth',
        controller: authController
    }
});

function authController($scope, $reactive, $state, authService) {
    $reactive(this).attach($scope);

    this.error = "";

    this.createUser = (username) => {
        Meteor.call('createUserWithUsername', username, (err, res) => {
            if (err) {
                console.log(err.reason);
                this.error = err.reason;
            }
            else {
                let user = {
                    userId: res,
                    username: username
                };

                localStorage.setItem("user", JSON.stringify(user));
                this.login();
            }
        });
    };

    this.login = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        Meteor.loginWithPassword(user.username, user.userId, (err) => {
            if (err) {
                this.error = err;
            }
            else {
                $state.go('main');
            }
        });
    };
    // Try to log in when the controller is initiated
    this.login();

    this.accessAsGuest = () => {
        authService.setGuest();
        $state.go('main');
    };
}