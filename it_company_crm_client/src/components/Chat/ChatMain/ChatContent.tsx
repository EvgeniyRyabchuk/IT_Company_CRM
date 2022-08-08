import React, {useEffect, useRef, useState} from 'react';
import CharMessage from "./CharMessage";

const ChatContent = () => {

    const [messages, setMessages] = useState([
        { name: '123', content: 'sdgfsdfg'}
    ]);

    const contentDiv = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        contentDiv.current?.scrollIntoView({behavior: 'smooth'});
    }

    const add = () => {
        setMessages([...messages, { name: '123', content: 'sdgfsdfg'}]);
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages])




    return (
        <div
            onClick={add}
            className='chat-Content uw vs jj tei vh' style={{maxHeight: '800px', overflowY: 'auto'}}>

            {
                messages.map(e =>
                   <CharMessage name={e.name} content={e.content} />
                )
            }


            {/*<CharMessage />*/}
            {/*<CharMessage />*/}
            {/*<CharMessage />*/}
            {/*<CharMessage />*/}
            {/*<CharMessage />*/}
            {/*<CharMessage />*/}
            {/*<CharMessage />*/}
            {/*<CharMessage />*/}
            {/*<CharMessage />*/}
            {/*<CharMessage />*/}
            {/*<CharMessage />*/}

            <div ref={contentDiv}></div>
        </div>
    );
};

export default ChatContent;