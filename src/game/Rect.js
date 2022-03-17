// This utility class gets used do the calculations of the collision detection. Nothing fancy here.
// If you want some nice visualization of rectangle intersection, go to https://silentmatt.com/rectangle-intersection/

// Describes a collision
var Collision = function() {
    this.top = false;
    this.bottom = false;
    this.left = false;
    this.right = false;

    this.none = function() {
        return !(this.top || this.bottom || this.left || this.right);
    }
};

// A rectangle used to calculate a intersection.
var Rect = function(x,y,w,h) {

    this.x1 = x;
    this.y1 = y;
    this.x2 = x+w;
    this.y2 = y+h;

    this.intersect = function(b, skipDetails) {
        var result = new Collision();
        if((this.x1 < b.x2) && (this.x2 > b.x1) && (this.y1 < b.y2) && (this.y2 > b.y1)) {
            if(skipDetails) {
                result.top = true;
                result.right = true;
                result.bottom = true;
                result.left = true;
            } else {
                result.top = !this.intersect(b.getBottomSensorArea(), true).none();
                result.right = !this.intersect(b.getLeftSensorArea(), true).none();
                result.bottom = !this.intersect(b.getTopSensorArea(), true).none();
                result.left = !this.intersect(b.getRightSensorArea(), true).none();
            }
        }
        return result;
    };

    this.centerX = function() {
        return (this.x1 + this.x2) /2;
    };

    this.getTopSensorArea = function() {
        return new Rect(this.x1 +12, this.y1, w -24, 12);
    };

    this.getBottomSensorArea = function() {
        return new Rect(this.x1 +12, this.y2 -12, w -24, 12);
    };

    this.getLeftSensorArea = function() {
        return new Rect(this.x1, this.y1 +12, 12, h -24);
    };

    this.getRightSensorArea = function() {
        return new Rect(this.x1 +w -12, this.y1 +12, 12, h -24);
    };
};

module.exports = Rect;