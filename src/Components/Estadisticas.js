import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client'; 
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

const socket = io('http://localhost:5000'); 

const Estadisticas = () => {
  const [ultimoRegistro, setUltimoRegistro] = useState(null);

  useEffect(() => {

    socket.on('nuevas_estadisticas', (data) => {
      setUltimoRegistro(data); 

    
    });

    return () => {
      socket.off('nuevas_estadisticas');
    };
  }, []);

  return (
    <Flex vertical gap="middle">
      {/* <div style={{ textAlign: 'center' }}>
        <Progress percent={99.9} strokeColor={twoColors} />
        <Text strong>Experiencia</Text>
      </div> */}

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
