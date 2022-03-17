import React from 'react';

class GameOverScreen extends React.Component {
    
  componentDidMount() {
    this.props.sound.play('game_over');
  }
  
  componentWillUnmount() {
    this.props.sound.stop('game_over');
  }
  
  render() {
    return (
      <div>
        <p>Game Over</p>
      </div>
    );
  }

}

export default GameOverScreen;