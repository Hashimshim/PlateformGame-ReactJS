import React from 'react';
import $ from 'jquery';
import GameStore from '../stores/GameStore';
import LevelActions from '../actions/LevelActions';

export default class Credits extends React.Component {

  componentDidMount() {
    this.props.sound.play('credits');
    setTimeout(function() { $('.credits').animate({ scrollTop: 1200}, 60000, "linear"); }, 10000);
  }

  render() {
    return (
      <div className="credits">
        <h1>WELL DONE!</h1>

        <p>
        Congratulations, you did it!  {GameStore.texts.name} has arrived
        in time and the monsters have been driven away from school.
        </p>
        <p>
          {GameStore.texts.name} is ready for more adventures in Sidi Othman.
        </p>

        <p>THANK YOU FOR PLAYING</p>
        <p>
          To anyone who wants to contribute to the development of more levels of this game, please contact one of the
          group members. 
        </p>
        <p>
          <button onClick={this.returnToMenu}>Back to home screen</button>
        </p>
      </div>
    );
  }

  returnToMenu = () => {
    this.props.sound.stop('credits');
    LevelActions.creditsShown();
  }

}