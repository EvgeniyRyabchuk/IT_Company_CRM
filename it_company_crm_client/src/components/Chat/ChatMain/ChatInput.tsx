import React, {useState} from 'react';
import {userId} from "../ChatComponent";
import {useTypeSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";

const ChatInput = () => {

    const { currentChat } = useTypeSelector(state => state.chat)
    const { sendMessage } = useAction();
    const [inputContent, setInputContent] = useState<string>('');

    const onSend = () => {
        if(currentChat && inputContent.length > 0) {
            const withUser = currentChat.users.filter((e: any) => e.id !== userId)[0];
            sendMessage(userId, withUser.id, currentChat.id, inputContent);
            setInputContent('');
        }
    }



    const send = async (content: string) => {
        if(currentChat) {
            const toUserId = currentChat.users.filter((e: any) => e.id != userId)[0].id;

            const data = await fetch(`http://127.0.0.1:8000/api/users/${userId}/chats/messages`,
                { headers: {
                        "Content-Type": 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        toUserId,
                        chat_id: currentChat.id,
                        message: inputContent
                    })
                });
            return await data.json();
        }
    }

    const handleKeyPress = (event: any) => {
        if(event.key === 'Enter') {
            onSend();
        }
    }

    return (

        <div className="b te chat-input">
            <div className="flex items-center fe bg-white co border-slate-200 vs jj tei sa">

                <button className="ub gq xv ra">
                    <span className="d">Add</span>
                    <svg className="oi so du" viewBox="0 0 24 24">
                        <path
                            d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12C23.98 5.38 18.62.02 12 0zm6 13h-5v5h-2v-5H6v-2h5V6h2v5h5v2z"></path>
                    </svg>
                </button>

                <form className="uw flex" onSubmit={(e: any) => e.preventDefault() }>
                    <div className="uw ra">
                        <label htmlFor="message-input" className="d">Type a message</label>
                        <input
                            id="message-input"
                            className="s ou hi cp ki xq"
                            type="text"
                            placeholder="Aa"
                            onChange={(e: any) => setInputContent(e.target.value)}
                            value={inputContent}
                            onKeyPress={handleKeyPress}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn ho xi ye lm"
                        onClick={onSend}
                    >
                        Send -&gt;</button>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;