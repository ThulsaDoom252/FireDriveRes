import React from 'react'
import {Navigate} from "react-router-dom";
import VerifyEmail from "./VerifyEmail";
import EmailAndPasswordSignUp from "./EmailAndPasswordSignUp";
import SignIn from "./SignIn";
import RestoreData from "./RestoreData";
import {
    emailError, invalidValue,
    mailSignIn,
    mailSignUp,
    passwordError,
    reset, restorePass, tooManyRequests,
    userError, userNotFound, verify,
    verifyMail
} from "../../data/refs";
import {useEffect} from "react";
import {getAuth} from "firebase/auth";
import {
    clearAuthError, emailPasswordSignup,
    handleLogin,
    isEmailVerified, removeUser, sendResetEmail, sendVerificationEmail, setAuthError, setEmail, setLinkTimer,
    signInWithFacebook,
    signInWithGoogle, toggleAuthMode
} from "../../data/redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";

const Auth = () => {
    const auth = getAuth()
    const user = auth.currentUser
    const dispatch = useDispatch()
    const resetLinkSend = useSelector(state => state.auth.resetLinkSend)
    const verifyLinkSend = useSelector(state => state.auth.verifyLinkSend)
    const isLogged = useSelector(state => state.auth.isLogged)
    const currentAuthMode = useSelector(state => state.auth.currentAuthMode)
    const buttonFetch = useSelector(state => state.auth.buttonFetch)
    const authError = useSelector(state => state.auth.authError)
    const verifyLinkCounter = useSelector(state => state.auth.verifyLinkCounter)
    const resetLinkCounter = useSelector(state => state.auth.resetLinkCounter)
    const email = useSelector(state => state.auth.userData.email)


    ///Css classes
    const authButtonClass = 'auth-button'
    const popUpButtonClass = 'popUp-button'

    //Email verification check
    useEffect(() => {
         user && isEmailVerified({dispatch})
    }, [user])


    //Resend link counters
    useEffect(() => {
        const resetTimerStarted = localStorage.getItem('resetTimer')
        if (resetTimerStarted === 'true') {
            !resetLinkSend && setLinkTimer(reset, {dispatch})
        }
    }, [])

    useEffect(() => {
        const verifyTimerStarted = localStorage.getItem('verifyTimer')
        if (verifyTimerStarted === 'true') {
            !verifyLinkSend && setLinkTimer(verify, {dispatch})
        }
    }, [])

    //Clear auth error on auth mode changed
    useEffect(() => {
        dispatch(setAuthError(''))
    }, [currentAuthMode])


    //Auth Error type handler
    const handleAuthError = (error) => {
        switch (error) {
            case emailError:
                return emailError
            case passwordError:
                return passwordError
            case userError:
                return userNotFound
            case tooManyRequests:
                return tooManyRequests
            case invalidValue:
                return invalidValue
            default:
                return error
        }
    }

    if (isLogged) {
        return <Navigate to={"/"}/>
    }

    return (
        <div className={'auth-wrapper'}>
            {currentAuthMode === mailSignIn &&
                <SignIn handleGoogleSignIn={signInWithGoogle} handleFacebookSignIn={signInWithFacebook}
                        handleMailSignIn={handleLogin} authButtonClass={authButtonClass}
                        popUpButtonClass={popUpButtonClass} fetchButton={buttonFetch} authError={authError}
                        handleAuthError={handleAuthError} toggleAuthMode={toggleAuthMode} dispatch={dispatch}/>}
            {currentAuthMode === mailSignUp &&
                <EmailAndPasswordSignUp handleSignUp={emailPasswordSignup} authButtonClass={authButtonClass}
                                        fetchButton={buttonFetch} authError={authError}
                                        handleAuthError={handleAuthError}
                                        toggleAuthMode={toggleAuthMode} dispatch={dispatch}/>}
            {currentAuthMode === verifyMail &&
                <VerifyEmail {...[sendVerificationEmail, removeUser, email, authButtonClass, verifyLinkSend, verifyLinkCounter, dispatch]}/>}
            {currentAuthMode === restorePass &&
                <RestoreData {...[authButtonClass, sendResetEmail, email, setEmail,
                    resetLinkSend, resetLinkCounter, toggleAuthMode, dispatch]}/>}
        </div>
    );
}

export default Auth;