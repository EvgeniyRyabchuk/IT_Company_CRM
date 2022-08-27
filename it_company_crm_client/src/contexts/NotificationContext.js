import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import PersonalNotificationService from "../services/PersonalNotificationService";

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_NOTIFICATIONS': {
            return {
                ...state,
                notifications: action.payload,
            }
        }
        case 'DELETE_NOTIFICATION': {
            return {
                ...state,
                notifications: action.payload,
            }
        }
        case 'CLEAR_NOTIFICATIONS': {
            return {
                ...state,
                notifications: action.payload,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const NotificationContext = createContext({
    notifications: [],
    deleteNotification: () => {},
    clearNotifications: () => {},
    getNotifications: () => {},
    createNotification: () => {},
})

export const NotificationProvider = ({ settings, children }) => {
    const [state, dispatch] = useReducer(reducer, [])

    const deleteNotification = async (userId, notificationId) => {
        try {
            const response = await PersonalNotificationService.delete(userId, notificationId);

            dispatch({
                type: 'DELETE_NOTIFICATION',
                payload: response.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const clearNotifications = async (userId) => {
        try {
            const response = await PersonalNotificationService.deleteAll(userId);
            dispatch({
                type: 'CLEAR_NOTIFICATIONS',
                payload: response.data,
            })
        } catch (e) {
            console.error(e)
        }
    }

    const getNotifications = async (userId) => {
        try {
            // const res = await axiosUtills.js.get('/api/notification')
            const response = await PersonalNotificationService.getNotifications(userId);
            dispatch({
                type: 'LOAD_NOTIFICATIONS',
                payload: response.data,
            })
        } catch (e) {
            console.error(e)
        }
    }
    // const createNotification = async (notification) => {
    //     try {
    //         const res = await axiosUtills.js.post('/api/notification/add', {
    //             notification,
    //         })
    //         dispatch({
    //             type: 'CREATE_NOTIFICATION',
    //             payload: res.data,
    //         })
    //     } catch (e) {
    //         console.error(e)
    //     }
    // }



    return (
        <NotificationContext.Provider
            value={{
                notifications: state.notifications,
                deleteNotification,
                clearNotifications,
                getNotifications,
                // createNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContext
