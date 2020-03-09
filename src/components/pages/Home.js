import React, { useContext } from 'react';
import { AuthContext } from "../Auth";
import { Timer } from "../Timer";
import { Redirect } from 'react-router-dom';

export const Home = (props) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="center-div">
            <div className="center-children">

                {currentUser ? (
                    <h1>TIMER</h1>
                ) : (
                        <Redirect to="/login" />
                    )}

                <br></br>
                {/* <Timer></Timer> */}
            </div>
        </div>
    )

}

export default Home;