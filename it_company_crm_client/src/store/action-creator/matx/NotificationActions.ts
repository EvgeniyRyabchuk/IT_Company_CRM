import axios from 'axios';
import {Dispatch} from "react";
import {ChatAction} from "../../../types/chat";
import {NotificationAction, NotificationActionTypes} from "../../../types/matx/notification";


export const getNotification = () => (dispatch: Dispatch<NotificationAction>) => {
  axios.get('/api/notification').then((res) => {
    dispatch({
      type: NotificationActionTypes.GET_NOTIFICATION,
      payload: res.data,
    });
  });
};

export const deleteNotification = (id: any) => (dispatch: Dispatch<NotificationAction>) => {
  axios.post('/api/notification/delete', { id }).then((res) => {
    dispatch({
      type: NotificationActionTypes.DELETE_NOTIFICATION,
      payload: res.data,
    });
  });
};

export const deleteAllNotification = () => (dispatch: Dispatch<NotificationAction>) => {
  axios.post('/api/notification/delete-all').then((res) => {
    dispatch({
      type: NotificationActionTypes.DELETE_ALL_NOTIFICATION,
      payload: res.data,
    });
  });
};

export const createNotification = (notification: any) => (dispatch: any) => {
  axios.post('/api/notification/add', { notification }).then((res) => {
    dispatch({
      type: NotificationActionTypes.CREATE_NOTIFICATION,
      payload: res.data,
    });
  });
};
