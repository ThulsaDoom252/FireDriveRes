import React from 'react';
import {FcPhoneAndroid} from "react-icons/fc";
import {phoneSignIn} from "../../data/refs";


const SignUpWithPhone = (props) => {
    const {0: popUpButtons, 1: toggleAuthMode} = props
    return (
        <div className={'popUp-methods-container'}>
            <button className={popUpButtons} onClick={() => toggleAuthMode(phoneSignIn)}><FcPhoneAndroid/>Sign up with
                phone number
            </button>
        </div>
    );
};

export default SignUpWithPhone;