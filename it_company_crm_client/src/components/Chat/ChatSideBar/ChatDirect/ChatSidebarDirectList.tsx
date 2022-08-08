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
}

const ChatSidebarDirectList = ({title, open}: ChatSidebarDirectListPropsType) => {
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
                    <div className="go gh gq gv ro">Direct messages (Customers)</div>
                    <ul className="rh">
                        <ChatSidebarDirectItem />
                        <ChatSidebarDirectItem />
                        <ChatSidebarDirectItem />

                        <li className="nv">
                            <button className="flex items-center fe ou dx rounded">
                                <div className="flex items-center ld">
                                    <img className="os sf rounded-full mr-2" src={userAvatar} width="32" height="32" alt="User 04" />
                                    <div className="ld">
                                        <span className="text-sm gp text-slate-800">Adrian Przetocki</span>
                                    </div>
                                </div>
                                <div className="flex items-center nq">
                                    <svg className="w-3 h-3 ub du gq" viewBox="0 0 12 12">
                                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"></path>
                                    </svg>
                                </div>
                            </button>
                        </li>
                    </ul>
                </div>
            </AccordionDetails>
        </Accordion>



    );
};

export default ChatSidebarDirectList;