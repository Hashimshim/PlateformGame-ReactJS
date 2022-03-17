// These are the cheat codes that Paulix understands. Cheats are available during a running game only. When the game is
// running just start typing these codes and benefit. Adding new cheats is easy, too. Just add a new object to the codes
// property and e.g. call any action you like.

import GameActions from '../actions/GameActions';
import LevelActions from '../actions/LevelActions';

var Cheats = {

    codes: [
        {
            name: 'IDDQD',
            keyCodes: [73,68,68,81,68],
            action: function() {
                GameActions.updateLives(666);
            }
        },
        {
            name: 'IDCLEV',
            keyCodes: [73,68,67,76,69,86],
            action: function() {
                LevelActions.enableLevelSelection();
            }
        },
        {
            name: 'IDKFA',
            keyCodes: [73,68,75,70,65],
            action: function() {
                GameActions.setArmor(true);
            }
        }
    ],

    keyboardInput: [],

    keyPressed: function(keyCode) {
        this.keyboardInput.push(keyCode);
        this.codes.forEach(function(cheat) {
            if(this.keyboardInput.length >= cheat.keyCodes.length) {
                var a = this.keyboardInput.length -cheat.keyCodes.length;
                var b = a + cheat.keyCodes.length;
                var comp = this.keyboardInput.slice(a, b);
                if(JSON.stringify(comp) === JSON.stringify(cheat.keyCodes)) {
                    cheat.action();
                }
            }
        }.bind(this));
    }
};

export default Cheats;