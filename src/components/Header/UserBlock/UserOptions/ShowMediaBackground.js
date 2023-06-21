import React from 'react';
import {MdOutlineWallpaper} from "react-icons/md";

const ShowMediaBackground = ({showMediaBackground, toggleMediaBackground, dispatch}) => {
    return (
        <>
            <button className={'user-option-button toggle-background-button'}
                    onClick={() => dispatch(toggleMediaBackground(!showMediaBackground))}>{
                showMediaBackground ? 'Hide Media Frame' : 'Show Media Frame'
            }
                <MdOutlineWallpaper style={{marginLeft: '6px'}}/></button>
        </>
    );
};

export default ShowMediaBackground;