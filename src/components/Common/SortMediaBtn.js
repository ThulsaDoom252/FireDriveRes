import React from 'react';
import Dropdown from "react-dropdown";
import {sortOptions} from "../../data/refs";
import {handleSortType} from "../../data/redux/fireDrive-reducer";


const SortMediaBtn = ({smallScreenMode, noMedia, dispatch, sortType}) => {
    return (
        <>
            {noMedia && !smallScreenMode ? <input className={'disabled-dropdown'} disabled={true}
                                                  placeholder={'sort by..'}/> :
                <div hidden={smallScreenMode}>
                    <Dropdown disabled={noMedia} className={'main-dropdown'}
                              arrowClassName={'control'}
                              placeholderClassName={'placeholder-dropdown'}
                              placeholder={'Sort by...'} onChange={(option) => handleSortType(option, {dispatch})}
                              options={sortOptions} value={sortType}/>
                </div>}
        </>

    );
};

export default SortMediaBtn;