import React from 'react';
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";

const CharMain = () => {
    return (
        <div className='chat-main uw flex ak za wn wo wu translate-x-1/3' style={{position: "relative"}}>
            <ChatHeader />
            <ChatContent />
            <ChatInput />
        </div>
    );
};

export default CharMain;