import React, { useEffect, useState } from 'react';
import { Flex, Progress, Typography } from 'antd';
import feliz from '../pinguimag/guiño.gif'; // Ajusta la ruta
import alimentado from '../pinguimag/comiendo.gif'; // Ajusta la ruta
import dormido from '../pinguimag/durmiendo.gif'; // Ajusta la ruta
import curado from '../pinguimag/1.bmp'; // Ajusta la ruta
import incomodo from '../pinguimag/incomodo.gif'; // Ajusta la ruta
import calor from '../pinguimag/calor.gif'; // Ajusta la ruta

const { Text } = Typography;

const twoColors = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const conicColors = {
  '0%': '#87d068',
  '50%': '#ffe58f',
  '100%': '#ffccc7',
};

const Estadisticas = () => {
  const [ultimoRegistro, setUltimoRegistro] = useState(null);

  // Definición de las imágenes
  const imagenes = {
    feliz,
    alimentado,
    dormido,
    curado,
    incomodo,
    calor,
  };

  // Función para obtener la imagen según el estado
  const obtenerImagenEstado = (estado) => {
    switch (estado) {
      case 'feliz':
        return imagenes.feliz;
      case 'alimentado':
        return imagenes.alimentado;
      case 'dormido':
        return imagenes.dormido;
      case 'curado':
        return imagenes.curado;
      case 'incomodo':
        return imagenes.incomodo;
      case 'calor':
        return imagenes.calor;
      default:
        return imagenes.feliz; // Imagen por defecto
    }
  };

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:2000');

    socket.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };

    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      console.log('Mensaje recibido:', receivedData);
      setUltimoRegistro(receivedData.nuevosEstados); // Ajusta esto según tu estructura de datos
      console.log('Estado:', receivedData.nuevosEstados.estado);
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <Flex vertical gap="middle">
      {ultimoRegistro && (
        <Flex gap="small" wrap>
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={Math.min((ultimoRegistro.temperature ?? 0) * 100 / 50, 100)} 
              strokeColor={twoColors}
              format={() => `${ultimoRegistro.temperature?.toFixed(2)}°C`} 
            />
            <br />
            <Text strong>Temperatura</Text>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={ultimoRegistro.humidity ?? 0}
              strokeColor={conicColors}
            />
            <br />
            <Text strong>Humedad</Text>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={ultimoRegistro.nivelVida ?? 0}
              strokeColor={conicColors}
            />
            <br />
            <Text strong>Porcentaje de Vida</Text>
          </div>
        </Flex>
      )}
      {/* Imagen de la mascota virtual */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          alt="virtual pet"
          src={ultimoRegistro ? obtenerImagenEstado(ultimoRegistro.estado) : imagenes.feliz} // Cambia la imagen según el estado
          style={{ width: '300px', borderRadius: '10px' }} // Ajusta el tamaño y estilo según sea necesario
        />
      </div>
    </Flex>
  );
};

export default Estadisticas;
