import React from 'react';

import ChatSidebarDirectList from "./ChatDirect/ChatSidebarDirectList";

const ChatSidebarBody = ({
            chats,
            onSearchInputChange,
            onChatChange,
            currentChat
} : any) => {

    //TODO: change
    const userId = 1;

    const filteredChatByRole = (roleNames: any[]) : any => {
        return chats.filter((chat: any) => {
            const withUser = chat.users.filter((e: any) => e.id !== userId)[0];
            const withUserRoles = withUser.roles;
            let isCustomer = false;
            for (let role of withUserRoles) {
                if(roleNames.includes(role.name))
                    isCustomer = true;
            }
            return isCustomer;
        })
    }



    return (
        <div className='vc vu'>

            <form className="y">
                <label htmlFor="msg-search" className="d">Search</label>
                <input
                    id="msg-search"
                    className="s ou me xq"
                    type="search"
                    placeholder="Search…"
                    onInput={onSearchInputChange}
                />
                    <button className="g w j kk" type="submit" aria-label="Search">
                        <svg className="oo sl ub du gq kj ml-3 mr-2" viewBox="0 0 16 16"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"></path>
                            <path
                                d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"></path>
                        </svg>
                    </button>
            </form>

            {/* Chat with only customer */}
            <ChatSidebarDirectList
                currentChat={currentChat}
                chats={filteredChatByRole(['customer'])}
                title='Chat with Customers'
                open={true}
                onChatChange={onChatChange}
            />
            {/* Chat with only employee */}
            <ChatSidebarDirectList
                currentChat={currentChat}
                chats={filteredChatByRole(['developer', 'manager', 'admin'])}
                title='Chat with Employees'
                open={true}
                onChatChange={onChatChange}

            />

            <div className="io">
                <div className="go gh gq gv ro">Channels</div>
                <ul className="rh">
                    <li className="nv">
                        <button className="flex items-center fe ou dx rounded">
                            <div className="flex items-center">
                                <div className="ld">
                                    <span className="text-sm gp text-slate-800">#New Leads</span>
                                </div>
                            </div>
                            <div className="flex items-center nq">
                                <div className="w-2 h-2 pi rounded-full"></div>
                            </div>
                        </button>
                    </li>
                    <li className="nv">
                        <button className="flex items-center fe ou dx rounded">
                        <div className="flex items-center ld">
                            <div className="ld">
                                <span className="text-sm gp text-slate-800">#Development Team</span>
                            </div>
                        </div>
                    </button>
                </li>
                </ul>
            </div>

        </div>
    );
};

export default ChatSidebarBody;