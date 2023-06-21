import {React} from 'react';
import defaultAvatar from '../../Common/files/anonymous.png'
import {MdExpandMore} from "react-icons/md";
import UserOptions from "./UserOptions/UserOptions";

const UserBlock = (props) => {
    const {
        0: removeUser,
        1: userAvatar,
        2: updateUserAvatar,
        3: userName,
        4: smallScreenMode,
        5: optionListCallerRef,
        6: userOptions,
        7: toggleUserOptions,
        8: overlay,
        9: dispatch,
        10: handleThemeBlock,
        11: showThemeBlock,
        12: showMediaBackground,
        13: toggleMediaBackground,
    } = props
    const currentAvatar = userAvatar ? userAvatar : defaultAvatar

    return (
        <div ref={overlay ? void 0 : optionListCallerRef}
             className={smallScreenMode ? 'mobile-user-block-container' : 'user-block-container'}
             onClick={() => dispatch(toggleUserOptions(!userOptions))}>
            <div className={smallScreenMode ? 'mobile-user-avatar-container' : 'user-avatar-container'}>
                <img className={smallScreenMode ? 'mobile-user-avatar' : 'user-avatar'} src={currentAvatar}
                     alt="user-avatar"/>
                {smallScreenMode && <div className={'mobile-user-name'}>{userName}</div>}
                {!smallScreenMode && <button className={'user-expand-button'}><MdExpandMore/></button>}
            </div>
            {userOptions && !overlay &&
                <UserOptions {...[removeUser, updateUserAvatar, userName, dispatch, handleThemeBlock, showThemeBlock,
                    overlay, showMediaBackground, toggleMediaBackground]}/>}
        </div>

    );
};

export default UserBlock;