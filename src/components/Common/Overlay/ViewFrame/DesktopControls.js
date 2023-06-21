import React from 'react';

const DesktopControls = ({
                             toggleShareBlock,
                             shareBlock,
                             handleChangeImage,
                             currentMedia,
                             mediaType,
                             optionListCallerRef,
                             dispatch,
                         }) => {
    const noMedia = currentMedia === undefined
    return (
        <div style={{width: mediaType === 'video' ? '80%' : null}} className={'desktop-controls-container'}
             onClick={e => e.stopPropagation()}>
            <div className={'desktop-controls-btn-item'}>
                <button ref={optionListCallerRef} disabled={noMedia}
                        className={`desktop-controls-btn ${noMedia && 'desktop-controls-btn-disabled'}`}
                        onClick={() => dispatch(toggleShareBlock(!shareBlock))}>Share
                </button>
                <button disabled={noMedia}
                        className={`desktop-controls-btn ${noMedia && 'desktop-controls-btn-disabled'}`}
                        onClick={() => handleChangeImage('delete')}>Delete
                </button>
                {mediaType !== 'video' &&
                    <button disabled={noMedia}
                            className={`desktop-controls-btn ${noMedia && 'desktop-controls-btn-disabled'}`}
                            onClick={() => handleChangeImage('fullscreen')}>FullScreen
                    </button>}

            </div>
        </div>

    );
};

export default DesktopControls;