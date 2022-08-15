import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import {chatReducer} from "./chatReducer";
import {kanbanReducer} from "./kanbanReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    kanban: kanbanReducer
})

// что бы useSelector был типизированным 
export type RootState = ReturnType<typeof rootReducer>;




