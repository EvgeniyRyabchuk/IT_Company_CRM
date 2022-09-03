import {Project} from "./project";
import {Customer} from "./user";


export interface UndoOrderCase {
    id: number;
    type_name: string;
    reason: string;
}

export interface UndoOrder {
    extra_reason_text: string;
    orderUndoCase: UndoOrderCase;
    order_undo_case_id: number;
    order_id: number;
}

export interface OrderContact {
    id: number;
    name: string;
    phone: string;
    email: string;
}

export interface OrderStatus {
    id: number;
    name: string;
    is_public: boolean;
}

export interface Order {
    id: number;

    project: Project;
    order_status: OrderStatus;
    order_contact: OrderContact | null;
    customer: Customer | null;

    about: string;
    extra_file: string;
    created_at: string;
    updated_at: string;

    customer_id: number;
    order_status_id: number;
    order_contact_id: number;
    project_id: number;
}