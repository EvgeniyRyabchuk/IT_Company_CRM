import {Dispatch} from "react";
import {Chat, ChatAction, ChatActionTypes, ChatMessage} from "../../types/chat";
import {ChatService} from "../../services/ChatService";


export const createChat = (userId: number, toUserId: number) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            const responce = await ChatService.createChat(userId, toUserId);
            dispatch({type: ChatActionTypes.ADD_CHAT, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: ChatActionTypes.FETCH_CHATS_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}

export const fetchChats = (userId: number, openedChatId?: number) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            dispatch({type: ChatActionTypes.FETCH_CHATS})
            const responce = await ChatService.getChats(userId);
            dispatch({type: ChatActionTypes.FETCH_CHATS_SUCCESS, payload: responce.data});

            return responce.data;
        }
        catch(err: any) {
            dispatch({type: ChatActionTypes.FETCH_CHATS_ERROR,
                payload: 'Произошла ошибка: ' + err.message});
        }
    }
}


export const fetchMessageByChat = (
    userId: number,
    currentChatId: number,
    limit: number,
    page: number,
    markAllAsSeen: boolean = false
) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        console.log('go to')
        try {
            dispatch({type: ChatActionTypes.FETCH_CHATS_MESSAGES});
            const responce = await ChatService.getChatMessages(userId, currentChatId, limit, page);
            dispatch({type: ChatActionTypes.FETCH_CHATS_MESSAGES_SUCCESS, payload: responce.data});

            if(markAllAsSeen === true) {
                await ChatService.markMsgAsSeen(userId, currentChatId);
                dispatch({type: ChatActionTypes.MARK_ALL_CHAT_MESSAGES_AS_SEEN, payload: currentChatId});
            }

            // dispatch({type: ChatActionTypes.SET_CHAT_PAGE, payload: limit})
            // dispatch({type: ChatActionTypes.SET_CHAT_LIMIT, payload: page})
            // dispatch({type: ChatActionTypes.SET_TOTLAL_MESSAGE_COUNT, payload: responce.data.total})
        }
        catch(err: any) {
            dispatch({type: ChatActionTypes.FETCH_CHATS_MESSAGES_ERROR,
                payload: 'Произошла ошибка - ' + err.message});
        }
    }
}

export const markMessageAsChecked = (userId: number, chat: Chat) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            const responce = await ChatService.markMsgAsSeen(userId, chat.id);
            dispatch({type: ChatActionTypes.MARK_ALL_CHAT_MESSAGES_AS_SEEN, payload: chat.id});
        }
        catch(err: any) {
            dispatch({type: ChatActionTypes.SET_ERROR,
                payload: 'Произошла ошибка - ' + err.message});
        }
    }
}

export const sendMessage = (userId: number, toUserId: number, chatId: number, message: string) => {
    return async (dispatch: Dispatch<ChatAction>) => {
        try {
            dispatch({type: ChatActionTypes.SEND_MESSAGE});
            const responce = await ChatService.sendMessage(userId, toUserId, chatId, message);
            dispatch({type: ChatActionTypes.SEND_MESSAGE_SUCCESS, payload: responce.data});
        }
        catch(err: any) {
            dispatch({type: ChatActionTypes.SEND_MESSAGE_ERROR,
                payload: 'Произошла ошибка - ' + err.message});
        }
    }
}

export const setCurrentChatId = (chatId: number) => {
    return { type: ChatActionTypes.SET_CURRENT_CHAT, payload: chatId };
}

export const setChatMessages = (chatId: number, messages: ChatMessage[]) => {
    return { type: ChatActionTypes.SET_CHAT_MESSAGES, payload: {
            chatId,
            messages
        }};
}

export const setChats = (chats: Chat[]) => {
    return { type: ChatActionTypes.SET_CHATS, payload: chats};
}


export const setMessagePage = (page: number): ChatAction => {
    console.log('setMessagePage action');
    return { type: ChatActionTypes.SET_MESSAGE_PAGE, payload: page };
}
export const setMessageLimit = (limit: number): ChatAction => {
    return { type: ChatActionTypes.SET_MESSAGE_LIMIT, payload: limit };
}

export const setChatSearchString = (search: string) => {
    return { type: ChatActionTypes.SET_CHAT_SEARCH, payload: search };
}

export const clean = () => {
    return { type: ChatActionTypes.CLEAN };
}

// export const setChatPage = (page: number): ChatAction => {
//     return { type: ChatActionTypes.SET_CHAT_PAGE, payload: page };
// }
//
// export const setChatLimit = (limit: number): ChatAction => {
//     return { type: ChatActionTypes.SET_CHAT_LIMIT, payload: limit };
// }

//
// export const setTotalChatCount = (count: number) => {
//     return { type: ChatActionTypes.SET_TOTLAL_CHAT_COUNT, payload: count };
// }
// export const setTotalMessageCount = (count: number) => {
//     return { type: ChatActionTypes.SET_TOTLAL_MESSAGE_COUNT, payload: count };
// }

