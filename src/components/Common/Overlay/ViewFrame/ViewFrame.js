import React from 'react';
import CurrentMedia from "./CurrentMedia";
import ShareBlock from "./ShareBlock";
import DesktopControls from "./DesktopControls";
import ItemsList from "./ItemsList";

const ViewFrame = ({
                       fullScreenMode,
                       currentMedia,
                       editNameMode,
                       paginatedMedia,
                       selectedMediaIndex,
                       setSelectedMediaIndex,
                       imageItemFullScreenStyle,
                       imageFullScreenStyle,
                       smallScreenMode,
                       handleChangeImage,
                       mediaNameProps,
                       currentMediaType,
                       mobileHorizontalMode,
                       fullScreenStyle,
                       mediaToShow,
                       selectedMediaUrl,
                       optionListCallerRef,
                       showOptions,
                       toggleOptions,
                       dispatch,
                       deletingMediaIndex,
                   }) => {

    return (
        <div
            style={fullScreenMode ? fullScreenStyle : void 0}
            className={`${currentMediaType === 'image' ? 'viewFrame-image-container' : 'viewFrame-video-container'}`}>
            {showOptions && !smallScreenMode &&
                <ShareBlock url={currentMedia.url}/>}
            {editNameMode || showOptions && <div className={'overlay'}></div>}
            <div
                className={currentMediaType === 'video' ? 'viewFrame-inner-video-section' : 'viewFrame-inner-image-section'}>
                <CurrentMedia {...{
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
                    deletingMediaIndex
                }}/>
                {!fullScreenMode && !smallScreenMode &&
                    <DesktopControls mediaType={currentMediaType}
                                     toggleShareBlock={toggleOptions}
                                     shareBlock={showOptions} {...{
                        handleChangeImage, currentMedia, dispatch,
                        optionListCallerRef,
                    }}/>}
                {currentMediaType === 'video' && !mobileHorizontalMode &&
                    <ItemsList items={paginatedMedia}
                               {...{smallScreenMode, setSelectedMediaIndex, dispatch}}/>}
            </div>
        </div>
    );
};

export default ViewFrame;