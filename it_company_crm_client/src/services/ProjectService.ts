import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {Project, ProjectRole} from "../types/project";


interface GetProjectResponse{
    project: Project,
    projectRoles: ProjectRole[]
}

export class ProjectService {


    static async getProjects(queryParams?: string):
        Promise<AxiosResponse<PaginatedResponse<Project>>> {
            return $api.get<PaginatedResponse<Project>>(`/projects${queryParams ?? ''}`);
    }

    static async getProject(projectId: number): Promise<AxiosResponse<GetProjectResponse>> {
        return $api.get<GetProjectResponse>(`/projects/${projectId}`);
    }

    static async addEmployeeToProject(employeeId: number, projectId: number)
        : Promise<AxiosResponse<string>> {
            return $api.post<string>(`/projects/${projectId}/members`, {
                employeeId
            });
    }


}