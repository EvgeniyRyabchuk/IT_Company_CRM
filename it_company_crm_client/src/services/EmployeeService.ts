import $api from "../http";
import {AxiosResponse} from "axios";
import {Employee} from "../types/user";
import {PaginatedResponse} from "../types/global";


export class EmployeeService {

    static async getEmployees(queryParams: string):
        Promise<AxiosResponse<PaginatedResponse<Employee>>> {
        return $api.get<PaginatedResponse<Employee>>(`/users/employees${queryParams}`);
    }



}