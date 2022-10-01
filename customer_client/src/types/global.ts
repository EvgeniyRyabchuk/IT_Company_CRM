import {ReactNode} from "react";


export interface PaginatedResponse<T> {
    current_page: number;
    data: T[],
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface SortOrderOptionType {
    id: number,
    name: string,
    value: string,
    order: string,
    selected: boolean
}


export enum PageMode {
    SELECT,
    CREATE,
    EDIT
}

export type ComponentMode = 'create' | 'update' | 'view' | 'preview'

export interface ModalStandartState {
    isOpen: boolean,
    mode: ComponentMode,
}

export interface LinkIcon {
    title: string;
    icon: ReactNode;
}

export enum ProjectSocialLinkTitle {
    GITHUB = 'GitHub',
    JIRA = 'Jira',
    MAIL_SERVICE = 'Mail Service',
    HOST = 'Host',
    EXTERNAL_LINK = 'External Link',
}

export enum EmployeeSocialLinkTitle {
    GITHUB = 'GitHub',
    BITBUCKET = 'BitBucket',
}


export interface ModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onClose: () => void;
    onSave: (...args: any[]) => any
}

export enum SimpleItemAlignment {
    COLUMN = 'column',
    ROW = 'row'
}

export interface ViewCounter {
    newChatMessages: number;
    newNews: number;
    newOrders: number;
    newProjects: number;
    newJobApplications: number;
}





export interface Tab {
    index: number,
    name: string;
}

export interface TabComponent {
    tabIndex: number;
    currentIndex: number;
    children: any;
    [x: number]: any;
}

export enum ProfileTabName {
    GENERAL = 'General',
    ORDERS = 'Orders',
    PAYMENT = 'Payment',
    CHATS = 'Chats',


}


