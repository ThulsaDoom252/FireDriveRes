import React from 'react';
import {RiDeleteBin5Line} from "react-icons/ri";
import {removeAllMedia} from "../../data/refs";

const RemoveAllBtn = (props) => {
    const {
        0: disabled,
        1: className,
        2: deleteHandler,
        3: deleteParams,
        4: handleAlert,
        5: isAlertHidden,
        6: smallScreenMode,
        7: dispatch,
    } = props
    return (
        <button style={{color: disabled && 'gray'}} title={'Delete all media'} id={'remove-all-btn'} disabled={disabled}
                onClick={() => isAlertHidden ? deleteHandler({dispatch}, ...deleteParams) : handleAlert({dispatch}, removeAllMedia)}
                className={className}><RiDeleteBin5Line/> <span hidden={smallScreenMode}>Remove all</span>
        </button>
    );
};

export default RemoveAllBtn;