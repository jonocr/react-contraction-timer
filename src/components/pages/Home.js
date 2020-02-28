import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../Auth";
import { Timer } from "../Timer";
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
                        <div><h5>This is Home</h5></div>
                    )}

                <br></br>
                <Timer></Timer>
                {/* <ContractionHistory></ContractionHistory> */}
            </div>
        </div>
    )

}

export default Home;