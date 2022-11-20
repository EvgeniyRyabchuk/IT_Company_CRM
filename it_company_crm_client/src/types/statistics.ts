import {Project, ProjectTag, ProjectType} from "./project";
import {Order, OrderStatus, UndoOrderCase} from "./order";
import exp from "constants";


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

export interface SimpleLineChartData {
    titles: any,
    values: any
}

export interface OrderStatusesCounterData {
    status: OrderStatus;
    status_id: number;
    total: number;
}

export interface SalesFunnelData {
    status: OrderStatus;
    count: number;
    percent: number
}

export interface SalesFunnelData {
    status: OrderStatus;
    count: number;
    percent: number
}

export interface Ratio {
    total: number,
    payload:  { name: string, value: number }[]
}


export interface UndoCasesGrouped {
    order_undo_case_id: number;
    total: number;
    order_undo_case: UndoOrderCase;
}

export interface BiggestProjects {
    value: any[1226629000];
    name: string;
    id: number | string;
    discretion: string | null;
}

export interface StatisticResponse {
    ordersDynamicMetric: SimpleLineChartData[],
    customerDynamicMetric: SimpleLineChartData[],
    funnelSales: { stack: SalesFunnelData, total: number }[],
    orderStatusesCounter: OrderStatusesCounterData[],
    orderRatio: Ratio;
    undoCasesGrouped: UndoCasesGrouped[];
    biggestProjects: Project[]

}

