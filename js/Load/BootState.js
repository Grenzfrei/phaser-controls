"use strict";

var RPG = RPG || {},
    Phaser = Phaser || {};
    
/**
 * Represents the Boot State.
 * @constructor
 */
RPG.BootState = function (game) {
  Phaser.State.call(this);
};
RPG.BootState.prototype = Object.create(Phaser.State.prototype);
RPG.BootState.prototype.constructor = RPG.BootState;

/**
 * Initialising the Boot State
 */  
RPG.BootState.prototype.init = function (game_data, next_state) {
    this.game_data = game_data;
    this.next_state = next_state;
};

/**
 * Preloading the Boot State
 */  
RPG.BootState.prototype.preload = function () {
    // load game data json
    this.load.text("game_data", this.game_data);
};


/**
 * Creating the Boot State
 */  
RPG.BootState.prototype.create = function () {
    var game_data;
    game_data = this.game.cache.getText("game_data");
    game_data = JSON.parse(game_data);
    this.game.state.start("LoadState", true, false, game_data, this.next_state);
};
