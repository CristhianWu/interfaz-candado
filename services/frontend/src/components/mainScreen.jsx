import React, { useState } from 'react';
import './mainScreen.css';

const MainScreen = ({ onLogout }) => {
  const [isOn, setIsOn] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Estado de conexión
  const [device, setDevice] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);

  const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
  const CHARACTERISTIC_UUID = "beb5483e-36e1-4688-b7f5-ea07361b26a8";

  const connectToBluetooth = async () => {
    try {
      // Inicia el emparejamiento Bluetooth
      const newDevice = await navigator.bluetooth.requestDevice({
        filters: [{ services: [SERVICE_UUID] }]
      });
      setDevice(newDevice);

      const server = await newDevice.gatt.connect();
      const service = await server.getPrimaryService(SERVICE_UUID);
      const newCharacteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);
      
      setCharacteristic(newCharacteristic); // Guarda la característica para uso futuro
      setIsConnected(true); // Marca la conexión como establecida

      // Puedes añadir un listener para el evento de desconexión
      newDevice.addEventListener('gattserverdisconnected', handleDisconnection);
    } catch (error) {
      console.error('Error al conectar con Bluetooth:', error);
      setIsConnected(false);
    }
  };

  const handleDisconnection = () => {
    console.log('Dispositivo desconectado');
    setIsConnected(false);
    setDevice(null);
    setCharacteristic(null);
  };

  const toggleButton = async () => {
    const newIsOn = !isOn;
    setIsOn(newIsOn);

    if (characteristic) {
      const value = newIsOn ? 'H' : 'L'; // Comando para encender/apagar
      await characteristic.writeValue(new TextEncoder().encode(value));
    } else {
      console.error("No hay característica Bluetooth disponible");
    }
  };

  const disconnectDevice = async () => {
    if (device) {
      await device.gatt.disconnect();
      handleDisconnection();
    }
  };

  return (
    <div className="main-screen">
      <h1>Control ESP32</h1>

      {/* Mensaje de estado de conexión */}
      {isConnected ? (
        <p>Dispositivo conectado</p>
      ) : (
        <p>Dispositivo no conectado</p>
      )}

      {/* Botón para conectar el dispositivo Bluetooth */}
      <button onClick={connectToBluetooth} disabled={isConnected}>
        {isConnected ? 'Conectado' : 'Conectar Dispositivo'}
      </button>

      {/* Botón para encender/apagar, habilitado solo cuando está conectado */}
      <button 
        className={isOn ? 'button-on' : 'button-off'} 
        onClick={toggleButton}
        disabled={!isConnected}
      >
        {isOn ? 'Encendido' : 'Apagado'}
      </button>

      {/* Botón para desconectar el dispositivo */}
      <button onClick={disconnectDevice} disabled={!isConnected}>
        Desconectar Dispositivo
      </button>

      {/* Botón de logout */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default MainScreen;
