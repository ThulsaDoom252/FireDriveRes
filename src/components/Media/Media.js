import {React, useRef, useEffect} from "react";
import {Navigate} from "react-router-dom";
import Fetching from "../Common/Fetching";
import {
    audioPanelClasses, businessTheme,
    defaultValue,
    desertTheme,
    flexStyle,
    highTechTheme,
    nightTheme,
    signInRoute
} from "../../data/refs";
import Image from "./Image";
import VideoPlayer from "../Common/VideoPlayer";
import AudioRef from "./AudioRef";
import NoMedia from "./NoMedia";
import ButtonPanel from "../Common/ButtonPanel";
import MediaName from "../Common/MediaName";
import {CircleLoader} from "react-spinners";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const Media = ({
                   fetchMediaSet,
                   isLogged,
                   currentRoute,
                   deleteMedia,
                   editingMediaName,
                   setMediaName,
                   newMediaName,
                   changeMediaName,
                   renameMedia,
                   selectedMedia,
                   editMediaMode,
                   handleSelectedMedia,
                   pages,
                   userName,
                   hoveredMediaIndex,
                   setHoveredMediaIndex,
                   setInitialSelectedMediaIndexHandler,
                   mediaToShow,
                   noMedia,
                   currentTrackIndex,
                   setCurrentTrackIndex,
                   isCurrentTrackPlaying,
                   toggleCurrentTrackPlaying,
                   toggleEditMode,
                   currentAudioDuration,
                   currentMediaSet,
                   setTotalPages,
                   setLastMediaIndex,
                   mediaPerPage,
                   smallScreenMode,
                   setCurrentMediaType,
                   overlay,
                   searchMode,
                   dispatch,
                   currentTheme,
                   deletingMediaIndex,
                   isAllMediaDeleted
               }) => {

    window.properties = [fetchMediaSet,
        isLogged,
        currentRoute,
        deleteMedia,
        editingMediaName,
        setMediaName,
        newMediaName,
        changeMediaName,
        renameMedia,
        selectedMedia,
        editMediaMode,
        handleSelectedMedia,
        pages,
        userName,
        hoveredMediaIndex,
        setHoveredMediaIndex,
        setInitialSelectedMediaIndexHandler,
        mediaToShow,
        noMedia,
        currentTrackIndex,
        setCurrentTrackIndex,
        isCurrentTrackPlaying,
        toggleCurrentTrackPlaying,
        toggleEditMode,
        currentAudioDuration,
        currentMediaSet,
        setTotalPages,
        setLastMediaIndex,
        mediaPerPage,
        smallScreenMode,
        setCurrentMediaType,
        overlay,
        searchMode,
        dispatch,
        currentTheme,
        deletingMediaIndex,
        isAllMediaDeleted]
    const timerRef = useRef(null)
    const clickRef = useRef(true)
    const [imagesPage, videosPage, audioPage] = pages
    const trackPlaying = (index) => currentTrackIndex === index && isCurrentTrackPlaying
    const trackPaused = (index) => currentTrackIndex === index && !isCurrentTrackPlaying
    const trackHovered = (index) => hoveredMediaIndex === index
    const showButtonPanel = (index) => hoveredMediaIndex === index && !editMediaMode

    useEffect(() => {
        if (currentMediaSet.length > 0) {
            dispatch(setTotalPages(Math.ceil(currentMediaSet.length / mediaPerPage)))
            dispatch(setLastMediaIndex(mediaPerPage))
        }
    }, [currentMediaSet, mediaPerPage])

    const handleDeleteMedia = async (params) => {
        debugger
        await deleteMedia({dispatch}, ...params)
        if (audioPage && isCurrentTrackPlaying) {
            handleAudioPause()
        }
    }

    const handleMouseHold = () => {
        timerRef.current = setTimeout(() => {
            if (!editMediaMode) {
                dispatch(toggleEditMode(true))
                clickRef.current = false
            } else {
                toggleEditMode(false)
                setTimeout(() => {
                    dispatch(clickRef.current = true)
                }, 1000)
            }
        }, 1000)
    }

    const handleMouseRelease = () => {
        clearTimeout(timerRef.current)
    }

    const handleAudioPlay = (index) => {
        if (currentTrackIndex === index) {
            dispatch(toggleCurrentTrackPlaying(true))
        } else {
            dispatch(setCurrentTrackIndex(index))
            dispatch(toggleCurrentTrackPlaying(false))
            setTimeout(() => {
                dispatch(toggleCurrentTrackPlaying(true))
            }, 100)
        }
    }
    const handleAudioPause = () => dispatch(toggleCurrentTrackPlaying(false))

    const handleMediaClick = (e, index, media) => {
        if (imagesPage && !editMediaMode) {
            dispatch(setCurrentMediaType('image'))
            setInitialSelectedMediaIndexHandler({dispatch}, index)
        } else if (videosPage && !editMediaMode) {
            isCurrentTrackPlaying && handleAudioPause()
            dispatch(setCurrentMediaType('video'))
            setInitialSelectedMediaIndexHandler({dispatch}, index)
        } else if (imagesPage && editMediaMode || videosPage && editMediaMode || audioPage && editMediaMode) {
            handleSelectedMedia({dispatch}, e, selectedMedia, media)
        }
    }

    const fetchingProps = {
        color: currentTheme === highTechTheme ? '#009462' :
            currentTheme === nightTheme ? 'white' :
                currentTheme === desertTheme ? 'black'
                    : currentTheme === businessTheme ? 'red' : void 0,
        size: 200,
    }

    const mediaContainerClassnames = imagesPage ? 'media-image-item' : videosPage ? 'media-video-item' : audioPage ?
        'audioRef-media-item' : void 0
    if (!isLogged) {
        return <Navigate to={signInRoute}/>;
    }

    return (
        <div style={noMedia || fetchMediaSet ? flexStyle : defaultValue}
             className={imagesPage ? 'images-list-container' : videosPage ? 'videos-list-container' : 'audio-list-container'}>
            {noMedia && !fetchMediaSet && <NoMedia {...{imagesPage, videosPage}}/>}
            {fetchMediaSet && <Fetching type={<CircleLoader {...fetchingProps} />}/>}
            <TransitionGroup component={null}>
                {!fetchMediaSet && mediaToShow.map((media, index) =>
                    <CSSTransition classNames={mediaContainerClassnames} timeout={500} key={index}>
                        <div
                            className={imagesPage ? 'media-image-item' : videosPage ? 'media-video-item' : audioPage ?
                                `${trackPlaying(media.index) || trackPaused(media.index) || trackHovered(index) ?
                                    'audioRef-media-item-selected' : selectedMedia.includes(media)
                                        ? 'audioRef-media-item-editMode' : 'audioRef-media-item'}` : void 0}
                            key={index}
                            onMouseDown={handleMouseHold}
                            onMouseUp={handleMouseRelease}
                            onMouseEnter={() => dispatch(setHoveredMediaIndex(audioPage ? media.index : index))}
                            onMouseLeave={() => dispatch(setHoveredMediaIndex(null))}
                            onClick={e => handleMediaClick(e, index, media)}>
                            {trackHovered(media.index) && !smallScreenMode || showButtonPanel(index) && !smallScreenMode && !editMediaMode && !overlay ?
                                <ButtonPanel {...[audioPage ? audioPanelClasses : defaultValue, handleDeleteMedia,
                                    [currentRoute, media.url, userName, audioPage ? media.index : index, searchMode && 'search'],
                                    media.url, editMediaMode, toggleEditMode, media.name, setMediaName, dispatch]}/> : null}
                            {!smallScreenMode || audioPage ?
                                <MediaName mediaName={media.name} oldMediaName={media.oldName}
                                           editingMediaName={editingMediaName}
                                           changeMediaName={changeMediaName} currentRoute={currentRoute}
                                           newMediaName={newMediaName}
                                           userName={userName} setMediaName={setMediaName}
                                           dispatch={dispatch}
                                           renameMedia={renameMedia}
                                           containerClass={audioPage ? 'audioName-container' : defaultValue}
                                           mediaNameClass={audioPage ? 'audio-ref-name' : defaultValue}
                                           mediaInputClass={audioPage ? 'audio-ref-input-name' : defaultValue}/> : void 0}
                            {editMediaMode && !audioPage && <input
                                checked={selectedMedia.includes(media)}
                                className={imagesPage ? 'images-checkBox' : videosPage ? "videos-checkbox" : void 0}
                                type="radio"/>}
                            {imagesPage ?
                                <Image url={media.url} editMediaMode={editMediaMode} {...{
                                    index,
                                    deletingMediaIndex,
                                    isAllMediaDeleted
                                }}/>
                                : videosPage ?
                                    <VideoPlayer overlay={overlay} url={media.url} {...{
                                        index,
                                        deletingMediaIndex,
                                        isAllMediaDeleted
                                    }}/>
                                    : audioPage ? <AudioRef audioIndex={media.index} audio={media}
                                                            {...{
                                                                trackPlaying,
                                                                trackPaused,
                                                                deletingMediaIndex,
                                                                index,
                                                                trackHovered,
                                                                editMediaMode,
                                                                handleAudioPlay,
                                                                handleAudioPause,
                                                                currentAudioDuration,
                                                                isAllMediaDeleted,
                                                            }}
                                        />

                                        : null}
                        </div>
                    </CSSTransition>
                )

                }
            </TransitionGroup>
        </div>
    );
};

export default Media;
