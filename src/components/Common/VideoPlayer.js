import React, {useRef, useState} from 'react';
import {ClockLoader} from "react-spinners";
import ReactPlayer from "react-player";
import {formatTime} from "../../data/refs";
import DeleteOverlay from "../Media/DeleteOverlay";

const VideoPlayer = ({url, index, deletingMediaIndex, overlay, inOverlay = false, isAllMediaDeleted}) => {
    const videoRef = useRef(null)
    const [duration, setDuration] = useState(0)
    const durationLoading = duration === 0

    const isVideoDeleting = index === deletingMediaIndex

    const handleLoadedMetadata = () => {
        const currentVideoTime = videoRef.current.getDuration()
        const formattedTime = formatTime(currentVideoTime)
        setDuration(formattedTime)
    };

    return (
        <>
            {isVideoDeleting || isAllMediaDeleted && <DeleteOverlay/>}
                <ReactPlayer
                    className='media-video' ref={videoRef}
                    onReady={handleLoadedMetadata}
                    controls={false} muted={true}
                    url={url}/>
                <div style={{bottom: overlay ? '10px' : void 0}} className={'video-duration'}>{durationLoading ?
                    <ClockLoader size={20} color={'white'}/> : duration}</div>
            </>
                );
            }

            export default React.memo(VideoPlayer);
