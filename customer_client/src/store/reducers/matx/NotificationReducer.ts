
import {NotificationAction, NotificationActionTypes, PersonalNotification} from "../../../types/matx/notification";

const initialState : PersonalNotification[] = [];

const NotificationReducer = function (state = initialState, action: NotificationAction) {
  switch (action.type) {
    case NotificationActionTypes.GET_NOTIFICATION: {
      return [...action.payload];
    }

    case NotificationActionTypes.DELETE_NOTIFICATION: {
      return [...action.payload];
    }
    case NotificationActionTypes.DELETE_ALL_NOTIFICATION: {
      return [...action.payload];
    }
    case NotificationActionTypes.CREATE_NOTIFICATION: {
      return [...action.payload];
    }
    default: {
      return [...state];
    }
  }
};

export default NotificationReducer;
