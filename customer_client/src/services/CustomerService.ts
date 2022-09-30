import $api from "../http";
import {AxiosResponse} from "axios";
import {Customer, Employee, Level, Position, Skill} from "../types/user";
import {PaginatedResponse} from "../types/global";


export class CustomerService {

    static async getCustomer(queryParams: string):
        Promise<AxiosResponse<PaginatedResponse<Customer>>> {
        return $api.get<PaginatedResponse<Customer>>(`/users/customers${queryParams}`);
    }

    static async createCustomer(customer: Customer): Promise<AxiosResponse<Customer>> {
        return $api.post<Customer>(`/users/customers`, { ...customer }, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    static async updateCustomer(customer: Customer): Promise<AxiosResponse<Customer>> {
        return $api.post<Customer>(`/users/customers/${customer.id}?_method=PUT`,
            { ...customer }, {
                headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    static async deleteCustomer(customerId: number): Promise<AxiosResponse<Customer>> {
        return $api.delete<Customer>(`/users/customers/${customerId}`);
    }

    static async changeFavorite(customerId: number, isFavorite: boolean): Promise<AxiosResponse<Customer>> {
        return $api.put<Customer>(`/users/customers/${customerId}/favorite`, {
            isFavorite
        });
    }


}