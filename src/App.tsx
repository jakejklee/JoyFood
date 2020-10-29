import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import './App.css';
import MyRestaurant from './components/Restaurant/MyRestaurant';
import RestaurantDetail from './components/Restaurant/RestaurantDetail';

function App() {
  return (
    <Router>
      <div style={{}}>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/myrestaurant" component={MyRestaurant} />
          <Route exact path="/restaurantdetail" component={RestaurantDetail} />
          {/* <Route path="/email-verification" component={EmailVerification} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
