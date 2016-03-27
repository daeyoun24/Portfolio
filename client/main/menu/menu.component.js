angular.module('portfolio').directive('menu', function () {
    return {
        restrict: 'E',
        templateUrl: 'client/main/menu/menu.html',
        controllerAs: 'ctrl',
        controller: menuController
    }
});

function menuController($scope, $reactive, authService, menuService) {
    $reactive(this).attach($scope);

    let user = JSON.parse(localStorage.getItem("user"));
    this.username = (user && Meteor.userId()) ? user.username : "Guest";
    this.isGuest = authService.isGuest;

    this.subscribe('inventories');
    this.subscribe('items');

    this.helpers({
        inventory: () => {
            if (this.isGuest) return menuService.guestInventory;
            return Inventories.findOne({owner: Meteor.userId()});
        },
        items: () => {
            return Items.find({});
        }
    });

    this.unlockAll = () => {
        Meteor.call('unlockMenus', this.inventory._id, (error) => {
            if (error) console.log(error);
        });
    };

    this.isUnlockedAll = () => {
        if (!this.inventory) return false;
        let unlockedAll = true;

        _.forEach(this.inventory.menus, function(menu) {
            if (menu.locked) return unlockedAll = false;
        });

        return unlockedAll;
    };

    this.openModal = (menu, ev) => {
        menuService.openModal(menu.name, ev);
    };

    this.openMenu = ($mdOpenMenu, ev) => {
        $mdOpenMenu(ev);
    };
}