import React from 'react';
// user-40-12.jpg
import userIcon from '../../../assets/images/chat/user-40-12.jpg';


type CharMessageProbs = {
    name: string;
    content: string
}

const CharMessage = ({name, content} : CharMessageProbs) => {
    return (
        <div className="flex aj ri ww chat-message">
            <img className="rounded-full mr-4" src={userIcon} width="40" height="40" alt="User 02" />
                <div>
                    <div className="text-sm ho ye dk lw ct border cp shadow-md rt">
                        Hey Dominik Lamakani 👋<br/>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est 🙌
                    </div>
                    <div className="flex items-center fe">
                        <div className="go text-slate-500 gp">2:40 PM</div>
                        <svg className="ox h-3 ub du yt" viewBox="0 0 20 12">
                            <path
                                d="M10.402 6.988l1.586 1.586L18.28 2.28a1 1 0 011.414 1.414l-7 7a1 1 0 01-1.414 0L8.988 8.402l-2.293 2.293a1 1 0 01-1.414 0l-3-3A1 1 0 013.695 6.28l2.293 2.293L12.28 2.28a1 1 0 011.414 1.414l-3.293 3.293z"></path>
                        </svg>
                    </div>
                </div>
        </div>
    );
};

export default CharMessage;