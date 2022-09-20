import {Employee} from "./user";

export interface News {
    id: number;

    title: string;
    text: string;
    employee: Employee;

    employee_id: number;
    updated_at: string;
    created_at: string;

}