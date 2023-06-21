import React, {useEffect, useState} from 'react';
import {businessTheme, desertTheme, highTechTheme, nightTheme} from "../../../../data/refs";
import {AiOutlineClose} from "react-icons/ai";
import {Transition} from "react-transition-group";

const ThemeBlock = ({
                        setCurrentTheme,
                        handleThemeBlock,
                        showThemeBlock,
                        overlay,
                        dispatch,
                        currentTheme,
                        smallScreenMode,
                    }) => {
    const [themeIcons, setThemeIcons] = useState([])

    useEffect(() => {
        const loadThemeIcons = async () => {
            const nightThemeIcon = smallScreenMode ? await import('./mobileNightThemeIcon.png') : await import('./nightThemeIcon.png');
            const highTechThemeIcon = smallScreenMode ? await import('./mobileHighTechThemeIcon.png') : await import('./highTechThemeIcon.png');
            const desertTechThemeIcon = smallScreenMode ? await import ('./mobileDesertThemeIcon.png') : await import ('./desertThemeIcon.png')
            const businessThemeIcon = smallScreenMode ? await import ('./mobileBusinessThemeIcon.png') : await import ('./businessThemeIcon.png')
            setThemeIcons([
                {id: nightTheme, src: nightThemeIcon.default,},
                {id: desertTheme, src: desertTechThemeIcon.default,},
                {id: highTechTheme, src: highTechThemeIcon.default,},
                {id: businessTheme, src: businessThemeIcon.default},
            ]);
        }
        loadThemeIcons()
    }, [currentTheme, smallScreenMode]);

    return (
        <Transition in={showThemeBlock} timeout={200} appear unmountOnExit>
            {state => <div className={smallScreenMode ? `mobile-theme-block ${state}` : `theme-block ${state}`}>
                <button className={'theme-block-close-btn'}
                        onClick={() => handleThemeBlock({dispatch}, overlay, showThemeBlock)}><AiOutlineClose/></button>
                {themeIcons.map((icon, index) => <div key={index}
                                                      onClick={() => dispatch(setCurrentTheme(icon.id))}
                                                      className={`${smallScreenMode ? 'mobile-theme-block-item' : 'theme-block-item'}`}>
                    <img src={icon.src} alt="theme-icon"/>
                    <p className={`${icon.id === currentTheme ? 'theme-name-current' : 'theme-name'}`}>{icon.id}</p>

                </div>)}
            </div>}

        </Transition>

    );
};

export default ThemeBlock;