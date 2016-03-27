Meteor.publish("inventories", function() {
    return Inventories.find({owner: this.userId});
});