import $api from "../http";
import {AxiosResponse} from "axios";
import {Customer, Employee, Level, Position, Skill} from "../types/user";
import {PaginatedResponse} from "../types/global";
import {Project} from "../types/project";


export class ProjectService {

    static async getProjects(queryParams?: string):
        Promise<AxiosResponse<PaginatedResponse<Project>>> {
            return $api.get<PaginatedResponse<Project>>(`/projects${queryParams ?? ''}`);
    }




}