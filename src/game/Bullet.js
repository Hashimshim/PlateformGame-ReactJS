// This module contains the definition of a bullet fired by the Robo armor. Unlike enemies bullets do not start off as a
// block of a level. Instead they will be created during the game when the user fires. The handling of sprites and
// collisions is similar to that of monsters from that moment on.

import Rect from './Rect';

// A sprite of a bullet
class BulletSprite {
  constructor(fileName) {
    this.sprite = new Image(20, 16);
    this.sprite.src = "tiles/objects/" +fileName +".png";
    this.width = 20;
    this.height = 16;
  }
}

// utility method used to initialize the sprite arrays of monsters.
function initSprites(spriteArray, direction) {
  for(let i=0; i<5; i++) {
    spriteArray.push(new BulletSprite('Bullet_' +(1+i) +direction));
  }
}

export default class Bullet {
  
  constructor() {
    this.type = 'Bullet';
    this.deadly = false;

    this.spritesLeft = [];
    initSprites(this.spritesLeft, '-L');
    this.spritesRight = [];
    initSprites(this.spritesRight, '');

    this.x = 0;
    this.y = 0;
    this.speedX = 10;
    this.speedY = 0;
    this.solid = false;
    this.targetWidth = 20;
    this.targetHeight = 16;
    this.distance = 0;
  }

  getSprite = (ticks) => {
    var spritesArray = (this.speedX > 0) ? this.spritesRight : this.spritesLeft;
    return spritesArray[ticks % spritesArray.length];
  }

  getCollisionRect = () => {
    return new Rect(this.x, this.y, this.targetWidth, this.targetHeight);
  };

  // Straight movement. This could be adjusted - e.g. to let the bullet drop on a ballistic curve or to let it bounce
  // on collisions.
  move = () => {
    this.x += this.speedX;
    this.distance += Math.abs(this.speedX);
  }

}