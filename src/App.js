import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Registration from './views/Registration';
import NotFound from './views/NotFound';
import Universities  from './views/Universities';
import Favorites from './views/Favorites';
import Subscriptions from './views/Subscriptions';
import ViewLayout from './views/ViewLayout';
import { isLoggedIn } from '../src/services/api';

function App() {

  return (
    <Router>
      
      <Switch>
        <Route exact path="/"
           render={({ location }) =>
           isLoggedIn() ? (
            <Redirect
            to={{
              pathname: "/dashboard",
              state: { from: location }
            }}
          />
           ) : (
           <Login />
         )}
        />
          
        <Route 
          path="/dashboard"
          render={({ location }) =>
            isLoggedIn() ? (
              <ViewLayout>
                <Dashboard />
              </ViewLayout>
            ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )}
        />

        <Route exact path="/registration">
          <Registration />
        </Route>

        <Route path="/favorites">
          <ViewLayout>
            <Favorites />
          </ViewLayout>
        </Route>

        <Route path="/universities">
        <ViewLayout>
          <Universities />
        </ViewLayout>
        </Route>

        <Route path="/subscriptions">
        <ViewLayout>
          <Subscriptions />
        </ViewLayout>
        </Route>

        <Route component={NotFound} />
      </Switch>
      
  </Router>
  );
}

export default App;
