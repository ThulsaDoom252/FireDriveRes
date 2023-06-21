import React from 'react';
import anonymous from "../Common/files/anonymous.png";
import PopUpMethods from "./popUpMethods";
import {useFormik} from "formik";
import * as Yup from "yup";
import {mailSignUp, restorePass} from "../../data/refs";
import AuthInput from "./AuthInput";

const SignIn = ({
                    handleGoogleSignIn,
                    handleFacebookSignIn,
                    handleMailSignIn,
                    authButtonClass,
                    popUpButtonClass,
                    authError,
                    handleAuthError,
                    toggleAuthMode,
                    fetchButton,
                    dispatch,
                }) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('use email format').required('email is required field'),
            password: Yup.string().required('password is required field'),
        }),
        onSubmit: ({email, password}) => {
            handleMailSignIn({email, password}, {dispatch})
        },

        validateOnChange: false,
        validateOnBlur: false,
    })

    const values = formik.values
    const errors = formik.errors
    const handleChange = formik.handleChange
    const handleSubmit = formik.handleSubmit
    const handleBlur = formik.handleBlur

    return (
        <form className={'auth-form-container'} onSubmit={handleSubmit}>
            <img className='auth-avatar' src={anonymous} alt="anonymous.jpg"/>
            <h1 className='signIn-title'>Welcome guest</h1>
            <div className={'auth-error-container'}>
                <p className='auth-error'>{errors.email}</p>
                <p className='auth-error'>{errors.password}</p>
                <p className='auth-error'>{handleAuthError(authError)}</p>
            </div>
            <AuthInput {...['email', 'text', values.email, handleChange, 'email', handleBlur, errors.email]}/>
            <AuthInput {...['password', 'password', values.password, handleChange, 'password', handleBlur, errors.password]}/>
            <PopUpMethods {...[handleGoogleSignIn, popUpButtonClass, handleFacebookSignIn]}/>
            <button type='submit' className='auth-main-button'
                    disabled={fetchButton}>
                Login
            </button>
            <button type={'button'} formNoValidate={true} className='auth-restore-button'
                    onClick={() => dispatch(toggleAuthMode(restorePass))}>Forgot
                login/password?
            </button>
            <span className={authButtonClass}>No account? <button
                className={authButtonClass}
                onClick={() => dispatch(toggleAuthMode(mailSignUp))} type={'button'}
                formNoValidate={true}>Sign up</button></span>
        </form>
    );
};

export default SignIn;