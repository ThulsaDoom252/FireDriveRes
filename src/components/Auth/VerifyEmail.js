import React from 'react';
import {defaultValue} from "../../data/refs";

const VerifyEmail = (props) => {
    const {
        0: sendVerificationEmail,
        1: removeUser,
        2: email,
        3: signButtonsClass,
        4: verifyLinkSend,
        5: verifyLinkCounter,
        6: dispatch,
    } = props
    return (
        <div className={'verification-container'}>
            <h3 className={'verification-title-1'}>Welcome to FireDrive!</h3>
            <h4 className={'verification-title-2'}>Confirm link has been send to {email}</h4>
            <p>
                To ensure the security of our platform and protect our users from spam and bot registrations, we require
                all new users to verify their email address before they can access the full features of our site.

                To get started, please check your email inbox for a message from FireDrive containing your verification
                link. If you don't see the email, please check your spam folder or contact our support team for
                assistance.

                Once you have received your verification link, simply click on it to complete the
                verification process. You will then be able to access all of the features and services that FireDrive
                has to offer.</p>
            <div className={'verification-buttons-container'}>
                <button className={`${signButtonsClass} verification-buttons`} disabled={verifyLinkSend}
                        onClick={() => sendVerificationEmail(defaultValue, {dispatch})}>{verifyLinkSend ? `
                        You can request new verification link in ${verifyLinkCounter}` : `Resend verification link`}
                </button>
                <button className={`${signButtonsClass} verification-buttons`}
                        onClick={() => removeUser()}>Return
                    to login page
                </button>
            </div>
            <p>Thank you for helping us keep FireDrive a safe and secure platform for all of our users. If you have any
                questions or concerns, please don't hesitate to contact us.</p>
        </div>
    );
};

export default VerifyEmail;