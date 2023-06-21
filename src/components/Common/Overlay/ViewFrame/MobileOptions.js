import React from 'react';
import {BsArrowsFullscreen, BsFillPenFill} from "react-icons/bs";
import {AiOutlineShareAlt, AiTwotoneDelete} from "react-icons/ai";
import {FacebookShareButton, TelegramShareButton, ViberShareButton} from "react-share";
import {FaFacebook, FaTelegram, FaViber} from "react-icons/fa";

const MobileOptions = ({
                           currentMediaType,
                           handleChangeImage,
                           currentMedia,
                           optionListCallerRef,
                           showOptions,
                           toggleOptions,
                           dispatch
                       }) => {

    return (
        <div style={{justifyContent: currentMediaType === 'video' ? "left" : void 0}}
             className={'view-mobile-options-panel'}>
            <div className={'panel-2'}>
                <div className={'b-panel'}>
                    <p className={'view-mobile-edit-btn view-mobile-btn'}
                       onClick={e => handleChangeImage('rename')}>
                        <BsFillPenFill/></p>
                    <p hidden={currentMediaType === 'video'} className={'view-mobile-fullScr-btn view-mobile-btn'}
                       onClick={() => handleChangeImage('fullscreen')}>
                        <BsArrowsFullscreen/></p>
                    <p ref={optionListCallerRef} className={'view-mobile-shareBlock-btn view-mobile-btn'}
                       onClick={() => dispatch(toggleOptions(!showOptions))}>
                        <AiOutlineShareAlt/>
                    </p>
                    <p className={'view-mobile-delete-btn view-mobile-btn'}
                       onClick={e => handleChangeImage('delete')}>
                        <AiTwotoneDelete/></p>
                </div>
                {showOptions && <div className={'view-mobile-share-block'}>
                    <p className={'mobile-share-item mobile-share-tg'}><TelegramShareButton
                        url={currentMedia.url}><FaTelegram/></TelegramShareButton></p>

                    <p className={'mobile-share-item mobile-share-viber'}><ViberShareButton
                        url={currentMedia.url}><FaViber/></ViberShareButton></p>
                    <p className={'mobile-share-item mobile-share-facebook'}><FacebookShareButton
                        url={currentMedia.url}><FaFacebook/></FacebookShareButton></p>
                </div>}

            </div>
        </div>
    );
};

export default MobileOptions;