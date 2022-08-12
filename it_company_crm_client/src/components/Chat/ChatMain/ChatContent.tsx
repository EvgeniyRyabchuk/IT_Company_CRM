import React, {useEffect, useRef, useState} from 'react';
import ChatMessage from "./CharMessage";
import {useFetching} from "../../../hooks/useFetching";
import {useObserver} from "../../../hooks/useObserver";
import {userId} from "../Chat";
import {getPageCount} from "../../../utils/pages";

const ChatContent = ({
        currentChat,
        setCurrentChat,
        lastElement,
        isMessagesLoading
    }: any) => {

    const [messages, setMessages] = useState<any>([]);

    const wrapper = useRef<any>();
    const contentDiv = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        console.log('scroll')
        wrapper.current?.scrollTo(0, 9999);
    }

    useEffect(() => {
        if(currentChat && currentChat.messages
            && currentChat.messages.length > 0
            && currentChat.messages.length < 11)
            scrollToBottom();
    }, [currentChat])




    return (
        <div
            ref={wrapper}
            className='chat-Content uw vs jj tei vh'
            style={{maxHeight: '800px', overflowY: 'auto'}}>
            <div
                ref={lastElement}
                style={{
                    height: 20,
                    background: 'red',
                    display: currentChat && currentChat.messages ? 'block' : "none"
                }}>

            </div>
            {
                currentChat && currentChat.messages ? currentChat.messages.map((e: any) =>
                   <ChatMessage key={e.id} message={e} /> )
                    :
                <h1>Select chat</h1>
            }

        </div>
    );
};

export default ChatContent;