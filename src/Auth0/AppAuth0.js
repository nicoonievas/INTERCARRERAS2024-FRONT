import { useAuth0 } from '@auth0/auth0-react';
import Style from "./App.module.css";
import { Button } from 'antd';

function AppAuth0() {
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <div className={Style.Container}>
      {!isAuthenticated ? (
        <div className={Style.LoginContainer}> {/* Contenedor para centrar el botón */}
          
          <Button type="primary" className={Style.BotonLogin} onClick={() => loginWithRedirect()}>
            Log In
          </Button>
        </div>
      ) : (
        <Button className={Style.BotonLogout} onClick={() => logout()}>
          Log Out
        </Button>
      )}
      
      {isAuthenticated && (
        <div className={Style.UserInfo}>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )}
    </div>
  );
}

export default AppAuth0;
