import {toast} from "react-toastify";


export enum SimpleAlertMessage {
    LOGGED_IN = 'Welcome to admin panel'
}

export enum PrimarySuccessAlertMessage {
    FETCH_CUSTOMERS = 'Success fetch customer',

}







export enum PrimaryErrorAlertMessage {
    FETCH_CUSTOMERS = 'Error fetch customer',

}
export interface ErrorAlertMessage {
    primary: PrimaryErrorAlertMessage,
    secondary?: string
}

export const showAxiosErrorAlert = (message: ErrorAlertMessage, error: any) => {
    let submessage = '';
    if(!message.secondary) {
        if(error.response.data.alertMessage) {
            submessage = error.response.data.alertMessage
        }
    }
    toast.error(`${message.primary} ${submessage}`,
        { autoClose: 2000})
}