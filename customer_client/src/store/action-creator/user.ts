import axios from "axios"
import { Dispatch } from "react"
import { UserAction, UserActionTypes } from "../../types/user"


export const fetchUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USERS})
            const responce = await axios.get('https://jsonplaceholder.typicode.com/users'); 
            setTimeout(() => { 
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: responce.data}); 
            }, 500)  ;
        }
        catch(err: any) {
            dispatch({type: UserActionTypes.FETCH_USERS_ERROR, 
                payload: 'Произошла ошибка при загрузки пользователя - ' + err.message}); 
        }
    }
}