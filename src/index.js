import React, {useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './firebase';
import {store} from "./data/redux/store";
import {Provider, useSelector} from "react-redux";
import {GlobalStyle} from "./themes/globalStyle";

const Root = () => {
    const currentTheme = useSelector((state) => state.basic.currentTheme);
    const showMediaBackground = useSelector(state => state.basic.showMediaBackground)

    const [images, setImages] = useState({});

    useEffect(() => {
        const loadImage = async () => {
            const nightWallpaper = await import('./themes/nightWallpaper.jpg');
            const highTechWallpaper = await import('./themes/highTechWallpaper.jpg');
            const desertWallpaper = await import ('./themes/desertWallpaper.jpg')
            const businessWallpaper = await import ('./themes/businessWallpaper.jpg')
            setImages({
                nightWallpaper: nightWallpaper.default,
                highTechWallpaper: highTechWallpaper.default,
                desertWallpaper: desertWallpaper.default,
                businessWallpaper: businessWallpaper.default,
            });
        };

        loadImage();
    }, []);

    return (
        <>
            <GlobalStyle currentTheme={currentTheme} images={images} showMediaBackground={showMediaBackground}/>
            <App/>
        </>
    );
};

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Root/>
    </Provider>
);

reportWebVitals();
