import '../../assets/components/Chat/index.css';
import React, {useEffect, useRef, useState} from 'react';
import {Box} from "@mui/material";
import {Breadcrumb} from "../../components";
import {Container} from "../../assets/components/breadcrumb";
import {useTypeSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {useObserver} from "../../hooks/useObserver";
import ChatSidebar from "../../components/Chat/ChatSideBar/ChatSidebar";
import ChatMain from "../../components/Chat/ChatMain/ChatMain";
import {useParams} from "react-router-dom";
import {Chat} from "../../types/chat";
import {DEFAULT_LIMIT, DEFAULT_PAGE} from "../../store/reducers/chatReducer";
import {User} from "../../types/user";
import useAuth from "../../hooks/useAuth";
import AddUserChatModal from "../../components/modals/AddUserChatModal/AddUserChatModal";


const ChatPage = ({...props}) => {

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
        clean
    } = useAction();

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
        console.log('changed messagepage')
        if(currentChatId && currentChat != null) {
            console.log("===================== use effect ======================= " + messagePage)
            // console.log('length', currentChat.messages.length ?? 0)
            // if(currentChat.messagePage !== DEFAULT_PAGE)
            if(!currentChat.messages) return;
            if(currentChat.totalMessages === currentChat.messages.length) return;
                fetchMessageByChat(user!.id, currentChat.id, messageLimit, currentChat.messagePage);

        }
    }, [messagePage])

    useEffect(() => {
        if(chatLoadingFirstTime) return;
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

    return (
        <Container>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[ { name: "Chats" }]} />
            </Box>

            <div className='chat' style={{display: 'flex', padding: '20px'}}>

                <ChatSidebar setUserModalOpen={setUserModalOpen} />

                <ChatMain lastElement={lastElement} />

            </div>

            <AddUserChatModal
                open={userModalOpen}
                onClose={() => setUserModalOpen(false)}
                onSave={() => {
                    console.log(123); setUserModalOpen(false) }}
                setOpen={setUserModalOpen}
            />
        </Container>
    );
};

export default ChatPage;