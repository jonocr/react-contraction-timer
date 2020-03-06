import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../Auth";
import { Timer } from "../Timer";
import { Redirect } from 'react-router-dom';

export const Home = (props) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="center-div">
            <div className="center-children">
                 {/* <div><h5>Welcome: {currentUser.email}</h5></div> */}
                <h1>TIMER</h1>

                {currentUser ? (
                    <div></div>                   
                ) : (                       
                        <Redirect to="/login" />                       
                    )}

                <br></br>
                <Timer></Timer>
            </div>
        </div>
    )

}

export default Home;