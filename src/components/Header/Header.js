import React from 'react';
import MusicPlayer from "../Common/MusicPlayer";
import UserBlock from "./UserBlock/UserBlock";
import Logo from "./Logo";
import NavBar from "../Common/NavBar/NavBar";

const Header = ({
                    removeUser,
                    audioSet,
                    currentTrackIndex,
                    userAvatar,
                    updateUserAvatar,
                    userName,
                    uploadMedia,
                    isCurrentTrackPlaying,
                    toggleCurrentTrackPlaying,
                    currentTrack,
                    audioIsPresent,
                    currentAudioDuration,
                    showMediaBackground,
                    toggleMediaBackground,
                    setCurrentAudioDuration,
                    editMediaMode,
                    goToPreviousTrack,
                    goToNextTrack,
                    totalAudioDuration,
                    setTotalAudioDuration,
                    smallScreenMode,
                    optionListCallerRef,
                    showOptions,
                    toggleOptions,
                    overlay,
                    dispatch,
                    handleThemeBlock,
                    showThemeBlock,
                }) => {
    return (
        <header className={smallScreenMode ? 'mobile-header-container' : 'header-container'}>
            <Logo/>
            <NavBar/>
            <MusicPlayer uploadMedia={uploadMedia} audioSet={audioSet} userName={userName}
                         currentTrackIndex={currentTrackIndex} isCurrentTrackPlaying={isCurrentTrackPlaying}
                         toggleCurrentTrackPlaying={toggleCurrentTrackPlaying} currentTrack={currentTrack}
                         audioIsPresent={audioIsPresent}
                         currentAudioDuration={currentAudioDuration} setCurrentAudioDuration={setCurrentAudioDuration}
                         editMediaMode={editMediaMode} goToNextTrack={goToNextTrack}
                         goToPreviousTrack={goToPreviousTrack} dispatch={dispatch}
                         totalAudioDuration={totalAudioDuration}
                         setTotalAudioDuration={setTotalAudioDuration}
                         smallScreenMode={smallScreenMode}/>
            <UserBlock {...[removeUser, userAvatar, updateUserAvatar, userName, smallScreenMode, optionListCallerRef,
                showOptions, toggleOptions, overlay, dispatch, handleThemeBlock, showThemeBlock, showMediaBackground, toggleMediaBackground]}/>
        </header>
    )
        ;
}

export default Header;