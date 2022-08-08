import React from 'react';

const ChatInput = () => {
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

                <form className="uw flex">
                    <div className="uw ra">
                        <label htmlFor="message-input" className="d">Type a message</label>
                        <input id="message-input" className="s ou hi cp ki xq" type="text" placeholder="Aa" />
                    </div>
                    <button type="submit" className="btn ho xi ye lm">Send -&gt;</button>
                </form>
            </div>
        </div>
    );
};

export default ChatInput;