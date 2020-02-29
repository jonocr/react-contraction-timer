import React, { useState, useEffect, useContext } from 'react';
import { ContractionHistory } from "./ContractionHistory";
import { AuthContext } from "./Auth";
import app from "./base";
import '@firebase/firestore';

// days: Math.floor(difference / (1000 * 60 * 60 * 24)),
// hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
// minutes: Math.floor((difference / 1000 / 60) % 60),
// seconds: Math.floor((difference / 1000) % 60)

// React.useEffect(() => {
//     const fetchData = async () => {
//       const db = firebase.firestore();
//       const data = await db.collection("spells").get();
//       setSpells(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
//     };
//     fetchData();
//   }, []);

//   const onCreate = () => {
//     const db = firebase.firestore();
//     db.collection("spells").add({ name: newSpellName });
//   };


export const Timer = (props) => {
    const [contractions, setContractions] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [toogleButton, setToogleButton] = useState('start');
    const [timer, setTimer] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    // const [days, setDays] = useState(0);
    const [key, setkey] = useState(0);

    // console.log("username: ", JSON.stringify(currentUser.email));



    const [startTime, setStartTime] = useState(null);
    const [lastContraction, setLastContraction] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [history, setHistory] = useState([]);


    const handleTimerClick = (e) => {
        toogleButton === 'start' ? setToogleButton('stop') : setToogleButton('start');
        //When timer starts
        if (toogleButton === 'start') {
            setStartTime(new Date());
            setkey(key + 1);
        }

        //Timer stops
        if (toogleButton === 'stop') {
            let lastContractionMark = lastContraction;
            const stopMark = new Date();

            //First time lastcontraction is null so it is set to 
            if (!lastContraction) {
                setLastContraction(startTime);
                lastContractionMark = startTime;
            }

            setEndTime(stopMark);
            const contraction = {
                startTime: startTime,
                endTime: stopMark,
                interval: (startTime - lastContractionMark),
                duration: (stopMark - startTime),
                lastContraction: lastContraction,
                id: key,
                user: currentUser.email
            }

            //Save Data In DB            
            const db = app.firestore();
            db.collection("contractions").add({
                startTime: startTime,
                endTime: stopMark,
                interval: (startTime - lastContractionMark),
                duration: (stopMark - startTime),
                lastContraction: lastContraction,
                user: currentUser.email
            });

            //Clears the Clock UI
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            setTimer(0);

            //Next Last Contraction is the previous Start Time
            setLastContraction(startTime);

            //Save History
            history.push(contraction);
            setHistory(history);
        }
    };


    useEffect(() => {
        let interval = null;

        //component did mount 
        //Start clock
        if (toogleButton === 'stop') {
            interval = setInterval(tick, 1000);
            setSeconds(Math.floor(timer % 60));
            setMinutes(Math.floor((timer / 60) % 60));
            setHours(Math.floor(timer / (60 * 60) % 24));
        }

        //Stop Clock
        if (toogleButton === 'start') {
            clearInterval(interval);
        }

        //Get Contractions History
        if (currentUser) {
            fetchData();
        }

        //Component will unmount
        //Clear Interval
        return () => clearInterval(interval);
    }, [timer, toogleButton]);

    const tick = () => {
        setTimer(timer + 1);
    };

    const fetchData = async () => {
        const db = app.firestore();
        const data = await db.collection('contractions').where("user", "==", currentUser.email).orderBy('startTime', 'desc').get();
        setContractions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        // console.log("data: ", data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }


    return (
        <div>
            <div className="center-div">
                <div className="center-children">
                    <a href="#" className="btn-circle" onClick={(e) => handleTimerClick(e)}>{toogleButton}</a>
                    <p>
                        Timer: {hours}:{minutes}:{seconds}
                    </p>
                    <br></br>
                    <p>
                        Hours: {hours}  Minutes: {minutes}  Seconds: {seconds}
                    </p>
                </div>
            </div>

            <ContractionHistory data={contractions} ></ContractionHistory>
        </div>
    )
}