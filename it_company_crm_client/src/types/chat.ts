import {Customer, Employee, User} from "./user";

export interface Chat {
    id: number;
    isPending: boolean;
    type: string;
    users: User[];
    messages: ChatMessage[];
    newCount: number;

    totalMessages: number;
    messagePage: number;

    created_at: string;
    updated_at: string;
}
export interface ChatMessage {
    id: number;
    from_user: User;
    to_user: User;
    content: ChatMessageContent;
    chat: Chat;
    isSeen: boolean | number;

    created_at: string;
    updated_at: string;
}
export interface ChatMessageContent {
    id: number;
    message?: string;
}


export interface ChatState {
    chats: Chat[];
    currentChatId: number | null;
    currentChat: Chat | null;
    loadingChats: boolean;
    loadingMessages: boolean;
    loadingSendedMessage: boolean;

    error: null | string;
    messageLimit: number;
    messagePage: number;

    search: string

    totalChatPages: number,
    totalMessagePages: number
}

export enum ChatActionTypes {
    FETCH_CHATS = 'FETCH_CHATS',
    FETCH_CHATS_SUCCESS = 'FETCH_CHATS_SUCCESS',
    FETCH_CHATS_ERROR = 'FETCH_CHATS_ERROR',

    SET_CHAT_PAGE = 'SET_CHAT_PAGE',
    SET_CHAT_LIMIT = 'SET_CHAT_LIMIT',

    SET_MESSAGE_PAGE = 'SET_CHAT_PAGE',
    SET_MESSAGE_LIMIT = 'SET_CHAT_LIMIT',

    FETCH_CHATS_MESSAGES = 'FETCH_CHATS_MESSAGES',
    FETCH_CHATS_MESSAGES_SUCCESS = 'FETCH_CHATS_MESSAGES_SUCCESS',
    FETCH_CHATS_MESSAGES_ERROR = 'FETCH_CHATS_MESSAGES_ERROR',

    SET_CURRENT_CHAT = 'SET_CURRENT_CHAT' ,

    SEND_MESSAGE = 'SEND_MESSAGE',
    SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS',
    SEND_MESSAGE_ERROR = 'SEND_MESSAGE_ERROR',

    SET_TOTLAL_MESSAGE_COUNT = 'SET_TOTLAL_MESSAGE_COUNT',
    SET_TOTLAL_CHAT_COUNT = 'SET_TOTLAL_CHAT_COUNT',

    SET_CHAT_SEARCH = "SET_CHAT_SEARCH",
    SET_ERROR = "SET_ERROR",
    MARK_ALL_CHAT_MESSAGES_AS_SEEN = 'MARK_ALL_CHAT_MESSAGES_AS_SEEN',

    ADD_CHAT = 'ADD_CHAT'
}

interface FetchChatsAction {
    type: ChatActionTypes.FETCH_CHATS;
}
interface FetchChatsSuccessAction {
    type: ChatActionTypes.FETCH_CHATS_SUCCESS;
    payload: any[]
}
interface FetchChatsErrorAction {
    type: ChatActionTypes.FETCH_CHATS_ERROR;
    payload: string;
}

interface ChatSetPageAction {
    type: ChatActionTypes.SET_CHAT_PAGE;
    payload: number;
}
interface ChatSetLimitAction {
    type: ChatActionTypes.SET_CHAT_LIMIT;
    payload: number;
}

interface SetMessagePageAction {
    type: ChatActionTypes.SET_MESSAGE_PAGE;
    payload: number;
}
interface SetMessageLimitAction {
    type: ChatActionTypes.SET_MESSAGE_LIMIT;
    payload: number;
}

interface ChatMessagesFetchAction {
    type: ChatActionTypes.FETCH_CHATS_MESSAGES;
}
interface ChatMessagesSuccessFetchAction {
    type: ChatActionTypes.FETCH_CHATS_MESSAGES_SUCCESS;
    payload: any;
}
interface ChatMessagesErrorFetchAction {
    type: ChatActionTypes.FETCH_CHATS_MESSAGES_ERROR;
    payload: any;
}

interface CurrentChatSetAction {
    type: ChatActionTypes.SET_CURRENT_CHAT;
    payload: number;
}

interface SendMessagesAction {
    type: ChatActionTypes.SEND_MESSAGE;
}
interface SendMessagesSuccessAction {
    type: ChatActionTypes.SEND_MESSAGE_SUCCESS;
    payload: ChatMessage
}
interface SendMessagesErrorAction {
    type: ChatActionTypes.SEND_MESSAGE_ERROR;
    payload: any;
}

interface SetTotalChatCountAction {
    type: ChatActionTypes.SET_TOTLAL_CHAT_COUNT;
    payload: number;
}
interface SetTotalMessageCountAction {
    type: ChatActionTypes.SET_TOTLAL_MESSAGE_COUNT;
    payload: number;
}

interface SetChatSearchStringAction {
    type: ChatActionTypes.SET_CHAT_SEARCH;
    payload: string;
}

interface SetErrorAction {
    type: ChatActionTypes.SET_ERROR;
    payload: string;
}

interface MarkAllMessagesAsSeenAction {
    type: ChatActionTypes.MARK_ALL_CHAT_MESSAGES_AS_SEEN;
    payload: number;
}

interface AddChatAction {
    type: ChatActionTypes.ADD_CHAT,
    payload: Chat;
}

export type ChatAction =
    FetchChatsAction | FetchChatsSuccessAction | FetchChatsErrorAction |
    ChatSetPageAction | ChatSetLimitAction |
    ChatMessagesFetchAction | ChatMessagesSuccessFetchAction | ChatMessagesErrorFetchAction |
    CurrentChatSetAction |
    SendMessagesAction | SendMessagesSuccessAction | SendMessagesErrorAction |
    SetTotalChatCountAction | SetTotalMessageCountAction |
    SetMessagePageAction | SetMessageLimitAction |
    SetChatSearchStringAction |
    SetErrorAction |
    MarkAllMessagesAsSeenAction |
    AddChatAction





