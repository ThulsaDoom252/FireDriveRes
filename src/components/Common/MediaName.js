import React from 'react';
import {useSelector} from "react-redux";
import {sliceMediaName} from "../../data/refs";

const MediaName = ({
                       mediaName = '',
                       oldMediaName,
                       editingMediaName,
                       changeMediaName,
                       currentRoute,
                       newMediaName,
                       userName,
                       setMediaName,
                       renameMedia,
                       mediaNameClass,
                       mediaInputClass = 'media-input-name',
                       containerClass = 'mediaName-container',
                       dispatch,
                   }) => {


    return (
        <div className={containerClass}> {editingMediaName !== mediaName ?
            <span className={mediaNameClass} title={mediaName}>{sliceMediaName(mediaName, 15)}</span> :
            <div>
                <input className={mediaInputClass} type="text" value={newMediaName}
                       autoFocus={true}
                       onBlur={(e) => {
                           setMediaName({dispatch}, null, e)
                           renameMedia({dispatch}, editingMediaName, newMediaName, currentRoute, newMediaName,
                               oldMediaName, userName)
                       }
                       }
                       onChange={e => dispatch(changeMediaName(e.currentTarget.value))}/>
            </div>
        }</div>
    );
};

export default MediaName;