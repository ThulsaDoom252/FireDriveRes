import {createSlice} from "@reduxjs/toolkit";
import {
    delay, error,
    highTechTheme, myFaceBook, myInstagram, myTelegram,
    noMediaToSearch,
    noMediaToSearchText,
    removeAllMedia,
    removeAllMediaText,
    rootSearch,
    rootSearchText, sortByDate, sortyByName, uploadSuccess
} from "../refs";
import {removeUser} from "./auth-reducer";
import {deleteAllMedia} from "./media-reducer";

const fireDriveReducer = createSlice({
    name: 'fireDrive-slice',
    initialState: {
        showAlert: false,
        alertActionButtonIsVisible: false,
        showMobileSearch: false,
        showMediaBackground: true,
        alertSuccessStyle: false,
        currentMediaType: null,
        smallScreenMode: window.innerWidth <= 896,
        showThemeBlock: false,
        currentTheme: localStorage.getItem('theme') || highTechTheme,
        alertMessage: '',
        alertAction: '',
        mobileSearchMount: true,
        showOptions: false,
        overlay: false,
        selectedMediaIndex: 0,
        imageFullScreenStyle: {maxWidth: '100%', maxHeight: '100%'},
        imageItemFullScreenStyle: {height: '100%'},
        developerContacts: [
            {type: 'Facebook', url: myFaceBook, icon: 'facebook'},
            {type: 'Instagram', url: myInstagram, icon: 'instagram'},
            {type: 'Telegram', url: myTelegram, icon: 'telegram'},
        ],
        fullScreenMode: false,
        isAlertHidden: false,
        sortType: sortyByName,
        nonMobileSmallWidthScreen: false,
        mobileHorizontalMode: false,
        selectedOverlayUrl: null,
        overlayEditNameMode: null,
        overlayShareBlockVisible: false,
        overlayMobileOptionsPanelVisible: false
    },

    reducers: {
        hideAlert(state, action) {
            state.isAlertHidden = action.payload
        },
        setSortType(state, action) {
            state.sortType = action.payload
        },
        toggleNonMobileSmallWidthScreen(state, action) {
            state.nonMobileSmallWidthScreen = action.payload
        },
        setCurrentTheme(state, action) {
            localStorage.setItem('theme', action.payload)
            state.currentTheme = action.payload
        },
        setMobileHorizontalMode(state, action) {
            state.mobileHorizontalMode = action.payload
        },
        toggleAlert(state, action) {
            state.showAlert = action.payload
        },
        showAlertMessage(state, action) {
            state.alertMessage = action.payload
        },
        toggleAlertSuccessStyle(state, action) {
            state.alertSuccessStyle = action.payload
        },
        toggleAlertActionButton(state, action) {
            state.alertActionButtonIsVisible = action.payload
        },
        toggleOptions(state, action) {
            state.showOptions = action.payload
        },
        toggleMediaBackground(state, action) {
            state.showMediaBackground = action.payload
        },
        toggleOverlay(state, action) {
            state.overlay = action.payload
        },
        setSelectedMediaIndex(state, action) {
            state.selectedMediaIndex = action.payload
        },
        toggleSmallScreenMode(state, action) {
            state.smallScreenMode = action.payload
        },
        toggleMobileSearchMount(state, action) {
            state.mobileSearchMount = action.payload
        },
        setAlertAction(state, action) {
            state.alertAction = action.payload
        },
        toggleOverlayFullScreen(state, action) {
            state.fullScreenMode = action.payload
        },
        toggleMobileSearch(state, action) {
            state.showMobileSearch = action.payload
        },
        setAlertMessage(state, action) {
            state.alertMessage = action.payload
        },
        setCurrentMediaType(state, action) {
            state.currentMediaType = action.payload
        },
        toggleThemeBlock(state, action) {
            state.showThemeBlock = action.payload
        }
    }

})

export default fireDriveReducer.reducer
export const {
    hideAlert,
    setSortType,
    toggleNonMobileSmallWidthScreen,
    setMobileHorizontalMode,
    toggleAlert,
    setAlertMessage,
    showAlertMessage,
    toggleThemeBlock,
    toggleAlertSuccessStyle,
    toggleAlertActionButton,
    setCurrentTheme,
    toggleMobileSearchMount,
    toggleOptions,
    toggleOverlay,
    setSelectedMediaIndex,
    toggleSmallScreenMode,
    setAlertAction,
    toggleMediaBackground,
    toggleOverlayFullScreen,
    toggleMobileSearch,
    setCurrentMediaType,
} = fireDriveReducer.actions

export const {smallScreenMode} = fireDriveReducer.getInitialState

export const setInitialSelectedMediaIndexHandler = ({dispatch}, index) => {
    dispatch(setSelectedMediaIndex(index))
    dispatch(toggleOverlay(true))
}

export const handleCloseAlert = async ({dispatch}, alertActionButtonIsVisible, alertSuccessStyle) => {
    debugger
    dispatch(toggleAlert(false))
    await delay(300)
    dispatch(toggleOverlay(false))
    alertActionButtonIsVisible && dispatch(toggleAlertActionButton(false))
    alertSuccessStyle && dispatch(toggleAlertSuccessStyle(false))

    dispatch(setAlertMessage(''))
}

export const handleThemeBlock = async ({dispatch}, overlay, showThemeBlock) => {
    dispatch(toggleThemeBlock(!showThemeBlock))
    await delay(200)
    dispatch(toggleOverlay(!overlay))
}

export const handleHideAlert = ({dispatch}) => {
    localStorage.setItem('hideAlert', 'true')
    handleCloseAlert({dispatch})
}


export const handleAlert = ({dispatch}, condition, text) => {
    switch (condition) {
        case removeAllMedia:
            dispatch(setAlertMessage(removeAllMediaText))
            dispatch(toggleAlertActionButton(true))
            dispatch(setAlertAction(removeAllMedia))
            break;
        case  noMediaToSearch:
            dispatch(setAlertMessage(noMediaToSearchText))
            break;
        case uploadSuccess:
            dispatch(toggleAlertSuccessStyle(true))
            dispatch(setAlertMessage(uploadSuccess))
            break;
        case  rootSearch:
            dispatch(setAlertMessage(rootSearchText))
            break;
        case error:
            dispatch(setAlertMessage(text))
            break;
        default:
            void 0;
    }
    dispatch(toggleOverlay(true))
    dispatch(toggleAlert(true))
}

export const handleAlertAction = (alertAction, deleteAllMediaParams, {dispatch}, alertActionButtonIsVisible) => {
    switch (alertAction) {
        case removeAllMedia:
            deleteAllMedia({dispatch}, ...deleteAllMediaParams)
            break;
        default:
            void 0
    }
    handleCloseAlert({dispatch}, alertActionButtonIsVisible)
}

// *****Footer logic

export const handleMobileOptionClick = (option, rootPage, noMedia, overlay, showThemeBlock, {dispatch}) => {
    switch (option) {
        case 'search':
            if (rootPage) {
                handleAlert({dispatch}, 'rootSearch')
            } else if (!rootPage && noMedia) {
                handleAlert({dispatch}, 'noMediaToSearch')
            } else {
                dispatch(toggleMobileSearch(true))
            }
            break;
        case 'theme':
            handleThemeBlock({dispatch}, overlay, showThemeBlock)
            break;
        case 'logout':
            removeUser()
            break;
        default:
            void 0
    }
}

export const handleContactClick = (url) => {
    window.open(url, '_blank')
}

export const handleSortType = (option, {dispatch}) => {
    dispatch(setSortType(option.value.toString()))
};


export const handleResize = ({dispatch}) => {
    dispatch(toggleSmallScreenMode(window.innerWidth <= 896));
    dispatch(toggleNonMobileSmallWidthScreen(!smallScreenMode && window.innerHeight < 878))
}
