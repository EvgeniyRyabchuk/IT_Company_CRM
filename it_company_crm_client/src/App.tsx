import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, {useEffect, useState} from 'react';
import './App.css';
import ProjectFileManager from "./components/ProjectFileManager/ProjectFileManager";
import EventCalendar from "./components/EventCalendar/EventCalendar";
import LargeEventCalendar from "./components/LargeEventCalendar/LargeEventCalendar";

import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import Kanban from "./components/Kanban/Kanban";
function App() {

    //
    // const [i, setI] = useState({ lanes: [
    //         {
    //             id: "lane1",
    //             name: "123",
    //             cards: [
    //                 {
    //                     id: "card1"
    //                 },
    //                 {
    //                     id: "card2"
    //                 }
    //             ]
    //         },
    //         {
    //             id: "lane2",
    //             name: "123",
    //             cards: [
    //                 {
    //                     id: "card1"
    //                 },
    //                 {
    //                     id: "card2"
    //                 }
    //             ]
    //         }
    //     ]});
    //
    // useEffect(() => {
    //     const lane = i.lanes.filter((kd:any) => kd.id === "lane1")[0];
    //     lane.name = "qwerty";
    //
    //     setI({
    //             lanes: [
    //                 ...i.lanes,
    //                 lane
    //             ]
    //     });
    //
    // }, []);

    // console.log(i);


  return (
    <div className="App">

        {/*<ProjectFileManager />*/}

        {/*<EventCalendar />*/}

        {/*<LargeEventCalendar />*/}

        <Kanban />
    </div>
  );
}

export default App;
