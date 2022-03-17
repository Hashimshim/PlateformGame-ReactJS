// This file contains the definition of the Player character (which is the class named Player). The remaining stuff is
// the definition of animation resources.

import GameStore from '../stores/GameStore';
import PlayerSkins from './PlayerSkins';

export default class Player {

  constructor() {
    this.pos = {x:0, y:0};
    this.target_size = {w:96, h:96};
    this.speed = {x:0, y:0};
    this.lastDirection = 'r';
    this.lastSprite = undefined;
    this.lastShot = new Date();
  }

  getSkin = () => {
    if(GameStore.hasArmor) {
      return PlayerSkins.Robot;
    } else if('female' === GameStore.character) {
      return PlayerSkins.Female;
    }
    return PlayerSkins.Male;
  }

  // Returns the next sprite for the player. The sprite will reflect the player's movement and the progress of the
  // animation.
  getSprite = (ticks) => {
    var result = undefined;
    var skin = this.getSkin();
    if(this.speed.x > 0) {    // moving right
      this.lastDirection = 'r';
      if(GameStore.hasArmor && this.lastShot.getTime() +250 >= Date.now())
        result = skin.runningShootingRight[ticks % skin.runningShootingRight.length];
      else
        result = skin.runningRight[ticks % skin.runningRight.length];
    } else if (this.speed.x < 0) {                                                                                  // moving left
      this.lastDirection = 'l';
      if(GameStore.hasArmor && this.lastShot.getTime() +250 >= Date.now())
        result = skin.runningShootingLeft[ticks % skin.runningShootingLeft.length];
      else
        result = skin.runningLeft[ticks % skin.runningLeft.length];
    } else {
      if(GameStore.hasArmor && this.lastShot.getTime() +250 >= Date.now()) {                       // standing still
        if(this.lastDirection === 'l')
          result = skin.shootingLeft[Math.floor(ticks / 4) % skin.shootingLeft.length];
        else
          result = skin.shootingRight[Math.floor(ticks / 4) % skin.shootingRight.length];
      } else
        result = this.lastDirection === 'l' ? skin.standingLeft : skin.standingRight;
    }
    if(this.speed.y !== 0) {
      if(GameStore.hasArmor && this.lastShot.getTime() +250 >= Date.now())
        result = this.lastDirection === 'l' ? skin.jumpingShootingLeft : skin.jumpingShootingRight;
      else
        result = this.lastDirection === 'l' ? skin.jumpingLeft : skin.jumpingRight;
    }
    this.lastSprite = result;
    return result;
  }

  // Returns the rectangle that should be used for collision checks. That is different from the sprite rectangle, as
  // the sprite contains additional whitespace. This function has to be adapted when the player sprites get replaced.
  getCollisionRect = () => {
      var skin = this.getSkin();
      return skin.getCollisionRect(this.lastSprite, this.pos.x, this.pos.y, this.target_size.w, this.target_size.h);
  }

}