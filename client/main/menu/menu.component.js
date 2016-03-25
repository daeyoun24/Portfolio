angular.module('portfolio').directive('menu', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/main/menu/menu.html',
        controllerAs: 'ctrl',
        controller: menuController
    }
});

function menuController($scope, $reactive) {
    $reactive(this).attach($scope);

    this.unlockedAll = false;
    this.menus = [{
        name: "Profile"
    }, {
        name: "Resume"
    }, {
        name: "Work"
    }, {
        name: "Contact"
    }];
    this.username = "Testing";

    this.unlockAll = () => {
        console.log("unlock all");
    };

    this.openModal = (menu, ev) => {
        console.log(menu);
    };

    this.openMenu = ($mdOpenMenu, ev) => {
        console.log("open menu");
    };
}