import React from 'react';
import {AiOutlineCloseSquare} from "react-icons/ai";
import {Transition} from "react-transition-group";
import {useSelector} from "react-redux";
import {handleAlertAction} from "../../../data/redux/fireDrive-reducer";

const Alert = ({
                   handleCloseAlert, alertMessage, handleHideAlert, alertActionButtonIsVisible, dispatch, showAlert,
                   alertSuccessStyle, deleteAllMediaParams
               }) => {

    const alertAction = useSelector(state => state.basic.alertAction)

    return (
        <Transition in={showAlert} timeout={200} appear unmountOnExit>
            {state => <div
                style={{background: alertSuccessStyle ? 'green' : void 0}} className={`alert-container ${state}`}>
                <button className={'alert-close-button'}
                        onClick={() => handleCloseAlert({dispatch}, alertActionButtonIsVisible, alertSuccessStyle)}>
                    <AiOutlineCloseSquare/></button>
                {alertMessage}

                <div className={'alert-buttons-container'}>
                    {alertActionButtonIsVisible &&
                        <button className={'alert-buttons'}
                                onClick={() => handleAlertAction(alertAction, deleteAllMediaParams,
                                    {dispatch}, alertActionButtonIsVisible)}>OK
                        </button>}
                </div>
                <button className={'alert-buttons'} onClick={() => {
                    handleHideAlert({dispatch})
                }}>Dismiss all alerts
                </button>
            </div>}
        </Transition>

    );
};

export default Alert;