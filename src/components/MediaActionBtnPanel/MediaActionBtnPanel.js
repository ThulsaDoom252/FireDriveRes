import React from 'react';
import HiddenFileInput from "../Common/HiddenFileInput";
import UploadBtn from "./UploadBtn";
import RemoveAllBtn from "./RemoveAllBtn";
import {defaultValue} from "../../data/refs";

const MediaActionBtnPanel = (props) => {
    const {
        0: isLoading, 1: currentRoute, 2: fetchMediaSet,
        3: uploadMedia, 4: userName, 5: pages, 6: deleteHandler, 7: deleteParams, 8: handleAlert,
        9: isAlertHidden, 10: currentMediaSet, 11: smallScreenMode, 12: dispatch,
    } = props
    const hiddenFileInput = React.useRef(null)
    const handleClick = () => hiddenFileInput.current.click()
    const disableRemoveBtn = currentMediaSet.length === 0 || isLoading || fetchMediaSet
    const disableUploadBtn = isLoading || fetchMediaSet

    return (
        <div className={smallScreenMode ? 'mobile-actionButtons-panel-container' : void 0}>
            <HiddenFileInput {...[hiddenFileInput, currentRoute, userName, uploadMedia, null, pages, defaultValue, dispatch]}/>
            <div className="actionBtn-container">
                <UploadBtn {...[disableUploadBtn, handleClick, `${smallScreenMode ? 'mobile-actionBtn' : 'actionBtn'} 
                ${disableUploadBtn && 'actionBtn-disabled'}`, pages, smallScreenMode, isLoading]}/>
                <RemoveAllBtn {...[disableRemoveBtn, `${smallScreenMode ? 'mobile-actionBtn' : 'actionBtn'} 
                ${disableRemoveBtn ? `actionBtn-disabled` : void 0}`,
                    deleteHandler, deleteParams, handleAlert, isAlertHidden, smallScreenMode, dispatch]}/>
            </div>
        </div>
    );
}

export default MediaActionBtnPanel