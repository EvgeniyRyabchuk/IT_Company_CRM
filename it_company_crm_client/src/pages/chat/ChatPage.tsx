import React, {useEffect, useRef, useState} from 'react';
import ChatComponent from "../../components/Chat/ChatComponent";
import {Box, styled} from "@mui/material";
import {Breadcrumb} from "../../components";
import {Container} from "../../assets/components/breadcrumb";
import {useTypeSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {useObserver} from "../../hooks/useObserver";
import AddUserChatModal from "../../components/modals/AddUserChatModal/AddUserChatModal";
import ChatSidebar from "../../components/Chat/ChatSideBar/ChatSidebar";
import ChatMain from "../../components/Chat/ChatMain/ChatMain";
import {useParams} from "react-router-dom";
import {Chat} from "../../types/chat";
import {DEFAULT_LIMIT, DEFAULT_PAGE} from "../../store/reducers/chatReducer";
import {User} from "../../types/user";

export const userId = 1;

const ChatPage = () => {

    const { withUserId } = useParams();

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
        clean
    } = useAction();

    const chatId = 1;
    const messageId = 1;


    useEffect(() => {

        console.log('chatId', withUserId);
        const fetchChatsAndMessages = async () => {
            const receivedChats = await fetchChats(userId);
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
                            userId,
                            newCurrentChat.id,
                            DEFAULT_LIMIT,
                            DEFAULT_PAGE,
                            true
                        );
                    }
                }

            }
        }
        fetchChatsAndMessages();

        return () => {
            clean(); 
        }

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
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "Chats" }]} />
            </Box>

            <div className='chat' style={{display: 'flex', padding: '20px'}}>

                <AddUserChatModal
                    open={userModalOpen}
                    onClose={() => setUserModalOpen(false)}
                    onSave={() => { setUserModalOpen(false) }}
                    setOpen={setUserModalOpen}
                />

                <ChatSidebar setUserModalOpen={setUserModalOpen} />

                <ChatMain lastElement={lastElement} />

            </div>

        </Container>
    );
};

export default ChatPage;