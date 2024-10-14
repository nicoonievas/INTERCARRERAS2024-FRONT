import React, { useState } from 'react';
import { Button, Layout, Card, ColorPicker, theme } from 'antd';
import 'antd/dist/reset.css';
import Estadisticas from './Estadisticas';
import { useAuth0 } from '@auth0/auth0-react';


const { Header, Content } = Layout;

const Home = () => {
    const [color, setColor] = useState("#c1f5ed"); // Estado para el color seleccionado
    const { user, isAuthenticated, logout } = useAuth0();
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const handleColorChange = (value) => {
        setColor(value.toHexString()); // Actualiza el color cuando se selecciona uno nuevo
    };

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
                                {/* <div style={{ marginLeft: '10px' }}>
                                    <ColorPicker defaultValue={color} onChange={handleColorChange} />
                                </div> */}
                            </div>
                        )}
                    </div>
                </div>
            </Header>

            <h2>BETO</h2>
            <Content style={{ textAlign: 'center' }}>

                <Estadisticas />
                <Card
                    style={{ width: 400, margin: '0 auto' }}
                    cover={<img alt="virtual pet" src="https://www.megavoxels.com/wp-content/uploads/2023/12/Pixel-Art-Penguin.png" />}
                >

                    <div style={{ marginTop: 20 }}>
                        <Button type="primary" style={{ marginRight: 10 }}>Feed</Button>
                        <Button type="primary" style={{ marginRight: 10 }}>Play</Button>
                        <Button type="primary">Sleep</Button>
                    </div>
                </Card>

            </Content>
        </Layout>
    );
};

export default Home;
