// This module contains the Sound class. You'll have to create an instance of this class using the exported constructor.
// A sound instance contains all sounds for a specified theme and can be used to play / pause / etc. these sounds.

var Sound = function() {

    this.sounds = {
        // sound effects
        theme: new Audio("sounds/theme.mp3"),
        jump: new Audio("sounds/jump.mp3"),
        jump_on_enemy: new Audio("sounds/jump_on_enemy.mp3"),
        coin: new Audio("sounds/coin.mp3"),
        dead: new Audio("sounds/dead.mp3"),
        fire: new Audio("sounds/fire.mp3"),
        success: new Audio("sounds/success.mp3"),

        // music
        menu: new Audio("music/Theme.mp3"),
        shop: new Audio("music/Shop.mp3"),
        intro: new Audio("music/Intro.mp3"),
        credits: new Audio("music/Credits.mp3"),
        game_over: new Audio("music/GameOver.mp3"),
        level_1: new Audio("music/Level_1.mp3"),
        level_2: new Audio("music/Level_2.mp3"),
        level_3: new Audio("music/Level_3.mp3"),
        level_4: new Audio("music/Level_4.mp3")
    };

    this.sounds['menu'].volume = 1.0;
    this.sounds['shop'].volume = 0.7;
    this.sounds['intro'].volume = 0.6;
    this.sounds['fire'].volume = 0.5;
    this.sounds['credits'].volume = 0.5;
    this.sounds['game_over'].volume = 0.7;
    this.sounds['level_1'].volume = 0.7;
    this.sounds['level_2'].volume = 0.7;
    this.sounds['level_3'].volume = 0.7;
    this.sounds['level_4'].volume = 0.7;

    this.play = function(sound) {
        this.stop(sound);
        try {
            this.sounds[sound].play();
        } catch (error) {
            console.log('Cannot play sound', sound);
        }
    };

    this.stop = function(sound) {
        try {
            this.sounds[sound].pause();
            this.sounds[sound].currentTime = 0;
         } catch (error) { }
    };

};

module.exports = Sound;