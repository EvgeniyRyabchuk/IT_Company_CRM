

export interface NotificationIcon {
    name: string;
    color: string;
}

export interface PersonalNotification {
    id: number;
    heading: string,
    icon: NotificationIcon;
    timestamp: string;
    title: string;
    subtitle: string;
    path: string;
    user_id: number;
}

export enum NotificationActionTypes {
    GET_NOTIFICATION = 'GET_NOTIFICATION',
    CREATE_NOTIFICATION = 'CREATE_NOTIFICATION',
    DELETE_NOTIFICATION = 'DELETE_NOTIFICATION',
    DELETE_ALL_NOTIFICATION = 'DELETE_ALL_NOTIFICATION',
}

export interface GetNotificationAction {
    type: NotificationActionTypes.GET_NOTIFICATION,
    payload: Notification[]
}

export interface DeleteNotificationAction {
    type: NotificationActionTypes.DELETE_NOTIFICATION,
    payload: Notification[]
}

export interface DeleteAllNotificationAction {
    type: NotificationActionTypes.DELETE_ALL_NOTIFICATION,
    payload: Notification[]
}

export interface CreateNotificationAction {
    type: NotificationActionTypes.CREATE_NOTIFICATION,
    payload: Notification[]
}

export type NotificationAction = GetNotificationAction | DeleteNotificationAction |
    DeleteAllNotificationAction | CreateNotificationAction;