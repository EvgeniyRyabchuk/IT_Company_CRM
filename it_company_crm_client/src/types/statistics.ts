import {Project, ProjectTag, ProjectType} from "./project";
import {Order} from "./order";


export interface DashBoardAnalyticCounter {
    customers: number;
    employees: number;
    weeklyRevenue: number;
    orders: number;
}

export interface PercentEntity {
    target: ProjectType | any,
    percent: number,
    absolute: number;
}

export interface EntityIncrease<T> {
    targetName: string;
    'percent': number;
    'absolute': number;
    'last': any;
    'beforeLast': any;
}

export interface DashBoardAnalytic {
    counter: DashBoardAnalyticCounter;
    percentProjectTypes: PercentEntity[],
    lastOrders: Order[];
    lastProjects: Project[],
    increases: EntityIncrease<Project | any>[]
}