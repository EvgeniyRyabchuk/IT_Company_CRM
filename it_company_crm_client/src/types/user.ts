

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    full_name: string;
    email: string;
    avatar: string;
    phones: Phone[];
    roles: Role[];
    created_at: string;
    updated_at: string;
    email_verified_at: string;
}

export interface Skill {
    id?: number;
    name: string;
}
export interface Role {
    id: number;
    name: string;
}
export interface Phone {
    id: number;
    code_1: string;
    code_2: string;
    number: string;
    phone_number: string;
}
export interface Level {
    id: number;
    name: string;
}
export interface Position {
    id: number;
    name: string;

}

export interface Employee {
    id: number;
    user: User;
    level: Level;
    position: Position;
    skills: Skill[];

    project_count: number;
    finished_project_count: number;
}
export interface Customer {
    id: number;
    user: User;
    vip: boolean;
}



export interface UserState {
    users: User[] | Customer[] | Employee[];
    loading: boolean;
    error: null | string;
}

export enum UserActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_FETCH_USERS_ERROR',
}
interface FetchUsersAction {
    type: UserActionTypes.FETCH_USERS;
}
interface FetchUsersSuccessAction {
    type: UserActionTypes.FETCH_USERS_SUCCESS;
    payload: any[]
}
interface FetchUsersErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR;
    payload: string;
}
export type UserAction = FetchUsersAction | FetchUsersErrorAction | FetchUsersSuccessAction