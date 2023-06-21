import React, {useRef} from 'react';
import {BiLeftArrow, BiRightArrow} from "react-icons/bi";
import ReactPlayer from "react-player";
import {defaultValue} from "../../../../data/refs";
import MediaName from "../../MediaName";
import MobileOptions from "./MobileOptions";
import {useSwipeable} from 'react-swipeable';
import DeleteOverlay from "../../../Media/DeleteOverlay";
import {useSelector} from "react-redux";

const CurrentMedia = ({
                          selectedMediaIndex,
                          setSelectedMediaIndex,
                          fullScreenMode,
                          imageItemFullScreenStyle,
                          imageFullScreenStyle,
                          currentMediaType,
                          handleChangeImage,
                          smallScreenMode,
                          currentMedia,
                          selectedMediaUrl,
                          mediaToShow,
                          mediaNameProps,
                          editNameMode,
                          mobileHorizontalMode,
                          optionListCallerRef,
                          showOptions,
                          toggleOptions,
                          dispatch,
                          deletingMediaIndex,
                      }) => {

    const itemContainerRef = useRef(null)
    const currentMediaDeleting = deletingMediaIndex === selectedMediaIndex

    const handlers = useSwipeable({
        onSwipedLeft: () => selectedMediaIndex !== mediaToShow.length - 1 && mediaToShow.length !== 0 ? dispatch(setSelectedMediaIndex(selectedMediaIndex + 1)) : void 0,
        onSwipedRight: () => selectedMediaIndex !== 0 && currentMedia !== undefined ? dispatch(setSelectedMediaIndex(selectedMediaIndex - 1)) : void 0,
    });

    return (
        <div style={{
            backgroundColor: fullScreenMode && !smallScreenMode ? 'black' : defaultValue,
            height: currentMediaType === 'video' && mobileHorizontalMode ? '100%' : void 0
        }}
             className={currentMediaType === 'video' ? 'view-video-block' : 'view-image-block'}>
            {selectedMediaIndex !== 0 && currentMedia !== undefined && !smallScreenMode &&
                <BiLeftArrow className={'viewFrame-btn-prev viewFrame-btn'}
                             onClick={() => dispatch(setSelectedMediaIndex(selectedMediaIndex - 1))}/>}

            <div ref={itemContainerRef} style={fullScreenMode ? imageItemFullScreenStyle : void 0}
                 className={currentMediaType === 'image' ? 'current-image-item' : 'current-video-item'}>
                {!fullScreenMode && smallScreenMode && mediaToShow.length !== 0 &&
                    <MobileOptions {...{
                        currentMediaType, handleChangeImage,
                        currentMedia, optionListCallerRef,
                        showOptions, dispatch, toggleOptions
                    }}/>}
                {currentMediaType === 'video' && mediaToShow.length !== 0 || editNameMode && !fullScreenMode ?
                    <MediaName mediaName={mediaNameProps[0]} oldMediaName={mediaNameProps[1]}
                               editingMediaName={mediaNameProps[2]} changeMediaName={mediaNameProps[3]}
                               currentRoute={mediaNameProps[4]} newMediaName={mediaNameProps[5]}
                               userName={mediaNameProps[6]} setMediaName={mediaNameProps[7]}
                               renameMedia={mediaNameProps[8]}
                               dispatch={dispatch}
                               mediaInputClass={currentMediaType === 'video' ? 'viewFrame-current-video-input' : mediaNameProps[9]}
                               containerClass={currentMediaType === 'video' ? 'viewFrame-current-video-name' : mediaNameProps[10]}/> : null}
                {editNameMode && <div className={'current-media-edit-overlay'}></div>}
                {currentMediaType === 'image' &&
                    <>
                        {currentMediaDeleting && <DeleteOverlay/>}
                        <img {...handlers} style={fullScreenMode ? imageFullScreenStyle : void 0}
                             className='current-image'
                             src={selectedMediaUrl}
                             alt="image"/>
                    </>
                }
                {currentMediaType === 'video' && currentMedia ?
                    <ReactPlayer className='current-video' height={'100%'} width={'100%'} controls={true}
                                 url={currentMedia.url}/> :
                    <img hidden={currentMediaType !== 'video'} src={selectedMediaUrl} alt={'noVideo'}/>}
            </div>
            {selectedMediaIndex !== mediaToShow.length - 1 && mediaToShow.length !== 0 && !smallScreenMode &&
                <BiRightArrow className={'viewFrame-btn-next viewFrame-btn'}
                              onClick={() => dispatch(setSelectedMediaIndex(selectedMediaIndex + 1))}/>}

        </div>
    );
};

export default CurrentMedia;
