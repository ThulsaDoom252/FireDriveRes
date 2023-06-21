import React, {useEffect, useRef, useState} from 'react';
import {TfiMusicAlt} from "react-icons/tfi";
import equalizer from "./files/equalizer.gif";
import AudioControls from "./AudioControls";
import {formatTime} from "../../data/refs";
import {ClockLoader} from "react-spinners";
import DeleteOverlay from "./DeleteOverlay";

const AudioRef = ({
                      trackPlaying,
                      trackPaused,
                      trackHovered,
                      audioIndex,
                      index,
                      audio,
                      deletingMediaIndex,
                      editMediaMode,
                      handleAudioPlay,
                      handleAudioPause,
                      currentAudioDuration,
                      isAllMediaDeleted,
                  }) => {
    const isAudioRefDeleting = index === deletingMediaIndex
    const audioElemRef = useRef(null)
    const [audioDuration, setAudioDuration] = useState(null)
    useEffect(() => {
        // Обработчик события loadedmetadata для получения длительности аудио
        const handleLoadedMetadata = () => {
            if (audioElemRef.current) {
                setAudioDuration(audioElemRef.current.duration);
            }
        };

        // Подписываемся на событие loadedmetadata
        if (audioElemRef.current) {
            audioElemRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
        }

        // Отписываемся от события при размонтировании компоненты
        return () => {
            if (audioElemRef.current) {
                audioElemRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
            }
        };
    }, []);


    return (
        <>
            {isAudioRefDeleting || isAllMediaDeleted && <DeleteOverlay/>}
            <div className={'audio-icon-container'}>
                <audio hidden={true} ref={audioElemRef} id={`audio-${audioIndex}`} src={audio.url}></audio>
                <TfiMusicAlt className={'audio-icon'}/>
                {trackPlaying(audioIndex) && !editMediaMode &&
                    <img className={'audio-playing-gif'} src={equalizer}
                         alt="PLAYING"/>}
                {trackPlaying(audioIndex) || trackHovered(index) &&
                    <div className={'audio-icon-overlay'}></div>}
                {trackHovered(index) &&
                    <AudioControls {...[audioIndex, trackPlaying, trackPaused, handleAudioPlay, handleAudioPause, 'audio-play-icon', editMediaMode]}/>}
            </div>
            <div
                className={'audio-ref-time'}>
                {trackPlaying(audioIndex) ? formatTime(currentAudioDuration)
                    : trackPaused(audioIndex) ? `${audio && formatTime(currentAudioDuration)} / 
                    ${audioDuration && formatTime(audioDuration)}` : audioDuration && !isNaN(audioDuration) ? formatTime(audioDuration) :
                        <ClockLoader color={'blue'} size={15}/>}
            </div>
        </>
    );
};

export default AudioRef;