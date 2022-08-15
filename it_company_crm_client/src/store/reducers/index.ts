import { combineReducers } from "redux";
import { todoReducer } from "./todoReducer";
import { userReducer } from "./userReducer";
import {chatReducer} from "./chatReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    todo: todoReducer,
    chat: chatReducer,
})

// что бы useSelector был типизированным 
export type RootState = ReturnType<typeof rootReducer>;




