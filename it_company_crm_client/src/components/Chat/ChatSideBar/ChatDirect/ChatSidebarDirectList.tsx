import React from 'react';
import ChatSidebarDirectItem from "./ChatSidebarDirectItem";

import userAvatar from '../../../../assets/images/chat/user-32-04.jpg';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";


type ChatSidebarDirectListPropsType = {
    title: string;
    open?: boolean;
    chats: any[];
    onChatChange: () => void;
    currentChat: any;
}

const ChatSidebarDirectList = ({title, open, chats, onChatChange, currentChat}: ChatSidebarDirectListPropsType) => {
    return (
        <Accordion defaultExpanded={open ?? false}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <div className="io">
                    <div className="go gh gq gv ro">{title}</div>
                    <ul className="rh">
                        { chats.map((e: any)=>
                            <ChatSidebarDirectItem currentChat={currentChat} onChatChange={onChatChange} key={e.id} chat={e}  />
                        )}
                    </ul>
                </div>
            </AccordionDetails>
        </Accordion>



    );
};

export default ChatSidebarDirectList;