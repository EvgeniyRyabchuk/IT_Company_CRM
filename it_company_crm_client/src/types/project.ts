import {Order} from "./order";
import {KanbanLane} from "./kanban";
import {Employee} from "./user";


export interface Tag {
    title: string;

    created_at: string;
    updated_at: string;
}

export interface ProjectLink {
    id: number;

    title: string,
    project_id: number,
    link: string;

    created_at: string;
    updated_at: string;
}

export interface ProjectHistory {
    id: number;

    created_at: string;
    updated_at: string;
}

export interface ProjectType {
    id: number;
    name: string;
    description: string;

    fromTerm: number,
    fromTermType: string,
    fromPrice: number,

    created_at: string;
    updated_at: string;

}

export interface ProjectRole {
    id: number;
    name: string;
}

export interface EmployeeWithProjectRoles extends Employee {
    pivot: {
        project_id: number;
        employee_id: number;
        project_role_id: number;
    }
    role: ProjectRole | undefined;
}

export interface Project {
    id: number;
    name: string;
    deadline: string;
    budget: number;
    paid: number;
    created_at: string;
    updated_at: string;
    project_type: ProjectType;

    tags: Tag[],
    order: Order;
    lanes: KanbanLane[];

    project_links: ProjectLink[];
    project_history: ProjectHistory[];
    member_count: number;
    employees: EmployeeWithProjectRoles[];
}