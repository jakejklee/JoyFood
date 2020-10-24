import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{}}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          {/* <Route path="/email-verification" component={EmailVerification} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
