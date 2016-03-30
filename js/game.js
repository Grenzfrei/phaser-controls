"use strict";

var RPG = RPG || {},
    Phaser = Phaser || {};

// create new phaser game object with height: 800px and height: 600px
var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

// Add the game states
game.state.add('BootState', RPG.BootState);
game.state.add('LoadState', RPG.LoadState);
game.state.add('StartState', RPG.StartState);
game.state.add('WorldState', RPG.WorldState);
//game.state.add('BattleState', RPG.BattleState);
//game.state.add('GameOverState', RPG.GameOverState);

// start the loading state to load the game
game.state.start("BootState", true, false, "assets/json/game_data.json", "StartState");
