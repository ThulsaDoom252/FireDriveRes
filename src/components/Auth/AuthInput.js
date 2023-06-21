import React from 'react';

const AuthInput = (props) => {
    const {
        0: placeholder,
        1: type,
        2: value,
        3: setter,
        4: id = '',
        5: handleBlur = void 0,
        6: error,
        7: params = false,
        8: dispatch,
    } = props
    return (
        <input className={error ? 'auth-inputs-error' : 'auth-inputs'} id={id} onBlur={handleBlur}
               placeholder={placeholder} type={type}
               value={value}
               onChange={!params ? setter : (e) => dispatch ? dispatch(setter(e.currentTarget.value)) : setter(e.currentTarget.value)}
        />

    );
};

export default AuthInput;