import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Registration from './views/Registration';
import NotFound from './views/NotFound';
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
              <Dashboard />
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

        <Route component={NotFound} />

      </Switch>
  </Router>
  );
}

export default App;
