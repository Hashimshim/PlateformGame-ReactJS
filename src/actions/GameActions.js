import Reflux from 'reflux';

const GameActions = Reflux.createActions([
    "addCoins",
    "addPoints",
    "setArmor",
    "setCharacter",
    "startGame",
    "updateCoins",
    "updateLives",
    "updateScore"
]);

GameActions.addCoins.sync = true;
GameActions.addPoints.sync = true;
GameActions.setArmor.sync = true;
GameActions.updateCoins.sync = true;
GameActions.updateLives.sync = true;
GameActions.updateScore.sync = true;

export default GameActions;