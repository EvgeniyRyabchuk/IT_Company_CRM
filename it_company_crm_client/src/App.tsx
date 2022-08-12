import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, {useEffect, useState} from 'react';
import './assets/components/Global/App.css';
import ProjectFileManager from "./components/ProjectFileManager/ProjectFileManager";
import EventCalendar from "./components/EventCalendar/EventCalendar";
import LargeEventCalendar from "./components/LargeEventCalendar/LargeEventCalendar";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Kanban from "./components/Kanban/Kanban";
import {Button} from "@mui/material";
import CharMessage from "./components/Chat/ChatMain/CharMessage";
import Chat from "./components/Chat/Chat";
function App() {

  return (
    <div className="App">
        <Chat />
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
  );
}

export default App;
