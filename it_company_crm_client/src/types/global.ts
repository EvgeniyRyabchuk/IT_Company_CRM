



export interface PaginatedResponse<T> {
    current_page: number;
    data: T[],
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
    total: number;
}

export interface SortOrderOptionType {
    id: number,
    name: string,
    value: string,
    order: string,
    selected: boolean
}