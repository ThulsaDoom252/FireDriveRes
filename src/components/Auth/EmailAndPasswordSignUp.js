import React, {useEffect} from 'react';
import AuthInput from "./AuthInput";
import {useFormik} from "formik";
import * as Yup from "yup";
import {mailSignIn} from "../../data/refs";

const EmailAndPasswordSignUp = ({
                                    handleSignUp,
                                    authButtonClass,
                                    fetchButton,
                                    handleAuthError,
                                    authError,
                                    toggleAuthMode,
                                    dispatch,
                                }) => {

    const formik2 = useFormik({
        initialValues: {
            email: '',
            password: '',
            userName: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('use email format')
                .required('email is required field'),
            password: Yup.string()
                .required('password required')
                .min(10, 'passwords minimum length - 10'),
            userName: Yup.string().min(5, 'userName must be no less that 5 characters')
                .max(15, 'userName must not exceed 15 characters')
                .required('username required')
        }),
        onSubmit: ({email, password, userName}) => {
            handleSignUp(email, password, userName, {dispatch})
        },

        validateOnChange: false,
        validateOnBlur: false,
    })

    const values = formik2.values
    const errors = formik2.errors
    const handleChange = formik2.handleChange
    const handleSubmit = formik2.handleSubmit
    const handleBlur = formik2.handleBlur


    return (
        <>
            <form className={'auth-form-container'} onSubmit={handleSubmit}>
                <h1 className='signUp-title'>Create new account</h1>
                <div className='auth-error-container'>
                    <p className="auth-error">{errors.email}</p>
                    <p className="auth-error">{errors.password}</p>
                    <p className="auth-error">{errors.userName}</p>
                    <p className="auth-error">{handleAuthError(authError)}</p>
                </div>
                <AuthInput {...['email', 'text', values.email, handleChange, 'email', handleBlur, errors.email]}/>
                <AuthInput {...['password', 'password', values.password, handleChange, 'password', handleBlur, errors.password]}/>
                <AuthInput {...['userName', 'text', values.userName, handleChange, 'userName', handleBlur, errors.userName]}/>
                <button type={'submit'}
                        className='auth-main-button' disabled={fetchButton}>Create
                    account
                </button>
                <span className={authButtonClass}>Have an account?<button
                    type={'button'}
                    formNoValidate={true}
                    className={authButtonClass}
                    onClick={() => dispatch(toggleAuthMode(mailSignIn))}>Sign in</button></span>
            </form>
        </>
    );
};

export default EmailAndPasswordSignUp;