import React from 'react';
import noImages from "../Common/files/no images.png";
import noVideos from "../Common/files/no videos.png";
import noAudio from "../Common/files/no music.png";

const NoMedia = ({imagesPage, videosPage}) => {
    return (
            <div className={'no-media-img-item'}>
                <img className={'no-media-img'} src={imagesPage ? noImages : videosPage ? noVideos : noAudio}
                     alt="No media available"/>
            </div>
    );
};

export default NoMedia;