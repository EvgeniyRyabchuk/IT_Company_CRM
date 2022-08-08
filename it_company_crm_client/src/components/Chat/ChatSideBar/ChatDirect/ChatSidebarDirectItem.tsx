import React from 'react';

import userIcon from '../../../../assets/images/chat/user-32-01.jpg'

const ChatSidebarDirectItem = () => {
    return (
        <li className="nv">
            <button className="flex items-center fe ou dx rounded hl">
                <div className="flex items-center ld">
                    <img className="os sf rounded-full mr-2" src={userIcon} width="32" height="32" alt="User 01" />
                        <div className="ld">
                            <span className="text-sm gp text-slate-800">Dominik Lamakani</span>
                        </div>
                </div>
                <div className="flex items-center nq">
                    <div className="go inline-flex gp pi ye rounded-full gn gw vi">2</div>
                </div>
            </button>
        </li>
    );
};

export default ChatSidebarDirectItem;