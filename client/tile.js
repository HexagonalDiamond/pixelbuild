/**
 * Base Tile implementation, a tile is a single tile in a tilemap layer
 *
 * @class Tile
 * @extends Phaser.Sprite
 * @constructor
 */
function Tile(game, x, y, w, h, tileId) {
    Phaser.Sprite.call(this,
        game,
        x,
        y,
        tileId
    );

    this.type = Phaser.TILESPRITE;

    /**
    * @property {Phaser.Point} tilePosition - The position of the tile in 'tile coords'
    */
    this.tilePosition = new Phaser.Point(x, y);

    /**
    * @property {number} centerX - The center of the tile.
    */
    this.centerX = Math.abs(w / 2);

    /**
    * @property {number} centerY - The height of the tile in pixels.
    */
    this.centerY = Math.abs(h / 2);
}

Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;

/**
* Check for intersection with this tile.
*
* @method Phaser.Tile#intersects
* @param {number} x - The x axis in pixels.
* @param {number} y - The y axis in pixels.
* @param {number} right - The right point.
* @param {number} bottom - The bottom point.
* @return {boolean} True if the coordinates are within this Tile, otherwise false.
*/
Tile.prototype.intersects = function (x, y, right, bottom) {

    if (right <= this.worldX)
    {
        return false;
    }

    if (bottom <= this.worldY)
    {
        return false;
    }

    if (x >= this.worldX + this.width)
    {
        return false;
    }

    if (y >= this.worldY + this.height)
    {
        return false;
    }

    return true;

};

Tile.prototype.update = function() {
  // if(!this.intersects(game.camera.view.x, game.camera.view.y, game.camera.view.right, game.camera.view.bottom)) {
  //   this.kill();
  //   this.destroy();
  // }
}

/**
* Clean up memory.
*
* @method Phaser.Tile#destroy
*/
Tile.prototype.destroy = function() {
    Phaser.Sprite.prototype.destroy.apply(this, arguments);

    this.layer = null;
    this.tileset = null;
    this.tilePosition = null;
    this.x = null;
    this.y = null;

    this.properties = null;

    this.collisionCallback = null;

    this.collisionCallbackContext = null;
};

Object.defineProperty(Tile.prototype, 'worldX', {
    get: function () {
        return this.position.x;
    },
    set: function (val) {
        this.position.x = val;
    }
});

Object.defineProperty(Tile.prototype, 'worldY', {
    get: function () {
        return this.position.y;
    },
    set: function (val) {
        this.position.y = val;
    }
});

/**
* @name Phaser.Tile#left
* @property {number} left - The x value in pixels.
* @readonly
*/
Object.defineProperty(Tile.prototype, 'left', {

    get: function () {
        return this.worldX;
    }

});

/**
* @name Phaser.Tile#right
* @property {number} right - The sum of the x and width properties.
* @readonly
*/
Object.defineProperty(Tile.prototype, 'right', {

    get: function () {
        return this.worldX + this.width;
    }

});

/**
* @name Phaser.Tile#top
* @property {number} top - The y value.
* @readonly
*/
Object.defineProperty(Tile.prototype, 'top', {

    get: function () {
        return this.worldY;
    }

});

/**
* @name Phaser.Tile#bottom
* @property {number} bottom - The sum of the y and height properties.
* @readonly
*/
Object.defineProperty(Tile.prototype, 'bottom', {

    get: function () {
        return this.worldY + this.height;
    }

});
