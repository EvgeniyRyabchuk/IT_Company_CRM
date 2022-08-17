

export enum NotificationActionTypes {
    GET_NOTIFICATION = 'GET_NOTIFICATION',
    CREATE_NOTIFICATION = 'CREATE_NOTIFICATION',
    DELETE_NOTIFICATION = 'DELETE_NOTIFICATION',
    DELETE_ALL_NOTIFICATION = 'DELETE_ALL_NOTIFICATION',
}

export interface GetNotificationAction {
    type: NotificationActionTypes.GET_NOTIFICATION,
    payload: any[]
}

export interface DeleteNotificationAction {
    type: NotificationActionTypes.DELETE_NOTIFICATION,
    payload: any[]
}

export interface DeleteAllNotificationAction {
    type: NotificationActionTypes.DELETE_ALL_NOTIFICATION,
    payload: any[]
}

export interface CreateNotificationAction {
    type: NotificationActionTypes.CREATE_NOTIFICATION,
    payload: any[]
}

export type NotificationAction = GetNotificationAction | DeleteNotificationAction |
    DeleteAllNotificationAction | CreateNotificationAction;