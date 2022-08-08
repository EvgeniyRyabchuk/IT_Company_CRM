import React from 'react';

import '../../assets/components/Chat/index.css';
import ChatMain from "./ChatMain/ChatMain";
import ChatSidebar from "./ChatSideBar/ChatSidebar";

const Chat = () => {

    return (
        <div className='chat' style={{display: 'flex', padding: '50px'}}>
            <ChatSidebar />
            <ChatMain />

        </div>

    );
};

export default Chat;