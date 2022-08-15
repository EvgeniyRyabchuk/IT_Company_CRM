import {User} from "./user";


export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: User;
}