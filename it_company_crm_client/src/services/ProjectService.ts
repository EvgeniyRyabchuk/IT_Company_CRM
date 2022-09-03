import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {Project, ProjectRole, ProjectType} from "../types/project";


interface GetProjectResponse{
    project: Project,
    projectRoles: ProjectRole[]
}

interface ProjectMinMax {
    minMaxProjectBudget: string[];
    minMaxProjectDeadline: string[];
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

    static async updateProject(projectId: number, newProject: Project): Promise<AxiosResponse<Project>> {
        return $api.put<Project>(`/projects/${projectId}`);
    }

    static async deleteProject(projectId: number): Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/projects/${projectId}`);
    }


    static async getProjectTypes(queryParams?: string):
        Promise<AxiosResponse<ProjectType[]>> {
        return $api.get<ProjectType[]>(`/projects/types${queryParams ?? ''}`);
    }

    static async getMinMaxValues():
        Promise<AxiosResponse<ProjectMinMax>> {
        return $api.get<ProjectMinMax>(`/projects/min-max`);
    }
}