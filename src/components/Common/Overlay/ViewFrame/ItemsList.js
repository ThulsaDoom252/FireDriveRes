import React from 'react';
import VideoPlayer from "../../VideoPlayer";

const ItemsList = ({items, setSelectedMediaIndex, smallScreenMode, dispatch}) => {
    return (
        <div className={'viewFrame-list-block'}>
            {items.map((item, index) => <>
                <div key={index}
                     className={smallScreenMode ? 'viewFrame-list-mobile-item' : 'viewFrame-list-item'}
                     onClick={() => dispatch(setSelectedMediaIndex(index))}>

                    <VideoPlayer url={item.url} index={index} overlay={true} inOverlay={true}/>
                </div>
                <p key={index} className={'viewFrame-list-item-name'}>{item.name}</p>
            </>)}
        </div>
    );
};

export default ItemsList;