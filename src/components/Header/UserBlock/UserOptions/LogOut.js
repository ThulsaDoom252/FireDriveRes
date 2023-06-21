import React from 'react';
import {VscSignOut} from "react-icons/vsc";

const LogOut = (props) => {
    const {
        0: removeUser,
    } = props
    return (
        <>
            <button className={'user-option-button'}
                    onClick={() => removeUser()}>Sign out<VscSignOut/></button>
        </>
    );
};

export default LogOut;