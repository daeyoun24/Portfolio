"use strict";
window.portfolioGame = {
    // reference to the Phaser.Game instance
    game: null,

    // main function
    main: function () {
        this.game = new Phaser.Game(mt.data.map.viewportWidth, mt.data.map.viewportHeight, Phaser.AUTO, 'game_canvas', window.portfolioGame.state.boot);
    },

    // here we will store all states
    state: {}
};