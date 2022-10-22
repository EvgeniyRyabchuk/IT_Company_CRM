import React, {useEffect, useRef, useState} from 'react';

import '../../assets/components/Chat/index.scss';
import ChatMain from "./ChatMain/ChatMain";
import ChatSidebar from "./ChatSideBar/ChatSidebar";
// import AddEmployeeToProjectModal from "../modals/AddEmployeeToProjectModal/AddEmployeeToProjectModal";
import {useObserver} from "../../hooks/useObserver";
import {useTypeSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import useAuth from "../../hooks/useAuth";
// import AddUserChatModal from "../modals/AddUserChatModal/AddUserChatModal";


const ChatComponent = () => {
    const { user } = useAuth();
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
        setCurrentChatId,
        setChatMessages
    } = useAction();

    const chatId = 1;
    const messageId = 1;

    useEffect(() => {
        fetchChats(user!.id);
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

            fetchMessageByChat(user!.id, currentChat.id, messageLimit, currentChat.messagePage);
        }
    }, [messagePage])

    const [userModalOpen, setUserModalOpen] = useState(false);

    return (
        <div className='chat' style={{display: 'flex', padding: '20px'}}>

            {/*<AddUserChatModal*/}
            {/*    open={userModalOpen}*/}
            {/*    onClose={() => setUserModalOpen(false)}*/}
            {/*    onSave={() => { setUserModalOpen(false) }}*/}
            {/*    setOpen={setUserModalOpen}*/}
            {/*/>*/}

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