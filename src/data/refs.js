//Default Media Folders
import ClipLoader from "react-spinners/ClipLoader";

// ********************************AUTH****************************
// AUTH MODES
export const mailSignIn = 'signInMode'
export const phoneSignIn = 'phoneSignIn'
export const verifyMail = 'verifyMail'
export const mailSignUp = 'signUpMode'
export const restorePass = 'restorePass'
// ERRORS
export const passError = 'invalid password'
export const mailError = 'invalid email'
export const userNotFound = 'User not found'

//Timers
export let timer

/************************************************************MAIN*******************************************/
// Emoji
const smileEmoji = '\uD83D\uDE42'
// Theme
export const highTechTheme = 'High Tech'
export const businessTheme = 'Business'
export const desertTheme = 'Desert'
export const nightTheme = 'Misty Night'

//RenameMediaModes
export const uploadMode = 'upload'
export const listMode = 'list'
export const renameMode = 'rename'

// ALERT
//Actions
export const removeAllMedia = 'removeAllMedia'
export const noMediaToSearch = 'noMediaToSearch'
export const rootSearch = 'rootSearch'
// Messages
export const removeAllMediaText = 'This will Remove all media on current page, sure you want to continue?'
export const rootSearchText = 'Search can be toggled only on media pages'
export const noMediaToSearchText = 'No media to search...'
export const uploadSuccess = `..Uploaded ${smileEmoji}`
export const error = 'error'

//Default Value
export const defaultValue = undefined

// Media Refs
export const imagesRef = 'images'
export const videosRef = 'videos'
export const audioRef = 'audio'
export const defaultRef = 'defaultRef'
export const mediaTypesRef = [imagesRef, videosRef, audioRef]

//Routes Refs
export const imageRoute = '/gallery'
export const videosRoute = '/videos'
export const audioRoute = '/audio'
export const rootRoute = '/'
export const signInRoute = '/signIn'

//Fetching
export const fetching = <ClipLoader
    color={'blue'}
    loading={true}
    cssOverride={false}
    size={400}
    aria-label="Loading Spinner"
    data-testid="loader"
/>


//SupportedFileTypes for input
export const imageFiles = '.jpg,.jpeg,.png'
export const videoFiles = '.mpeg, .mp4, .mkv, .avi, .mpeg4'
export const audioFiles = '.mp3'

//Contacts
export const myFaceBook = 'https://www.facebook.com/'
export const myInstagram = 'https://www.instagram.com/t_h_u_l_s_a_d_o_o_m/'
export const myTelegram = 'https://t.me/ThulsaDoom92'


//FileTypes allowed for upload
export const imagesOnly = ['image/jpeg', 'image/png']
export const videosOnly = ['video/mp4',
    'video/mpeg',
    'video/ogg',
    'video/webm',
    'video/quicktime',
    'video/x-ms-wmv',
    'video/x-msvideo',
    'video/x-matroska',
    'video/3gpp',
    'video/3gpp2',
    'video/vnd.vivo',
    'video/vnd.dlna.mpeg-tts',
    'video/x-ms-asf',]
export const audioOnly = ['audio/mpeg', 'audio/wav']

//ResetCounter
export const initialCounterNumber = 60

//EmailLinkModes
export const verify = 'verify'
export const reset = 'reset'
//Login error codes
export const emailError = 'auth/invalid-email'
export const passwordError = 'auth/wrong-password'
export const userError = 'auth/user-not-found'
export const tooManyRequests = 'auth/too-many-requests'
export const invalidValue = 'auth/invalid-value-(password)'


//ClassNames ref
export const audioPanelClasses = ['audio-buttons-panel', 'audio-edit-btn', 'audio-share-btn', 'audio-delete-btn']
export const editBarClasses = ['editMode-panel', defaultValue, defaultValue, 'editMode-delete-btn']

//Sort options

export const sortByDate = 'Date added'
export const sortyByName = 'Name'
export const sortBySize = 'Size'
export const sortOptions = [sortyByName, sortBySize, sortByDate]


// Classes
export const flexStyle = {
    display: 'flex',
    position: 'absolute', left: 0,
    top: 0, width: '100%', height: '100%'
}


//Media Name
export const sliceMediaName = (name, maxCharacters) => {
    const maxNumber = maxCharacters
    const mediaLength = name.length
    if (mediaLength > maxNumber) {
        let slicedMedia = name.slice(0, maxNumber)
        return slicedMedia + '...'
    } else {
        return name
    }
}


// Common functions
export const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
};


export const delay = (ms) => new Promise(r => setTimeout(() => r(), ms))
