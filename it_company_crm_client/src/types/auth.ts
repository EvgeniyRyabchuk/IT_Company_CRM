import {User} from "./user";


export interface JWTAuthContextInitialState {
    isAuthenticated: boolean,
    isInitialised: boolean,
    user: User | null,
}

export interface LoginRequest {
    email: string,
    password: string;
    remeber_me: boolean;
}

export interface RegisterRequest {
    email: string,
    username: string
    password: string;
    remeber_me: boolean;
}

export interface AuthorizedResponse {
    status: string;
    "authorisation": {
        "token": string;
        "type": string,
        "refreshToken": string;
    }
    user: User;
}


export interface AuthRoleTypes {

}
