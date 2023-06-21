import React from 'react';
import ChangeAvatar from "./ChangeAvatar";
import LogOut from "./LogOut";
import ChangeTheme from "./ChangeTheme";
import ShowMediaBackground from "./ShowMediaBackground";

const UserOptions = (props) => {
    const {
        0: removeUser,
        1: updateUserAvatar,
        2: userName,
        3: dispatch,
        4: handleThemeBlock,
        5: showThemeBlock,
        6: overlay,
        7: showMediaBackground,
        8: toggleMediaBackground,
    } = props
    return (
        <div className={'user-options-block'}>
            <div className={'userName-block'}>{userName}</div>
            <ChangeAvatar {...[updateUserAvatar, userName, dispatch]}/>
            <ChangeTheme handleThemeBlock={handleThemeBlock}
                         showThemeBlock={showThemeBlock} dispatch={dispatch} overlay={overlay}/>
            <ShowMediaBackground  {...{toggleMediaBackground, showMediaBackground, dispatch}}/>
            <LogOut {...[removeUser]}/>
        </div>
    );
};

export default UserOptions;