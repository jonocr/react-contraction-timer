import React, { useContext } from 'react';
import '@firebase/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { AuthContext } from "./Auth";

// const useStyles = makeStyles({
//     // table: {
//     //     minWidth: 650,
//     // },
// });


export const ContractionHistory = (props) => {
    // const { currentUser } = useContext(AuthContext);
    // // const [contractions, setContractions] = useState([]);
    // const classes = useStyles();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const db = app.firestore();
    //         const data = await db.collection('contractions').orderBy('startTime', 'desc').get();
    //         setContractions(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //         // console.log("data: ", data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //     }
    //     fetchData();
    // }, []);

    return (
        <div> contractionsHistory JS</div>
    )

}
