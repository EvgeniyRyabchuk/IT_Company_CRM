import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import './assets/components/Global/App.css';

import ChatComponent from "./components/Chat/ChatComponent";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {

  return (
      <Provider store={store}>
        <div className="App">
            <ChatComponent />
            {/*<div className='chat' style={{display: 'flex', padding: '50px', height: '300px'}}></div>*/}
            {/*<div className='chat' style={{display: 'flex', padding: '50px', height: '300px'}}></div>*/}
            {/*<div className='chat' style={{display: 'flex', padding: '50px', height: '300px'}}></div>*/}
            {/*<div className='chat' style={{display: 'flex', padding: '50px', height: '300px'}}></div>*/}
            {/*<div className='chat' style={{display: 'flex', padding: '50px', height: '300px'}}></div>*/}
            {/*<Button variant="contained">Contained</Button>*/}
            {/*<ProjectFileManager />*/}

            {/*<EventCalendar />*/}

            {/*<LargeEventCalendar />*/}

            {/*<Kanban />*/}
        </div>
      </Provider>
  );
}

export default App;
