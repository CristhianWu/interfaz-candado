import React, { useState } from 'react';
import './MainScreen.css';

const MainScreen = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleButton = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="main-screen">
      <h1>Control ESP32</h1>
      <button 
        className={isOn ? 'button-on' : 'button-off'} 
        onClick={toggleButton}
      >
        {isOn ? 'Encendido' : 'Apagado'}
      </button>
    </div>
  );
};

export default MainScreen;