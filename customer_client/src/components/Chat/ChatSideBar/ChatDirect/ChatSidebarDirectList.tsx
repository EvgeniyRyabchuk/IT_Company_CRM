import React from 'react';
import ChatSidebarDirectItem from "./ChatSidebarDirectItem";
// @ts-ignore
import userAvatar from '../../../../assets/images/chat/user-32-04.jpg';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import {useTypeSelector} from "../../../../hooks/useTypedSelector";


type ChatSidebarDirectListPropsType = {
    title: string;
    open?: boolean;
    chats: any[];
}

const ChatSidebarDirectList = ({chats, title, open}: ChatSidebarDirectListPropsType) => {

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
                            <ChatSidebarDirectItem key={e.id} chat={e}  />
                        )}
                    </ul>
                </div>
            </AccordionDetails>
        </Accordion>



    );
};

export default ChatSidebarDirectList;