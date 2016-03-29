Meteor.publish("inventories", function() {
    return Inventories.find({owner: this.userId});
});

Meteor.methods({
    createInventory: function () {
        let menus = [{
            name: "Profile",
            locked: true
        }, {
            name: "Resume",
            locked: true
        }, {
            name: "Projects",
            locked: true
        }, {
            name: "Contact",
            locked: true
        }];
        let inventory = {
            owner: this.userId,
            menus: menus,
            items: [],
            gold: 0
        };

        Inventories.insert(inventory);
    },
    unlockAllMenus: function (inventoryId) {
        check(inventoryId, String);

        let inventory = Inventories.findOne(inventoryId);

        if (!inventory)
            throw new Meteor.Error(404, "No such inventory!");

        if (inventory.owner !== this.userId)
            throw new Meteor.Error(404, "No permissions!");

        let menus = inventory.menus;
        _.forEach(menus, function(menu) {
            menu.locked = false;
        });

        Inventories.update(inventoryId, {
            $set: {"menus": menus}
        });
    },
    unlockMenu: function (inventoryId, menuName) {
        check(inventoryId, String);
        check(menuName, String);

        let inventory = Inventories.findOne(inventoryId);

        if (!inventory)
            throw new Meteor.Error(404, "No such inventory!");

        if (inventory.owner !== this.userId)
            throw new Meteor.Error(404, "No permissions!");

        let menus = inventory.menus;
        _.forEach(menus, function(menu) {
            if (menu.name === menuName)
                return menu.locked = false;
        });

        Inventories.update(inventoryId, {
            $set: {"menus": menus}
        });
    },
    addGold: function (inventoryId) {
        check(inventoryId, String);

        let inventory = Inventories.findOne(inventoryId);

        if (!inventory)
            throw new Meteor.Error(404, "No such inventory!");

        if (inventory.owner !== this.userId)
            throw new Meteor.Error(404, "No permissions!");

        Inventories.update(inventoryId, {
            $inc: {gold: 1}
        });
    }
});