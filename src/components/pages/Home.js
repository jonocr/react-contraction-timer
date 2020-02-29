import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../Auth";
import { Timer } from "../Timer";
import { Redirect } from 'react-router-dom';
// import { ContractionHistory } from "../ContractionHistory";

export const Home = (props) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="center-div">
            <div className="center-children">
                <h1>Home</h1>

                {currentUser ? (
                    <div><h5>Welcome: {currentUser.email}</h5></div>
                ) : (                       
                        <Redirect to="/login" />                       
                    )}

                <br></br>
                <Timer></Timer>
                {/* <ContractionHistory></ContractionHistory> */}
                  {/* <div><h5>This is Home</h5></div> */}
            </div>
        </div>
    )

}

export default Home;