import React from 'react';
import {NavLink} from "react-router-dom";
import {audioRoute, imageRoute, rootRoute, videosRoute} from "../../../data/refs";
import {HiOutlineHome} from "react-icons/hi";
import {TfiGallery, TfiMusicAlt} from "react-icons/tfi";
import {AiOutlineVideoCamera} from "react-icons/ai";
import MobileOptions from "./MobileOptions";
import {BsSearch} from "react-icons/bs";

const NavBar = ({
                    smallScreenMode = false,
                    handleMobileOptionClick,
                    optionListCallerRef,
                    showOptions,
                    toggleOptions,
                    overlay,
                    dispatch,
                    mobileOptionClickParams,
                    showMobileSearch,

                }) => {
    return (
        <nav className={`${smallScreenMode ? 'mobile-navbar' : 'navbar'}`}>
            <NavLink to={rootRoute}
                     className={navData => navData.isActive ? `${smallScreenMode ? 'mobile-navItems-active' : 'navItems-active'}` : `${smallScreenMode ? 'mobile-navItems' : 'navItems'}`}>{smallScreenMode ?
                <HiOutlineHome/> : 'Home'}</NavLink>
            <NavLink to={imageRoute}
                     className={navData => navData.isActive ? `${smallScreenMode ? 'mobile-navItems-active' : 'navItems-active'}` : `${smallScreenMode ? 'mobile-navItems' : 'navItems'}`}>{
                smallScreenMode ? <TfiGallery/> : 'Gallery'}</NavLink>
            <NavLink to={videosRoute}
                     className={navData => navData.isActive ? `${smallScreenMode ? 'mobile-navItems-active' : 'navItems-active'}` : `${smallScreenMode ? 'mobile-navItems' : 'navItems'}`}>{smallScreenMode ?
                <AiOutlineVideoCamera/> : 'Video'}</NavLink>
            <NavLink to={audioRoute}
                     className={navData => navData.isActive ? `${smallScreenMode ? 'mobile-navItems-active' : 'navItems-active'}` : `${smallScreenMode ? 'mobile-navItems' : 'navItems'}`}>{smallScreenMode ?
                <TfiMusicAlt/> : 'Audio'}</NavLink>
            <span hidden={!smallScreenMode}
                  className={`${showMobileSearch ? 'mobile-navItems-active' : 'mobile-navItems'}`}
                  onClick={() => handleMobileOptionClick('search', ...mobileOptionClickParams)}><BsSearch/></span>
            {smallScreenMode &&
                <MobileOptions {...{
                    handleMobileOptionClick, optionListCallerRef, showOptions, toggleOptions,
                    overlay, dispatch, mobileOptionClickParams
                }}/>}


        </nav>
    );
};

export default NavBar;