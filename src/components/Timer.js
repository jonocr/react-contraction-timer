import React, { useState, useEffect, useContext } from 'react';
import { ContractionHistory } from "./ContractionHistory";
import { AuthContext } from "./Auth";
import app from "./base";
import '@firebase/firestore';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/*
*Tabs 
*/
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },
}));

/*
*Timer
*/
export const Timer = (props) => {
    //Material Tabs
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    //Timer
    const [contractions, setContractions] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const [toogleButton, setToogleButton] = useState('START');
    const [timer, setTimer] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [key, setkey] = useState(0);
    const [startTime, setStartTime] = useState(null);
    const [lastContraction, setLastContraction] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [history, setHistory] = useState([]);


    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleTimerClick = (e) => {
        toogleButton === 'START' ? setToogleButton('STOP') : setToogleButton('START');
        //When timer starts
        if (toogleButton === 'START') {
            setStartTime(new Date());
            setkey(key + 1);
        }

        //Timer stops
        if (toogleButton === 'STOP') {
            let lastContractionMark = lastContraction;
            const stopMark = new Date();

            //First time lastcontraction is null so it is set to 
            if (!lastContraction) {
                setLastContraction(startTime);
                lastContractionMark = startTime;
            }

            //TODO Check this state
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
        if (toogleButton === 'STOP') {
            interval = setInterval(tick, 1000);
            setSeconds(Math.floor(timer % 60));
            setMinutes(Math.floor((timer / 60) % 60));
            setHours(Math.floor(timer / (60 * 60) % 24));
        }

        //Stop Clock
        if (toogleButton === 'START') {
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
        // console.log('%c Contractions Data: ', 'background: orange; color: white; font-weight: bold; display:block;');
        // console.table(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    const min = contractions.map((c) => {
        return ((c.interval / 1000 / 60) % 60);
    });

    const data = {
        labels: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th'],
        datasets: [
            {
                label: 'Contraction Interval',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: min.reverse()
            }
        ]
    };

    return (
        <div>
            <div className="center-div">
                <div className="center-children">
                    <a href="#" className="btn-circle" onClick={(e) => handleTimerClick(e)}>{toogleButton}</a>
                    <p>
                        Hours: {hours}  Minutes: {minutes}  Seconds: {seconds}
                    </p>
                </div>
            </div>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="CONTRACTIONS LOG" {...a11yProps(0)} />
                        <Tab label="INTERVALS CHART" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <ContractionHistory data={contractions} ></ContractionHistory>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>

                    <div id="line-chart" className="line-chart">
                        <Line data={data}> </Line>
                    </div>
                </TabPanel>
            </div>
        </div> 
    )
}