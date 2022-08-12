import React, {useEffect, useMemo, useRef, useState} from 'react';

import '../../assets/components/Chat/index.css';
import ChatMain from "./ChatMain/ChatMain";
import ChatSidebar from "./ChatSideBar/ChatSidebar";
import {apiUrl} from "./ChatSideBar/ChatDirect/ChatSidebarDirectItem";
import KanbanCardEditModal from "../modals/KanbanCardEditModal/KanbanCardEditModal";
import AddUserChatModal from "../modals/AddUserChatModal/AddUserChatModal";
import {useFetching} from "../../hooks/useFetching";
import {getPageCount} from "../../utils/pages";
import {useObserver} from "../../hooks/useObserver";
import {useSortedList} from "../../hooks/useSorted";

export const userId = 1;

const Chat = () => {

    const [chatSearchQuery, setChatSearchQuery] = useState<string>('');
    const [chats, setChats] = useState<any>([]);
    const [currentChat, setCurrentChat] = useState<any>(null);

    const filteredChats = useMemo(() => {
        return chats.filter((chat: any) =>{
            const withUser = chat.users.filter((e: any) => e.id !== userId)[0];
            return withUser.full_name.toLowerCase()
                .includes(chatSearchQuery.toLowerCase());
        });
    }, [chatSearchQuery, chats]);

    const chatId = 1;
    const messageId = 1;

    useEffect(() => {

        getChats();
    }, [])

    const getChats = async () => {
        const data = await fetch(`http://127.0.0.1:8000/api/users/${userId}/chats`);
        const json = await data.json();
        setChats([...json]);
        /*
            const defChat = json && json.length && json.length > 0 && json[0];
            if(defChat) {
                setCurrentChat(defChat);
                const countUnseen = defChat.messages.filter((message: any) => message.isSeen == false).length;
                if(countUnseen > 0)
                    markMessageAsChecked(defChat);
            }
        */
    }

    const getMessagesByChatId = async (chatId: number, limit: number, page: number) => {
        const data = await fetch(
            `http://127.0.0.1:8000/api/users/${userId}/chats/${chatId}/messages?limit=${limit}&page=${page}
            `);
        return await data.json();
    }

    const markMessageAsChecked = async (chat: any) => {
        const data = await fetch(`http://127.0.0.1:8000/api/users/${userId}/chats/${chat.id}/seen`,
            { headers: {
                    "Content-Type": 'application/json'
                },
                method: "PUT",
            });
        const resChat = await data.json();
        // replace
        const index = chats.findIndex((e: any) => e.id === resChat.id);
        for (let msg of chat.messages)
            msg.isSeen = true;

        chats.splice(index, 1, chat);
        setChats([...chats]);
    }

    const onSearchInputChange = (e: any) => {
        const text = e.target.value;
        setChatSearchQuery(text);
    }

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef<any>();

    // получение функции fetchPosts и состояний загрузки
    const [fetchMessages, isMessagesLoading, messageError] =
        useFetching(async (newCurrentChat: any, limit: number, page: number) => {
            console.log('fetch messages');

            const responce = await getMessagesByChatId(newCurrentChat.id, limit, page);
            const totalCount = responce.total;
            console.log('1');
            newCurrentChat.messages = [...responce.data, ...newCurrentChat.messages]
                .sort((a, b) => a['created_at'].localeCompare(b['created_at']));

            console.log('2');
            console.log('=================')
            console.log(newCurrentChat);
            console.log('=================')

            setCurrentChat({...newCurrentChat});
            setTotalPages(getPageCount(totalCount, limit));
        });


        useObserver(lastElement, page < totalPages, isMessagesLoading, () => {
            setPage(page + 1);
        });


    const onChatChange = async (newChat: any, unseenCount: number) => {
        console.log('chat was changed ' + newChat.id);

        if(unseenCount > 0)
            markMessageAsChecked(newChat);

        const newCurrentChat = {...newChat, messages: []};
        fetchMessages(newCurrentChat, limit, page);
        setPage(1);
        setLimit(10);
    }

    useEffect(() => {
        console.log('use effect change')
        fetchMessages(currentChat, limit, page);
    }, [limit, page])

    useEffect(() => {
        console.log('current chat changed');
    }, [currentChat])

    const onSended = (newMessage: any) => {

        const newCurrentChat = { ...currentChat, messages: [...currentChat.messages, newMessage]};

        const newChatList = [...chats];
        const index = chats.findIndex((e: any) => e.id === newCurrentChat.id);
        newChatList.splice(index, 1, newCurrentChat);

        // update current chat in chats
        setChats(newChatList);
        // set new current chat (with new message)
        setCurrentChat(newCurrentChat);
    }


    const [userModalOpen, setUserModalOpen] = useState(false);

    const addChatWithNewUser = (chat: any) => {
        console.log(chat,`CREATED CHAT WITH USER. CHAT =  ${chat.id}`);

        setChats([chat, ...chats]);
        setCurrentChat(chat);
        setUserModalOpen(false);
    }

    const onSearchChatChange = (newChats: any) => {
        setChats(newChats);
    }

    return (
        <div className='chat' style={{display: 'flex', padding: '50px'}}>

            <AddUserChatModal
                open={userModalOpen}
                onClose={() => setUserModalOpen(false)}
                onSave={addChatWithNewUser}
                setOpen={setUserModalOpen}
            />

            {/*<div>*/}
            {/*    <h3>Current auth user</h3>*/}
            {/*    <img src={`${apiUrl}storage/${}`} alt=""/>*/}
            {/*</div>*/}



            <ChatSidebar
                setUserModalOpen={setUserModalOpen}
                currentChat={currentChat}
                chats={filteredChats}
                onChatChange={onChatChange}
                onSearchInputChange={onSearchInputChange}
            />

            <ChatMain
                onSended={onSended}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                lastElement={lastElement}
                isMessagesLoading={isMessagesLoading}

            />

        </div>

    );
};

export default Chat;