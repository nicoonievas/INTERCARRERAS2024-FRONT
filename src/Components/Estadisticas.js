import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
    // Función para obtener el último registro
    const obtenerUltimoRegistro = async () => {
      try {
        const response = await axios.get('http://localhost:5000/estados/'); // Asegúrate de que la URL sea correcta
        setUltimoRegistro(response.data); // El último registro es devuelto directamente
      } catch (error) {
        console.error('Error al obtener el último registro:', error);
      }
    };

    const intervalo = setInterval(() => {
      obtenerUltimoRegistro();
    }, 1000);

    return () => clearInterval(intervalo);
  }, []);

  return (
    <Flex vertical gap="middle">
      <div style={{ textAlign: 'center' }}>
        <Progress percent={99.9} strokeColor={twoColors} />
        <Text strong>Experiencia</Text>
      </div>

      {ultimoRegistro && (
        <Flex gap="small" wrap>
          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={ultimoRegistro.temperatura ?? 0} // Utiliza valor por defecto si es null
              strokeColor={twoColors}
            />
            <br></br>
            <Text strong>Temperatura</Text>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={ultimoRegistro.humedad ?? 0} // Utiliza valor por defecto si es null
              strokeColor={conicColors}
            />
            <br></br>
            <Text strong>Humedad</Text>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Progress
              type="circle"
              percent={ultimoRegistro.vida ?? 0} // Utiliza valor por defecto si es null
              strokeColor={conicColors}
            />
            <br></br>
            <Text strong>Porcentaje de Vida</Text>
          </div>
        </Flex>
      )}
    </Flex>
  );
};

export default Estadisticas;
