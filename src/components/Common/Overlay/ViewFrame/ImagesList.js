import React from 'react';

const ImagesList = (props) => {
    const {0: paginatedMedia, 1: setSelectedMediaIndex, 2: searchResult, 3: searchMode} = props
    return (
        <div className="overlay-list">
            {!searchMode ? paginatedMedia.map((media, index) => <div key={media}
                                                                     onClick={e => setSelectedMediaIndex(index)}
                                                                     className='overlay-media-list-container'><img
                className='media-item'
                src={media.url}
                alt="media"/></div>) : searchResult.map((media, index) => <div key={media}
                                                                               onClick={e => setSelectedMediaIndex(index)}
                                                                               className={'overlay-media-list-container'}>
                <img className='media-item' src={media.url} alt="media"/>
            </div>)}
        </div>
    );
};

export default ImagesList;