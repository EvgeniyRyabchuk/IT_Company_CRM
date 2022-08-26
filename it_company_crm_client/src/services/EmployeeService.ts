import $api from "../http";
import {AxiosResponse} from "axios";
import {Employee, Level, Position, Skill} from "../types/user";
import {PaginatedResponse} from "../types/global";


export class EmployeeService {

    static async getEmployees(queryParams: string):
        Promise<AxiosResponse<PaginatedResponse<Employee>>> {
        return $api.get<PaginatedResponse<Employee>>(`/users/employees${queryParams}`);
    }

    static async createEmployee(employee: Employee): Promise<AxiosResponse<Employee>> {
        return $api.post<Employee>(`/users/employees`, { ...employee });
    }

    static async updateEmployee(employee: Employee): Promise<AxiosResponse<Employee>> {
        return $api.put<Employee>(`/users/employees/${employee.id}`, { ...employee });
    }

    static async deleteEmployee(employee: Employee): Promise<AxiosResponse<Employee>> {
        return $api.post<Employee>(`/users/employees`, { ...employee });
    }

    static async getPositions():
        Promise<AxiosResponse<Position[]>> {
        return $api.get<Position[]>(`/users/employees/positions`);
    }

    static async getLevels(positionId: number):
        Promise<AxiosResponse<Level[]>> {
        return $api.get<Level[]>
            (`/users/employees/positions/${positionId}/levels`);
    }

    static async getSkills(): Promise<AxiosResponse<Skill[]>> {
        return $api.get<Skill[]>(`/users/employees/skills`);
    }
}