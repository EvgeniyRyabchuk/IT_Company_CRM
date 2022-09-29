import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {Order, OrderStatus, UndoOrderCase, UndoOrderCaseGrouped, UndoOrderReason} from "../types/order";
import {PrimaryErrorAlert, PrimarySuccessAlert, showAxiosErrorAlert, showAxiosSuccessAlert} from "../utils/alert";


interface OrderMinMax {
    minMaxProjectDeadline: string[];
    minMaxOrderCreatedDate: string[];
}

export class OrderService {


    static async getOrders(queryParams?: string):
        Promise<AxiosResponse<PaginatedResponse<Order>>> {
        return $api.get<PaginatedResponse<Order>>(`/orders${queryParams ?? ''}`);
    }

    static async getOrder(orderId: number | string):
        Promise<AxiosResponse<Order>> {
        return $api.get<Order>(`/orders/${orderId}`);
    }

    static async updateOrder(orderId: number, payload: any):
        Promise<AxiosResponse<Order>> {
        try {
            const response = await $api.put<Order>(`/orders/${orderId}`, payload);
            showAxiosSuccessAlert(PrimarySuccessAlert.UPDATED_ORDER);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.UPDATED_ORDER}, err);
            throw err;
        }
    }

    // static async undoOrder(orderId: number, reason: any) :
    //     Promise<AxiosResponse<string>> {
    //
    //     return $api.post<string>(
    //         `/orders/${orderId}/statuses/undo/cases/${reason.order_undo_case_id}`
    //         , reason);
    // }

    static async deleteOrder(orderId: number): Promise<AxiosResponse<string>> {
        try {
            const response = await $api.delete<string>(`/orders/${orderId}`);
            showAxiosSuccessAlert(PrimarySuccessAlert.DELETED_ORDER);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.DELETED_ORDER}, err);
            throw err;
        }
    }


    static async getOrderStatuses(queryParams?: string):
        Promise<AxiosResponse<OrderStatus[]>> {
        return $api.get<OrderStatus[]>(`/orders/statuses${queryParams ?? ''}`);
    }

    static async getMinMaxValues():
        Promise<AxiosResponse<OrderMinMax>> {
        return $api.get<OrderMinMax>(`/orders/min-max`);
    }

    static async getUndoOrderCases():
        Promise<AxiosResponse<UndoOrderCaseGrouped>> {
        return $api.get<UndoOrderCaseGrouped>(`/orders/statuses/undo/cases`);
    }

}