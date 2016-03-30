"use strict";

var RPG = RPG || {},
    Phaser = Phaser || {};
    
/**
 * Represents the Load State.
 * @constructor
 */
RPG.LoadState = function (game) {
  
  Phaser.State.call(this);

  // define font style
  this._fontStyle = { font: "bold 20px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
};

RPG.LoadState.prototype = Object.create(Phaser.State.prototype);
RPG.LoadState.prototype.constructor = RPG.LoadState;


RPG.LoadState.prototype.init = function (game_data, next_state) {
    this.game_data = game_data;
    this.next_state = next_state;
};

/**
 * Preloading the Load State
 */  
RPG.LoadState.prototype.preload = function () {
    
     // add a loading text to the screen
    this.loadingLabel = this.game.add.text(this.game._width / 2, this.game._height / 2, "loading assets...", this._fontStyle);
    this.loadingLabel.anchor.setTo(0.5, 0.5);

    var assets, asset_loader, asset_key, asset;
    assets = this.game_data.assets;
    for (asset_key in assets) { // load assets according to asset key
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch (asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source, asset.frame_width, asset.frame_height, asset.frames, asset.margin, asset.spacing);
                break;
            case "tilemap":
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            }
        }
    }
};


/**
 * Creating the Load State
 */  
RPG.LoadState.prototype.create = function () {
    // go to the Start state to start the game
    this.game.state.start(this.next_state, true, false, this.game_data);
};
