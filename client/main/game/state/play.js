"use strict";
window.portfolioGame.state.play = {
    preload: function () {
    },
    create: function () {
        this.bg = mt.create("bg");
        this.lavas = mt.create("lavas");
        this.blocks = mt.create("blocks");
        this.items = mt.create("items");
        this.text = mt.create("text");
        this.character = mt.create("character");
        this.game.camera.follow(this.character);

        this.cursors = this.game.input.keyboard.createCursorKeys();

        Meteor.subscribe('inventories');
        let guestInventory = {
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
        this.inventory = (Meteor.userId()) ? Inventories.findOne({owner: Meteor.userId()}) : guestInventory;
        let inventory = this.inventory;

        // Destroy menu items that are already unlocked
        _.forEach(this.items.mt.children, function (item) {
            let name = item.mt.data.name;

            if (name === "Profile" || name === "Resume" || name === "Projects" || name === "Contact") {
                let menu = _.find(inventory.menus, function (menu) {
                    return menu.name === name;
                });

                if (menu.locked === false) item.destroy();
            }
        });
    },
    update: function () {
        this.game.physics.arcade.collide(this.character, this.blocks);
        this.game.physics.arcade.collide(this.character, this.items, this.collect, null, this);

        if (this.cursors.left.isDown) {
            this.character.body.velocity.x = -400;
            this.character.scale.x = 1;
        }
        else if (this.cursors.right.isDown) {
            this.character.body.velocity.x = 400;
            this.character.scale.x = -1;
        }
        else {
            this.character.body.velocity.x = 0;
        }

        if (this.cursors.up.isDown) {
            this.character.body.velocity.y = -600;
        }
    },
    collect: function (character, item) {
        let name = item.mt.data.name;

        if (name === "Profile" || name === "Resume" || name === "Projects" || name === "Contact") {
            Meteor.call('unlockMenu', this.inventory._id, name);

            this.text.position = item.position;
            this.text.setText("You unlocked " + name.toLowerCase() + "!");
        }
        else {
            // Got a diamond
            if (Meteor.userId()) {
                Meteor.call('addGold', this.inventory._id);
            }
        }

        item.destroy();
    }
};