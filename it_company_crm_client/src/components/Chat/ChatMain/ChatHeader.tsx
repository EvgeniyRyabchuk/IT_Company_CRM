import React from 'react';

import userlog1 from '../../../assets/images/chat/user-32-01.jpg';
import userlog2 from '../../../assets/images/chat/user-32-07.jpg';
import {apiUrl} from "../ChatSideBar/ChatDirect/ChatSidebarDirectItem";
import {useTypeSelector} from "../../../hooks/useTypedSelector";

const ChatHeader = () => {
    const { currentChat } = useTypeSelector(state => state.chat)

    return (

        <div className="b tm chat-header" style={{position: 'static'}}>
            <div className="flex items-center fe bg-white cs border-slate-200 vs jj tei sa">

                <div className="flex items-center">

                    <button className="qz gq xv mr-4" aria-controls="messages-sidebar" aria-expanded="true">
                    <span className="d">Close sidebar</span>
                    <svg className="oi so du" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"></path>
                    </svg>
                </button>

                <div className="flex fp rd">
                    {currentChat && currentChat.users && currentChat.users.map((e: any) =>
                        <a key={e.id} className="block" href="#0">
                            <img className="rounded-full cr cc st" src={apiUrl + "storage/" +  e.avatar} width="32" height="32" alt="User 01" />
                        </a>
                    )}

                </div>
            </div>

                <div className="flex">
                    <button className="ve ub rounded border border-slate-200 hover--border-slate-300 bv nq">
                        <svg className="oo sl du gq" viewBox="0 0 16 16">
                            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"></path>
                        </svg>
                    </button>
                    <button className="ve ub rounded border border-slate-200 hover--border-slate-300 bv nq">
                        <svg className="oo sl du text-indigo-500" viewBox="0 0 16 16">
                            <path d="M14.3 2.3L5 11.6 1.7 8.3c-.4-.4-1-.4-1.4 0-.4.4-.4 1 0 1.4l4 4c.2.2.4.3.7.3.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0z"></path>
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ChatHeader;