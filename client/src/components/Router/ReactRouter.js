import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from '../Login/Login'
import Home from '../Home/Home'
import Admin from '../Admin/Admin'
import Register from '../Register/Register'
import NoMatch from '../NoMatch/NoMatch'
import Logout from '../Logout/Logout';

function ReactRouter() {
    return (
    
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
              <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
    
    )
}

export default ReactRouter
