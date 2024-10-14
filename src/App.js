import React from 'react';
import Style from "./App.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Main from "./Components/Main";
import Menu from "./Components/Menu";
import Home from "./Components/Home";

function App() {
    const { isAuthenticated } = useAuth0(); // Obtener estado de autenticación

    return (
        <div className={Style.App}>
             {/* {isAuthenticated && <Menu />}  */}
            {isAuthenticated && <Home />}
            
            <Routes>
                <Route path="/" element={<Main />} /> {/* Ruta base para Main */}

            </Routes>
        </div>
    );
}

export default App;
