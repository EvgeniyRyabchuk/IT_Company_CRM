import React from 'react';
import './App.css';
import {useRoutes} from "react-router-dom";
import routes from "./routing/routes";
import {AuthProvider} from "./context/JWTAuthContext";

function App() {

  const content = useRoutes(routes);

  return (
    <div className="App">

      <AuthProvider>
        {content}
      </AuthProvider>

    </div>
  );
}

export default App;
