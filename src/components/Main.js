import React, {useEffect, useRef, useState, useContext} from 'react';
import {Route, Routes, useLocation, Navigate} from "react-router-dom";
import Header from "./Header/Header";
import Media from "./Media/Media";
import MediaActionBtnPanel from "./MediaActionBtnPanel/MediaActionBtnPanel";
import Overlay from "./Common/Overlay/Overlay";
import Footer from "./Footer/Footer";
import {
    audioRoute,
    signInRoute,
    imageRoute,
    rootRoute,
    videosRoute,
    sortOptions,
    defaultValue, removeAllMedia, delay, mediaTypesRef
} from "../data/refs";
import EditBar from "./EditBar/EditBar";
import Paginator from "./Paginator/Paginator";
import Home from "./Home/Home";
import Search from "./Common/Search";
import MusicPlayer from "./Common/MusicPlayer";
import MediaPaginationBtn from "./Common/MediaPaginationBtn";
import 'react-dropdown/style.css';
import {useDispatch, useSelector} from "react-redux";
import {removeUser, updateUserAvatar} from "../data/redux/auth-reducer";
import {
    changeMediaName,
    clearSearch,
    clearSelectedMedia, deleteAllMedia,
    deleteMedia, deleteSelectedMedia,
    goToNextTrack,
    goToPreviousTrack, handleCurrentMediaSet, handleSelectedMedia,
    listAllMedia, listMedia, renameMedia,
    setCurrentAudioDuration,
    setCurrentSearchRequest,
    setCurrentTrackIndex,
    setHoveredMediaIndex,
    setMediaName,
    setTotalAudioDuration, toggleCurrentMediaSet,
    toggleCurrentTrackPlaying, toggleEditMode,
    toggleRoute,
    uploadMedia
} from "../data/redux/media-reducer";
import {
    handleAlert,
    handleCloseAlert, handleHideAlert, handleResize, handleThemeBlock,
    hideAlert, setCurrentMediaType, setCurrentTheme, setInitialSelectedMediaIndexHandler,
    setMobileHorizontalMode, setSelectedMediaIndex, toggleMediaBackground,
    toggleMobileSearch, toggleMobileSearchMount, toggleOptions, toggleOverlay, toggleOverlayFullScreen,
} from "../data/redux/fireDrive-reducer";
import {
    setCurrentPage,
    setFirstMediaIndex,
    setLastMediaIndex,
    setMediaPerPage,
    setTotalPages, togglePaginatedMedia
} from "../data/redux/paginator-reducer";
import SortMediaBtn from "./Common/SortMediaBtn";

const Main = () => {

    const dispatch = useDispatch()

    // Media slice
    const isLogged = useSelector(state => state.auth.isLogged)
    const userName = useSelector(state => state.auth.userData.displayName)
    const userAvatar = useSelector(state => state.auth.userData.photoURL)
    const currentRoute = useSelector(state => state.media.currentRoute)
    const isLoading = useSelector(state => state.media.isLoading)
    const currentMediaSet = useSelector(state => state.media.currentMediaSet)
    const editingMediaName = useSelector(state => state.media.editingMediaName)
    const mediaUploaded = useSelector(state => state.media.mediaUploaded)
    const currentTrackIndex = useSelector(state => state.media.currentTrackIndex)
    const fetchMediaSet = useSelector(state => state.media.fetchMediaSet)
    const searchResult = useSelector(state => state.media.searchResult)
    const newMediaName = useSelector(state => state.media.newMediaName)
    const audioSet = useSelector(state => state.media.audioSet)
    const hoveredMediaIndex = useSelector(state => state.media.hoveredMediaIndex)
    const selectedMedia = useSelector(state => state.media.selectedMedia)
    const editMediaMode = useSelector(state => state.media.editMediaMode)
    const currentSearchRequest = useSelector(state => state.media.currentSearchRequest)
    const isCurrentTrackPlaying = useSelector(state => state.media.isCurrentTrackPlaying)
    const currentAudioDuration = useSelector(state => state.media.currentAudioDuration)
    const deletedTrackIndex = useSelector(state => state.media.deletedTrackIndex)
    const totalAudioDuration = useSelector(state => state.media.totalAudioDuration)
    const imageSet = useSelector(state => state.media.imageSet)
    const videoSet = useSelector(state => state.media.videoSet)
    const audioRefSet = useSelector(state => state.media.audioRefSet)
    const deletingMediaIndex = useSelector(state => state.media.deletingMediaIndex)
    const isAllMediaDeleted = useSelector(state => state.media.isAllMediaDeleted)

    ///FireDrive Slice
    const showAlert = useSelector(state => state.basic.showAlert)
    const currentTheme = useSelector(state => state.basic.currentTheme)
    const alertSuccessStyle = useSelector(state => state.basic.alertSuccessStyle)
    const smallScreenMode = useSelector(state => state.basic.smallScreenMode)
    const alertMessage = useSelector(state => state.basic.alertMessage)
    const showMediaBackground = useSelector(state => state.basic.showMediaBackground)
    const showOptions = useSelector(state => state.basic.showOptions)
    const alertActionButtonIsVisible = useSelector(state => state.basic.alertActionButtonIsVisible)
    const overlay = useSelector(state => state.basic.overlay)
    const selectedMediaIndex = useSelector(state => state.basic.selectedMediaIndex)
    const imageItemFullScreenStyle = useSelector(state => state.basic.imageItemFullScreenStyle)
    const showMobileSearch = useSelector(state => state.basic.showMobileSearch)
    const fullScreenMode = useSelector(state => state.basic.fullScreenMode)
    const currentMediaType = useSelector(state => state.basic.currentMediaType)
    const isAlertHidden = useSelector(state => state.basic.isAlertHidden)
    const sortType = useSelector(state => state.basic.sortType)
    const mobileSearchMount = useSelector(state => state.basic.mobileSearchMount)
    const showThemeBlock = useSelector(state => state.basic.showThemeBlock)
    const mobileHorizontalMode = useSelector(state => state.basic.mobileHorizontalMode)
    const imageFullScreenStyle = useSelector(state => state.basic.imageFullScreenStyle)
    const currentPage = useSelector(state => state.paginator.currentPage)
    const mediaPerPage = useSelector(state => state.paginator.mediaPerPage)
    const totalPages = useSelector(state => state.paginator.totalPages)
    const firstMediaIndex = useSelector(state => state.paginator.firstMediaIndex)
    const lastMediaIndex = useSelector(state => state.paginator.lastMediaIndex)

    useEffect(() => {
        if (currentRoute !== rootRoute) {
            handleCurrentMediaSet({dispatch},
                imagesPage ? imageSet : videosPage ? videoSet : audioPage ? [audioRefSet, audioSet] : void 0, sortType, currentRoute)
        } else {
            void 0
        }

    }, [currentRoute, sortType, imageSet, audioRefSet, videoSet])

    // refs
    const optionListCallerRef = useRef(null)
    const mobileSearchCallerRef = useRef(null)

    useEffect(() => {
        mediaTypesRef.forEach(ref =>
            listMedia({dispatch}, userName, ref, true, sortType))
    }, [])

    useEffect(() => {
        const handleClickOutside = async (event) => {
            optionListCallerRef.current !== null && !optionListCallerRef.current.contains(event.target)
            && dispatch(toggleOptions(false))

            if (mobileSearchCallerRef.current !== null && !mobileSearchCallerRef.current.contains(event.target)) {
                if (!mobileSearchMount && showMobileSearch) {
                    dispatch(toggleMobileSearch(false))
                    await delay(100)
                    dispatch(toggleMobileSearchMount(true))
                } else {
                    void 0
                }
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [optionListCallerRef, mobileSearchMount]);

    const imagesPage = currentRoute === imageRoute
    const videosPage = currentRoute === videosRoute
    const audioPage = currentRoute === audioRoute
    const rootPage = currentRoute === rootRoute

    const paginatedMedia = currentMediaSet.slice(firstMediaIndex, lastMediaIndex)
    const searchMode = searchResult.length > 0
    const mediaToShow = searchResult.length > 0 ? searchResult : paginatedMedia
    const noMedia = mediaToShow.length === 0

    const pages = [imagesPage, videosPage, audioPage, rootPage]

    const currentTrack = audioSet[currentTrackIndex]
    const location = useLocation()
    const pathName = location.pathname
    const audioArray = audioPage && currentMediaSet.length
    const audioIsPresent = audioSet.length > 0
    const widthScreen = window.innerWidth > window.innerHeight
    const normalScreen = window.innerHeight > window.innerWidth


    useEffect(() => {
        (widthScreen && smallScreenMode) ? dispatch(setMobileHorizontalMode(true)) : dispatch(setMobileHorizontalMode(false))
    }, [widthScreen, normalScreen])

    useEffect(() => {
        window.addEventListener('resize', () => handleResize({dispatch}));
    }, [])


    useEffect(() => {
        localStorage.getItem('hideAlert') ? dispatch(hideAlert(true)) : void 0
    }, [localStorage.getItem('hideAlert')])

    useEffect(() => {
        if (!rootPage) {
            dispatch(setCurrentPage(1))
            dispatch(setCurrentSearchRequest(''))
            dispatch(clearSearch())
            // listAllMedia({dispatch}, currentRoute, userName)
            showMobileSearch && toggleMobileSearch(false)
        }
    }, [currentRoute])


    useEffect(() => {
        if (mediaUploaded) {
            dispatch(setCurrentPage(1))
        }
    }, [currentMediaSet])


    useEffect(() => {
        dispatch(toggleRoute(pathName))
    }, [pathName])


    useEffect(() => {
        !editMediaMode && dispatch(clearSelectedMedia())
        editMediaMode && isCurrentTrackPlaying && dispatch(toggleCurrentTrackPlaying(false))
    }, [editMediaMode])

    useEffect(() => {
            const match = deletedTrackIndex === currentTrackIndex
            if (match) {
                dispatch(toggleCurrentTrackPlaying(false))
                goToNextTrack({dispatch}, currentTrackIndex, audioSet)
            }

        }, [deletedTrackIndex]
    )

    const deleteAllMediaParams = [currentMediaSet, currentRoute, userName]

    window.imageSet = imageSet
    window.videoSet = videoSet
    window.currentMediaSet = currentMediaSet
    window.audioRefSet = audioRefSet
    window.audioSet = audioSet


    if (!isLogged) {
        return <Navigate to={signInRoute}/>
    }

    return (
        <div>
            {!smallScreenMode &&
                <Header {...{
                    removeUser,
                    audioSet,
                    currentTrackIndex,
                    userAvatar,
                    updateUserAvatar,
                    userName,
                    uploadMedia,
                    isCurrentTrackPlaying,
                    toggleCurrentTrackPlaying,
                    showMediaBackground,
                    toggleMediaBackground,
                    currentTrack,
                    audioIsPresent,
                    currentAudioDuration,
                    setCurrentAudioDuration,
                    editMediaMode,
                    goToPreviousTrack,
                    goToNextTrack,
                    totalAudioDuration,
                    setTotalAudioDuration,
                    smallScreenMode,
                    showOptions,
                    optionListCallerRef,
                    overlay,
                    toggleOptions,
                    dispatch,
                    handleThemeBlock,
                    showThemeBlock,
                }}/>}

            {editMediaMode &&
                <EditBar {...{
                    selectedMedia, deleteSelectedMedia, currentRoute, editMediaMode, toggleEditMode,
                    userName, dispatch
                }}/>}
            <section className={'section-container'}>
                {rootPage && <Home {...{userName, smallScreenMode, imageSet, videoSet, audioRefSet}}/>}
                {!rootPage && <div
                    className={`media-content-container`}>
                    {!smallScreenMode && <Search {...{currentSearchRequest, dispatch}}/>}
                    <div
                        className={smallScreenMode ? 'mobile-media-control-panel-container' : 'media-control-panel-container'}>
                        {!rootPage && <>
                            <SortMediaBtn {...{smallScreenMode, noMedia, dispatch, sortType}}/>
                            <MediaPaginationBtn {...{mediaPerPage, setMediaPerPage, smallScreenMode, dispatch}}/>
                        </>}
                        <MediaActionBtnPanel{...[isLoading, currentRoute, fetchMediaSet, uploadMedia, userName, pages, deleteAllMedia,
                            deleteAllMediaParams, handleAlert, isAlertHidden,
                            currentMediaSet, smallScreenMode, dispatch]}/>

                    </div>
                    <div className={'media-list-section-container'}>
                        <Routes>
                            <Route path={currentRoute}
                                   element={<Media {...{
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
                                   }}/>}/>
                        </Routes>
                    </div>
                    {!noMedia &&
                        <Paginator {...[currentMediaSet, mediaPerPage, currentPage, setCurrentPage, setFirstMediaIndex,
                            setLastMediaIndex, totalPages, setTotalPages, fetchMediaSet, dispatch]}/>}
                </div>}
            </section>
            {overlay && <Overlay {...{
                toggleOverlay, selectedMediaIndex, paginatedMedia, deleteMedia, currentRoute,
                userName, searchMode, showAlert, alertMessage, smallScreenMode, alertActionButtonIsVisible,
                handleCloseAlert, handleHideAlert, noMedia, fullScreenMode, imageItemFullScreenStyle,
                imageFullScreenStyle, toggleOverlayFullScreen, editingMediaName, changeMediaName, newMediaName,
                setMediaName, renameMedia, currentMediaType, mobileHorizontalMode, mediaToShow, optionListCallerRef,
                showOptions, toggleOptions, dispatch, setSelectedMediaIndex, setCurrentTheme, handleThemeBlock,
                showThemeBlock, overlay, currentTheme, alertSuccessStyle, deleteAllMediaParams, deletingMediaIndex,
            }}/>}

            <>
                {showMobileSearch &&
                    <Search {...{
                        currentSearchRequest, smallScreenMode, mobileSearchCallerRef, toggleMobileSearchMount,
                        dispatch
                    }}/>}
                {smallScreenMode &&
                    <MusicPlayer {...{
                        audioSet, userName, currentTrackIndex, isCurrentTrackPlaying, toggleCurrentTrackPlaying,
                        currentTrack, audioIsPresent, currentAudioDuration, setCurrentAudioDuration, editMediaMode,
                        goToNextTrack, goToPreviousTrack, totalAudioDuration, setTotalAudioDuration, smallScreenMode,
                        dispatch
                    }}/>}
            </>
            <Footer {...{
                smallScreenMode,
                removeUser,
                toggleMobileSearch,
                rootPage,
                handleAlert,
                noMedia,
                showMobileSearch,
                optionListCallerRef,
                showOptions,
                toggleOptions,
                overlay,
                mobileSearchCallerRef,
                dispatch,
                handleThemeBlock,
                showThemeBlock,
            }}/>
        </div>
    );
}

export default Main;