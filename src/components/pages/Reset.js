import React, { useCallback } from 'react';
import { withRouter } from "react-router";
import app from "../base.js";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/jonocr">
                Jono's Github
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

const PasswordReset = ({ history }) => {
    const classes = useStyles();
    const [openError, setOpenError] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");

    const handleReset = useCallback(
        async event => {
            event.preventDefault();
            const { email } = event.target.elements;

            try {
                await app
                    .auth()
                    .sendPasswordResetEmail(email.value)
                    .then(function () {
                        // Email sent.
                        setOpenAlert(true);
                        setAlertMsg(`Reset password for ${email.value} was sent to your email`);
                    }).catch(function (error) {
                        setOpenError(true);
                        setErrorMsg(error.message);
                        return false;
                    });
                //history.push("/login");
            } catch (error) {
                setOpenError(true);
                setErrorMsg(error.message);
                return false;
            }

        },
        [history]
    );

    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.root}>
        <Collapse in={openAlert}>
          <Alert action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenAlert(false);
                history.push("/login");
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }> 
            {alertMsg}
      </Alert>
        </Collapse>
        <Collapse in={openError}>
          <Alert severity="error" action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpenError(false);
              }}>
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }> 
            {errorMsg}
      </Alert>
        </Collapse>
      </div>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Reset Password
        </Typography>
                <form className={classes.form} noValidate onSubmit={handleReset}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Send Email
          </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default withRouter(PasswordReset);