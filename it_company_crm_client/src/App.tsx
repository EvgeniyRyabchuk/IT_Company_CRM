import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, {useState} from 'react';
import './App.css';
import ProjectFileManager from "./components/ProjectFileManager/ProjectFileManager";
import EventCalendar from "./components/EventCalendar/EventCalendar";


function App() {



  return (
    <div className="App">

        {/*<ProjectFileManager />*/}

        <EventCalendar />

    </div>
  );
}

export default App;
