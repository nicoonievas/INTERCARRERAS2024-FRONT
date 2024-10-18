import React, { useState, useEffect } from 'react';
import { Button, Layout, Card, ColorPicker, theme } from 'antd';
import 'antd/dist/reset.css';
// import Estadisticas from './Estadisticas';
import { useAuth0 } from '@auth0/auth0-react';
// Importación correcta de FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faUtensils, faBed, faSyringe } from '@fortawesome/free-solid-svg-icons'; // Importar el icono correcto
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000'); 

const { Header, Content } = Layout;

const Home = () => {
    const [color, setColor] = useState("#c1f5ed"); // Estado para el color seleccionado
    const { user, isAuthenticated, logout } = useAuth0();
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const handleColorChange = (value) => {
        setColor(value.toHexString()); // Actualiza el color cuando se selecciona uno nuevo
    };

    useEffect(() => {
        socket.emit('message test', 'Hola, soy un mensaje desde React!');
        
        // Limpiar el socket al desmontar el componente
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Layout style={{ height: '100vh', padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: color }}>
            <Header
                style={{
                    padding: 0,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    marginBottom: 10,
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '16px' }}>
                    <div className="Container" style={{ display: 'flex', alignItems: 'center', borderRadius: 20 }}>
                        {isAuthenticated && (
                            <div className="UserInfo" style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={user.picture} alt={user.name} style={{ width: '40px', borderRadius: '50%', margin: '10px' }} />
                                <span>{user.name}</span>
                                <Button
                                    type="primary"
                                    onClick={() => logout({ returnTo: window.location.origin })}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Header>

            <h2>BETO</h2>
            <Content style={{ textAlign: 'center' }}>
                {/* <Estadisticas /> */}
                <Card
                    style={{ width: 400, margin: '0 auto' }}
                    cover={<img alt="virtual pet" src="https://www.megavoxels.com/wp-content/uploads/2023/12/Pixel-Art-Penguin.png" />}
                >
                    <div style={{ marginTop: 20 }}>
                        {/* Uso correcto del icono */}
                       
                        <Button type="primary" style={{ marginRight: 10 }}><FontAwesomeIcon icon={faUtensils} />Alimentar</Button>
                        <Button type="primary" style={{ marginRight: 10 }}><FontAwesomeIcon icon={faGamepad}  />Jugar</Button>
                        <Button type="primary" style={{ marginRight: 10 }}><FontAwesomeIcon icon={faBed} />Dormir</Button>
                        <Button type="primary" style={{ marginRight: 10, marginTop: 10}}><FontAwesomeIcon icon={faSyringe} />Curar</Button>
                    </div>
                </Card>
            </Content>
        </Layout>
    );
};

export default Home;
