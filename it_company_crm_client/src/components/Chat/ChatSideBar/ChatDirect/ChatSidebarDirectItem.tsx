import React, {useMemo} from 'react';

import userIcon from '../../../../assets/images/chat/user-32-01.jpg'

export const apiUrl = `http://127.0.0.1:8000/api/`;

const ChatSidebarDirectItem = ({chat, onChatChange, currentChat}: any) => {

    //TODO: change
    const userId = 1;
    const withUser = useMemo(() => {
        return chat.users.filter((e: any) => e.id != userId)[0];
    }, [chat]);

    const imageUrl = useMemo(() => `${apiUrl}storage/${withUser.avatar}`,[chat, currentChat]);
    const newCount = useMemo(() => chat.messages.filter((message: any) => message.isSeen == false && message.from_user.id !== userId).length,[chat, currentChat]);



    return (
        <li className={currentChat && currentChat.id === chat.id ? 'nv chat-selected' : 'nv'}>
            <button
                className={newCount > 0 ? "flex items-center fe ou dx rounded hl" : "flex items-center fe ou dx rounded"}
                onClick={() => onChatChange({...chat}, newCount)}
            >
                <div className="flex items-center ld">
                    <img className="os sf rounded-full mr-2" src={imageUrl} width="32" height="32" alt="User 01" />
                        <div className="ld">
                            <span className="text-sm gp text-slate-800">{withUser.full_name}</span>
                        </div>
                </div>
                {
                    newCount > 0 ?
                        <div className="flex items-center nq">
                            <div className="go inline-flex gp pi ye rounded-full gn gw vi">{newCount}</div>
                        </div>
                        :
                        <div className="flex items-center nq">
                            <svg className="w-3 h-3 ub du gq" viewBox="0 0 12 12">
                                <path
                                    d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z"></path>
                            </svg>
                        </div>
                }

            </button>
        </li>
    );
};

export default ChatSidebarDirectItem;