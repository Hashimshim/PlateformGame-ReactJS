import LevelActions from '../actions/LevelActions';
import Levels from '../game/Levels';
import Reflux from 'reflux';

const LevelStore = Reflux.createStore({
    listenables: LevelActions,

    // Initial setup
    init: function() {
        this.level = 0;
        this.levelSelectionEnabled = localStorage.getItem('levelSelectionEnabled') || false;
    },

    canSelectLevel: function(number) {
        return localStorage.getItem('hasFinishedLevel_' +number) || false;
    },

    creditsShown: function() {
        this.trigger('showMenu');
    },

    enableLevelSelection: function() {
        this.levelSelectionEnabled = true;
        localStorage.setItem('levelSelectionEnabled', true);
    },

    loadGameOver: function() {
        this.trigger('showGameOver');
        setTimeout(function() {
            this.trigger('showMenu');
        }.bind(this), 1250);
    },

    loadLevel: function(number) {
        this.level = undefined === number ? this.level : number; //////
        this.trigger('showLoading', this.level);
        setTimeout(function() {
            this.trigger('showLevel', number);
        }.bind(this), 3250);
    },

    levelWon: function() {
        localStorage.setItem('hasFinishedLevel_' +this.level, true);
        if(this.level < Levels.length -1) {
            setTimeout(function() {
                this.level++;
                this.trigger("showStore");
            }.bind(this), 1250);
        } else {
            this.trigger("showCredits");
        }
    }

});

export default LevelStore;