// This module contains the definition of the various enemies of the game. Enemies start off as a simple block of a
// level. Once they are to be rendered that block gets replaced with a copy of the corresponding monster class. The
// handling of sprites and collisions is a bit differently from blocks from that moment on.

var Rect = require('./Rect');

// A sprite of a monster - usually one in a row of sprites that build an animation
var MonsterSprite = function(fileName, w, h) {
    this.sprite = new Image(w, h);
    this.sprite.src = "tiles/monsters/" +fileName +".png";
    this.width = w;
    this.height = h;
};

// Set this movement type for flying monsters. This will only update the x position of the monster.
var movementFly = function(onTurningPoint, collision, falling) {
    if(collision) {
        this.speedX *= -1;
    }
    this.x += this.speedX;
};

// Set this movement type to let the monster patrol an area. The monster will turn around when it reaches a cliff or if
// it collides with an obstacle.
var movementPatrol = function(onTurningPoint, collision, falling) {
    if(onTurningPoint || collision) {
        this.speedX *= -1;
    }
    this.x += this.speedX;
};

// This movement type is similar to the patrol but will not stop on cliffs.
var movementLemming = function(onTurningPoint, collision, falling) {
    this.speedY = falling ? 12 : 0;
    if(collision) {
        this.speedX *= -1;
    }
    this.x += this.speedX;
    this.y += this.speedY;
};

// This movement type is similar to the patrol but has two differences.
// 1) When a berzerking monster reaches a cliff or collides with an obstancle it will wait 3 seconds, then turn around
//    and start running.
// 2) Berzerking monsters start slowly but will speed up while they're running. The start speed is 1, the max speed is
//    their speedX property. The speed increases linear.
var movementBerzerk = function(onTurningPoint, collision, falling) {
    // TODO
};

// Monsters with this movement type will not move on the x-axis but make small jumps.
var movementJump = function(onTurningPoint, collision, falling) {
    if(!this.jumpBase) {
        this.jumpBase = this.y;
    }
    if(this.timeout && this.timeout > 0) {
        this.timeout--;
        return;
    }
    if(this.jumpBase === this.y) {
        this.speedY = 21;
    } else {
        this.speedY -= 3;
    }
    this.y -= this.speedY;
    if(this.jumpBase === this.y) {
        this.timeout = 24;
    }
};

var Monster = function(name, fileName, numSpritesLeft, numSpritesRight, w, h, tWidth, tHeight, speed, animationDelay,
                       killedByJump, points, movement) {
    this.type = 'Monster';
    this.name = name;
    this.deadly = true;
    this.killedByJump = killedByJump;
    this.points = points;

    this.spritesLeft = [];
    initSprites(this.spritesLeft, numSpritesLeft, fileName, 'l', w, h);
    this.spritesRight = (0 === numSpritesRight) ? this.spritesLeft : [];
    initSprites(this.spritesRight, numSpritesRight, fileName, 'r', w, h);

    this.x = 0;
    this.y = 0;
    this.startOffsetY = 48 -tHeight;
    this.speedX = speed;
    this.speedY = 0;
    this.solid = true;
    this.targetWidth = tWidth;
    this.targetHeight = tHeight;

    this.getSprite = function(ticks) {
        var spritesArray = (this.speedX > 0) ? this.spritesRight : this.spritesLeft;
        return spritesArray[Math.floor(ticks / animationDelay) % spritesArray.length];
    };

    this.getCollisionRect = function() {
        return new Rect(this.x, this.y, this.targetWidth, this.targetHeight);
    };

    this.move = movement;
};

// utility method used to initialize the sprite arrays of monsters.
var initSprites = function(spriteArray, numSprites, fileName, direction, width, height) {
    for(let i=0; i<numSprites; i++) {
        spriteArray.push(new MonsterSprite(fileName + '_' +direction +(1+i), width, height));
    }
};

// The configuration of the various monsters. Have a look at the Monster constructor function to see the meaning of this
// endless list of parameters ;)
var Monsters = {
    blob: new Monster('Blob', 'blob', 2, 2, 128, 101, 64, 50.5, 1, 4, true, 100, movementPatrol),
    cyclopse: new Monster('Cyclopse', 'cyclopse', 2, 2, 128, 128, 64, 64, 6, 4, true, 300, movementBerzerk),
    plum: new Monster('Plum', 'plum', 6, 0, 110, 128, 82.5, 110, 0, 4, true, 400, movementJump),
    redZombie: new Monster('RedZombie', 'red_zombie', 2, 2, 117, 128, 59, 64, 4, 4, true, 400, movementLemming),
    spikyBlob: new Monster('SpikyBlob', 'spiky_blob', 1, 1, 128, 100, 48, 37.5, 1, 4, false, 1000, movementPatrol),
    spiky: new Monster('Spiky', 'spiky', 2, 2, 117, 128, 87.75, 96, 8, 4, false, 4000, movementBerzerk),
    wasp: new Monster('Wasp', 'wasp', 2, 2, 128, 93, 64, 46.5, 4, 1, true, 800, movementFly),
    zombie: new Monster('Zombie', 'zombie', 2, 2, 118, 128, 59, 64, 2, 4, true, 400, movementLemming)
};

module.exports = Monsters;