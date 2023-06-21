import React, {useState, useEffect} from "react";
import Alert from "./Alert";
import noImage from '../files/no images.png'
import noVideo from '../files/no videos.png'
import {defaultValue} from "../../../data/refs";
import {AiOutlineClose} from "react-icons/ai";
import ViewFrame from "./ViewFrame/ViewFrame";
import {MdCloseFullscreen} from "react-icons/md";
import ThemeBlock from "./SelectTheme/ThemeBlock";
import {setCurrentMediaType} from "../../../data/redux/fireDrive-reducer";

const Overlay = ({
                     toggleOverlay,
                     selectedMediaIndex,
                     paginatedMedia,
                     deleteMedia,
                     currentRoute,
                     userName,
                     searchMode,
                     showAlert,
                     alertMessage,
                     smallScreenMode,
                     alertActionButtonIsVisible,
                     handleCloseAlert,
                     noMedia,
                     fullScreenMode,
                     imageItemFullScreenStyle,
                     imageFullScreenStyle,
                     toggleOverlayFullScreen,
                     editingMediaName,
                     changeMediaName,
                     newMediaName,
                     setMediaName,
                     renameMedia,
                     currentMediaType,
                     mobileHorizontalMode,
                     mediaToShow,
                     optionListCallerRef,
                     showOptions,
                     toggleOptions,
                     dispatch,
                     setSelectedMediaIndex,
                     setCurrentTheme,
                     handleThemeBlock,
                     showThemeBlock,
                     overlay,
                     currentTheme,
                     alertSuccessStyle,
                     deleteAllMediaParams,
                     handleHideAlert,
                     deletingMediaIndex,
                 }) => {

    const [currentMedia, setCurrentMedia] = useState(mediaToShow[selectedMediaIndex])
    const [selectedMediaUrl, setSelectedMediaUrl] = useState(null)
    const [editNameMode, toggleEditNameMode] = useState(false)

    useEffect(() => {
        mediaToShow.length === 0 && setCurrentMedia(undefined)
        if (currentMedia === undefined) {
            switch (currentMediaType) {
                case 'image' :
                    setSelectedMediaUrl(noImage)
                    break
                case  'video' : {
                    setSelectedMediaUrl(noVideo)
                }
            }
        } else {
            setSelectedMediaUrl(currentMedia.url)
        }
        handleChangeImage()
    }, [selectedMediaIndex, mediaToShow, currentMedia])

    useEffect(() => {
        if (!editingMediaName) {
            toggleEditNameMode(false)
        }

    }, [editingMediaName])

    const handleCloseOverlay = () => {
        fullScreenMode && dispatch(toggleOverlayFullScreen(false))
        dispatch(setCurrentMediaType(null))
        dispatch(toggleOverlay(false))
    }

    const handleRename = () => {
        toggleEditNameMode(true)
        setMediaName({dispatch}, currentMedia.name)
    }

    const handleChangeImage = async (action) => {
        if (!noMedia) {
            switch (action) {
                case 'rename':
                    handleRename()
                    break;
                case 'fullscreen':
                    dispatch(toggleOverlayFullScreen(!fullScreenMode))
                    break;
                case 'delete':
                    await deleteMedia({dispatch}, currentRoute, currentMedia.url, userName, selectedMediaIndex, searchMode)
                    selectedMediaIndex !== 0 && dispatch(setSelectedMediaIndex(selectedMediaIndex - 1))
                    break;
                default:
                    setCurrentMedia(mediaToShow[selectedMediaIndex])
            }
        }
    }

    const fullScreenStyle = {width: '100vw', height: '100vh', background: 'black'}

    const mediaNameProps = currentMedia ? [currentMedia.name, currentMedia.oldName, editingMediaName, changeMediaName,
        currentRoute, newMediaName, userName, setMediaName, renameMedia, 'viewFrame-name-input', 'viewFrame-name-container'] : void 0

    return (
        <div className="overlay">
            {!showAlert && !showThemeBlock &&
                <button className={'overlay-close-btn'} onClick={handleCloseOverlay}><AiOutlineClose/></button>}
            {fullScreenMode &&
                <button className={'overlay-fullScr-btn'} onClick={() => dispatch(toggleOverlayFullScreen(false))}>
                    <MdCloseFullscreen/></button>}
            <ThemeBlock {...{
                handleThemeBlock, setCurrentTheme, overlay, showThemeBlock, dispatch,
                currentTheme, smallScreenMode
            }}/>
            <Alert {...{
                handleCloseAlert, alertMessage, handleHideAlert, alertActionButtonIsVisible,
                dispatch, showAlert, alertSuccessStyle, deleteAllMediaParams
            }}/>
            {currentMediaType &&
                <ViewFrame {...{
                    fullScreenMode, currentMedia, editNameMode, paginatedMedia,
                    selectedMediaIndex, setSelectedMediaIndex,
                    imageItemFullScreenStyle, imageFullScreenStyle, smallScreenMode, handleChangeImage,
                    mediaNameProps, currentMediaType, mobileHorizontalMode, fullScreenStyle, mediaToShow,
                    selectedMediaUrl, optionListCallerRef, showOptions, toggleOptions, dispatch, deletingMediaIndex,
                }}/>}
        </div>
    );
};

export default Overlay;

