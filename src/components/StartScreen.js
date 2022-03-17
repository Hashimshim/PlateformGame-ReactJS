import React from 'react';
import GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';
import LevelActions from '../actions/LevelActions';
import LevelSelection from './LevelSelection';

class StartScreen extends React.Component {

  componentDidMount() {
    this.props.sound.play('menu');
  }

  componentWillUnmount() {
    this.props.sound.stop('menu');
  }

  render() {
    return (
      <div id="game-menu">
        <div className="menu-title">
          <span className="c1">E</span>
          <span className="c2">N</span>
          <span className="c3">S</span>
          <span className="c4">A</span>
          <span className="c5">M</span>
          &nbsp;
          <span className="c6">R</span>
          <span className="c1">U</span>
          <span className="c4">N</span>
          <span className="c3">N</span>
          <span className="c1">E</span>
          <span className="c2">R</span>
        </div>
        
        <div className="player-selection">
          <div className="player-option-l">
            <button className="menu-item" onClick={this.handleMenuStartM}>
              <img src="tiles/player/male/Idle_1.png" alt="male avatar"/>
              <p>Play as Ali</p>
            </button>
          </div>
          <div className="player-option-r">
            <button className="menu-item" onClick={this.handleMenuStartF}>
              <img src="tiles/player/female/Idle_1.png" alt="female avatar" />
              <p>Play as Amal</p>
            </button>
          </div>
        </div>

        <LevelSelection />

        <p style={{color:'white'}}>Highscore: {GameStore.highscore}</p>
        <button onClick={this.resetLocal}>Reset</button>
      </div>
    );
  }
  resetLocal = () => {
    localStorage.clear();
    window.location.reload(false);
  }

  handleMenuStartF = () => {
    GameActions.setCharacter('female');
    GameActions.startGame();
    LevelActions.loadLevel(0);
  }

  handleMenuStartM = () => {
    GameActions.setCharacter('male');
    GameActions.startGame();
    LevelActions.loadLevel(0);
  }

}

export default StartScreen;