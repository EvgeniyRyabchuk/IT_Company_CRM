import React from 'react';
import ChatSidebarHeader from "./ChatSidebarHeader";
import ChatSidebarBody from "./ChatSidebarBody";


const ChatSidebar = ({setUserModalOpen} : any) => {

    return (
        <div
            className='chat-sitebar id="messages-sidebar" g t_ k ou zt qo qf ql ih za wn wr wu translate-x-0'>
                <div className="b tm bg-white lc ll l ub ca border-slate-200 zo tny sq">
                    <div>
                        {/*<ChatSidebarHeader*/}
                        {/*    setUserModalOpen={setUserModalOpen}*/}
                        {/*/>*/}
                        <ChatSidebarBody />
                    </div>
                </div>
            </div>
    );
};

export default ChatSidebar;