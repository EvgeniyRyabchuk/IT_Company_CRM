import React from 'react';
import './App.css';
import {useRoutes} from "react-router-dom";
import routes from "./routing/routes";
import {AuthProvider} from "./context/JWTAuthContext";

import GlobalStyles from "./assets/components/Global/GlobalStyles";
import PaymentComplete from "./components/statusCards/payment/PaymentComplete";
import PaymentFail from "./components/statusCards/payment/PaymentFail";
import ContactSuccess from "./components/statusCards/contactUs/ContactSuccess";
import JobApplicationSentSuccess from "./components/statusCards/vacancy/JobApplicationSentSuccess"; //eslint-disable-line


function App() {

  const content = useRoutes(routes);

  return (
    <div className="App">

        {/*

         <PaymentComplete />

        <PaymentFail />

        <ContactSuccess />

        <JobApplicationSentSuccess />

        */}


        <GlobalStyles />

            <AuthProvider>
                {content}
            </AuthProvider>

    </div>
  );
}

export default App;
