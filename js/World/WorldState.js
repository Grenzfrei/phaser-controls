"use strict";

var RPG = RPG || {},
    Phaser = Phaser || {};

/**
 * Represents the World State.
 * @constructor
 */
RPG.WorldState = function () { 
    Phaser.State.call(this);
  
    this.prefab_classes = {
        "background": RPG.TilePrefab.prototype.constructor,
        "rectangle": RPG.Prefab.prototype.constructor,
        "player": RPG.WorldState.Player.prototype.constructor
    };
    
    this.TEXT_STYLE = {font: "bold 16px Arial", fill: "#fff", boundsAlignH: "left", boundsAlignV: "middle"};
};

RPG.WorldState.prototype = Object.create(Phaser.State.prototype);
RPG.WorldState.prototype.constructor = RPG.WorldState;

/**
 * Initialising the World State
 * @param {Object} game_data - Collection of all game objects stats
 * @param {Object} game_data.characters - stats of the characters
 * @param {Object} game_data.player - stats of the players player
 * @param {Object} game_data.cities - stats of the world map cities
 */  
RPG.WorldState.prototype.init = function (game_data) {
  
  // initialize object for storing all game stats if not already set
  this.game_data = game_data;
  
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  
  // enable the Arcade Physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);
};



/**
 * Creating the World State
 */  
RPG.WorldState.prototype.create = function () {
  
    var group_name, prefab_name, player_name;
    
    // create groups
    this.groups = {};
    this.game_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    // create prefabs
    this.prefabs = {};
    for (prefab_name in this.game_data.prefabs) {
        if (this.game_data.prefabs.hasOwnProperty(prefab_name)) {
            // create prefab
            this.createPrefab(prefab_name, this.game_data.prefabs[prefab_name]);
        }
    }
  
    var message_position, message_text, message;
    
    // show message
    message_position = new Phaser.Point(this.game.world.width / 2, this.game.world.height * 0.8);
    message_text = "Press any key on your keyboard and I will sho you\nthe Phaser Constant for this key.\nAwesome, huh?";
    message = new RPG.ActionMessage(this, "message", message_position, {
        group: "hud", 
        texture: "rectangle_image", 
        scale: {x: 1.5, y: 1}, 
        duration: 10, 
        message: message_text
    });
  
    this.createActionKeys();
}


/**
 * Updating the World State
 */  
RPG.WorldState.prototype.update = function () {
 
}


/**
 * Rendering the World State
 */  
RPG.WorldState.prototype.render = function () {
    // Draw debug tools
    //game.debug.bodyInfo(this.player, 32, 32);
    //game.debug.body(this.player);
}


RPG.WorldState.prototype.createPrefab = function (prefab_name, prefab_data) {
    var prefab;
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
    }
};


/**
 * create the action keys
 */  
RPG.WorldState.prototype.createActionKeys = function () {
    
    // listen for the 's' key to be pressed
    this.keys = {};
    
    for (var key in this.game_data.keys) {
        this.keys[key] = this.input.keyboard.addKey(eval(this.game_data.keys[key]));
        this.keys[key].const = this.game_data.keys[key];
        this.input.keyboard.addKeyCapture(this.keys[key].keyCode);
        this.keys[key].onDown.add(this.keyPressed, this);
    }
}

/**
 * create the action keys
 */  
RPG.WorldState.prototype.keyPressed = function (evt, game) {

    var message_position, message_text, message;
    
    // show message
    message_position = new Phaser.Point(this.game.world.width / 2, this.game.world.height * 0.2);
    message_text = evt.const;
    message = new RPG.ActionMessage(this, "message", message_position, {
        group: "hud", 
        texture: "rectangle_image", 
        scale: {x: 1, y: 1}, 
        duration: 2, 
        message: message_text
    });
}
 