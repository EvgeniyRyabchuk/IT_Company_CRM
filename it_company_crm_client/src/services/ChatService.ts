import $api from "../http";
import {AuthorizedResponse} from "../types/auth";
import {AxiosResponse} from "axios";
import {Chat} from "../types/chat";
import {User} from "../types/user";


export class ChatService {

    static async getChats(userId: number): Promise<AxiosResponse<Chat[]>> {
        return $api.get<Chat[]>(`/users/${userId}/chats`);
    }

    static async createChat(userId: number, toUserId: number): Promise<AxiosResponse<Chat>> {
        return $api.post<Chat>(`/users/${userId}/chats`, {
            toUserId
        })
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
        return $api.delete<any>(`/users/${userId}/chats/${chatId}`);
    }

    static async sendMessage(userId: number, toUserId: number, chatId: number, message: string): Promise<AxiosResponse<any>> {
        return $api.post<any>(`/users/${userId}/chats/${chatId}/messages`, {
            toUserId,
            message
        });
    }

}