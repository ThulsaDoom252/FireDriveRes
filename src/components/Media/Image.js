import React from 'react';
import DeleteOverlay from "./DeleteOverlay";

const Image = ({url, editMediaMode, index, deletingMediaIndex, isAllMediaDeleted}) => {
    const isImageDeleting = index === deletingMediaIndex
    return (
        <>
            {isImageDeleting || isAllMediaDeleted && <DeleteOverlay/>}
            <img
                className={`${'media-image'} ${editMediaMode && 'image-in-editMode'}`}
                src={url}
                alt="image"
            />
        </>
    );
};

export default Image;