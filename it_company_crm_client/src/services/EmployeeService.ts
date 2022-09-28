import $api from "../http";
import {AxiosResponse} from "axios";
import {Employee, EmployeeLink, Level, Position, Skill} from "../types/user";
import {PaginatedResponse} from "../types/global";


export class EmployeeService {

    static async getEmployees(queryParams: string = ''):
        Promise<AxiosResponse<PaginatedResponse<Employee>>> {

        return $api.get<PaginatedResponse<Employee>>(`/users/employees${queryParams}`);
    }

    static async createEmployee(employee: Employee):
        Promise<AxiosResponse<Employee>> {
        return $api.post<Employee>(`/users/employees`, { ...employee }, {
                headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    static async updateEmployee(employee: Employee):
        Promise<AxiosResponse<Employee>> {
        return $api.post<Employee>(`/users/employees/${employee.id}?_method=PUT`,
        { ...employee }, {
                headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    static async updateEmployeeInfo(employeeId: number, payload: any):
        Promise<AxiosResponse<Employee>> {
        return $api.put<Employee>(`/users/employees/${employeeId}/info`,
            { ...payload });
    }

    static async changeAvatar(employeeId: number, file: any):
        Promise<AxiosResponse<string>> {
        return $api.post<string>(`/users/employees/${employeeId}/avatar`, {
            file
        },{
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    }

    static async updateSoicalLinks(employeeId: number, links: EmployeeLink[]):
        Promise<AxiosResponse<EmployeeLink[]>> {
        return $api.put<EmployeeLink[]>(`/users/employees/${employeeId}/social-links`, {
            links
        });
    }

    static async deleteEmployee(employeeId: number): Promise<AxiosResponse<Employee>> {
        return $api.delete<Employee>(`/users/employees/${employeeId}`);
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

    static async export(ids?: any[]): Promise<AxiosResponse<any>> {
        const param = ids ? `?${JSON.stringify(ids)}` : '';
        return $api.get<any>(`/excel/employees`+param, {
            headers: {
                responseType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
        });
    }


}