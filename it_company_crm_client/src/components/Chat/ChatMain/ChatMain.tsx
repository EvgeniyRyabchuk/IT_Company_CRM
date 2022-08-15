import React from 'react';
import ChatHeader from "./ChatHeader";
import ChatContent from "./ChatContent";
import ChatInput from "./ChatInput";
import {useTypeSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";

const ChatMain = ({ lastElement } : any) => {

    return (

        <div className='chat-main uw flex ak za wn wo wu translate-x-1/3' style={{position: "relative"}}>
            <ChatHeader  />
            <ChatContent
                lastElement={lastElement}
            />
            <ChatInput />
        </div>
    );
};

export default ChatMain;