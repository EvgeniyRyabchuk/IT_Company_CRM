import $api from "../http";
import {AxiosResponse} from "axios";
import {Employee, EmployeeLink, Level, Position, Skill} from "../types/user";
import {PaginatedResponse, ViewCounter} from "../types/global";



export class ViewService {

    static async getCounter():
        Promise<AxiosResponse<ViewCounter>> {
        return $api.get<ViewCounter>(`/views`);
    }


    static async markAsSeen(viewable: string, ids: number[]):
        Promise<AxiosResponse<string>> {
        return $api.post<string>(`/views/${viewable}`, {
            ids
        });
    }


}