import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import './assets/components/Global/App.css';
import {Provider} from "react-redux";
import {store} from "./store";
import MatxTheme from "./components/MatxTheme/MatxTheme";
import {SettingsProvider} from "./contexts/SettingsContext";
import {useRoutes} from "react-router-dom";
import routes from "./routing/routes";
import {AuthProvider} from "./contexts/JWTAuthContext";
import 'react-perfect-scrollbar/dist/css/styles.css';

function App() {
    const content = useRoutes(routes);
    console.log('route: ', content);
  return (
      <Provider store={store}>
          <SettingsProvider>
              <MatxTheme>
                <div className="App">

                    <AuthProvider>{content}</AuthProvider>

                    {/*<ChatComponent />*/}

                    {/*<ProjectFileManager />*/}

                    {/*<EventCalendar />*/}

                    {/*<LargeEventCalendar />*/}

                    {/*<Kanban />*/}

                    {/*<JwtLogin />*/}

                    {/*<JwtRegister />*/}

                    {/*<ForgotPassword />*/}

                    {/*<NotFound />*/}

                </div>
              </MatxTheme>
          </SettingsProvider>
      </Provider>
  );
}

export default App;
