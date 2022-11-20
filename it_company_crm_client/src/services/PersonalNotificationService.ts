
import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthorizedResponse, LoginRequest, RegisterRequest} from "../types/auth";
import {User} from "../types/user";
import {PersonalNotification} from "../types/matx/notification";

export default class PersonalNotificationService {
    static async getNotifications(userId: number):
        Promise<AxiosResponse<PersonalNotification[]>> {
        return $api.get<PersonalNotification[]>(`/users/${userId}/notifications`);
    }

    static async delete(userId: number, notificationId: number): Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/users/${userId}/notifications/${notificationId}`);
    }

    static async deleteAll(userId: number): Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/users/${userId}/notifications/all`);
    }


}