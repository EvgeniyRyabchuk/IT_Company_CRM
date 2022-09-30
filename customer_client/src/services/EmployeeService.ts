import $api from "../http";
import {AxiosResponse} from "axios";
import {Employee, EmployeeLink, Level, Position, Skill} from "../types/user";
import {PaginatedResponse} from "../types/global";
import {PrimaryErrorAlert, PrimarySuccessAlert, showAxiosErrorAlert, showAxiosSuccessAlert} from "../utils/alert";


export class EmployeeService {

    static async getEmployees(queryParams: string = ''):
        Promise<AxiosResponse<PaginatedResponse<Employee>>> {

        return $api.get<PaginatedResponse<Employee>>(`/users/employees${queryParams}`);
    }

    static async createEmployee(employee: Employee):
        Promise<AxiosResponse<Employee>> {
        try {
            const response = await $api.post<Employee>(`/users/employees`, { ...employee }, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            showAxiosSuccessAlert(PrimarySuccessAlert.CREATED_EMPLOYEE);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.CREATED_EMPLOYEE}, err);
            throw err;
        }
    }

    static async updateEmployee(employee: Employee):
        Promise<AxiosResponse<Employee>> {
        try {
            const response = await $api.post<Employee>(`/users/employees/${employee.id}?_method=PUT`,
                { ...employee }, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            showAxiosSuccessAlert(PrimarySuccessAlert.UPDATED_EMPLOYEE);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.UPDATED_EMPLOYEE}, err);
            throw err;
        }
    }

    static async updateEmployeeInfo(employeeId: number, payload: any):
        Promise<AxiosResponse<Employee>> {
        try {
            const response = $api.put<Employee>(`/users/employees/${employeeId}/info`,
                { ...payload });
            showAxiosSuccessAlert(PrimarySuccessAlert.ACCOUNT_UPDATE);
            return response;
        } catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.ACCOUNT_UPDATE}, err);
            throw err;
        }
    }

    static async changeAvatar(employeeId: number, file: any):
        Promise<AxiosResponse<string>> {

        try {
            const response = await $api.post<string>(`/users/employees/${employeeId}/avatar`, {
                file
            },{
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            showAxiosSuccessAlert(PrimarySuccessAlert.ACCOUNT_AVATAR_UPDATE);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.ACCOUNT_AVATAR_UPDATE}, err);
            throw err;
        }
    }

    static async updateSoicalLinks(employeeId: number, links: EmployeeLink[]):
        Promise<AxiosResponse<EmployeeLink[]>> {

        try {
            const response = await $api.put<EmployeeLink[]>(`/users/employees/${employeeId}/social-links`, {
                links
            });
            showAxiosSuccessAlert(PrimarySuccessAlert.UPDATED_EMPLOYEE);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.UPDATED_EMPLOYEE}, err);
            throw err;
        }
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