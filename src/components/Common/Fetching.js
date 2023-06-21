import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Fetching = ({
                      type = <ClipLoader color={'blue'} size={35}
                                         aria-label={'Loading Spinner'}/>
                  }) => {
    return (
        <div className={'media-fetch-item'}>
            {type}
        </div>

    );
};

export default Fetching;