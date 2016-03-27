Inventories = new Mongo.Collection("inventories");

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
    unlockMenus: function (inventoryId) {
        check(inventoryId, String);

        let inventory = Inventories.findOne(inventoryId);

        if (!inventory)
            throw new Meteor.Error(404, "No such inventory!");

        if (inventory.owner !== this.userId)
            throw new Meteor.Error(404, "No permissions!");

        let menus = [{
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
        }];

        Inventories.update(inventoryId, {
            $set: {"menus": menus}
        });
    }
});