import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import './main.css';
import PrivateRoute from "./components/pages/PrivateRoute";
import { AuthContext } from "./components/Auth";

function App() { 
  const { currentUser } = useContext(AuthContext);
  // let history = useHistory();

  useEffect(()=>{
    if (currentUser) {
      console.log("user exist", currentUser.email);
      // history.push("/home");
    }
  },[]);

  return (
    <div className="App">    
        <Router>
        <NavBar></NavBar>
          <div>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/home" component={Home} ></Route>
            <Route exact path="/login" component={Login}></Route>
          </div>
        </Router>
        <header className="App-header">
        </header>
    </div>
  );
}

export default App;
