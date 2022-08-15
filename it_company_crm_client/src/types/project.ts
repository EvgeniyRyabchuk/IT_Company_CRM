import {Order} from "./order";
import {KanbanLane} from "./kanban";


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

export interface Project {
    id: number;
    name: string;
    deadline: string;
    budget: number;
    paid: number;
    created_at: string;
    updated_at: string;


    tags: Tag[],
    order: Order;
    lanes: KanbanLane[];

    project_links: ProjectLink[];
    project_history: ProjectHistory[];

}