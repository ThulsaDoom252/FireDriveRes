import {createGlobalStyle, css} from "styled-components";
import {businessTheme, desertTheme, highTechTheme, nightTheme} from "../data/refs";

///////////////////////High Tech
const htPrimary = '#51fff0'
const htSecondary = '#ffffff'
const htFrameRgba = 'rgba(255, 255, 255, 0.7)'
const htRgba = 'rgba(52, 145, 215, 0.95)'

///////////////////////Night Theme
const ntPrimary = '#769aff'
const ntSecondary = '#ffffff'
const ntFrameRgba = ''
const ntRgba = ''


///Business Theme

///Desert Theme


export const GlobalStyle = createGlobalStyle`
  ${({currentTheme, images, showMediaBackground}) => currentTheme === highTechTheme && css`
    .home-title {
      color: ${htSecondary};
    }

    .navItems-active, .mobile-navItems-active {
      color: ${htPrimary};
    }

    .media-content-container {
      background: ${showMediaBackground ? htFrameRgba : 'transparent'};
    }

    .section-container {
      background-image: url(${images.highTechWallpaper});
    }

    .home-media-block-container {
      color: ${htSecondary};
    }

    .home-media-icon {
      color: ${htRgba};
    }

    .home-media-audio-name, .home-total-media-block, .mobile-navItems {
      color: ${htSecondary};
    }

    .media-video-item {
      background: ${htRgba};
    }

  `}
  ${({currentTheme, images, showMediaBackground}) => currentTheme === nightTheme && css`
    .header-container {
      color: white;
      background: linear-gradient(150deg, rgb(6, 35, 68) 0%, rgb(55, 75, 105) 100%);;
    }

    .navItems-active {
      color: #769aff;
    }

    .mobile-navItems-active {
      color: #769aff;
    }

    .user-options-block {
      border: white solid thin;
      background-color: rgba(39, 173, 245, 0.7);
    }

    .userName-block {
      background-color: #00405e;
      border-bottom: white solid thin;
    }

    .media-per-page-input {
      color: black;
    }

    .user-option-button {
      background-color: #384e70;
    }

    .home-title {
      color: white;
    }

    .home-media-block-container {
      color: white;
      background-color: rgba(39, 173, 245, 0.7);
    }

    .home-media-block-container:hover {
      background-color: rgba(113, 117, 121, 0.7);
    }

    .home-media-list-container {
      color: white;
    }

    .home-media-list-loader, .home-media-mobile-icon-item, .home-media-icon, .home-total-media-block {
      color: rgba(254, 254, 255, 0.95);
    }

    .actionBtn {
      background: #29353b;
    }

    .section-container {
      background-image: url(${images.nightWallpaper});
    }

    .media-content-container {
      background-color: ${showMediaBackground ? 'rgba(39, 173, 245, 0.7)' : 'transparent'};
    }

    .mediaName-container {
      color: white;
    }

    .audioRef-media-item {
      color: #3a2d2d;
      background-color: #3d679a;
    }

    .audioRef-media-item-selected {
      background: #2d2e33;
      border: #224de7 solid thin;
    }

    .audio-icon-container {
      border: white solid thin;
    }

    .audio-icon {
      color: white;
    }

    .audio-ref-name, .audio-ref-time {
      color: white;
    }

    .media-video-item {
      background: white;
    }

    .footer {
      background: linear-gradient(50deg, rgb(24, 11, 208) 0%, rgb(26, 40, 47) 15%, rgb(200, 211, 211) 100%);
    }

    .mobile-media-control-panel-container {
      background: linear-gradient(180deg, rgb(60, 65, 68) 15%, rgb(41, 89, 119) 100%);
    }

    .mobile-actionBtn {
      color: white;
    }

    .mobile-music-player-container {
      background: linear-gradient(200deg, rgb(7, 44, 68) 0%, rgb(22, 81, 138) 15%, rgb(84, 88, 89) 100%);
    }

    .mobile-options-block {
      background-color: #286ba9;
      border: white solid thin;
    }

    .mobile-footer {
      background: linear-gradient(200deg, rgb(43, 69, 87) 0%, rgb(17, 99, 199) 15%, rgb(116, 117, 117) 100%);;
    }

    .mobile-navItems {
      color: white;
      font-size: 1.8rem;
    }

  `}
  ${({currentTheme, images, showMediaBackground}) => currentTheme === businessTheme && css`
    .header-container {
      color: white;
      border-bottom: #11e3f6 solid thin;
      background: linear-gradient(150deg, rgb(222, 12, 107) 0%, rgb(2, 23, 44) 100%);;
    }

    .navItems, .navItems-active {
      color: #11e3f6;
    }

    .navItems-active {
      color: #f8175b;;
    }

    .mobile-navItems-active {
      color: #f8175b;;
    }

    .user-options-block {
      border: #11e3f6 solid thin;
      background-color: rgba(255, 0, 68, 0.7);
    }

    .userName-block {
      color: #15eac0;
      background-color: #a90944;
      border-bottom: #11f6f6 solid thin;
    }

    .user-option-button {
      color: #04b9b4;
      background-color: #05367c;
    }

    .home-title {
      color: #f8175b;
    }

    .home-media-block-container {
      color: #f8175b;
      background-color: rgba(36, 58, 58, 0.7);
    }

    .home-media-block-container:hover {
      background-color: rgba(1, 217, 213, 0.7);
    }

    .home-media-list-container {
      color: rgba(255, 0, 68, 0.7);
    }

    .home-media-list-loader {
      color: rgba(255, 0, 68, 0.7);
    }

    .home-media-icon {
      color: rgba(255, 0, 59, 0.7);
    }

    .home-media-audio-name, .home-total-media-block {
      color: rgba(255, 0, 59);
    }

    .media-video-item {
      background: rgba(255, 0, 59);
    }

    .actionBtn {
      color: #7aeaea;
      background: #e8115c;
    }

    .section-container {
      background-image: url(${images.businessWallpaper});
    }

    .media-content-container {
      background-color: ${showMediaBackground ? 'rgba(35, 58, 105, 0.7)' : 'transparent'};
    }

    .mediaName-container {
      color: #26d8f8;
    }

    .audioRef-media-item {
      background-color: #b20303;
    }

    .audioRef-media-item-selected {
      background: #ff044e;
      border: #13fff7 solid thin;
    }

    .audio-icon-container {
      border: #24b6b6 solid thin;
    }

    .audio-icon {
      color: #0cffff;
    }

    .audio-ref-name, .audio-ref-time {
      color: #02fff6;
    }

    .footer {
      background: linear-gradient(150deg, rgb(11, 208, 201) 0%, rgb(40, 54, 98) 15%, rgb(255, 1, 71) 100%);
    }

    .mobile-media-control-panel-container {
      background: linear-gradient(120deg, rgb(39, 61, 73) 15%, rgb(37, 203, 161) 100%);
    }

    .mobile-actionBtn {
      color: white;
    }


    .mobile-music-player-container {
      background: linear-gradient(200deg, rgb(40, 42, 42) 0%, rgb(27, 236, 210) 15%, rgb(30, 91, 107) 100%);
    }

    .mobile-options-block {
      background-color: #12bd8f;
      border: #090808 solid thin;
    }

    .mobile-footer {
      background: linear-gradient(200deg, rgb(69, 133, 190) 0%, rgb(45, 49, 72) 15%, rgb(35, 37, 37) 100%);;
    }

    .mobile-navItems {
      color: white;
      font-size: 1.5rem;
    }

  `}
  ${({currentTheme, images, showMediaBackground}) => currentTheme === desertTheme && css`
    .header-container {
      color: #131312;
      background: linear-gradient(150deg, rgb(105, 105, 96) 0%, rgb(211, 106, 0) 100%);;
    }

    .navItems, .navItems-active {
      color: #000000;
      font-family: Alkatra;
    }

    .navItems-active {
      color: #ffff00;
    }

    .mobile-navItems-active {
      color: #fff600;
    }

    .section-container {
      background-image: url(${images.desertWallpaper});
    }

    .user-options-block {
      background-color: rgb(208, 91, 17);
    }

    .userName-block {
      background-color: #ffb803;
    }

    .user-option-button {
      background-color: #c99407;
      color: black;
    }

    .home-media-block-container {
      color: #fff600;
      background-color: rgba(245, 225, 148, 0.7);
    }

    .home-media-block-container:hover {
      background-color: rgb(208, 91, 17, 0.7);
    }

    .home-media-list-container {
      color: #fff600;
    }

    .home-media-list-loader {
      color: rgba(31, 30, 30, 0.95);
    }

    .home-media-icon, .home-total-media-block {
      color: rgba(25, 25, 26);
    }

    .actionBtn {
      background: #b6794d;
      color: black;
    }

    .media-content-container {
      background-color: ${showMediaBackground ? 'rgba(245, 225, 148, 0.7)' : 'transparent'};
    }

    .media-video-item {
      background: rgb(237, 252, 85);
    }

    .audioRef-media-item {
      background-color: #935e09;
    }

    .audioRef-media-item-selected {
      background: #ff9100;
      border: #2c2c2c solid thin;
    }

    .audio-icon {
      color: #000000;
    }

    .audio-ref-name, .audio-ref-time {
      color: #131313;
    }

    .footer {
      color: black;
      background: linear-gradient(90deg, rgb(194, 171, 45) 0%, rgb(224, 236, 93) 15%, rgb(255, 173, 0) 100%);
    }

    .home-title {
      color: #bdbd21;
    }

    .mobile-media-control-panel-container {
      background: linear-gradient(180deg, rgb(187, 123, 66) 15%, rgb(206, 213, 32) 100%);
    }

    .mobile-actionBtn {
      color: #0e0d0d;
    }

    .mobile-music-player-container {
      background: linear-gradient(200deg, rgb(183, 189, 6) 0%, rgb(255, 221, 13) 15%, rgb(112, 127, 134) 100%);
    }

    .mobile-options-block {
      background-color: #fcb608;
      border: #101010 solid thin;
      color: black;
    }

    .mobile-footer {
      background: linear-gradient(200deg, rgb(158, 168, 11) 0%, rgb(236, 180, 54) 15%, rgb(143, 148, 121) 100%);;
    }

    .mobile-navItems {
      color: #000000;
      font-size: 1.8rem;
    }
  `}
`;