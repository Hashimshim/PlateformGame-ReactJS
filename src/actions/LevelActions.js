import Reflux from 'reflux';

const LevelActions = Reflux.createActions([
    "creditsShown",
    "enableLevelSelection",
    "levelWon",
    "loadLevel",    
    "loadGameOver"    
]);

export default LevelActions;