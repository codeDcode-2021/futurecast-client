import React, { Component } from "react";
import Login from './pages/login'
import newQuestion from './pages/newQuestion'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/login" component={Login} />
      <Route path="/newquestion" component={newQuestion} />
    </Switch>
    </Router>
  );
}

export default App;
