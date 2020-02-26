import React, { useContext } from 'react';
import { AuthContext } from "../Auth";
import { Timer } from "../Timer";
// import { ContractionHistory } from "../ContractionHistory";

export const Home = (props) => {
    const { currentUser } = useContext(AuthContext);





    // ***************************************************************************//
    //https://javascript.info/settimeout-setinterval




    // useEffect(() => {
    //     // console.log("UseEffect[toogleButton] ");
    //     // setTimer(timer + 1);
    //     // exit early when we reach 0
    //     // if (!timeLeft) return;

    //     // save intervalId to clear the interval when the
    //     // component re-renders



    //     // clear interval on re-render to avoid memory leaks
    //     // return () => clearInterval(intervalId);

    //     // add timeLeft as a dependency to re-rerun the effect
    //     // when we update it
    // }, []);


    //********************************************************************************************* */



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