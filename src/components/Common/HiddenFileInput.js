import React from 'react';
import {audioFiles, audioRoute, imageFiles, videoFiles,} from "../../data/refs";

const HiddenFileInput = (props) => {
    const {
        0: ref,
        1: currentRoute,
        2: userName,
        3: uploadMedia,
        4: handleRefClick,
        5: pages,
        6: isRefToPlayer,
        7: dispatch
    } = props
    const [imagesPage, videosPage, audioPage] = pages
    return (
        <>
            <input
                ref={ref}
                accept={isRefToPlayer ? audioFiles : imagesPage ? imageFiles : videosPage ? videoFiles :
                    audioPage ? audioFiles : ''}
                hidden={true}
                type={"file"}
                onChange={e => uploadMedia({dispatch}, e, isRefToPlayer ? audioRoute : currentRoute, userName)}
                multiple/>
            {isRefToPlayer !== void 0 &&
                <span style={{cursor: 'pointer'}} onClick={handleRefClick}>Click to add audio</span>}
        </>
    )

};

export default HiddenFileInput;