import {createSlice} from "@reduxjs/toolkit";
import {error, initialCounterNumber, mailSignIn, reset, verify, verifyMail} from "../refs";
import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    getAuth, GoogleAuthProvider, onAuthStateChanged, onIdTokenChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signInWithPopup, signOut,
    updateProfile
} from "firebase/auth";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase";
import {handleAlert} from "./fireDrive-reducer";

const authSlice = createSlice(
    {
        name: 'auth-slice',
        initialState: {
            buttonFetch: false,
            verifyLinkCounter: initialCounterNumber,
            resetLinkCounter: initialCounterNumber,
            currentAuthMode: mailSignIn,
            initializing: false,
            verifyLinkSend: false,
            resetLinkSend: false,
            emailAndPasswordSignUpMode: false,
            userData: {email: '', displayName: '', photoURL: null},
            isLogged: false,
            authError: '',
        },
        reducers: {
            initializeApp(state, action) {
                state.initializing = action.payload;
            },
            setTestSet(state, action) {
                state.testSet = action.payload
            },
            setVerifyLinkCounter(state, action) {
                state.verifyLinkCounter = action.payload;
            },
            setResetLinkCounter(state, action) {
                state.resetLinkCounter = action.payload;
            },
            setAuthError(state, action) {
                state.authError = action.payload;
            },
            toggleAuthMode(state, action) {
                state.currentAuthMode = action.payload;
            },
            toggleButtonFetch(state, action) {
                state.buttonFetch = action.payload;
            },
            toggleVerifyLinkSendStatus(state, action) {
                state.verifyLinkSend = action.payload;
            },
            toggleResetLinkSendStatus(state, action) {
                state.resetLinkSend = action.payload;
            },
            setEmail(state, action) {
                state.email = action.payload;
            },
            setUserData(state, action) {
                state.userData = {...action.payload}
            },
            setAuth(state, action) {
                state.isLogged = action.payload;
            },
            updateAvatar(state, action) {
                state.userData.photoURL = action.payload;
            },
        },
    }
)

export default authSlice.reducer
export const {
    initializeApp,
    updateAvatar,
    setAuthError,
    toggleAuthMode,
    setEmail,
    setTestSet,
    setAuth,
} = authSlice.actions

export const handleLogin = async (authData, {dispatch}) => {
    const auth = getAuth()
    dispatch(authSlice.actions.toggleButtonFetch(true))
    await signInWithEmailAndPassword(auth, authData.email, authData.password)
        .catch((error) => {
            dispatch(authSlice.actions.setAuthError(error.code))
        })
    dispatch(authSlice.actions.toggleButtonFetch(false))
}

export const checkAuth = async ({dispatch}) => {
    dispatch(authSlice.actions.initializeApp(true))
    try {
        const auth = await getAuth()
        onAuthStateChanged(auth, async (user) => {
            if (user === null) {
                dispatch(authSlice.actions.setAuth(false))
                dispatch(authSlice.actions.setUserData({email: '', displayName: '', photoURL: null,}))
                dispatch(authSlice.actions.toggleAuthMode(mailSignIn))
            } else if (!user.emailVerified) {
                const {email, displayName, photoURL} = user
                dispatch(authSlice.actions.setUserData({email, displayName, photoURL}))
                dispatch(authSlice.actions.toggleAuthMode(verifyMail))
            } else {
                const {email, displayName, photoURL} = user
                dispatch(authSlice.actions.setUserData({email, displayName, photoURL}))
                dispatch(authSlice.actions.setAuth(true))
            }
            dispatch(authSlice.actions.initializeApp(false))
        })
    } catch (e) {
        handleAlert({dispatch}, error, e.toString())
    }
}

export const removeUser = async () => {
    const auth = getAuth()
    signOut(auth)
}

const setTimer = (mode, {dispatch}) => new Promise(r => {
    let counterNumber = initialCounterNumber
    const interval = setInterval(() => {
        counterNumber = counterNumber - 1
        mode === verify ? dispatch(authSlice.actions.setVerifyLinkCounter(counterNumber))
            : dispatch(authSlice.actions.setResetLinkCounter(counterNumber))
        if (counterNumber === 0) {
            clearInterval(interval)
            dispatch(authSlice.actions.setVerifyLinkCounter(initialCounterNumber))
            r()
        }
    }, 1000)
})

export const sendVerificationEmail = async (initialData = false, {dispatch}) => {
    const auth = getAuth()
    const user = auth.currentUser
    try {
        await sendEmailVerification(initialData ? initialData : user)
        setLinkTimer(verify, {dispatch})
    } catch (e) {
    }
}

export const sendResetEmail = async (email, {dispatch}) => {
    const auth = getAuth()
    try {
        await sendPasswordResetEmail(auth, email)
        setLinkTimer(reset, {dispatch})
    } catch (e) {
    }
}

export const setLinkTimer = async (mode, {dispatch}) => {
    if (mode === verify) {
        dispatch(authSlice.actions.toggleVerifyLinkSendStatus(true))
        localStorageSetter(false, 'verifyTimer', true)
        await setTimer(verify, {dispatch})
        dispatch(authSlice.actions.toggleVerifyLinkSendStatus(false))
        localStorageSetter(false, 'verifyTimer', false)
    } else if (mode === reset) {
        dispatch(authSlice.actions.toggleResetLinkSendStatus(true))
        localStorageSetter(false, 'resetTimer', true)
        await setTimer(reset, {dispatch})
        dispatch(authSlice.actions.toggleResetLinkSendStatus(false))
        localStorageSetter(false, 'resetTimer', false)
    }
}

const localStorageSetter = (clear = false, key, value) => {
    localStorage.setItem(key, value)
    clear === true && localStorage.clear()
}

// **************************************************SIGN IN METHODS************************************
export const signInWithGoogle = async () => {
    const auth = getAuth()
    const googleProvider = new GoogleAuthProvider();
    try {
        signInWithPopup(auth, googleProvider)
    } catch (e) {
        console.log(e)
    }
};

export const signInWithFacebook = async () => {
    const auth = getAuth()
    const facebookProvider = new FacebookAuthProvider()
    try {
        await signInWithPopup(auth, facebookProvider)
    } catch (e) {
        console.log(` ${e}`)
    }
}

// / ********************************SIGN UP METHODS*********************************************
export const emailPasswordSignup = async (email, password, userName, {dispatch}) => {
    dispatch(authSlice.actions.toggleButtonFetch(true))
    const auth = getAuth()
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password).catch(e => dispatch(setAuthError(e.code)))
        const user = userCredential.user
        await updateProfile(user, {
            displayName: userName
        })
        await sendVerificationEmail(user, {dispatch})
        console.log('Initial verification email send')
    } catch (e) {
        alert('Error in creating new account - see console for details')
        console.log(`error at creating account: ${e} `)
    }
    dispatch(authSlice.actions.toggleButtonFetch(false))
};

export const isEmailVerified = ({dispatch}) => {
    const auth = getAuth()
    try {
        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            if (!user.emailVerified) {
                await user.reload()
            } else if (user.emailVerified) {
                checkAuth({dispatch})
                unsubscribe()
            }
        })
    } catch (e) {
        console.log(`VERIFICATION EMAIL ERROR: ${e}`)
    }
}

// *****************************************UPDATE USER INFO***********************************************
export const updateUserAvatar = async (avatar, userName, {dispatch}) => {
    const user = getAuth().currentUser
    if (user) {
        const fileRef = ref(storage, `${userName}/userAvatar/${avatar.name}`);
        await uploadBytes(fileRef, avatar);
        const avatarUrl = await getDownloadURL(fileRef);
        await updateProfile(user, {
            displayName: user.displayName,
            photoURL: avatarUrl,
        });
        dispatch(updateAvatar(avatarUrl));
    }
};





