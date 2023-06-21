import React from 'react';
import {
    FacebookIcon,
    FacebookShareButton,
    TelegramIcon,
    TelegramShareButton,
    ViberIcon,
    ViberShareButton
} from "react-share";

const ShareBlock = ({url}) => {
    return (
        <div className={'viewFrame-share-block'}>
            <TelegramShareButton url={url}><TelegramIcon
                className={'share-block-btn'}/></TelegramShareButton>
            <ViberShareButton url={url}><ViberIcon
                className={'share-block-btn'}/></ViberShareButton>
            <FacebookShareButton url={url}><FacebookIcon
                className={'share-block-btn'}/></FacebookShareButton>
        </div>
    );
};

export default ShareBlock;