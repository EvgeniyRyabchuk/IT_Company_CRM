import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import {chatReducer} from "./chatReducer";
import NotificationReducer from "./matx/NotificationReducer";
import NavigationReducer from "./matx/NavigationReducer";
import EcommerceReducer from "./matx/EcommerceReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    chat: chatReducer,

    notifications: NotificationReducer,
    // navigations: NavigationReducer,
    ecommerce: EcommerceReducer,
})

// что бы useSelector был типизированным 
export type RootState = ReturnType<typeof rootReducer>;




