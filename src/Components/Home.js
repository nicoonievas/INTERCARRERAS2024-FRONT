import React, { useState } from 'react';
import { Button, Layout, Card, theme } from 'antd';
import 'antd/dist/reset.css';
import Estadisticas from './Estadisticas';
import { useAuth0 } from '@auth0/auth0-react';
// Importación correcta de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBed, faSyringe, faFan, faHeartPulse } from '@fortawesome/free-solid-svg-icons'; // Importar el icono correcto
import axios from 'axios';
import beachImage from '../pinguimag/BEACH3.png';
import beachImageNight from '../pinguimag/BEACH2.png';


const { Header, Content } = Layout;


const Home = () => {
  const [color, setColor] = useState("#c1f5ed");
  const [fondoimg, setFondoimg] = useState("Noche");
  const { user, isAuthenticated, logout } = useAuth0();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleColorChange = (value) => {
    setColor(value.toHexString());
  };

  const handleFeed = async () => {
    try {
      const response = await axios.post("http://localhost:5000/feed", {
        value: 10,
        timestamp: new Date(),
      });
      console.log("Alimentar:", response.data);
    } catch (error) {
      console.error("Error al alimentar:", error);
    }
  };

  const handleSleep = async () => {
    try {
      const response = await axios.post("http://localhost:5000/sleep", {
        value: 10,
        timestamp: new Date(),
      });
      console.log("Dormir:", response.data);
    } catch (error) {
      console.error("Error al dormir:", error);
    }
  };

  const handleHeal = async () => {
    try {
      const response = await axios.post("http://localhost:5000/heal", {
        value: 25,
        timestamp: new Date(),
      });
      console.log("Curar:", response.data);
    } catch (error) {
      console.error("Error al curar:", error);
    }
  };

  const handleFanOn = async () => {
    try {
      const response = await axios.post("http://localhost:5000/vent", {
        vent: true,
        timestamp: new Date(),
      });
      console.log("Ventilador:", response.data);
    } catch (error) {
      console.error("Error al Ventilar:", error);
    }
  };
  const handleFanOff = async () => {
    try {
      const response = await axios.post("http://localhost:5000/vent", {
        vent: false,
        timestamp: new Date(),
      });
      console.log("Ventilador:", response.data);
    } catch (error) {
      console.error("Error al apagar Ventilador:", error);
    }
  };

  const handleRevive = async () => {
    try {
      const response = await axios.post("http://localhost:5000/revive", {
        value: true,
        timestamp: new Date(),
      });
      console.log("Revivir:", response.data);
    } catch (error) {
      console.error("Error al revivir:", error);
    }
  };

  return (

    <Layout
      style={{
        height: "100vh",
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${fondoimg === "Día" ? beachImage : beachImageNight})`, 
        backgroundSize: "cover", // Para que cubra todo el contenedor
        backgroundPosition: "center",
      }}
    >

      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "16px",
          }}
        >
          <div
            className="Container"
            style={{ display: "flex", alignItems: "center", borderRadius: 20 }}
          >
            {isAuthenticated && (
              <div
                className="UserInfo"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  style={{ width: "40px", borderRadius: "50%", margin: "10px" }}
                />
                <span>{user.name}</span>
                <Button
                  type="primary"
                  onClick={() => logout({ returnTo: window.location.origin })}
                  style={{ marginLeft: "10px" }}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </Header>

      <h2>BETO</h2>
      <Content style={{ textAlign: "center" }}>
        <Estadisticas onChangeFondo={setFondoimg}/>
  
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco con 80% de opacidad
              padding: "10px", // Espacio interno para los botones
              borderRadius: "8px", // Bordes redondeados
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para profundidad
              marginTop: 20,
            }}
          >
            <Button type="primary" style={{ marginRight: 10 }} onClick={handleFeed}>
              <FontAwesomeIcon icon={faUtensils} /> Alimentar
            </Button>

            {/* Botón para Dormir */}
            <Button type="primary" style={{ marginRight: 10 }} onClick={handleSleep}>
              <FontAwesomeIcon icon={faBed} /> Dormir
            </Button>

            {/* Botón para Curar */}
            <Button type="primary" style={{ marginRight: 10, marginTop: 10 }} onClick={handleHeal}>
              <FontAwesomeIcon icon={faSyringe} /> Curar
            </Button>
          </div>

          <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)", // Fondo blanco con 80% de opacidad
              padding: "10px", // Espacio interno para los botones
              borderRadius: "8px", // Bordes redondeados
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Sombra para profundidad
              marginTop: 20,
            }}>
            {/* Botón para Alimentar */}
            <Button type="primary" style={{ marginRight: 10 }} onClick={handleFanOn}>
              <FontAwesomeIcon icon={faFan} /> ON
            </Button>

            {/* Botón para Dormir */}
            <Button type="primary" style={{ marginRight: 10 }} onClick={handleFanOff}>
              <FontAwesomeIcon icon={faFan} /> OFF
            </Button>

            {/* Botón para Curar */}
            <Button type="primary" style={{ marginRight: 10, marginTop: 10 }} onClick={handleRevive}>
              <FontAwesomeIcon icon={faHeartPulse} /> Revivir
            </Button>
          </div>
       

      </Content>
    </Layout>
  );
};

export default Home;
