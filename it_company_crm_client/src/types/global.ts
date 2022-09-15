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

export enum SocialLinkTitle {
    GITHUB = 'GitHub',
    JIRA = 'Jira',
    DEFAULT = 'Default'
}