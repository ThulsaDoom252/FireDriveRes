import React from 'react';
import {IoMdColorFill} from "react-icons/io";

const ChangeTheme = ({handleThemeBlock, showThemeBlock, dispatch, overlay}) => {
    return (
        <>
            <button className={'user-option-button'}
                    onClick={() => handleThemeBlock({dispatch}, overlay, showThemeBlock)}>Change theme
                <IoMdColorFill style={{marginLeft: '6px'}}/></button>
        </>
    );
};

export default ChangeTheme;