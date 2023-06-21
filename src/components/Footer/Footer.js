import React from 'react';
import NavBar from "../Common/NavBar/NavBar";
import {handleContactClick, handleMobileOptionClick} from "../../data/redux/fireDrive-reducer";
import {BsInstagram, BsTelegram} from "react-icons/bs";
import {ImFacebook} from "react-icons/im";
import {useSelector} from "react-redux";

const Footer = ({
                    smallScreenMode,
                    rootPage,
                    noMedia,
                    optionListCallerRef,
                    showOptions,
                    showMobileSearch,
                    toggleOptions,
                    overlay,
                    mobileSearchCallerRef,
                    dispatch,
                    showThemeBlock,
                }) => {

    const developerContacts = useSelector(state => state.basic.developerContacts)
    const mobileOptionClickParams = [rootPage, noMedia, overlay, showThemeBlock, {dispatch}]

    return (
        <footer className={smallScreenMode ? 'mobile-footer' : 'footer'}>
            {smallScreenMode && <NavBar optionListCallerRef={mobileSearchCallerRef} {...{
                smallScreenMode, handleMobileOptionClick, optionListCallerRef, showOptions,
                toggleOptions, mobileOptionClickParams, dispatch, overlay, showMobileSearch
            }}/>}
            {!smallScreenMode &&
                <div className={'contact-label'}>Get connected with me on social networks and messengers</div>}
            {!smallScreenMode &&
                <div className={'contact-icons'}>{developerContacts.map((contact, index) =>
                    <p style={{cursor: 'pointer'}} key={index}
                       onClick={() => handleContactClick(contact.url)}>{contact.icon === 'facebook' ?
                        <ImFacebook/> : contact.icon === 'telegram' ? <BsTelegram/> : <BsInstagram/>}
                    </p>)}</div>}
        </footer>
    );
}

export default Footer;