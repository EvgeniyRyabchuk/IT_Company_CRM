import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, {useEffect, useState} from 'react';
import './App.css';
import ProjectFileManager from "./components/ProjectFileManager/ProjectFileManager";
import EventCalendar from "./components/EventCalendar/EventCalendar";
import LargeEventCalendar from "./components/LargeEventCalendar/LargeEventCalendar";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Kanban from "./components/Kanban/Kanban";
import {Button} from "@mui/material";
function App() {

  return (
    <div className="App">

        {/*<Button variant="contained">Contained</Button>*/}
        {/*<ProjectFileManager />*/}

        <EventCalendar />

        <LargeEventCalendar />

        {/*<Kanban />*/}
    </div>
  );
}

export default App;
