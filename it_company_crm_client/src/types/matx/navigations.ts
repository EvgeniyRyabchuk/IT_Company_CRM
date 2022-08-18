

export interface NavigationRoute {
    name?: string;
    path?: string;
    icon?: string;

    iconText?: string;

    children?: NavigationRoute[];

    label?: string;
    type?: string;

    badge?: { value: string, color: string};

}



export enum NavigationActionTypes {
    SET_USER_NAVIGATION = 'SET_USER_NAVIGATION',
}

export interface setUserNavigationAction {
    type: NavigationActionTypes.SET_USER_NAVIGATION,
    payload: any
}



export type NavigationAction = setUserNavigationAction;