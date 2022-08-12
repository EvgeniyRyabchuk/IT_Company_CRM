import React from 'react';
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";

const ChatMain = (
    {
        currentChat,
        setCurrentChat,
        onSended,
        lastElement,
        isMessagesLoading,
        onSearchChatChange
    } : any) => {


    return (

        <div className='chat-main uw flex ak za wn wo wu translate-x-1/3' style={{position: "relative"}}>
            <ChatHeader currentChat={currentChat} />
            <ChatContent
                isMessagesLoading={isMessagesLoading}
                lastElement={lastElement}
                setCurrentChat={setCurrentChat}
                currentChat={currentChat}
                onSearchChatChange={onSearchChatChange}
            />
            <ChatInput onSended={onSended} currentChat={currentChat}/>
        </div>
    );
};

export default ChatMain;