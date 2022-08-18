
import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthorizedResponse, LoginRequest, RegisterRequest} from "../types/auth";
import {User} from "../types/user";

export default class AuthService {
    static async login({email, password, remeber_me = false} : LoginRequest):
        Promise<AxiosResponse<AuthorizedResponse>> {

        return $api.post<AuthorizedResponse>('/auth/login', {
            email, password, remeber_me
        });
    }

    static async register({email, username, password, remeber_me = false} : RegisterRequest):
        Promise<AxiosResponse<AuthorizedResponse>> {

        return $api.post<AuthorizedResponse>('/auth/register', {
                email, password, name: username, remeber_me
        });
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout')
    }

    static async profile(): Promise<AxiosResponse<User>> {
        return $api.get<User>('/auth/profile');
    }

}