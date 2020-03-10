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

const useStyles = makeStyles({
    // table: {
    //     minWidth: 650,
    // },
});


export const ContractionHistory = (props) => {
    const { currentUser } = useContext(AuthContext);
    // const [contractions, setContractions] = useState([]);
    const classes = useStyles();

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
        <Grid item xs={12}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="table-tr">Duration</TableCell>
                            <TableCell align="right" className="table-tr">Interval</TableCell>
                            <Hidden only={['xs', 'sm', 'md']}>
                                <TableCell align="right" className="table-tr">Started</TableCell>
                                <TableCell align="right" className="table-tr">Ended</TableCell>
                            </Hidden>
                        </TableRow>
                    </TableHead>
                    {currentUser ? (
                        <TableBody>
                            {props.data.map(row => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row" className="table-tr">
                                        {Math.floor((row.duration / (1000 * 60 * 60)) % 24) < 9 ? (
                                            '0' + Math.floor((row.duration / (1000 * 60 * 60)) % 24)
                                        ) : (
                                                Math.floor((row.duration / (1000 * 60 * 60)) % 24)
                                            )}:
                                    {Math.floor((row.duration / 1000 / 60) % 60) < 9 ? (
                                            '0' + Math.floor((row.duration / 1000 / 60) % 60)
                                        ) : (
                                                Math.floor((row.duration / 1000 / 60) % 60)
                                            )}:
                                    {Math.floor(row.duration / 1000 % 60) < 9 ? (
                                            '0' + Math.floor(row.duration / 1000 % 60)
                                        ) : (
                                                Math.floor(row.duration / 1000 % 60)
                                            )}
                                    </TableCell>
                                    <TableCell align="right" className="table-tr">
                                        {Math.floor((row.interval / (1000 * 60 * 60)) % 24) < 9 ? (
                                            '0' + Math.floor((row.interval / (1000 * 60 * 60)) % 24)
                                        ) : (
                                                Math.floor((row.interval / (1000 * 60 * 60)) % 24)
                                            )}:
                                    {Math.floor((row.interval / 1000 / 60) % 60) < 9 ? (
                                            '0' + Math.floor((row.interval / 1000 / 60) % 60)
                                        ) : (
                                                Math.floor((row.interval / 1000 / 60) % 60)
                                            )}:
                                    {Math.floor(row.interval / 1000 % 60) < 9 ? (
                                            '0' + Math.floor(row.interval / 1000 % 60)
                                        ) : (
                                                Math.floor(row.interval / 1000 % 60)
                                            )}
                                    </TableCell>
                                    <Hidden only={['xs', 'sm', 'md']}>
                                        <TableCell align="right" className="table-tr">
                                            {new Date(row.startTime.seconds * 1000).toLocaleTimeString()}
                                        </TableCell>
                                        <TableCell align="right" className="table-tr">
                                            {new Date(row.endTime.seconds * 1000).toLocaleTimeString()}
                                        </TableCell>
                                    </Hidden>
                                </TableRow>
                            ))}
                        </TableBody>
                    ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell className="table-tr"></TableCell>
                                    <TableCell className="table-tr"></TableCell>
                                    <Hidden only={['xs', 'sm', 'md']}>
                                        <TableCell className="table-tr"></TableCell>
                                        <TableCell className="table-tr"></TableCell>
                                    </Hidden>
                                </TableRow>
                            </TableBody>
                        )}

                </Table>
            </TableContainer>
        </Grid>
    )

}
