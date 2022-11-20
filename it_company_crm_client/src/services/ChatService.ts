import $api from "../http";
import {AuthorizedResponse} from "../types/auth";
import {AxiosResponse} from "axios";
import {Chat, GetNewChatData} from "../types/chat";
import {Employee, User} from "../types/user";
import {PrimaryErrorAlert, PrimarySuccessAlert, showAxiosErrorAlert, showAxiosSuccessAlert} from "../utils/alert";


export class ChatService {

    static async getChats(userId: number): Promise<AxiosResponse<Chat[]>> {
        return $api.get<Chat[]>(`/users/${userId}/chats`);
    }

    static async createChat(userId: number, toUserId: number): Promise<AxiosResponse<Chat>> {
        try {
            const response = $api.post<Chat>(`/users/${userId}/chats`, {
                toUserId
            });
            showAxiosSuccessAlert(PrimarySuccessAlert.CREATE_CHAT);
            return response;
        } catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.CREATE_CHAT}, err);
            throw err;
        }
    }

    static async getUsersWithNonExistChat(userId: number): Promise<AxiosResponse<User[]>> {
        return $api.get<User[]>(`users?non-existent-chat-with-user-id=${userId}`);
    }


    static async getChatMessages(
        userId: number, chatId: number,
        limit: number, page: number): Promise<AxiosResponse<any>> {

        const query = `?limit=${limit}&page=${page}`;
    return $api.get<any>(`/users/${userId}/chats/${chatId}/messages${query}`);
    }

    static async markMsgAsSeen(userId: number, chatId: number): Promise<AxiosResponse<AuthorizedResponse>> {
        return $api.put<AuthorizedResponse>(`/users/${userId}/chats/${chatId}/seen`);
    }

    static async deleteChat(userId: number, chatId: number): Promise<AxiosResponse<any>> {
        try {
            const response = $api.delete<any>(`/users/${userId}/chats/${chatId}`);
            showAxiosSuccessAlert(PrimarySuccessAlert.DELETE_CHAT);
            return response;
        } catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.DELETE_CHAT}, err);
            throw err;
        }

    }

    static async sendMessage(userId: number, toUserId: number, chatId: number, message: string): Promise<AxiosResponse<any>> {
        return $api.post<any>(`/users/${userId}/chats/${chatId}/messages`, {
            toUserId,
            message
        });
    }

    static async getNew(userId: number, target: 'messages' | 'chats'):
        Promise<AxiosResponse<GetNewChatData[]>> {

        return $api.get<GetNewChatData[]>(
            `/users/${userId}/chats/new/${target}`);

    }


}