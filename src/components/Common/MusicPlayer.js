import React, {useEffect, useRef} from 'react';
import {FiPause, FiPlay} from "react-icons/fi";
import {TbPlayerTrackNext, TbPlayerTrackPrev} from "react-icons/tb";
import {audioRoute, formatTime} from "../../data/refs";
import HiddenFileInput from "./HiddenFileInput";
import {BsPause, BsPlayCircle} from "react-icons/bs";

const MusicPlayer = ({
                         audioSet,
                         uploadMedia,
                         userName,
                         currentTrackIndex,
                         isCurrentTrackPlaying,
                         toggleCurrentTrackPlaying,
                         currentTrack = {url: '', name: '',},
                         audioIsPresent,
                         currentAudioDuration,
                         setCurrentAudioDuration,
                         editMediaMode,
                         goToNextTrack,
                         goToPreviousTrack,
                         totalAudioDuration,
                         setTotalAudioDuration,
                         smallScreenMode,
                         dispatch,
                     }) => {

    const hiddenFileInput = React.useRef(null)
    const handleRefClick = () => hiddenFileInput.current.click()
    const audioRef = useRef(null)
    const audio = audioRef.current

    const handlePlay = () => {
        if (audioIsPresent && audio !== null) {
            isCurrentTrackPlaying ? audio.play() : audio.pause()
        }
    }

    const playBtnIcon = smallScreenMode ? <BsPlayCircle className={'mobile-play-icon'}/> : <FiPlay/>
    const pauseBtnIcon = smallScreenMode ? <BsPause className={'mobile-pause-icon'}/> : <FiPause/>


    const formatCurrentTrackLength = (name) => {
        const maxLength = smallScreenMode ? 60 : 40
        const currentTrackLength = name.length
        const formattedName = name.slice(0, maxLength) + '...'
        if (currentTrackLength < maxLength) {
            return name
        } else {
            return formattedName
        }
    }

    const handleTimeUpdate = () => {
        dispatch(setCurrentAudioDuration(audioRef.current.currentTime));
    };

    const playCurrentTrack = () => {
        dispatch(toggleCurrentTrackPlaying(!isCurrentTrackPlaying));
    };

    useEffect(() => {
        handlePlay()
    }, [isCurrentTrackPlaying]);

    useEffect(() => {
        const audio = audioRef.current
        if (audioIsPresent && audio) {
            audio.src = currentTrack.url

            audio.load()

            const handleEnded = () => {
                dispatch(toggleCurrentTrackPlaying(false));
                goToNextTrack({dispatch}, currentTrackIndex, audioSet)
            };

            audio.addEventListener('ended', handleEnded);

            const handleDurationChange = () => {
                dispatch(setTotalAudioDuration(audio.duration));
            };

            audio.addEventListener('durationchange', handleDurationChange);

            return () => {
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('durationchange', handleDurationChange);
            };
        }

    }, [audioIsPresent, currentTrackIndex, currentTrack.name]);


    const handleSeekBarChange = (event) => {
        const currentTime = Number(event.target.value);
        dispatch(setCurrentAudioDuration(currentTime));
        audio.currentTime = currentTime;
    };

    if (!audioIsPresent) {
        return <HiddenFileInput {...[hiddenFileInput, audioRoute, userName, uploadMedia,
            handleRefClick, [], true, dispatch]}/>
    }

    return (
        <>
            <div
                className={!editMediaMode ? `${smallScreenMode ? 'mobile-music-player-container'
                        : 'music-player-container'}`
                    : `${smallScreenMode ? 'mobile-music-player-disabled' : 'music-player-container-disabled'}`}>
                {!smallScreenMode && currentTrack && <div
                    className={'track-name'}>{currentTrack.name === undefined ? formatCurrentTrackLength(currentTrack.oldName)
                    : formatCurrentTrackLength(currentTrack.name)}</div>}
                <div>
                    <div className={'mobile-music-player-buttons-container'}>
                        <button className='player-buttons'
                                onClick={() => goToPreviousTrack({dispatch}, currentTrackIndex)}
                                disabled={currentTrackIndex === 0 || editMediaMode}>
                            <TbPlayerTrackPrev className={smallScreenMode && 'mobile-prev-btn'}/>
                        </button>
                        <button className={'player-buttons'}
                                disabled={editMediaMode}
                                onClick={playCurrentTrack}>
                            {isCurrentTrackPlaying ? pauseBtnIcon : playBtnIcon}
                        </button>
                        <button className={'player-buttons'}
                                onClick={() => goToNextTrack({dispatch}, currentTrackIndex, audioSet)}
                                disabled={currentTrackIndex === audioSet.length - 1 || editMediaMode}
                        >
                            <TbPlayerTrackNext className={smallScreenMode && 'mobile-next-btn'}/>
                        </button>
                    </div>
                </div>
                {!smallScreenMode && <div className={'time-display'}>
                    {formatTime(currentAudioDuration)} / {formatTime(totalAudioDuration)}
                </div>}

                <div className={smallScreenMode ? 'mobile-seek-bar-container' : 'seek-bar-container'}>
                    <input
                        className={'II'}
                        disabled={editMediaMode}
                        type="range"
                        min="0"
                        max={totalAudioDuration}
                        value={currentAudioDuration}
                        onChange={handleSeekBarChange}
                    />
                </div>
                <audio ref={audioRef} onTimeUpdate={handleTimeUpdate}/>
            </div>

        </>
    );
}

export default MusicPlayer;