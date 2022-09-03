import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {Order, OrderStatus} from "../types/order";


interface OrderMinMax {
    minMaxProjectBudget: string[];
    minMaxProjectDeadline: string[];
}

export class OrderService {


    static async getOrders(queryParams?: string):
        Promise<AxiosResponse<PaginatedResponse<Order>>> {
        return $api.get<PaginatedResponse<Order>>(`/orders${queryParams ?? ''}`);
    }

    // static async addEmployeeToProject(employeeId: number, projectId: number)
    //     : Promise<AxiosResponse<string>> {
    //     return $api.post<string>(`/projects/${projectId}/members`, {
    //         employeeId
    //     });
    // }

    static async updateOrder(orderId: number, newOrder: Order): Promise<AxiosResponse<Order>> {
        return $api.put<Order>(`/orders/${orderId}`);
    }

    static async deleteOrder(orderId: number): Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/orders/${orderId}`);
    }


    static async getOrderStatuses(queryParams?: string):
        Promise<AxiosResponse<OrderStatus[]>> {
        return $api.get<OrderStatus[]>(`/orders/statuses${queryParams ?? ''}`);
    }

    static async getMinMaxValues():
        Promise<AxiosResponse<OrderMinMax>> {
        return $api.get<OrderMinMax>(`/orders/min-max`);
    }
}