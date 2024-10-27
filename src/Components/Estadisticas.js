import React, { useEffect, useState } from 'react';
import { Flex, Progress, Typography } from 'antd';
import feliz from '../pinguimag/guiño.gif'; // Ajusta la ruta
import alimentado from '../pinguimag/comiendo.gif'; // Ajusta la ruta
import dormido from '../pinguimag/durmiendo.gif'; // Ajusta la ruta
import curado from '../pinguimag/1.bmp'; // Ajusta la ruta
import incomodo from '../pinguimag/incomodo.gif'; // Ajusta la ruta
import calor from '../pinguimag/calor.gif'; // Ajusta la ruta
import muerte from '../pinguimag/muerte.gif'; // Ajusta la ruta

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

const Estadisticas = ({ onChangeFondo }) => {
  const [ultimoRegistro, setUltimoRegistro] = useState(null);
  const [fondoimg, setFondoimg] = useState('Noche'); // Estado para el fondo

  // Definición de las imágenes
  const imagenes = {
    feliz,
    alimentado,
    dormido,
    curado,
    incomodo,
    calor,
    muerte,
  };

  const estadosId = new Map([
    [1, "ACTIVO"],
    [2, "DORMIDO"],
    [3, "ENFERMO"],
    [4, "CANSADO"],
    [5, "FELIZ"],
    [6, "HAMBRIENTO"],
    [7, "CALUROSO"],
    [8, "MUERTO"],
  ]);

  // Función para obtener la imagen según el estado
  const obtenerImagenEstado = (estado) => {
    switch (estado) {
      case 1: // ESTADO_ACTIVO
        return imagenes.feliz;
      case 2: // ESTADO_DORMIDO
        return imagenes.dormido;
      case 3: // ESTADO_ENFERMO
        return imagenes.curado;
      case 4: // ESTADO_CANSADO
        return imagenes.incomodo;
      case 5: // ESTADO_FELIZ
        return imagenes.alimentado;
      case 6: // ESTADO_HAMBRIENTO
        return imagenes.incomodo;
      case 7: // ESTADO_CALUROSO
        return imagenes.calor;
      case 8: // ESTADO_MUERTO
        return imagenes.muerte;
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
      console.log('Mensaje recibido:', receivedData.parsedObjectForFrontEnd);
      setUltimoRegistro(receivedData.parsedObjectForFrontEnd); // Ajusta esto según tu estructura de datos
      console.log('Estado:', receivedData.parsedObjectForFrontEnd.estado);
      const ldr = receivedData.parsedObjectForFrontEnd.ldr;

      // Determina si es día o noche
      const nuevoFondo = ldr >= 650 ? "Día" : "Noche";
      setFondoimg(nuevoFondo);
      onChangeFondo(nuevoFondo);  // Llama a la función prop para notificar a Home
    };

    socket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    return () => {
      socket.close();
    };
  }, [onChangeFondo]);

  const estadoFront = estadosId.get(ultimoRegistro?.estado);
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
            <Text strong style={{ backgroundColor: 'white' }}>Temperatura</Text>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={ultimoRegistro.humidity ?? 0}
              strokeColor={conicColors}
            />
            <br />
            <Text strong style={{ backgroundColor: 'white' }}>Humedad</Text>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={ultimoRegistro.nivelVida ?? 0}
              strokeColor={conicColors}
            />
            <br />
            <Text strong style={{ backgroundColor: 'white' }}>Porcentaje de Vida</Text>
          </div>

          <div style={{ textAlign: 'center' }}>
            <br />
            <Text strong></Text>
          </div>

          <div id="dia" style={{ textAlign: 'center' }}>
            <br />
            <br />
            <br />
            <h2>{estadoFront ?? 0}</h2>
            <h3>{fondoimg}</h3>
            
            <br />
            <Text strong style={{ backgroundColor: 'white' }}>Estado</Text>
          </div>

          <div style={{ textAlign: 'center' }}>
            <br />
            <Text strong></Text>
          </div>
        </Flex>
      )}
      {/* Imagen de la mascota virtual */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          alt="virtual pet"
          src={ultimoRegistro ? obtenerImagenEstado(ultimoRegistro.estado) : imagenes.feliz} // Cambia la imagen según el estado
          style={{ width: '300px', borderRadius: '65px' }} // Ajusta el tamaño y estilo según sea necesario
        />
      </div>
    </Flex>
  );
};

export default Estadisticas;
