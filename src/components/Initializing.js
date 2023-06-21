import React from 'react';
import bg from "./Auth/files/bg.jpg"
import ClipLoader from "react-spinners/ClipLoader";

const Initializing = () => {
    return (
        <div style={{
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <ClipLoader
                color={'gray'}
                loading={true}
                cssOverride={false}
                size={200}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Initializing;