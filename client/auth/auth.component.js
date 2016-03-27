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

    let firstVisit = false;
    this.error = "";

    this.createUser = (username) => {
        firstVisit = true;
        Meteor.call('createUserWithUsername', username, (err, res) => {
            if (err) {
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

        // Logging in twice logs out user.
        // So, go to main if logged in.
        if (Meteor.user()) {
            $state.go('main');
            return;
        }

        Meteor.loginWithPassword(user.username, user.userId, (err) => {
            if (err) {
                this.error = err.reason;
            }
            else {
                if (firstVisit) Meteor.call('createInventory');
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