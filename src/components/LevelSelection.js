// This is the level selection that gets displayed on the start screen (when the player has unlocked the portal item).
// It can be used to jump to the desired level directly - which pretty useful for debugging, too ;)

import GameActions from '../actions/GameActions';
import LevelActions from '../actions/LevelActions';
import Levels from '../game/Levels';
import LevelStore from '../stores/LevelStore';
import React from 'react';

// A level element in the list of levels
class LevelEntry extends React.Component {

  render() {
    return (
      <li className="level-selection-item">
        <button onClick={this.handleLevelSelected} disabled={!LevelStore.canSelectLevel(this.props.number)}>
          <p>Teleport: {this.props.level.name}</p>
        </button>
      </li>
    );
  }

  handleLevelSelected = () => {
    if(LevelStore.canSelectLevel(this.props.number)) {
      GameActions.startGame();
      LevelActions.loadLevel(this.props.number);
    }
  }

}

// The list of levels. The list should be hidden (via CSS) when the player hasn't unlocked the portal item, yet. The
// corresponding class gets set here - so no need for additional state in the start menu.
export default function LevelSelection(props) {
  const levelList = Levels.map(function(level, idx) {
    return <LevelEntry key={idx} level={level} number={idx} />
  });
  var cls = "level-selection" + LevelStore.levelSelectionEnabled ? "" : " hidden";
  return (
    <div className={cls}>
      <ul className="level-selection-list">
        {levelList}
      </ul>
    </div>
  );
}