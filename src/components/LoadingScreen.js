import React from 'react';
import GameStore from '../stores/GameStore';
import Levels from '../game/Levels';
import LevelStore from '../stores/LevelStore';

class LoadingScreen extends React.Component {
    
  componentDidMount() {
    this.props.sound.play('intro');
  }

  componentWillUnmount() {
    this.props.sound.stop('intro');
  }

  render() {
    var description = Levels[LevelStore.level].description.replace(/<name>/gi, GameStore.texts.name);
    return (
      <div className="loading-screen"> 
        <h2>Level: {LevelStore.level +1}</h2>
        <div className="level-description">
          <p>{description}</p>
        </div>
      </div>
    );
  }

}

export default LoadingScreen;