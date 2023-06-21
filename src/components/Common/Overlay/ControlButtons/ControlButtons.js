import React from 'react';
import {AiFillFacebook, AiOutlineClose, AiOutlineDelete} from "react-icons/ai";
import {FiShare2} from "react-icons/fi";
import {FacebookShareButton, TelegramShareButton, ViberShareButton} from "react-share";
import {SiTelegram, SiViber} from "react-icons/si";
import {BiFullscreen} from "react-icons/bi";
import {FaPencilAlt} from "react-icons/fa";
import {defaultValue} from "../../../../data/refs";

const ControlButtons = ({
                            toggleOverlay,
                            smallScreenMode = false,
                            handleChangeImage,
                            selectedImageUrl,
                            containerClassName = 'overlay-control',
                            btnClassName = 'overlay-control-btn',
                            closeBtnClassName = 'close-btn',
                            handleRename,
                        }) => {
    return (
        <div className={containerClassName}>
            <div>
                <TelegramShareButton url={selectedImageUrl}><SiTelegram
                    className={`${btnClassName}`}/></TelegramShareButton>
                <ViberShareButton url={selectedImageUrl}><SiViber className={`${btnClassName}`}/></ViberShareButton>
                <FacebookShareButton url={selectedImageUrl}><AiFillFacebook
                    className={`${btnClassName}`}/></FacebookShareButton>
            </div>
            <div>
                {smallScreenMode && <button onClick={e => handleRename(e)}>
                    <FaPencilAlt/></button>}
                <button className={btnClassName} onClick={() => handleChangeImage('fullscreen')}><BiFullscreen/>
                </button>
                <button className={btnClassName}><AiOutlineDelete
                    onClick={e => handleChangeImage(defaultValue, 'delete', e)}/>
                </button>
                {smallScreenMode && <button className={btnClassName}><FiShare2/></button>}
                <button className={`${btnClassName} ${closeBtnClassName}`}
                        onClick={() => toggleOverlay(false)}>
                    <AiOutlineClose/>
                </button>
            </div>
        </div>
    );
};

export default ControlButtons;