import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp"; 
import Reset from "./components/pages/Reset"; 
import './main.css';
import PrivateRoute from "./components/pages/PrivateRoute";

function App() { 

  return (
    <div className="App">    
        <Router>
        <NavBar></NavBar>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
            <Route exact path="/reset" component={Reset}></Route>
          </div>
        </Router>
        <header className="App-header">
        </header>
    </div>
  );
}

export default App;
