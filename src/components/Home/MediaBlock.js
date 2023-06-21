import React from 'react';
import {audioRoute, imageRoute, imagesRef, sliceMediaName, videosRef, videosRoute} from "../../data/refs";
import {TfiMusicAlt} from "react-icons/tfi";
import {ClockLoader} from "react-spinners";
import {HiPhoto} from "react-icons/hi2";
import {MdOutlineLibraryMusic, MdOutlineVideoLibrary} from "react-icons/md";
import {NavLink} from "react-router-dom";

const MediaBlock = ({
                        smallScreenMode,
                        blockHeight = '200px',
                        blockWidth = `${smallScreenMode ? '90vw' : '70vw'}`,
                        objHeight = `${smallScreenMode ? '100px' : '150px'}`,
                        objWidth = `${smallScreenMode ? '16.6%' : '20%'}`,
                        mediaType,
                        mediaLoading,
                        mediaArr
                    }) => {


    const images = mediaType === imagesRef
    const videos = mediaType === videosRef

    const noMedia = mediaArr.length === 0
    const mobileIconStyle = {
        height: '20%',
        display: mediaLoading || noMedia ? 'none' : 'flex',
        fontSize: '1rem',
    }

    const blockStyle = {
        flexDirection: smallScreenMode ? 'column' : void 0,
        height: blockHeight,
        width: blockWidth,
        justifyContent: mediaLoading || noMedia ? 'center' : 'left',
        alignItems: smallScreenMode ? 'center' : void 0,
        background: smallScreenMode ? 'transparent' : void 0,
    }
    const mediaObjStyle = {
        height: objHeight,
        width: objWidth
    }

    const mobileMediaListStyle = {
        height: mediaLoading || noMedia ? '100%' : '80%',
        width: '100%',
    }

    const showMobileStyles = (blockType) => {
        switch (blockType) {
            case 'icon':
                return smallScreenMode ? mobileIconStyle : void 0
            case 'mediaList':
                return smallScreenMode ? mobileMediaListStyle : void 0
            default:
                void 0
        }
    }

    return (
        <NavLink to={images ? imageRoute : videos ? videosRoute : audioRoute}
                 style={blockStyle}
                 className={'home-media-block-container'}>
            <div style={showMobileStyles('icon')}
                 className={'home-media-icon-item'}>
                {images ? <>{smallScreenMode ?
                    <div className={'home-media-mobile-item-icon'} style={showMobileStyles('icon')}>
                        <p>Images:</p>
                        <p>{mediaArr.length}</p></div> :
                    <HiPhoto className={'home-media-icon'}/>}</> : videos ?
                    <>{smallScreenMode ?
                        <div className={'home-media-mobile-item-icon'} style={showMobileStyles('icon')}>
                            <p>Videos:</p>
                            <p>{mediaArr.length}</p></div> :
                        <MdOutlineVideoLibrary className={'home-media-icon'}/>}</> :
                    <>{smallScreenMode ?
                        <div className={'home-media-mobile-item-icon'} style={showMobileStyles('icon')}>
                            <p>Audio:</p>
                            <p>{mediaArr.length}</p></div> :
                        <MdOutlineLibraryMusic className={'home-media-icon'}/>}</>}
            </div>
            <div className={'home-media-list-container'} style={showMobileStyles('mediaList')}>
                {mediaLoading ?
                    <div className={'home-media-list-loading'}> Loading...<ClockLoader
                        className={'home-media-list-loader'} size={50} color={'blue'}/>
                    </div> :
                    <>
                        {noMedia ? `${images ? 'No images..' : videos ? 'No videos..'
                            : 'No audio...'}` : mediaArr.slice(0, smallScreenMode ? 6 : 4).map((media, index) => <div
                            style={mediaObjStyle}
                            key={index} className={images ? 'home-media-image-item' :
                            videos ? 'home-media-video-item' : 'home-media-audio-item'}>
                            {images ? <img className={'home-media-image'} alt={'image'} src={media.url}/> : videos ?
                                <video className={'home-media-video'} controls={false} height={objHeight}>
                                    <source src={media.url}/>
                                </video> : <>
                                    <div className={'home-media-audio-icon-item'}><TfiMusicAlt
                                        className={'home-media-audio-icon'}/>
                                    </div>
                                    <p className={'home-media-audio-name'}>{sliceMediaName(media.name,
                                        smallScreenMode ? 10 : 15)}</p></>}
                        </div>)}
                    </>}

            </div>
            {!smallScreenMode && <div className={'home-total-media-block'}>
                <p>Total:</p>
                <p>{mediaArr.length}</p>
            </div>}
        </NavLink>

    );
};

export default MediaBlock;