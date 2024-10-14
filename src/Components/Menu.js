import React, { useState } from 'react';
import { HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined, LinuxOutlined, DotChartOutlined} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Estadisticas from './Estadisticas';
import { useAuth0 } from '@auth0/auth0-react';

const { Header, Sider, Content } = Layout;

const NavBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const { user, isAuthenticated, logout } = useAuth0();
  
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item
              icon={<LinuxOutlined style={{ fontSize: '25px', display: 'block', margin: '0 auto' }} />}
              style={{ height: '70px', textAlign: 'center', pointerEvents: 'none' }}
            >Pedro el Pingüino</Menu.Item>
            <Menu.Item key="1" icon={<HomeOutlined />}><Link to="/mascota">Mascota</Link></Menu.Item>

            {/* <Menu.Item key="2" icon={<DotChartOutlined />}><Link to="/estadisticas">Estadisticas</Link></Menu.Item> */}
            {/* <Menu.Item key="3" icon={<ToolOutlined />}><Link to="/verTasks">Ver Tasks</Link></Menu.Item>
            <Menu.Item key="4" icon={<UserOutlined />}><Link to="/agregarUsuario">Add Users</Link></Menu.Item>
            <Menu.Item key="5" icon={<ToolOutlined />}><Link to="/agregarTasks">Add Tasks</Link></Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '16px' }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: '16px',
                  width: 64,
                  height: 64,
                }}
              />
              <div className="Container" style={{ display: 'flex', alignItems: 'center' }}>
                {isAuthenticated && (
                  <div className="UserInfo" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={user.picture} alt={user.name} style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }} />
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
  
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginTop: '20px', // Agregar separación
            }}
          >
            <Routes>
              <Route path="/mascota" element={<Home />} />
              {/* <Route path="/estadisticas" element={<Estadisticas />} /> */}
              {/* <Route path="/agregarTasks" element={<CrearTasks />} />
              <Route path="/verTasks" element={<TablaTasks />} />
              <Route path="/verUsers" element={<TablaUsers />} />  */}
  
            </Routes>
          </Content>
        </Layout>
      </Layout>
      
  );
};
export default NavBar;