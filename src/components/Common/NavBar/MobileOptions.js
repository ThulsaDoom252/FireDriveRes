import React from 'react';
import {SlOptionsVertical} from "react-icons/sl";
import {BsSearch} from "react-icons/bs";
import {MdOutlineColorLens} from "react-icons/md"
import {RiLogoutBoxLine} from "react-icons/ri"

const MobileOptions = ({
                           handleMobileOptionClick,
                           optionListCallerRef,
                           showOptions,
                           toggleOptions,
                           overlay,
                           dispatch,
                           mobileOptionClickParams
                       }) => {

    return (
        <div className={'mobile-options-container'}>
            <button ref={!overlay ? optionListCallerRef : void 0} className={'navItems'}
                    onClick={() => dispatch(toggleOptions(!showOptions))}>
                <SlOptionsVertical/>
            </button>
            {showOptions && !overlay && < div className={'mobile-options-block'}>
                {/*<span*/}
                {/*    className={'mobile-option-item'}*/}
                {/*    onClick={() => handleMobileOptionClick('search', ...mobileOptionClickParams)}>*/}
                {/*    <BsSearch/><span>Search</span></span>*/}
                <span className={'mobile-option-item'}
                      onClick={() => {
                          handleMobileOptionClick('theme', ...mobileOptionClickParams)
                      }}><MdOutlineColorLens/><span>Theme</span></span>
                <span className={'mobile-option-item'}
                      onClick={() => handleMobileOptionClick('logout', ...mobileOptionClickParams)}>
                    <RiLogoutBoxLine/><span>logOut</span></span>

            </div>}

        </div>

    );
};

export default MobileOptions;