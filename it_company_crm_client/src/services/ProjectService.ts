import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {Project, ProjectHistory, ProjectRole, ProjectTag, ProjectType} from "../types/project";
import {PublicOrderInfo} from "../types/order";


interface GetProjectResponse{
    project: Project,
    projectRoles: ProjectRole[],
    orderInfo: PublicOrderInfo
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

    static async createProjectForOrder(payload: Project)
        : Promise<AxiosResponse<string>> {
        return $api.post<string>(`/projects`, {
            ...payload
        });
    }

    static async addEmployeeToProject(employeeId: number, projectId: number)
        : Promise<AxiosResponse<string>> {
            return $api.post<string>(`/projects/${projectId}/members`, {
                employeeId
            });
    }

    static async deleteEmployeeFromProject(employeeId: number, projectId: number)
        : Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/projects/${projectId}/members/${employeeId}`);
    }

    static async deleteManyEmployeesFromProject(employeeIds: number[], projectId: number)
        : Promise<AxiosResponse<string>> {
        const ids = JSON.stringify(employeeIds);
        return $api.delete<string>(`/projects/${projectId}/members/many?ids=${ids}`);
    }

    static async updateProject(projectId: number, newProject: any): Promise<AxiosResponse<Project>> {
        return $api.put<Project>(`/projects/${projectId}`, { ...newProject});
    }

    static async deleteProject(projectId: number): Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/projects/${projectId}`);
    }

    static async getHistory(projectId: number, queryParams?: string)
        : Promise<AxiosResponse<PaginatedResponse<ProjectHistory>>> {
        return $api.get<PaginatedResponse<ProjectHistory>>(
            `/projects/${projectId}/history${queryParams ?? ''}`);
    }

    static async getOrderInfoForProject(projectId: number):
        Promise<AxiosResponse<PublicOrderInfo>> {
        return $api.get<PublicOrderInfo>(`/projects/${projectId}/order-info`);
    }

    static async getProjectTypes():
        Promise<AxiosResponse<ProjectType[]>> {
        return $api.get<ProjectType[]>(`/projects/types`);
    }

    static async getProjectTags():
        Promise<AxiosResponse<ProjectTag[]>> {
        return $api.get<ProjectTag[]>(`/projects/tags`);
    }





    static async getProjectRoles():
        Promise<AxiosResponse<ProjectRole[]>> {
        return $api.get<ProjectType[]>(`/projects/roles`);
    }

    static async getMinMaxValues():
        Promise<AxiosResponse<ProjectMinMax>> {
        return $api.get<ProjectMinMax>(`/projects/min-max`);
    }


}


/*

 Project Name
 Project Type
 Add Member (with role)
 Add Link
 Deadline
 Budget
 Tags


 */


