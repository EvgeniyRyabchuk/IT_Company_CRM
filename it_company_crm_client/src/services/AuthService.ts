
import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthorizedResponse, LoginRequest, ProfileResponse, RegisterRequest, RoleEntity} from "../types/auth";
import {Role, User} from "../types/user";

export default class AuthService {
    static async login({email, password, remember_me = false} : LoginRequest):
        Promise<AxiosResponse<AuthorizedResponse>> {
        console.log(remember_me)
        return $api.post<AuthorizedResponse>('/auth/login', {
            email, password, remember_me
        });
    }

    static async register({email, username, password, remember_me = false} : RegisterRequest):
        Promise<AxiosResponse<AuthorizedResponse>> {

        return $api.post<AuthorizedResponse>('/auth/register', {
                email, password, name: username, remember_me
        });
    }

    static async logout(): Promise<void> {
        return $api.post('/auth/logout')
    }

    static async profile(isDetail: boolean): Promise<AxiosResponse<ProfileResponse>> {
        if(isDetail) {
            return $api.get<ProfileResponse>('/auth/profile?detail=true');
        }
        else {
            return $api.get<ProfileResponse>('/auth/profile');
        }
    }

    static async getRoles(): Promise<AxiosResponse<Role[]>> {
        return $api.get<Role[]>('/auth/roles');
    }

    static async sendEmailVerification(): Promise<AxiosResponse<string>> {
        return $api.post<string>('/email/verification-notification');
    }

    static async emailVerify(token: string): Promise<AxiosResponse<User>> {
        return $api.post<User>('/email/verify', { token });
    }


    static async sendPasswordReset(email: string): Promise<AxiosResponse<User>> {
        return $api.post<User>('/send-password-reset-email', { email} );
    }

    static async passwordReset(userId: number, token: string, password: string): Promise<AxiosResponse<string>> {
        return $api.post<string>(`/password-reset/${userId}/${token}`, { password });
    }


}