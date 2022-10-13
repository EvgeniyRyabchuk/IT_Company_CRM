import '../../../assets/components/Chat/index.css';
import React, {useEffect, useRef, useState} from 'react';
import {Box, Button} from "@mui/material";

import {useTypeSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {useObserver} from "../../../hooks/useObserver";
import ChatSidebar from "../../../components/Chat/ChatSideBar/ChatSidebar";
import ChatMain from "../../../components/Chat/ChatMain/ChatMain";
import {useParams} from "react-router-dom";
import {Chat} from "../../../types/chat";
import {DEFAULT_LIMIT, DEFAULT_PAGE} from "../../../store/reducers/chatReducer";
import {User} from "../../../types/user";
import useAuth from "../../../hooks/useAuth";
import useTimeoutLoop from "../../../hooks/useTimeoutLoop";
import {ChatService} from "../../../services/ChatService";


const ChatTab = ({...props}) => {

    const [chatLoadingFirstTime, setChatLoadingFirstTime] = useState<boolean>(true);

    const { withUserId } = useParams();
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
        currentChat,

    } = useTypeSelector(state => state.chat)

    const {
        fetchChats,
        fetchMessageByChat,
        setMessagePage,
        setMessageLimit,
        setCurrentChatId,
        clean,
        setChatMessages
    } = useAction();


    const { timer, start, stop } = useTimeoutLoop(() => {
        console.log('check');
        checkNewMessages();
    }, 3000);

    useEffect(() => {
        if(!chatLoadingFirstTime) {
            start();
        }
    }, [chatLoadingFirstTime])

    useEffect(() => {
        console.log('chatId', withUserId);
        const fetchChatsAndMessages = async () => {
            const receivedChats = await fetchChats(user!.id);
            if(withUserId) {
                // @ts-ignore
                const existChat = receivedChats.find((e: Chat) => {
                    // @ts-ignore
                    const withUserExist = e.users.find((user: User) => user.id == withUserId);
                    if(withUserExist) return e;
                });
                if(existChat) {
                    console.log('exist');
                    const newCurrentChat = { ...existChat }
                    setCurrentChatId(newCurrentChat.id);
                    if(!newCurrentChat.messages || newCurrentChat.messages.length === 0) {
                        fetchMessageByChat(
                            user!.id,
                            newCurrentChat.id,
                            DEFAULT_LIMIT,
                            DEFAULT_PAGE,
                            true
                        );

                    }
                }
            }
            setChatLoadingFirstTime(false)
        }
        fetchChatsAndMessages();

        return () => {
            clean();
        }

    }, [])


    const lastElement = useRef<any>();
    // observe on top element
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

    // if page is change
    useEffect(() => {
        console.log('changed message page')
        if(currentChatId && currentChat != null) {
            console.log("===================== use effect ======================= " + messagePage)
            // console.log('length', currentChat.messages.length ?? 0)
            // if(currentChat.messagePage !== DEFAULT_PAGE)
            if(!currentChat.messages) return;
            if(currentChat.totalMessages === currentChat.messages.length) return;
            fetchMessageByChat(user!.id, currentChat.id, messageLimit, currentChat.messagePage);

        }
    }, [messagePage])


    // if current chat change
    useEffect(() => {
        if(chatLoadingFirstTime) {
            return;
        }
        console.log(currentChatId, currentChat, currentChat?.messages)
        if(currentChatId && currentChat != null) {
            if(!currentChat.messages) {
                fetchMessageByChat(
                    user!.id,
                    currentChatId,
                    DEFAULT_LIMIT,
                    DEFAULT_PAGE,
                    true
                );
            }
        }
    }, [currentChatId])

    const [userModalOpen, setUserModalOpen] = useState(false);

    const checkNewMessages = async () => {

        const { data } = await ChatService.getNew(user!.id, 'messages');

        for (let _new of data) {
            setChatMessages(_new.chat_id, _new.newMessages);
        }

        //TODO: scroll to down

        // const msg = currentChat?.messages[0];
        // if(msg && currentChatId)
        //     setChatMessages(currentChatId, [msg]);
    }

    const checkNewChat = () => {

    }

    return (
        <div>
            <Box className='chat' sx={{
                display: 'flex',
                padding: '20px',
                height: '700px',
                boxShadow: 3,
                overflowY: 'hidden'
            }}>

                <ChatSidebar setUserModalOpen={setUserModalOpen} />

                <ChatMain lastElement={lastElement} />

            </Box>
        </div>
    );
};

export default ChatTab;