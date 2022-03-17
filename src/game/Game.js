import Backgrounds from './Backgrounds';
import Blocks from './Blocks';
import Bullet from './Bullet';
import Cheats from './Cheats';
import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';
import LevelActions from '../actions/LevelActions';
import LevelStore from '../stores/LevelStore';
import Levels from './Levels';
import Monsters from './Monsters';
import Player from './Player';
import React from 'react';
import Rect from './Rect';
import _ from 'lodash';
import $ from 'jquery';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.levels = Levels;
    this.currentLevel = this.levels[LevelStore.level];
    this.blocks = new Blocks(this.currentLevel.theme)
    this.sound = props.sound;
    this.ctx = undefined;
    this.ticks = 0;
    this.items = undefined;
    this.gameInterval = undefined;
    this.player = new Player();

    // position displayed level
    this.scroll_x = 0;
    // scroll position at the beginning of the game loop
    this.scroll_x_start = 0;
    // 5 free lines on top, 13 lines of level content
    this.line_offset_y = 5;

    this.held = {left: false, right: false, up: false, down: false, fire: false};
    this.collisionMap = undefined;

    // fps measurement
    this.filterStrength = 20;
    this.frameTime = 0;
    this.lastLoop = new Date;
    this.thisLoop = undefined;

    // speed, gravity parameters
    this.speed = {
      player: {
        velocity_x:1.5,
        velocity_x_jump:2,
        velocity_y:25,
        gravity:2,
        friction:0.8,
        speed_limit_y:25
      },
      fps:30
    };

    // size details
    this.size = {
      tile:{                                                                                                    // size of tiles
        source:{w:16, h:16},
        target:{w:48, h:48}
      },
      tiles:{                                                                                                   // number of tiles
        target:{w:1, h:1}                                                                                       // this is set dynamically depending on the canvas size
      },
      canvas: {                                                                                                 // the canvas size is read from the actual html
        w: window.innerWidth -4,
        h: window.innerHeight -4
      }
    };

    String.prototype.replaceAt = function (index, characters) {
      return this.substr(0, index) + characters + this.substr(index + characters.length);
    };

    Number.prototype.inRange = function (a, b) {
      var n = +this;
      return ( n >= a && n <= b );
    };

    this.state = { };
  }

  componentDidMount() {
    this.initGame();
    this.loadlevel();
    this.startGame();
    $(document.body).toggleClass('body-default');
  }

  componentWillUnmount() {
    $(document.body).toggleClass('body-default');
  }

  render() {
    return (
      <canvas id="game">
        Guru meditation: No &lt;canvas&gt; element supported!
      </canvas>
    );
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  drawLevel = () => {
    // clear the canvas before repainting
    this.ctx.clearRect(0, 0, this.size.canvas.w, this.size.canvas.h);
    this.collisionMap = [];

    if(this.scroll_x < 0) {
      this.scroll_x = 0;
    }
    this.scroll_x_start = this.scroll_x;

    // draw background
    if(this.currentLevel.background.image) {
      var background = Backgrounds[this.currentLevel.background.image];
      var bgScale = this.size.canvas.h / background.spriteHeight;
      var targetWidth = background.spriteWidth * bgScale;
      var K = ((this.scroll_x *0.3) % targetWidth) * -1;
      for(var i=0; i<=this.size.canvas.w / targetWidth +1; i++) {
        this.ctx.drawImage(background.sprite, 0, 0, background.spriteWidth, background.spriteHeight,
                           K + i * targetWidth, 0, targetWidth, background.spriteHeight * bgScale);
      }
    }

    // first tile to display:
    var index_x_start = this.scroll_x / this.size.tile.target.w;
    var offset_x = this.scroll_x % this.size.tile.target.w;
    // last tile to show
    var index_x_max = index_x_start + this.size.tiles.target.w + 1;

    this.currentLevel.level.forEach(function (linecontent, index_y) {
      index_y += this.line_offset_y;
      for(var index_x = index_x_start -4 >= 0 ? index_x_start -4 : index_x_start; index_x < index_x_max; index_x++) {
        var object = this.blocks[linecontent.charAt(index_x)];
        if (object) {
          object.x = index_x * this.size.tile.target.w - offset_x;
          object.y = index_y * this.size.tile.target.h;
          if (object.type === 'Monster') {
            let m = _.clone(Monsters[object.subtype]);
            m.x = object.x;
            m.y = object.y + m.startOffsetY;
            this.items.push(m);
            this.replaceLevelSprite(index_x, index_y - this.line_offset_y, " ");
          } else {
            if (object.sprite.src){
              this.ctx.drawImage(object.sprite, 0, 0, object.spriteWidth, object.spriteHeight,
                                 object.x - index_x_start * this.size.tile.target.w,object.y,
                                 this.size.tile.target.w * object.scaleX,
                                 this.size.tile.target.h * object.scaleY);
            }
            if (object.collide) {
              this.collisionMap.push(_.clone(object));
            }
            if (object.type === 'coin' || object.type === 'super_coin') {
              this.items.push(_.clone(object));
              this.replaceLevelSprite(index_x, index_y - this.line_offset_y, " ");
            }
          }
        }
      }
    }.bind(this));
  }

  // update position of characters, collision detection
  updateCharacters = () => {
    var actor = this.player;
    if (actor.speed.y == 0) {
      if (this.held.left) {
        actor.speed.x -= this.speed.player.velocity_x;
      } else if (this.held.right) {
        actor.speed.x += this.speed.player.velocity_x;
      }
    } else {
      if (this.held.left) {
        actor.speed.x -= this.speed.player.velocity_x_jump;
      } else if (this.held.right) {
        actor.speed.x += this.speed.player.velocity_x_jump;
      }
    }
    if (this.held.up && actor.speed.y == 0) {
      this.sound.play('jump');
      actor.speed.y -= this.speed.player.velocity_y;
    }
    this.held.up = false

    if(this.held.fire && GameStore.hasArmor && actor.lastShot.getTime() +250 < Date.now()) {
      this.sound.play('fire');
      let bullet = new Bullet();
      bullet.x = actor.pos.x;
      if(actor.lastDirection === 'r') {
        bullet.x += actor.target_size.w;
      } else {
        bullet.speedX *= -1;
      }
      bullet.y = actor.pos.y + (actor.target_size.h / 2);
      actor.lastShot = new Date();
      this.items.push(bullet);
    }
    this.held.fire = false;

    // apply gravity.
    actor.speed.y += this.speed.player.gravity;
    if (Math.abs(actor.speed.x) < 0.8) actor.speed.x = 0;
    if (Math.abs(actor.speed.y) < 0.1) actor.speed.y = 0;

    // apply speed limit when falling down
    if (actor.speed.y > this.speed.player.speed_limit_y) {
      actor.speed.y = this.speed.player.speed_limit_y
    }

    actor.pos.x += actor.speed.x;
    actor.pos.y += actor.speed.y;

    // block on level edge
    if (actor.pos.x < 0) {
      actor.pos.x = 0;
    } else if (actor.pos.x + actor.target_size.w > this.currentLevel.width) {
      actor.pos.x = this.currentLevel.width - actor.target_size.w;
    }
    // die on level bottom
    if (actor.pos.y > this.size.canvas.h) {
      this.gameOver();
    }

    // add visible items + actors to collision check
    // todo: only add visible items
    this.collisionMap = this.collisionMap.concat(this.items);

    this.collisionMap.forEach(function (object) {
      var collides = this.checkCollision(actor, object);
      if(!collides.none()) {
        // apply collision to player movement. special actions on collisions
        if (object.solid) {
          if (collides.top) {
            actor.pos.y = object.y + this.size.tile.target.h;
            actor.speed.y = 1;
          } else if (collides.bottom) {
            // jump on enemy
            if (object.type === 'Monster' && object.deadly && object.killedByJump) {
              object.deadly = false;
              object.speedX = 0;
              object.speedY = 0;
              GameActions.addPoints(object.points);
              this.sound.play('jump_on_enemy');
              let index = this.items.indexOf(object);
              if (index > -1) {
                this.items.splice(index, 1);
              }
            } else {
              actor.pos.y = object.y - actor.target_size.h;
              actor.speed.y = 0;
            }
          } else if (collides.right) {
            let cf = actor.pos.x +actor.target_size.w -actor.getCollisionRect().x2;
            actor.pos.x = object.x - actor.target_size.w +cf;
            actor.speed.x = 0;
          } else if (collides.left) {
            actor.pos.x = object.x + this.size.tile.target.w;
            actor.speed.x = 0;
          }
        }

        // collide from any side
        if (collides.top || collides.bottom || collides.right || collides.left) {
          if (object.deadly == true) {
            this.gameOver();
          }
          if (object.type === 'exit') {
            this.levelWin();
          }
          if (object.type === 'coin' || object.type === 'super_coin') {
            this.items.splice(this.items.indexOf(object), 1);
            GameActions.addCoins(object.type === 'coin' ? 1 : 10);
            GameActions.addPoints(object.type === 'coin' ? 100 : 1000);
            this.sound.play('coin');
          }
        }
      }
    }.bind(this));

    // move the player when the level is at it's border, else move the level
    var newScrollX = actor.pos.x -(this.size.canvas.w /2);
    if(newScrollX < 0)
      newScrollX = 0;
    if(newScrollX +this.size.canvas.w > this.currentLevel.width)
      newScrollX = this.currentLevel.width -this.size.canvas.w;
    this.scroll_x = newScrollX;

    // apply friction
    actor.speed.x *= this.speed.player.friction;
  }

  checkCollision = (actor, object) => {
    var objectRect;
    if(object.getCollisionRect) {                                                                                   // is available if object is a monster
      objectRect = object.getCollisionRect();
    } else {                                                                                                        // build a default rect for everything else
      objectRect = new Rect(object.x, object.y, this.size.tile.target.w * object.scaleX,
                            this.size.tile.target.h * object.scaleY);
    }
    return actor.getCollisionRect().intersect(objectRect);
  }

  // update special items, enemies
  updateElements = () => {
    this.items.forEach(function(item) {
      let killed = false;
      if(item.type === 'Monster' && item.x.inRange(this.scroll_x, this.scroll_x +this.size.canvas.w)) {
        let monsterRect = item.getCollisionRect();
        var collision = ((item.speedX > 0) && (monsterRect.x2 >= this.currentLevel.width) ||
                         (item.speedX < 0) && (monsterRect.x1 <= 0));
        var falling = true;
        var turningPoint = false;
        for(let g = 0; g < this.collisionMap.length; g++) {
          let block = this.collisionMap[g];
          if(block.type === 'Bullet') {
            let c = this.checkCollision(item, block);
            if(!c.none()) {
              item.deadly = false;
              item.speedX = 0;
              item.speedY = 0;
              GameActions.addPoints(item.points);
              this.sound.play('jump_on_enemy');
              let index = this.items.indexOf(item);
              if (index > -1) {
                this.items.splice(index, 1);
              }
              index = this.items.indexOf(block);
              if (index > -1) {
                this.items.splice(index, 1);
              }
              killed = true;
            }
          } else if(block.solid && ((block.type === 'Ground') || (block.type === 'Obstacle'))) {
            if(monsterRect.y2 === block.y) {
              if(monsterRect.centerX().inRange(block.x, block.x +this.size.tile.target.w * block.scaleX)){
                turningPoint = block.turningPoint;
              }
              if(block.x.inRange(monsterRect.x1, monsterRect.x2) ||
                 (block.x +this.size.tile.target.w *block.scaleX).inRange(monsterRect.x1,monsterRect.x2)){
                falling = false;
              }
            }
          }
          if(block.type === 'Obstacle') {
            let c = this.checkCollision(item, block);
            collision |= c.left || c.right;
          }
        }
        if(!killed) item.move(turningPoint, collision, falling);
      } else if(item.type === 'Bullet') {
        let remove = false;
        if(item.distance > 250) {
          remove = true;
        } else {
          for(let g = 0; g < this.collisionMap.length; g++) {
            let block = this.collisionMap[g];
            if(block.solid && ((block.type === 'Ground') || (block.type === 'Obstacle'))) {
              remove |= !this.checkCollision(item, block).none()
            }
          }
        }
        if(remove) {
          let index = this.items.indexOf(item);
          if (index > -1) {
            this.items.splice(index, 1);
          }
        } else {
          item.move();
        }
      }
    }.bind(this));
  }

  drawControls = () => {
    var timeRemaining = 0;
    if(-1 != this.timeoutHandle) {
      var levelDuration = new Date() -this.timeoutStart;
      timeRemaining = (99 -(levelDuration/1000)) | 0;
    }
    this.ctx.font = 'bold 14px PressStart2PRegular';
    this.ctx.fillStyle = this.currentLevel.foreground;
    this.ctx.fillText("Time: " + timeRemaining, this.size.tile.target.w, this.size.tile.target.h);
    this.ctx.fillText("Books: " + GameStore.coins, this.size.tile.target.w +150, this.size.tile.target.h);
    this.ctx.fillText("Points: " + GameStore.score, this.size.tile.target.w +350, this.size.tile.target.h);
    this.ctx.fillText(GameStore.lives + " Lives", this.size.canvas.w - 3 * this.size.tile.target.w -50, this.size.tile.target.h);
  }

  drawActors = () => {
    var playerSprite = this.player.getSprite(this.ticks);
    var maxDim = Math.max(playerSprite.width, playerSprite.height);
    var sX = this.player.target_size.w / maxDim * playerSprite.width;
    var sY = this.player.target_size.h / maxDim * playerSprite.height;
    this.ctx.drawImage(playerSprite.sprite,
                       0, 0,
                       playerSprite.width, playerSprite.height,
                       this.player.pos.x - this.scroll_x_start, this.player.pos.y +5,
                       sX, sY
    );
  }

  drawElements = () => {
    this.items.forEach(function(item) {
      if(item.type === 'Monster') {
        let monsterSprite = item.getSprite(this.ticks);
        this.ctx.drawImage(monsterSprite.sprite, 0, 0, monsterSprite.width, monsterSprite.height,
                           item.x - this.scroll_x_start, item.y, item.targetWidth, item.targetHeight);
      } else if(item.type === 'Bullet') {
        let bulletSprite = item.getSprite(this.ticks);
        this.ctx.drawImage(bulletSprite.sprite, 0, 0, bulletSprite.width, bulletSprite.height,
                           item.x - this.scroll_x_start, item.y, item.targetWidth, item.targetHeight);
      } else {
        this.ctx.drawImage(item.sprite, 0, 0, item.spriteWidth, item.spriteHeight, item.x -this.scroll_x_start,
                           item.y, this.size.tile.target.w, this.size.tile.target.h);
      }
    }.bind(this));
  }

    gameOver = () => {
      this.sound.play('dead');
      GameActions.updateLives(GameStore.lives -1);

      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = -1;

      if(GameStore.lives > 0) {
        this.initializeLevel();
        this.respawnPlayer();
      } else {
        window.clearInterval(this.gameInterval);
        if(this.currentLevel.music) {
          this.sound.stop(this.currentLevel.music);
        }
        LevelActions.loadGameOver();
      }
    }

    levelWin = () => {
      window.clearInterval(this.gameInterval);
      clearTimeout(this.timeoutHandle);
      this.timeoutHandle = -1;

      if(this.currentLevel.music) {
        this.sound.stop(this.currentLevel.music);
      }
      this.sound.play('success');
      LevelActions.levelWon();
    }

    initializeLevel = () => {
      // clone the level content so we still have the original for a restart
      this.currentLevel.level = this.currentLevel.template.slice(0);
      this.currentLevel.width = this.currentLevel.level[0].length * this.size.tile.target.w;
      this.items = [];
      this.collisionMap = [];
      this.resetPlayer();
      this.scroll_x = this.player.pos.x - (document.documentElement.clientWidth - 4) / 2;
    }

    resetPlayer = () => {
      this.player.pos.x = 0;
      this.respawnPlayer();
    }

    // todo: re-spawn player at the closest 'y' to the left
    respawnPlayer = () => {
      if (this.startpos = this.getLastLevelSpritePosition('y', this.player.pos.x)) {
        this.player.pos.x = this.startpos.x * this.size.tile.target.w;
        if (this.player.pos.x >= this.size.canvas.w/2) {
          this.scroll_x = this.startpos.x * this.size.tile.target.w - this.size.canvas.w/2;
        } else {
          this.scroll_x = 0;
        }
        this.player.pos.y = (this.startpos.y + this.line_offset_y) * this.size.tile.target.h;
      } else {
        this.player.pos.x = 2 * this.size.tile.target.w;
        this.player.pos.y = 5 * this.size.tile.target.h;
        this.scroll_x = 0;
      }
      this.player.speed.x = 0;
      this.player.speed.y = 0;
      if(this.currentLevel.music) {
        this.sound.stop(this.currentLevel.music);
        this.sound.play(this.currentLevel.music);
      }

      if(-1 !== this.timeoutHandle) {
        clearTimeout(this.timeoutHandle);
      }
      this.timeoutHandle = setTimeout(this.gameOver, 99000);
      this.timeoutStart = new Date();
    }

    initializeTheme = () => {
      document.getElementById('game').style.backgroundColor = this.currentLevel.background.color;
    }

    gameLoop = () => {
      this.ticks++;
      var thisFrameTime = (this.thisLoop = new Date()) - this.lastLoop;
      this.frameTime += (thisFrameTime - this.frameTime) / this.filterStrength;
      this.lastLoop = this.thisLoop;
      this.drawLevel();
      this.updateCharacters();
      this.updateElements();
      this.drawElements();
      this.drawActors();
      this.drawControls();
    }

    initGame = () => {
      window.clearInterval(this.gameInterval);
      var canvas = document.getElementById("game");
      this.ctx = canvas.getContext("2d");
    }

    loadlevel = () => {
      this.initializeLevel();
      this.initDimensions();
      this.initializeTheme();
      this.drawLevel();
    }

    initDimensions = () => {
      // re-sizing
      var canvas = document.getElementById("game");
      var browser_w = window.innerWidth;
      var browser_h = window.innerHeight;
      this.size.canvas.w = browser_w - 4;
      this.size.canvas.h = browser_h - 4;
      canvas.width = this.size.canvas.w;
      canvas.height = this.size.canvas.h;
      this.size.tiles.target.w = this.size.canvas.w / this.size.tile.target.w;
      this.size.tiles.target.h = this.size.canvas.h / this.size.tile.target.h;
      // if the canvas is not high enough, cut from the upper side, if it's too high, move down
      this.line_offset_y = this.size.canvas.h / this.size.tile.target.h - this.currentLevel.level.length
    }

    startGame = () => {
      this.registerControls();
      this.sound.play('theme');
      window.clearInterval(this.gameInterval);
      this.gameInterval = setInterval(this.gameLoop, 1000 / this.speed.fps);
    }

    restartGame = () => {
      window.clearInterval(this.gameInterval);
      this.initGame();
      this.startGame();
    }

    //- controls.js --------------------------------------------------------------------------------------------------//

    // key based controls:

    registerControls = () => { 
      window.onkeydown = function (e) {
        e.preventDefault();
        switch (e.keyCode) {
          case 37: // left
            this.held.left = true;
            break;
          case 32: // space
            this.held.fire = true;
            break;
          case 38: // up
            this.held.up = true;
            break;
          case 39: // right
            this.held.right = true;
            break;
          case 40: // down
            this.held.down = true;
            break;
          case 27: // escape
            this.initGame();
          default:
            Cheats.keyPressed(e.keyCode);
            return;
        }
        return false;
      }.bind(this);

      window.onkeyup = function (e) {
        e.preventDefault();
        switch (e.keyCode) {
          case 37: // left
            this.held.left = false;
            break;
          case 32: // space
            this.held.fire = false;
            break;
          case 38: // up
            this.held.up = false;
            break;
          case 39: // right
            this.held.right = false;
            break;
          case 40: // down
            this.held.down = false;
            break;
          default:
            return;
        }
        return false;
      }.bind(this);
    }

    //- level_methods.js ---------------------------------------------------------------------------------------------//

    replaceLevelSpriteXY = (x, y, item) => {
      this.line_nr = y / this.size.tile.target.h - this.line_offset_y;
      this.replaceLevelSprite(x / this.size.tile.target.w, this.line_nr, item);
    }

    replaceLevelSprite = (pos, line, item) => {
      this.currentLevel.level[line] = this.currentLevel.level[line].replaceAt(pos, item);
    }

    getLevelSpriteXY = (x, y) => {
      this.line_nr = y / this.size.tile.target.h - this.line_offset_y;
      return this.getLevelSprite(x / this.size.tile.target.w, this.line_nr);
    }

    getLevelSprite = (pos, line) => {
      return this.currentLevel.level[line].charAt(pos);
    }

    getIndicesOf = (searchStr, str) => {
      var startIndex = 0;
      var searchStrLen = searchStr.length;
      var index;
      var indices = [];
      while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
      }
      return indices;
    }

    getLevelSpritePositions = (type) => {
      var self = this;
      var positions = []
      this.currentLevel.level.forEach(function(linecontent, pos_y) {
        self.getIndicesOf(type, linecontent).forEach(function(pos_x) {
            positions.push({x:pos_x, y:pos_y});
        })
      });
      return positions;
    }

    getLastLevelSpritePosition = (type, x) => {
      var pos;
      this.positions = this.getLevelSpritePositions(type);
      this.positions.sort(function (a, b) {
        return a.x - b.x
      });
      this.positions.forEach(function (position) {
      if (!pos || (pos.x < position.x && position.x * this.size.tile.target.w <= x)) {
            pos = position;
        }
      }.bind(this));
      return pos;
    }

}

export default Game;