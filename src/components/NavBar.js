import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from "./Auth";
import firebaseApp from "./base";
import { useHistory } from 'react-router-dom';
// import { withRouter } from 'react-router';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = () => {
    const classes = useStyles();
    const { currentUser } = useContext(AuthContext);
    let history = useHistory();
    let welcomeMessage = "Welcome ";

    currentUser ?
        welcomeMessage = welcomeMessage + currentUser.email
        :
        welcomeMessage = welcomeMessage + "visitor";

    const goLogin = () => {
        history.push("/login");
    }

    const signOut = () => {
        firebaseApp.auth().signOut();
        goLogin();
    }


    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    {/* <MenuIcon /> */}
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    {welcomeMessage}
                </Typography>
                {currentUser ? (
                    <Button color="inherit" onClick={() => signOut()}>Sign out </Button>
                ) : (
                        <Button color="inherit" onClick={() => goLogin()}>Login</Button>
                    )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;
// export default withRouter(NavBar);