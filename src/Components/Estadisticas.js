import React, { useEffect, useState } from 'react';
import { Flex, Progress, Typography } from 'antd';

const { Title, Text } = Typography;

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

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:2000');
  
    socket.onopen = () => {
      console.log('Conexión WebSocket establecida');
    };
  
    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      console.log('Mensaje recibido:', receivedData);
      setUltimoRegistro(receivedData.nuevosEstados); // Ajusta esto según tu estructura de datos
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
    </Flex>
  );
};

export default Estadisticas;
