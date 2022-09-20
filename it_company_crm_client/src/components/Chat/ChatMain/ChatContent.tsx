import React, {useEffect, useMemo, useRef, useState} from 'react';
import ChatMessage from "./CharMessage";
import {useTypeSelector} from "../../../hooks/useTypedSelector";
import {Chat} from "../../../types/chat";
import {useAction} from "../../../hooks/useAction";

const ChatContent = ({ lastElement }: any) => {

    const { setCurrentChatId } = useAction();
    const { currentChat } = useTypeSelector(state => state.chat)
    const [messages, setMessages] = useState<any>([]);
    const wrapper = useRef<any>();
    const contentDiv = useRef<null | HTMLDivElement>(null);

    const firstElement = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        if(firstElement.current) {
            console.log('scroll')

            // firstElement.current?.scrollIntoView({ behavior: 'auto' });
            // wrapper.current.scrollTo(0, 9999);
            wrapper.current.scrollTo({
                top: wrapper.current.scrollHeight,
                behavior: 'auto',
            });
        // firstElement.current?.style = { top: '0' };

        }


    }

    useEffect(() => {

        console.log(currentChat?.messages)

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
                    display: currentChat ? 'block' : "none"
                }}>

            </div>
            {
                currentChat && currentChat.messages ? currentChat.messages.map((e: any) =>
                   <ChatMessage key={e.id} message={e} /> )
                    :
                <h1>Select chat</h1>
            }
            <div
                style={{
                    height: '30px',
                    background: 'yellow'
                }}
                ref={firstElement}>

            </div>

        </div>
    );
};

export default ChatContent;