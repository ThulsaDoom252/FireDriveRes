import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaFacebook} from "react-icons/fa";

const PopUpMethods = (props) => {
    const {0: signInWithGoogle, 1: popUpButtons, 2: signInWithFacebook} = props

    return (
        <div className={'popUp-methods-container'}>
            <button type={'button'} formNoValidate={true} className={popUpButtons} onClick={signInWithGoogle}
            ><FcGoogle/>Sign in with Google
            </button>
            <button type={'button'} formNoValidate={true} className={popUpButtons} onClick={signInWithFacebook}>
                <FaFacebook/>Sign in
                with Facebook
            </button>
        </div>
    );
};

export default PopUpMethods;