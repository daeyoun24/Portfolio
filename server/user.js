Meteor.methods({
    createUserWithUsername: function (username) {
        check(username, String);

        let userId = Accounts.createUser({
            username: username
        });

        Accounts.setPassword(userId, userId);

        return userId;
    }
});