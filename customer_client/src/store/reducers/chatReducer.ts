import {Chat, ChatAction, ChatActionTypes, ChatState} from "../../types/chat";
import {getPageCount} from "../../utils/pages";

export const DEFAULT_PAGE = 1
export const DEFAULT_LIMIT = 10;

const defaultState = {
    chats: [],
    currentChatId: null,
    currentChat: null,

    loadingChats: false,
    loadingMessages: false,
    loadingSendedMessage: false,

    error: null,
    messagePage: DEFAULT_PAGE,
    messageLimit: DEFAULT_LIMIT,

    search: '',

    totalChatPages: 1,
    totalMessagePages: 1
}

const initialState: ChatState = {
    ...defaultState
}


export const chatReducer = (state = initialState, action: ChatAction) : ChatState  => {
    switch(action.type) {

        case ChatActionTypes.ADD_CHAT:
            return { ...state, chats: [action.payload, ...state.chats]}

        case ChatActionTypes.FETCH_CHATS:
            return {...state, loadingChats: true}
        case ChatActionTypes.FETCH_CHATS_SUCCESS:
            return {...state, loadingChats: false, chats: action.payload}
        case ChatActionTypes.FETCH_CHATS_ERROR:
            return {...state, loadingChats: false }

        case ChatActionTypes.FETCH_CHATS_MESSAGES:
            return {...state, loadingMessages: true}
        case ChatActionTypes.FETCH_CHATS_MESSAGES_SUCCESS: {
            const newMessages = action.payload.data;

            const newCurrentChat = state.chats.filter((e: Chat) => e.id === state.currentChatId)[0];
            newCurrentChat.messagePage = action.payload.current_page;

            const newChats = state.chats.map((e: Chat) => {
                if(e.id === newCurrentChat.id) {
                    return newCurrentChat;
                } else {
                    return e;
                }
            });
            // console.log('new', newMessages)
            // if(newMessages.length === 0) return { ...state }
            if (newCurrentChat.messages) {
                newCurrentChat.messages = [...newMessages, ...newCurrentChat.messages]
                    .sort((a, b) => a['created_at'].localeCompare(b['created_at']));
            } else {
                newCurrentChat.messages = [...newMessages]
                    .sort((a, b) => a['created_at'].localeCompare(b['created_at']));
            }


            return {
                ...state,
                loadingMessages: false,
                chats: [...newChats],
                currentChat: {...newCurrentChat},
                messagePage: newCurrentChat.messagePage
            }
        }
        case ChatActionTypes.FETCH_CHATS_MESSAGES_ERROR:
            return {...state, loadingMessages: false, error: action.payload}

        case ChatActionTypes.SET_CURRENT_CHAT: {
            const newCurrentChatId = action.payload;
            const newCurrentChat = state.chats.filter((e: Chat) => e.id === newCurrentChatId)[0];
            const totalMessagePages = getPageCount(newCurrentChat.totalMessages, DEFAULT_LIMIT);

            const newChats = state.chats.map((e: Chat) => {
                if(e.id === newCurrentChat.id) {
                    return newCurrentChat;
                } else {
                    return e;
                }
            });

            console.log('message page SET CURRENT CHAT = ', newCurrentChat.messagePage, totalMessagePages)


            const newPage = newCurrentChat.messagePage ?? 1;

            return {
                ...state,
                currentChatId: newCurrentChatId,
                currentChat: { ...newCurrentChat },
                totalMessagePages: totalMessagePages,
                messagePage: newPage

            }

        }


        case ChatActionTypes.SEND_MESSAGE:
            return { ...state, loadingSendedMessage: true}

        case ChatActionTypes.SEND_MESSAGE_SUCCESS:
            if(state.currentChatId) {
                const newCurrentChat = { ...state.currentChat};
                const newChats = state.chats.map((e: Chat) => {
                    if(e.id === newCurrentChat.id) {
                        e.messages = [ ...e.messages, action.payload];
                        newCurrentChat.messages = e.messages;
                        return e;
                    }
                    return e;
                });
                return <ChatState>{
                    ...state,
                    loadingSendedMessage: false,
                    chats: [...newChats],
                    currentChat: newCurrentChat
                }
            }
            else {
                return { ...state }
            }

        case ChatActionTypes.SEND_MESSAGE_ERROR:
            return { ...state, loadingSendedMessage: false, error: action.payload }


        /*
                // case ChatActionTypes.SET_TOTLAL_CHAT_COUNT:
                //     return { ...state, totalChatPages: action.payload }
                //
                // case ChatActionTypes.SET_TOTLAL_MESSAGE_COUNT:
                //     return { ...state, totalMessagePages: action.payload }
                //

                // case ChatActionTypes.SET_CHAT_PAGE:
                //     return {...state}
                // case ChatActionTypes.SET_CHAT_LIMIT:
                //     return {...state}
                //
        */

        case ChatActionTypes.SET_MESSAGE_PAGE: {
            if(state.currentChat) {
                console.log('set message page')
                const newCurrentChat = {...state.currentChat};
                newCurrentChat.messagePage = action.payload;
                const newChats = state.chats.map((e: Chat) => e.id === newCurrentChat.id ? newCurrentChat : e);
                const newPage = newCurrentChat.messagePage;

                return {...state,
                    currentChat: newCurrentChat,
                    chats: [...newChats],
                    messagePage: newPage,
                }
            }
            return { ...state }
        }

        case ChatActionTypes.SET_MESSAGE_LIMIT:
            return {...state, messageLimit: action.payload}

        case ChatActionTypes.SET_CHAT_SEARCH:
            return {...state, search: action.payload }

        case ChatActionTypes.SET_ERROR: {
            return { ...state, error: action.payload }
        }

        case ChatActionTypes.SET_CHAT_MESSAGES: {
            console.log(123);
            const { chatId, messages} = action.payload;

            const newChat = state.chats.find(c => c.id === chatId);

            if(!newChat) {
                const newChat = messages[0].chat;
                newChat.messages = [...messages];
                const newChats = [...state.chats, newChat];
                return {...state, chats: newChats};
            }


            newChat.messages = [...newChat.messages, ...messages];
            const newChats = state.chats.map(e => e.id === newChat.id ? newChat : e);

            const currentChat = state.currentChat;
            if(state.currentChat && state.currentChatId === newChat.id) {
                state.currentChat.messages = [...newChat.messages];
            }

            return { ...state, currentChat, chats: newChats }
        }

        case ChatActionTypes.SET_CHATS: {

            return { ...state, chats: [...action.payload] }
        }

        case ChatActionTypes.MARK_ALL_CHAT_MESSAGES_AS_SEEN: {
            console.log('mark')
            const newCurrentChat = { ...state.currentChat};
            const newChats = state.chats.map((e: Chat) => {
                if (e.id === action.payload) {
                    for (let message of e.messages)
                        message.isSeen = 1;

                    newCurrentChat.messages = e.messages;
                    e.newCount = 0;
                    newCurrentChat.newCount = 0;
                }
                return e;
            });
            return <ChatState> {
                ...state,
                chats: [...newChats],
                currentChat: newCurrentChat
            }
        }

        case ChatActionTypes.CLEAN:
            return { ...defaultState }

        default:
            return state;
    }
}