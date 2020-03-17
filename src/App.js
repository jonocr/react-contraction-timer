import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp"; 
import './main.css';
import PrivateRoute from "./components/pages/PrivateRoute";

function App() { 

  return (
    <div className="App">    
        <Router>
        <NavBar></NavBar>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/home" component={Home} ></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/signup" component={SignUp}></Route>
          </div>
        </Router>
        <header className="App-header">
        </header>
    </div>
  );
}

export default App;
