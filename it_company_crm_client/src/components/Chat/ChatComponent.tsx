import React, {useEffect, useMemo, useRef, useState} from 'react';

import '../../assets/components/Chat/index.css';
import ChatMain from "./ChatMain/ChatMain";
import ChatSidebar from "./ChatSideBar/ChatSidebar";
import AddUserChatModal from "../modals/AddUserChatModal/AddUserChatModal";
import {useObserver} from "../../hooks/useObserver";
import {Chat} from "../../types/chat";
import {useTypeSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";

import {DEFAULT_LIMIT, DEFAULT_PAGE} from "../../store/reducers/chatReducer";

export const userId = 1;

const ChatComponent = () => {

    const {
        chats,
        error,
        loadingChats,
        loadingMessages,
        loadingSendedMessage,

        messagePage,
        messageLimit,
        totalMessagePages,

        currentChatId,
        currentChat
    } = useTypeSelector(state => state.chat)

    const {
        fetchChats,
        fetchMessageByChat,
        setMessagePage,
        setMessageLimit,
        setCurrentChatId
    } = useAction();

    const chatId = 1;
    const messageId = 1;

    useEffect(() => {
        fetchChats(userId);
    }, [])

    const lastElement = useRef<any>();

    useObserver(lastElement,
        currentChat ? currentChat.messagePage < totalMessagePages :
            messagePage < totalMessagePages,
        loadingMessages,
        () => {
        console.log('-' , messagePage, totalMessagePages, '-');
        if(currentChat) {
            const newPage = currentChat.messagePage + 1;
            setMessagePage(newPage);
        }

    });

    useEffect(() => {
        if(currentChatId && currentChat != null) {
            console.log("use effect " + messagePage)
            // console.log('length', currentChat.messages.length ?? 0)
            // if(messagePage === DEFAULT_PAGE) setMessagePage(DEFAULT_PAGE+1);

            fetchMessageByChat(userId, currentChat.id, messageLimit, currentChat.messagePage);
        }
    }, [messagePage])

    const [userModalOpen, setUserModalOpen] = useState(false);

    return (
        <div className='chat' style={{display: 'flex', padding: '50px'}}>

            <AddUserChatModal
                open={userModalOpen}
                onClose={() => setUserModalOpen(false)}
                onSave={() => { setUserModalOpen(false) }}
                setOpen={setUserModalOpen}
            />

            <ChatSidebar
                setUserModalOpen={setUserModalOpen}
            />

            <ChatMain
                lastElement={lastElement}
                isMessagesLoading={loadingMessages}
            />

        </div>

    );
};

export default ChatComponent;