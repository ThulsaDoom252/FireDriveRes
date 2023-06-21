import React, {useState} from 'react';
import {mailSignIn} from "../../data/refs";

const PhoneSignIn = ({signButtonClass, toggleAuthMode, handleLogin}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    return (
        <div className={'auth-form-container'}>
            <div> Enter your phone number</div>
            <input className={'auth-inputs'} type={'text'} value={phoneNumber}
                   onChange={e => setPhoneNumber(e.currentTarget.value)}/>
            <button className={signButtonClass} onClick={() => handleLogin(phoneNumber)}>Submit</button>
            <button className={signButtonClass} onClick={() => toggleAuthMode(mailSignIn)}>Back</button>
        </div>
    );
};

export default PhoneSignIn;