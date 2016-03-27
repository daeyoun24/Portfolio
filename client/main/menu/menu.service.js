angular.module('portfolio').service('menuService', function ($mdDialog, $mdMedia) {

    this.guestInventory = {
        menus: [{
            name: "Profile",
            locked: false
        }, {
            name: "Resume",
            locked: false
        }, {
            name: "Projects",
            locked: false
        }, {
            name: "Contact",
            locked: false
        }]
    };

    this.openModal = (key, ev) => {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
        var modKey = key.toLowerCase();

        $mdDialog.show({
            controller: 'dialogController as dialog',
            templateUrl: 'client/main/dialog/' + modKey + '.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        });
    };
});