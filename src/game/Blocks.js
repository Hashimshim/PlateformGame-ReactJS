// This module contains the definitions of the various level blocks. Usual blocks have a source size of 128 * 128 px
// and will be scaled down to 48 * 48 px. Background objects have different sizes - and get scaled with an additional
// factor. Keep that in mind, when you're placing them in the levels.

// A background tile (for various types of ground and sky)
class Ground {
  constructor(theme, fileName, turningPoint) {
    this.type = 'Ground';
    this.collide = true;
    this.solid = true;
    this.deadly = false;
    this.turningPoint = turningPoint;
    this.sprite = new Image(128, 128);
    this.sprite.src = 'tiles/' + theme + '/' + fileName;
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.scaleX = 1;
    this.scaleY = 1;
  }
}

// A background tile for water
class Water {
  constructor(theme, fileName) {
    this.collide = true;
    this.solid = false;
    this.deadly = false;
    this.type = 'Water';
    this.sprite = new Image(128, 128);
    this.sprite.src = 'tiles/' + theme + '/' + fileName;
    this.spriteWidth = 128;
    this.spriteHeight = 128;
    this.scaleX = 1;
    this.scaleY = 1;
  }
}

// A background object (like trees, bushes, ...)
class BackgroundObject {
  constructor(fileName, w, h, sx, sy) {
    this.collide = false;
    this.solid = false;
    this.deadly = false;
    this.type = 'BackgroundObject';
    this.sprite = new Image(w, h);
    this.sprite.src = 'tiles/objects/' + fileName;
    this.spriteWidth = w;
    this.spriteHeight = h;
    this.scaleX = sx;
    this.scaleY = sy;
  }
}

// Obstacles
class Obstacle {
  constructor(fileName, w, h, solid) {
    this.collide = true;
    this.solid = solid;
    this.deadly = false;
    this.type = 'Obstacle';
    this.sprite = new Image(w, h);
    this.sprite.src = 'tiles/objects/' + fileName;
    this.spriteWidth = w;
    this.spriteHeight = h;
    this.scaleX = 1;
    this.scaleY = 1;
  }
}

// Some kind of special tile (respawn point, exit, ...)
class Special {
  constructor(type, fileName, collide, solid, deadly, x) {
    this.collide = collide;
    this.solid = solid;
    this.deadly = deadly;
    this.type = type;
    this.sprite = new Image(x, x);
    this.sprite.src = 'tiles/' + fileName;
    this.spriteWidth = x;
    this.spriteHeight = x;
    this.scaleX = 1;
    this.scaleY = 1;
  }
}

// Monsters are another special kind of Block. These blocks will be replaced after loading -> no sprite required here.
class Monster {
  constructor(subtype) {
    this.type = 'Monster';
    this.subtype = subtype;
  }
}

// A container for the various types of level blocks.
class Blocks {
  constructor(theme) {
    this['1'] = new Ground(theme, '1.png', true);
    this['2'] = new Ground(theme, '2.png', false);
    this['3'] = new Ground(theme, '3.png', true);
    this['4'] = new Ground(theme, '4.png', false);
    this['5'] = new Ground(theme, '5.png', false);
    this['6'] = new Ground(theme, '6.png', false);
    this['7'] = new Ground(theme, '7.png', false);
    this['8'] = new Ground(theme, '8.png', false);
    this['9'] = new Ground(theme, '9.png', false);
    this['A'] = new Ground(theme, 'A.png', false);
    this['B'] = new Ground(theme, 'B.png', false);
    this['C'] = new Ground(theme, 'C.png', false);
    this['D'] = new Ground(theme, 'D.png', true);
    this['E'] = new Ground(theme, 'E.png', false);
    this['F'] = new Ground(theme, 'F.png', true);
    this['G'] = new Ground(theme, 'G.png', false);

    this['H'] = new Water(theme, 'H.png');
    this['I'] = new Water(theme, 'I.png');

    this['J'] = new BackgroundObject('Bush_1.png', 145, 88, 2, 1);
    this['K'] = new BackgroundObject('Bush_2.png', 131, 74, 2, 1);
    this['L'] = new BackgroundObject('Bush_3.png', 73, 47, 1.7, 1);
    this['M'] = new BackgroundObject('Bush_4.png', 73, 46, 1.7, 1);
    this['N'] = new BackgroundObject('Bush_5.png', 133, 65, 2, 1);
    this['O'] = new BackgroundObject('Bush_6.png', 133, 65, 2, 1);
    this['P'] = new BackgroundObject('Cactus_1.png', 108, 111, 1.5, 2);
    this['Q'] = new BackgroundObject('Cactus_2.png', 70, 45, 1.5, 1);
    this['R'] = new BackgroundObject('Grass_1.png', 102, 50, 2, 1);
    this['S'] = new BackgroundObject('Grass_2.png', 102, 50, 2, 1);
    this['T'] = new BackgroundObject('Crystal.png', 97, 78, 1.2, 1);
    this['U'] = new BackgroundObject('Igloo.png', 511, 201, 5, 2);
    this['V'] = new BackgroundObject('Stone_1.png', 124, 73, 1.8, 1);
    this['W'] = new BackgroundObject('Stone_2.png', 90, 54, 1.5, 1);
    this['X'] = new BackgroundObject('Stone_3.png', 124, 78, 1.8, 1);
    this['Y'] = new BackgroundObject('Mushroom_1.png', 49, 41, 1.1, 1);
    this['Z'] = new BackgroundObject('Mushroom_2.png', 50, 41, 1.1, 1);
    this['a'] = new BackgroundObject('Tree_1.png', 116, 44, 2, 1);
    this['b'] = new BackgroundObject('Tree_2.png', 283, 301, 2.8, 3);
    this['c'] = new BackgroundObject('Tree_3.png', 282, 275, 3, 3);
    this['d'] = new BackgroundObject('Tree_4.png', 364, 280, 3, 3);
    this['f'] = new BackgroundObject('Tree_5.png', 228, 280, 2.4, 3);
    this['g'] = new BackgroundObject('Tree_6.png', 313, 260, 3.5, 3);

    this['!'] = new Obstacle('Crate.png', 101, 101, true);
    this['*'] = new Obstacle('transparent.png', 1, 1, false);
    this['<'] = new Obstacle('IceBox.png', 101, 101, true);
    this['§'] = new Obstacle('StoneBlock.png', 101, 99, true);

    this['y'] = new Special('respawn', 'objects/transparent.png', false, false, false, 1);
    this['e'] = new Special('exit', 'objects/transparent.png', true, false, false, 1);
    this['}'] = new Special('exit', 'objects/Shorty.png', true, false, false, 48);
    this['h'] = new Special('coin', 'objects/jewel_1.png', true, false, false, 52);
    this['i'] = new Special('super_coin', 'objects/jewel_2.png', true, false, false, 52);

    this['.'] = new Monster('blob');
    this[':'] = new Monster('cyclopse');
    this[';'] = new Monster('plum');
    this[','] = new Monster('redZombie');
    this['+'] = new Monster('spikyBlob');
    this['-'] = new Monster('spiky');
    this['/'] = new Monster('wasp');
    this['='] = new Monster('zombie');
  }
}

export default Blocks;