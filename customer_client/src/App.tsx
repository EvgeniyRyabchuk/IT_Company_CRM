import React from 'react';
import './App.css';
import {useRoutes} from "react-router-dom";
import routes from "./routing/routes";
import {AuthProvider} from "./context/JWTAuthContext";

import GlobalStyles from "./assets/components/Global/GlobalStyles";
import { css } from "styled-components/macro"; //eslint-disable-line

function App() {

  const content = useRoutes(routes);

  return (
    <div className="App">
        <GlobalStyles />

      <AuthProvider>
        {content}
      </AuthProvider>

    </div>
  );
}

export default App;
