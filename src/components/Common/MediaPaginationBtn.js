import React from 'react';
import {AiOutlineMinusCircle, AiOutlinePlusCircle} from "react-icons/ai";

const MediaPaginationBtn = ({mediaPerPage, setMediaPerPage, smallScreenMode, dispatch}) => {
    return (
        <div className={'media-per-page-main-container'}>
            <div className={'media-per-page-input-container'}>
                {!smallScreenMode &&
                    <button className={'media-per-page-buttons'}
                            onClick={() => dispatch(setMediaPerPage(mediaPerPage - 1))}>
                        <AiOutlineMinusCircle/></button>}

                <input className={'media-per-page-input'} type="number" value={mediaPerPage}
                       onChange={e => dispatch(setMediaPerPage(e.currentTarget.value))}/>
                {!smallScreenMode &&
                    <button className={'media-per-page-buttons'}
                            onClick={() => dispatch(setMediaPerPage(mediaPerPage + 1))}>
                        <AiOutlinePlusCircle/></button>}

            </div>
            <div className={'media-per-page-seek-bar-container'}>
                <input
                    type="range"
                    min="0"
                    max={999}
                    value={mediaPerPage}
                    onChange={e => dispatch(setMediaPerPage(e.target.value))}
                />
            </div>
        </div>


    );
};

export default MediaPaginationBtn;