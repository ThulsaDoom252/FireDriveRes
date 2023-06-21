import React from 'react';
import {BsPlusCircle} from "react-icons/bs";

const NewFolderBtn = (props) => {
    const {0: disabled, 1: className} = props
    window.disabled = disabled
    return (
        <button disabled={disabled}
                className={className}>
            <BsPlusCircle/></button>
    );
};

export default NewFolderBtn;