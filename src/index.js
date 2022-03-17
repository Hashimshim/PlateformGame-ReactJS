import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './components/GameContainer';
import * as serviceWorker from './serviceWorker';
import { Helmet } from 'react-helmet'

ReactDOM.render(
  <React.StrictMode>
    <Helmet>
          <title>Ensam Runner</title>
    </Helmet>
    <GameContainer />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
