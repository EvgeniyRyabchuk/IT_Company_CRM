import React, {useCallback, useEffect, useMemo, useState} from 'react';
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson, toast, MbscCalendarEvent, MbscEventcalendarView, localeUa } from '@mobiscroll/react';
const EventCalendar = () => {

    const [myEvents, setEvents] = useState<MbscCalendarEvent[]>([]);

    const getEvents = async () => {
        const response = await fetch("http://127.0.0.1:8000/api/users/1/events");
        const events = await response.json();
        setEvents(events);
    }

    React.useEffect(() => {
        // getJson('https://trial.mobiscroll.com/events/?vers=5', (events: MbscCalendarEvent[]) => {
        //     console.log(events);
        //     setEvents(events);
        // }, 'jsonp');
        getEvents();
    }, []);

    const view = useMemo<MbscEventcalendarView>(() => {
        return {
            calendar: { type: 'month' },
            agenda: { type: 'month' }
        };
    }, []);

    const onEventClick = useCallback((event: any) => {
        toast({
            message: event.event.title
        });
    }, []);


    return (
        <div style={{width: "500px", height: "600px" , margin: "30px auto", }}>
            <Eventcalendar
                theme="ios"
                themeVariant="light"
                dragToCreate={false}
                dragToMove={false}
                dragToResize={false}
                data={myEvents}
                view={view}
                onEventClick={onEventClick}
            />
        </div>
    );
};

export default EventCalendar;