import GameActions from '../actions/GameActions';
import Reflux from 'reflux';

const texts = {
  'female': {
      name: 'Amal'
  },
  'male': {
      name: 'Ali'
  }
};

const GameStore = Reflux.createStore({
    listenables: GameActions,

    // Initial setup
    init: function() {
        this.highscore = localStorage.getItem('highscore') || 0;
        this.setCharacter(localStorage.getItem('character') || 'male');
        this.hasArmor = false;
    },

    addCoins: function(newCoins) {
        this.coins += newCoins;
    },

    addPoints: function(newPoints) {
        this.updateScore(this.score + newPoints);
    },

    setArmor: function(armor) {
        this.hasArmor = armor;
    },

    setCharacter: function(character) {        
        this.character = character;
        localStorage.setItem('character', this.character);
        this.texts = texts[character];
    },

    startGame: function() {
        this.coins = 0;
        this.lives = 3; //////
        this.score = 0;
    },

    updateLives: function(newLives) {
        this.lives = newLives;
    },

    updateScore: function(newScore) {
        this.score = newScore;
        this.highscore = newScore > this.highscore ? newScore : this.highscore;
        localStorage.setItem('highscore', this.highscore);
    },

    updateCoins: function(newCoins) {
        this.coins = newCoins;
    }

});

export default GameStore;