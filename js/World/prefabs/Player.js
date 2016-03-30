"use strict";

var RPG = RPG || {},
    Phaser = Phaser || {};

/**
 * Represents the player Prefab.
 * @constructor
 * @param {Object} game_state - The game state object
 * @param {Object} player_data - Collection of player stats
 * @param {Object} player_data.position - current x and y position of the player
 */  
RPG.WorldState.Player = function (game_state, name, position, properties) {
  
    RPG.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.walking_speed = +properties.walking_speed;
    
    this.animations.add("walking_down", [6, 7, 8], 10, true);
    this.animations.add("walking_left", [9, 10, 11], 10, true);
    this.animations.add("walking_right", [3, 4, 5], 10, true);
    this.animations.add("walking_up", [0, 1, 2], 10, true);
    
    this.stopped_frames = [7, 10, 4, 1, 7];
 
    this.game_state.game.physics.arcade.enable(this);
    this.body.setSize(16, 16, 0, 8);
    this.body.collideWorldBounds = true;
 
    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();
    this.wasd = this.game_state.game.input.keyboard.addKeys( { 'up': Phaser.KeyCode.W, 'down': Phaser.KeyCode.S, 'left': Phaser.KeyCode.A, 'right': Phaser.KeyCode.D } );
};

RPG.WorldState.Player.prototype = Object.create(Phaser.Sprite.prototype);
RPG.WorldState.Player.prototype.constructor = RPG.WorldState.Player;


/**
 * Updating the player Prefab.
 * used for moving the player
 */  
RPG.WorldState.Player.prototype.update = function () {
    
    //  Reset the players velocity (movement)
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    
   
    
    if (this.cursors.left.isDown || this.wasd.left.isDown) {
        // move left
        this.body.velocity.x = -this.walking_speed;
        if (this.body.velocity.y === 0) {
            this.animations.play("walking_left");
        }
    } 
    if (this.cursors.right.isDown || this.wasd.right.isDown) {
        // move right
        this.body.velocity.x = +this.walking_speed;
        if (this.body.velocity.y === 0) {
            this.animations.play("walking_right");
        }
    }
 
    if (this.cursors.up.isDown || this.wasd.up.isDown) {
        // move up
        this.body.velocity.y = -this.walking_speed;
        if (this.body.velocity.x === 0) {
            this.animations.play("walking_up");
        }
    }
    if (this.cursors.down.isDown || this.wasd.down.isDown) {
        // move down
        this.body.velocity.y = +this.walking_speed;
        if (this.body.velocity.x === 0) {
            this.animations.play("walking_down");
        }
    }
    
    if (this.body.velocity.x === 0 && this.body.velocity.y === 0) {
        // stop current animation
        this.animations.stop();
        this.frame = this.stopped_frames[this.body.facing];
    }
}


