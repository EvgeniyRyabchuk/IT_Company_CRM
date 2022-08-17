import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import {chatReducer} from "./chatReducer";
import {kanbanReducer} from "./kanbanReducer";
import NotificationReducer from "./NotificationReducer";
import NavigationReducer from "./NavigationReducer";
import EcommerceReducer from "./EcommerceReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,
    kanban: kanbanReducer,

    notifications: NotificationReducer,
    // navigations: NavigationReducer,
    ecommerce: EcommerceReducer,
})

// что бы useSelector был типизированным 
export type RootState = ReturnType<typeof rootReducer>;




