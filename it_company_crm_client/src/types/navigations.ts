
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
