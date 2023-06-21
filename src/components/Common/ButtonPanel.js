import React from 'react';
import {RiDeleteBin6Line} from "react-icons/ri";
import {RxCross2} from "react-icons/rx";
import {BsFillPencilFill, BsTelegram} from "react-icons/bs";
import {
    FacebookShareButton,
    TelegramShareButton,
    ViberShareButton
} from "react-share";
import {FaFacebook, FaViber} from "react-icons/fa";

const ButtonPanel = (props) => {
    const {
        0: classNames = ['buttons-panel', 'media-edit-btn', 'media-share-btn', 'delete-btn', 'media-btn'],
        1: deleteHandler,
        2: deleteParams,
        3: url = '',
        4: editMediaMode,
        5: toggleEditMode,
        6: mediaName,
        7: setMediaName,
        8: dispatch,
    } = props
    const [containerClass, editBtnClass, shareBtnClass, deleteBtnClass, commonClass] = classNames

    return (
        <div onClick={e => e.stopPropagation()} className={containerClass}>
            {!editMediaMode &&
                <>
                    <BsFillPencilFill className={`${editBtnClass} ${commonClass}`}
                                      onClick={e => setMediaName({dispatch}, mediaName, e)}/>
                    <span>
                    <TelegramShareButton url={url}><BsTelegram
                        className={`${shareBtnClass} ${commonClass}`}/></TelegramShareButton>
                    <ViberShareButton url={url}><FaViber
                        className={`${shareBtnClass} ${commonClass}`}/></ViberShareButton>
                    <FacebookShareButton url={url}><FaFacebook
                        className={`${shareBtnClass} ${commonClass}`}/></FacebookShareButton>
                </span></>}
            <button className={`${deleteBtnClass} ${commonClass}`}
                    onClick={() => deleteHandler(deleteParams)}>
                <RiDeleteBin6Line/>
            </button>
            {editMediaMode && <button onClick={() => dispatch(toggleEditMode(false))}><RxCross2/></button>}
        </div>
    );
};

export default ButtonPanel;