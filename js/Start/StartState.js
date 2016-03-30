"use strict";

var RPG = RPG || {},
    Phaser = Phaser || {};

/**
 * Represents the Start State.
 * @constructor
 */
RPG.StartState = function (game) {
  
  Phaser.State.call(this);

  // define font styles
  this._fontStyle = { font: "bold 20px Arial", fill: "#000" };
  this._titleStyle = { font: "bold 28px Arial", fill: "#000" };
};

RPG.StartState.prototype = Object.create(Phaser.State.prototype);
RPG.StartState.prototype.constructor = RPG.StartState;

/**
 * Initialising the Start State
 */ 
RPG.StartState.prototype.init = function (game_data) {
    this.game_data = game_data;
}


/**
 * Creating the Start State
 */  
RPG.StartState.prototype.create = function () {
    
    // set the background color of the stage
    this.stage.backgroundColor = '#fff';
    
    // add the Logo 
    this.logo = this.add.sprite(this.game._width / 2, 150, 'logo');
    this.logo.anchor.setTo(0.5, 0.5);
    
    // add a subtitle text to the screen
    this.subTitle = this.game.add.text(this.game._width / 2, 200, "Phaser Controls", this._titleStyle);
    this.subTitle.anchor.setTo(0.5, 0.5);
    
    // add a message text to the screen
    this.userMessage = this.game.add.text(this.game._width / 2, this.game._height / 2, "press 's' to start", this._fontStyle);
    this.userMessage.anchor.setTo(0.5, 0.5);
    
    // add a copyright message text to the screen
    this.copyrightMessage = this.game.add.text(this.game._width / 2, 550, "© 2016 www.makegame.de ", this._fontStyle);
    this.copyrightMessage.anchor.setTo(0.5, 0.5);
    
    // listen for the 's' key to be pressed
    this.start_key = this.input.keyboard.addKey(Phaser.Keyboard.S);
    
    // when the s key is pressed, call the nextState function
    this.start_key.onDown.addOnce(this.nextState, this);
};
  
  
/**
 * Go to the next Game State
 * Called when user presses 's'
 * @callback
 */  
RPG.StartState.prototype.nextState = function () {
    // go to the world state to start the game
    this.state.start('WorldState', true, false, this.game_data);
};
