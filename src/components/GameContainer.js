import React from 'react';
import Reflux from 'reflux';
import reactMixin from 'react-mixin';

import Credits from './Credits';
import Game from '../game/Game';
import GameOverScreen from './GameOverScreen';
import LevelStore from '../stores/LevelStore';
import LoadingScreen from './LoadingScreen';
import Sound from '../game/Sound';
import StartScreen from './StartScreen';
import Shop from './Shop';

class GameContainer extends React.Component {

  constructor(props) {
    super(props);
    this.sound = new Sound('suse');
    this.state = { stage: "menu" };
  }

  render() {
    var content = undefined;
    switch(this.state.stage) {
      case "gameOver":
        content = <GameOverScreen sound={this.sound} />;
        break;
      case "loading":
        content = <LoadingScreen sound={this.sound} />;
        break;
      case "game":
        content = <Game sound={this.sound} />;
        break;
      case "shop":
        content = <Shop sound={this.sound} />;
        break;
      case "credits":
        content = <Credits sound={this.sound} />;
        break;
      default:
        content = <StartScreen sound={this.sound} />;
        break;
    }
    return (
      <div id="game-container">
        {content}
      </div>
    );
  }

  onLevelChange = (event, data) => {
    console.debug("onLevelChange", event, data);
    switch(event) {
      case 'showCredits':
        this.setState({stage: "credits"});
        break;
      case 'showGameOver':
        this.setState({stage: "gameOver"});
        break;
      case 'showLevel':
        this.setState({stage: "game"});
        break;
      case 'showLoading':
        this.setState({stage: "loading"});
        break;
      case 'showMenu':
        this.setState({stage: "menu"});
        break;
      case 'showStore':
        this.setState({stage: "shop"});
        break;
      default:
        this.setState({stage: "loading"});
        break;
    }
  }

}

reactMixin(GameContainer.prototype, Reflux.listenTo(LevelStore,"onLevelChange"));
export default GameContainer;