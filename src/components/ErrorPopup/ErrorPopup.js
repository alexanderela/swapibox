import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ closeError }) => {
  return (
    <div className="ErrorPopup">
      <div className="popup-inner">
        <h1>You have no favorites selected!</h1>
        <button onClick={closeError}>X</button>
      </div>
    </div>
  )
}

export default ErrorPopup;
