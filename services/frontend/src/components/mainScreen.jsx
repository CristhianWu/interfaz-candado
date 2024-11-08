import React, { useState } from 'react';
import { useAuth } from '../auth/authContext';
import './mainScreen.css';

const MainScreen = () => {
  const {logout} = useAuth();

  const [isOn, setIsOn] = useState(false);

  const toggleButton = async () => {
    const newIsOn = !isOn;
    setIsOn(newIsOn);

    // Cambia la IP por la dirección IP de tu ESP32 dependiendo de a donde este conectado.
    const esp32Url = `http://192.168.50.202/${newIsOn ? 'H' : 'L'}`;
f
    try {
      // Enviar solicitud HTTP al ESP32 para encender/apagar el LED
      const response = await fetch(esp32Url);
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Hubo un problema con la conexión:', error);
    }
  };

  return (
    <div className="main-screen">
      <h1>Control ESP32</h1>
      <button 
        className={isOn ? 'button-on' : 'button-off'} 
        onClick={toggleButton}
      >
        {isOn ? 'Abierto' : 'Cerrado'}
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MainScreen;

