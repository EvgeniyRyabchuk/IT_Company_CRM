import React, {useCallback, useEffect, useMemo, useState} from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
//
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";
// import {
//     Eventcalendar,
//     getJson,
//     toast,npm i --save-dev @types/moedim
//     MbscCalendarEvent,
//     MbscEventcalendarView,
//     localeUa,
//     locale
// } from '@mobiscroll/react';
// import "@mobiscroll/react/dist/css/mobiscroll.min.css";


 const EventCalendarWidget = () => {
     const [value, onChange] = useState(new Date());

     return (
         <Calendar  onChange={onChange} value={value} />
     )

 }




//
// const EventCalendar = () => {
//
//     const [myEvents, setEvents] = useState<MbscCalendarEvent[]>([]);
//
//     const getEvents = async () => {
//         const response = await fetch("http://127.0.0.1:8000/api/users/1/events");
//         const events = await response.json();
//         setEvents(events);
//     }
//
//     React.useEffect(() => {
//         // getJson('https://trial.mobiscroll.com/events/?vers=5', (events: MbscCalendarEvent[]) => {
//         //     console.log(events);
//         //     setEvents(events);
//         // }, 'jsonp');
//         getEvents();
//     }, []);
//
//     const view = useMemo<MbscEventcalendarView>(() => {
//         return {
//             calendar: { type: 'month', labels: true },
//             agenda: { type: 'month' }
//         };
//     }, []);
//
//     const onEventClick = useCallback((event: any) => {
//         toast({
//             message: event.event.title
//         });
//     }, []);
//
//
//     return (
//         <div style={{width: "500px", height: "600px" , margin: "30px auto", }}>
//             <Eventcalendar
//                 theme="ios"
//                 themeVariant="light"
//                 dragToCreate={false}
//                 dragToMove={false}
//                 dragToResize={false}
//                 data={myEvents}
//                 view={view}
//                 onEventClick={onEventClick}
//                 locale={locale}
//             />
//         </div>
//     );
// };




export default EventCalendarWidget;