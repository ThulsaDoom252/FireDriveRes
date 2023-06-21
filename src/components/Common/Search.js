import React, {useEffect} from 'react';
import {FcSearch} from "react-icons/fc";
import {BsSearch} from "react-icons/bs";
import {handleSearch} from "../../data/redux/media-reducer";

const Search = ({
                    currentSearchRequest,
                    smallScreenMode,
                    noMedia,
                    mobileSearchCallerRef,
                    toggleMobileSearchMount,
                    dispatch,
                }) => {

    useEffect(() => {
        if (smallScreenMode === true) {
            setTimeout(() => {
                dispatch(toggleMobileSearchMount(false))
            }, 100)
        }
    }, [])


    return (
        <div ref={smallScreenMode ? mobileSearchCallerRef : void 0}
                           className={smallScreenMode ? `mobile-search-container ` : `search-container`}>
                <button disabled={noMedia}
                        className={smallScreenMode ? 'mobile-search-icon' : 'search-icon'}>{smallScreenMode ?
                    <BsSearch/> :
                    <FcSearch/>}</button>
                <input autoFocus={smallScreenMode} disabled={noMedia} type="text"
                       className={smallScreenMode ? 'mobile-search-input' : 'search-input'}
                       value={currentSearchRequest}
                       placeholder={'Search media...'} onChange={e => handleSearch(e.currentTarget.value, {dispatch})}/>
            </div>



    );
};

export default Search;