import React, {useRef} from 'react';
import {MdOutlinePhotoSizeSelectActual} from "react-icons/md";

const ChangeAvatar = (props) => {
    const {0: updateUserAvatar, 1: userName, 2: dispatch} = props
    const hiddenFileInput = useRef(null);
    let uploadPhoto = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const file = event.target.files[0];
            updateUserAvatar(file, userName, {dispatch});
        };
        input.click();
    };
    return (
        <>
            <input type={"file"} hidden={true} ref={hiddenFileInput} onChange={uploadPhoto}/>
            <button className={'user-option-button'}
                    onClick={uploadPhoto}>
                Change Avatar <MdOutlinePhotoSizeSelectActual/>
            </button>
        </>

    );
};

export default ChangeAvatar;