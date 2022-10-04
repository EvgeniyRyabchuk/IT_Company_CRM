
import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthorizedResponse, LoginRequest, ProfileResponse, RegisterRequest, RoleEntity} from "../types/auth";
import {Role, User} from "../types/user";
import {toast} from "react-toastify";
import {
    PrimaryErrorAlert,
    PrimarySuccessAlert,
    PromiseAlert,
    showAxiosErrorAlert,
    showAxiosSuccessAlert
} from "../utils/alert";


export default class AuthService {
    static async login({email, password, remember_me = false} : LoginRequest):
        Promise<AxiosResponse<AuthorizedResponse>> {

        const promise = $api.post<AuthorizedResponse>('/auth/login', {
            email, password, remember_me
        });

        toast.promise(promise,
            {
                pending: PromiseAlert.FETCH_LOGIN_PENDING,
                success: PromiseAlert.FETCH_LOGIN_SUCCESS,
                error: PromiseAlert.FETCH_LOGIN_ERROR
            }
        )
        return promise;
    }

    static async register({email, username, password, remember_me = false}: RegisterRequest):
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
        try {
            const response = await $api.post<string>('/email/verification-notification');
            showAxiosSuccessAlert(PrimarySuccessAlert.MAIL_SENT_SUCCESS);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.MAIL_SENT_SUCCESS}, err);
            throw err;
        }
    }

    static async emailVerify(token: string): Promise<AxiosResponse<User>> {
        return $api.post<User>('/email/verify', { token });
    }


    static async sendPasswordReset(email: string):
        Promise<AxiosResponse<User>> {
        try {
            const response = await $api.post<User>('/send-password-reset-email', { email} );
            showAxiosSuccessAlert(PrimarySuccessAlert.MAIL_SENT_SUCCESS);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.MAIL_SENT_SUCCESS}, err);
            throw err;
        }
    }

    static async passwordReset(userId: number, token: string, password: string):
        Promise<AxiosResponse<string>> {
        return $api.post<string>(`/password-reset/${userId}/${token}`,
            { password });
    }


    static async deleteAccount(userId: number): Promise<AxiosResponse<string>>
    {
        return $api.delete<string>(`/auth/users/${userId}`);
    }



}