import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
// import app from "./base.js";
import { AuthProvider } from "./components/Auth";
import NavBar from './components/NavBar';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import './main.css';
import PrivateRoute from "./components/pages/PrivateRoute";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        

        <Router>
        <NavBar></NavBar>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/home" component={Home} />
            <Route exact path="/login" component={Login}></Route>
          </div>
        </Router>

        <header className="App-header">


        </header>

      </AuthProvider>

    </div>
  );
}

export default App;
