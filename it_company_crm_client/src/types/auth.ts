import {Customer, Employee, Role, User} from "./user";
import {Chat} from "./chat";
import {ViewCounter} from "./global";

export type RoleName =
    'customer' |
    'developer' |
    'manager' |
    'admin'


export interface JWTAuthContextInitialState {
    isAuthenticated: boolean,
    isInitialised: boolean,
    user: User | null,
    rolesEntity: RoleEntity[] | null;
    lastChats: Chat[];
    counter: ViewCounter;
}

export interface LoginRequest {
    email: string,
    password: string;
    remember_me: boolean;
}

export interface RegisterRequest {
    email: string,
    username: string
    password: string;
    remember_me: boolean;
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

export interface EmployeeProjectStatic {
    project_count: number;
    active_project_count: number;
    finished_project_count: number;
}



export interface DeveloperRoleEntity
    extends
        Employee,
        EmployeeProjectStatic {
    chats: Chat[];
}



export interface DeveloperRoleEntity
    extends Employee, EmployeeProjectStatic {

}

export interface AdminRoleEntity
    extends Employee, EmployeeProjectStatic {

}

export interface CustomerRoleEntity
    extends Customer {

}

export type UserRoleEntity =
    DeveloperRoleEntity |
    DeveloperRoleEntity |
    AdminRoleEntity;


export interface RoleEntity {
    role: Role;
    entity: UserRoleEntity;
}

export interface ProfileResponse {
    user: User,
    roleEntity: RoleEntity[] | null | undefined;
    lastChats: Chat[] | null | undefined;
    counter: ViewCounter;
}

export enum SettingTabConstants {
    ACCOUNT,
    PASSWORD,
    PREFERENCES,
    VERIFICATION,
    SOCIAL,
    DELETE

}