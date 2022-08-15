import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import './assets/components/Global/App.css';
import {Provider} from "react-redux";
import {store} from "./store";
import Kanban from "./components/Kanban/Kanban";

function App() {

  return (
      <Provider store={store}>
        <div className="App">

            {/*<ChatComponent />*/}

            {/*<ProjectFileManager />*/}

            {/*<EventCalendar />*/}

            {/*<LargeEventCalendar />*/}

            <Kanban />
        </div>
      </Provider>
  );
}

export default App;
