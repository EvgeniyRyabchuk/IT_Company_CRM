import React from 'react';
import ChatComponent from "../../components/Chat/ChatComponent";
import {Box, styled} from "@mui/material";
import {Breadcrumb} from "../../components";
import {Container} from "../../assets/components/breadcrumb";



const Chat = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "Chats" }]} />
            </Box>

            <ChatComponent />
        </Container>
    );
};

export default Chat;