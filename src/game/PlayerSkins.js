var Rect = require('./Rect');

var PlayerSprite = function(fileName, w, h) {
    this.sprite = new Image(w, h);
    this.sprite.src = "tiles/player/" +fileName +".png";
    this.width = w;
    this.height = h;
};

var PlayerSkins = {

    Female: {
        standingLeft: new PlayerSprite('female/Idle_1-L', 180, 196),
        standingRight: new PlayerSprite('female/Idle_1', 180, 196),
        runningLeft: [
            new PlayerSprite('female/Run_1-L', 180, 196),
            new PlayerSprite('female/Run_2-L', 180, 196),
            new PlayerSprite('female/Run_3-L', 180, 196),
            new PlayerSprite('female/Run_4-L', 180, 196),
            new PlayerSprite('female/Run_5-L', 180, 196),
            new PlayerSprite('female/Run_6-L', 180, 196),
            new PlayerSprite('female/Run_7-L', 180, 196),
            new PlayerSprite('female/Run_8-L', 180, 196),
            new PlayerSprite('female/Run_9-L', 180, 196),
            new PlayerSprite('female/Run_10-L', 180, 196),
            new PlayerSprite('female/Run_11-L', 180, 196),
            new PlayerSprite('female/Run_12-L', 180, 196),
            new PlayerSprite('female/Run_13-L', 180, 196),
            new PlayerSprite('female/Run_14-L', 180, 196),
            new PlayerSprite('female/Run_15-L', 180, 196),
            new PlayerSprite('female/Run_16-L', 180, 196),
            new PlayerSprite('female/Run_17-L', 180, 196),
            new PlayerSprite('female/Run_18-L', 180, 196),
            new PlayerSprite('female/Run_19-L', 180, 196),
            new PlayerSprite('female/Run_20-L', 180, 196)
        ],
        runningRight: [
            new PlayerSprite('female/Run_1', 180, 196),
            new PlayerSprite('female/Run_2', 180, 196),
            new PlayerSprite('female/Run_3', 180, 196),
            new PlayerSprite('female/Run_4', 180, 196),
            new PlayerSprite('female/Run_5', 180, 196),
            new PlayerSprite('female/Run_6', 180, 196),
            new PlayerSprite('female/Run_7', 180, 196),
            new PlayerSprite('female/Run_8', 180, 196),
            new PlayerSprite('female/Run_9', 180, 196),
            new PlayerSprite('female/Run_10', 180, 196),
            new PlayerSprite('female/Run_11', 180, 196),
            new PlayerSprite('female/Run_12', 180, 196),
            new PlayerSprite('female/Run_13', 180, 196),
            new PlayerSprite('female/Run_14', 180, 196),
            new PlayerSprite('female/Run_15', 180, 196),
            new PlayerSprite('female/Run_16', 180, 196),
            new PlayerSprite('female/Run_17', 180, 196),
            new PlayerSprite('female/Run_18', 180, 196),
            new PlayerSprite('female/Run_19', 180, 196),
            new PlayerSprite('female/Run_20', 180, 196)
        ],
        jumpingLeft: new PlayerSprite('female/Jump_3-L', 180, 196),
        jumpingRight: new PlayerSprite('female/Jump_3', 180, 196),

        getCollisionRect: function(sprite, x, y, targetW, targetH) {
            var w = sprite ? sprite.width : 1;
            return new Rect(x, y, targetW / 196 * w, targetH);
        }
    },

    Male: {
        standingLeft: new PlayerSprite('male/Idle_1-L', 150, 196),
        standingRight: new PlayerSprite('male/Idle_1', 150, 196),
        runningLeft: [
            new PlayerSprite('male/Run_1-L', 150, 196),
            new PlayerSprite('male/Run_2-L', 150, 196),
            new PlayerSprite('male/Run_3-L', 150, 196),
            new PlayerSprite('male/Run_4-L', 150, 196),
            new PlayerSprite('male/Run_5-L', 150, 196),
            new PlayerSprite('male/Run_6-L', 150, 196),
            new PlayerSprite('male/Run_7-L', 150, 196),
            new PlayerSprite('male/Run_8-L', 150, 196),
            new PlayerSprite('male/Run_9-L', 150, 196),
            new PlayerSprite('male/Run_10-L', 150, 196),
            new PlayerSprite('male/Run_11-L', 150, 196),
            new PlayerSprite('male/Run_12-L', 150, 196),
            new PlayerSprite('male/Run_13-L', 150, 196)
        ],
        runningRight: [
            new PlayerSprite('male/Run_1', 150, 196),
            new PlayerSprite('male/Run_2', 150, 196),
            new PlayerSprite('male/Run_3', 150, 196),
            new PlayerSprite('male/Run_4', 150, 196),
            new PlayerSprite('male/Run_5', 150, 196),
            new PlayerSprite('male/Run_6', 150, 196),
            new PlayerSprite('male/Run_7', 150, 196),
            new PlayerSprite('male/Run_8', 150, 196),
            new PlayerSprite('male/Run_9', 150, 196),
            new PlayerSprite('male/Run_10', 150, 196),
            new PlayerSprite('male/Run_11', 150, 196),
            new PlayerSprite('male/Run_12', 150, 196),
            new PlayerSprite('male/Run_13', 150, 196)
        ],
        jumpingLeft: new PlayerSprite('male/Jump_3-L', 150, 196),
        jumpingRight: new PlayerSprite('male/Jump_3', 150, 196),

        getCollisionRect: function(sprite, x, y, targetW, targetH) {
            var w = sprite ? sprite.width : 1;
            return new Rect(x, y, targetW / 196 * w, targetH);
        }
    },

    Robot: {
        standingLeft: new PlayerSprite('robot/Idle_1-L', 200, 196),
        standingRight: new PlayerSprite('robot/Idle_1', 200, 196),
        shootingLeft: [
            new PlayerSprite('robot/IdleShoot_1-L', 200, 196),
            new PlayerSprite('robot/IdleShoot_2-L', 200, 196),
            new PlayerSprite('robot/IdleShoot_3-L', 200, 196),
            new PlayerSprite('robot/IdleShoot_4-L', 200, 196)
        ],
        shootingRight: [
            new PlayerSprite('robot/IdleShoot_1', 200, 196),
            new PlayerSprite('robot/IdleShoot_2', 200, 196),
            new PlayerSprite('robot/IdleShoot_3', 200, 196),
            new PlayerSprite('robot/IdleShoot_4', 200, 196)
        ],
        runningLeft: [
            new PlayerSprite('robot/Run_1-L', 200, 196),
            new PlayerSprite('robot/Run_2-L', 200, 196),
            new PlayerSprite('robot/Run_3-L', 200, 196),
            new PlayerSprite('robot/Run_4-L', 200, 196),
            new PlayerSprite('robot/Run_5-L', 200, 196),
            new PlayerSprite('robot/Run_6-L', 200, 196),
            new PlayerSprite('robot/Run_7-L', 200, 196),
            new PlayerSprite('robot/Run_8-L', 200, 196)
        ],
        runningRight: [
            new PlayerSprite('robot/Run_1', 200, 196),
            new PlayerSprite('robot/Run_2', 200, 196),
            new PlayerSprite('robot/Run_3', 200, 196),
            new PlayerSprite('robot/Run_4', 200, 196),
            new PlayerSprite('robot/Run_5', 200, 196),
            new PlayerSprite('robot/Run_6', 200, 196),
            new PlayerSprite('robot/Run_7', 200, 196),
            new PlayerSprite('robot/Run_8', 200, 196)
        ],
        runningShootingLeft: [
            new PlayerSprite('robot/RunShoot_1-L', 200, 196),
            new PlayerSprite('robot/RunShoot_2-L', 200, 196),
            new PlayerSprite('robot/RunShoot_3-L', 200, 196),
            new PlayerSprite('robot/RunShoot_4-L', 200, 196),
            new PlayerSprite('robot/RunShoot_5-L', 200, 196),
            new PlayerSprite('robot/RunShoot_6-L', 200, 196),
            new PlayerSprite('robot/RunShoot_7-L', 200, 196),
            new PlayerSprite('robot/RunShoot_8-L', 200, 196)
        ],
        runningShootingRight: [
            new PlayerSprite('robot/RunShoot_1', 200, 196),
            new PlayerSprite('robot/RunShoot_2', 200, 196),
            new PlayerSprite('robot/RunShoot_3', 200, 196),
            new PlayerSprite('robot/RunShoot_4', 200, 196),
            new PlayerSprite('robot/RunShoot_5', 200, 196),
            new PlayerSprite('robot/RunShoot_6', 200, 196),
            new PlayerSprite('robot/RunShoot_7', 200, 196),
            new PlayerSprite('robot/RunShoot_8', 200, 196)
        ],
        jumpingLeft: new PlayerSprite('robot/Jump_3-L', 200, 196),
        jumpingRight: new PlayerSprite('robot/Jump_3', 200, 196),
        jumpingShootingLeft: new PlayerSprite('robot/JumpShoot_1-L', 200, 196),
        jumpingShootingRight: new PlayerSprite('robot/JumpShoot_1', 200, 196),

        getCollisionRect: function(sprite, x, y, targetW, targetH) {
            return new Rect(x + 19.2, y, 55, targetH);
        }
    }

};

module.exports = PlayerSkins;