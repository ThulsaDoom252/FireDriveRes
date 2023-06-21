import React from 'react';
import {BsPlusSquare} from "react-icons/bs";
import ClipLoader from "react-spinners/ClipLoader";

const UploadBtn = (props) => {
    const {0: disabled, 1: handleClick, 2: className, 3: pages, 4: smallScreenMode, 5: isLoading} = props
    const [imagesPage, videosPage] = pages
    return (
        <button style={{color: disabled && 'gray'}} title={'Upload media  mobile-upload-button'} disabled={disabled}
                onClick={handleClick}
                className={className}><BsPlusSquare/> <span
            hidden={smallScreenMode}>{isLoading ? '...Loading' : `Add ${imagesPage ? 'Photo' : videosPage ? 'Video' : 'Audio'}`}</span>
        </button>
    );
};

export default UploadBtn;