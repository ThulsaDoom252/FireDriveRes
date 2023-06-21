import React from 'react';
import {useSelector} from "react-redux";
import MediaBlock from "./MediaBlock";
import {audioRef, imagesRef, videosRef} from "../../data/refs";

const Home = ({userName, smallScreenMode, imageSet, videoSet, audioRefSet}) => {
    const imagesLoading = useSelector(state => state.media.imagesLoading)
    const videosLoading = useSelector(state => state.media.videosLoading)
    const audioLoading = useSelector(state => state.media.audioLoading)
    const totalFiles = Math.ceil(imageSet.length + videoSet.length + audioRefSet.length)

    return (
        <div className={'home-container'}>
            <h1 className={'home-title'}>Welcome to
                FireDrive {userName}!</h1>
            <p className={'home-title'}>You have: {totalFiles} files stored </p>
            <MediaBlock mediaArr={imageSet} mediaType={imagesRef} mediaLoading={imagesLoading} {...{smallScreenMode}}/>
            <MediaBlock mediaArr={videoSet} mediaType={videosRef} mediaLoading={videosLoading} {...{smallScreenMode}}/>
            <MediaBlock mediaArr={audioRefSet} mediaType={audioRef} mediaLoading={audioLoading} {...{smallScreenMode}}/>
        </div>
    );
};

export default Home;