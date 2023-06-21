import React from 'react';
import AuthInput from "./AuthInput";
import {defaultValue, mailSignIn} from "../../data/refs";

const RestoreData = (props) => {
    const {
        0: signButtonClass,
        1: sendResetEmail,
        2: email,
        3: setEmail,
        4: resetLinkSend,
        5: resetLinkCounter,
        6: toggleAuthMode,
        7: dispatch,
    } = props
    return (
        <div className={'restore-data-container'}>
            <h3>Welcome to FireDrive password restore page</h3>
            <div>
                <p>Here you can reset your login credentials if you've
                    forgotten them. Enter email that was used during registration, to receive password-reset link </p>
                <AuthInput {...['enter email', 'text', email, setEmail, defaultValue, defaultValue, defaultValue, true, dispatch]}/>
            </div>
            {resetLinkSend && <p style={{'color': 'green'}}>Link has been send. Check {email}</p>}
            <button className={signButtonClass}
                    disabled={resetLinkSend}
                    onClick={() => sendResetEmail(email, {dispatch})}>{resetLinkSend ?
                `Dont get the link? you can request another in ${resetLinkCounter}` : 'Reset Password'}</button>
            <button className={signButtonClass} onClick={() => dispatch(toggleAuthMode(mailSignIn))}>Go back to login
                page
            </button>
        </div>
    );
};

export default RestoreData;