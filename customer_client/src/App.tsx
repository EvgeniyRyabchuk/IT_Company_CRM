import React from 'react';
import './App.css';
import {useRoutes} from "react-router-dom";
import routes from "./routing/routes";
import {AuthProvider} from "./context/JWTAuthContext";

import GlobalStyles from "./assets/components/Global/GlobalStyles";
import {Provider} from "react-redux";
import {store} from "./store";
import {ToastContainer} from "react-toastify"; //eslint-disable-line
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const content = useRoutes(routes);
    console.log('app')
  return (
    <div className="App">

        <GlobalStyles />

        <ToastContainer position='bottom-left' autoClose={1500} />

        <Provider store={store}>
            <AuthProvider>
                {content}
            </AuthProvider>
        </Provider>


    </div>
  );
}

export default App;
