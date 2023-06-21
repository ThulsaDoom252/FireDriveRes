import React from 'react';
import {AiOutlinePauseCircle, AiOutlinePlayCircle} from "react-icons/ai";

const AudioControls = (props) => {
    const {0: index, 1: trackPlaying, 2: trackPaused, 3: handlePlay, 4: handlePause, 5: className, 6: editMediaMode} = props

    if(!editMediaMode) {
        return (
            <>
                {trackPlaying(index) ? <AiOutlinePauseCircle className={className} onClick={handlePause}/> :
                    <AiOutlinePlayCircle onClick={() => handlePlay(index)} className={className}/>}
            </>
        );
    } else {
        void 0
    }

};

export default AudioControls;