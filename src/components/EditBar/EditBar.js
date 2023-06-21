import React from 'react';
import ButtonPanel from "../Common/ButtonPanel";
import {defaultValue, editBarClasses} from "../../data/refs";

const EditBar = ({
                     selectedMedia, deleteSelectedMedia, currentRoute, editMediaMode, toggleMediaMode,
                     userName, dispatch,
                 }) => {

    return (
        <div className={'editBar-container'}>
            <ButtonPanel {...[editBarClasses,
                deleteSelectedMedia,
                [currentRoute, selectedMedia, userName], defaultValue,
                editMediaMode, toggleMediaMode, dispatch]}/>
        </div>
    );
};

export default EditBar;