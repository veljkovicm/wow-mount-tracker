import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages
import { Home, Mounts } from './pages';


import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/mounts/:region/:realm/:character" render={(props) => <Mounts {...props}/>} />
          {/* TODO: Add 404 component */}
          <Route component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
