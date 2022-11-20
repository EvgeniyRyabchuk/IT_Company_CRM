import React from 'react';
import LargeEventCalendar from "../../components/LargeEventCalendar/LargeEventCalendar";
import {Box} from "@mui/material";
import {Breadcrumb} from "../../components";
import {Container} from "../../assets/components/breadcrumb";

const EventCalendarPage = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "Events" }]} />
            </Box>

            <LargeEventCalendar/>
        </Container>
    );
};

export default EventCalendarPage;