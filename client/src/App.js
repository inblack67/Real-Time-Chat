import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import './App.css';

import RoomState from './context/room/RoomState'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Room from './components/smart/Room';
import Namespace from './components/smart/Namespace';

function App() {

  useEffect(() => {
    M.AutoInit();
  });

  return (
    <RoomState>
    <Router>
        <div className="App">
      <Switch>
          <Route exact path='/' component={Namespace} />
          <Route exact path='/chat/:room' component={Room} />
      </Switch>
        </div>
    </Router>
    </RoomState>
  );
}

export default App;
