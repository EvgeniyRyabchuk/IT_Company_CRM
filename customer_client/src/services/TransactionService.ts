import $api from "../http";
import {AxiosResponse} from "axios";
import {Card, Transaction} from "../types/card";




export class TransactionService {

    static async getTransactions():
        Promise<AxiosResponse<Transaction[]>> {
        return $api.get<Transaction[]>(`/transactions`);
    }

    static async getTransactionsByOrderId(orderId: number):
        Promise<AxiosResponse<Transaction[]>> {
        return $api.get<Transaction[]>(`/orders/${orderId}/transactions`);
    }

    static async getTransactionsByCustomerId(customerId: number):
        Promise<AxiosResponse<Transaction[]>> {
        return $api.get<Transaction[]>(`/customers/${customerId}/transactions`);
    }

    static async pay(card: Card, summa: number, orderId: number):
        Promise<AxiosResponse<Transaction>> {
        return $api.post<Transaction>(`/transactions`, {
            card,
            summa,
            orderId
        });
    }



}

