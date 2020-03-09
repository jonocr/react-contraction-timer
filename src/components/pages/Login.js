import React, { useContext } from 'react';
import SignIn from '../SignIn';
import { withRouter } from "react-router";
import { AuthContext } from '../Auth';
import { Redirect } from 'react-router-dom';

export const Login = (props) => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div>
            {currentUser ? (
                <Redirect to={"/home"} />
            ) : (
                    <SignIn></SignIn>
                )}

        </div>
    );
};

export default withRouter(Login);