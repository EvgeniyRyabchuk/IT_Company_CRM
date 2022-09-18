import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {Project, ProjectHistory, ProjectRole, ProjectTag, ProjectType} from "../types/project";
import {PublicOrderInfo} from "../types/order";
import {Vacancy} from "../types/employeement";

interface GetVacancyResponse{
    vacancy: Vacancy,
    projectRoles: ProjectRole[],
    orderInfo: PublicOrderInfo
}

interface VacancyMinMax {
    minMaxProjectBudget: string[];
    minMaxProjectDeadline: string[];
}

export class VacancyService {


    static async getVacancies(queryParams?: string):
        Promise<AxiosResponse<Vacancy[]>> {
        return $api.get<Vacancy[]>(`/vacancies${queryParams ?? ''}`);
    }

    static async createVacancy(payload: Vacancy)
        : Promise<AxiosResponse<string>> {
        return $api.post<string>(`/vacancies`, {
            ...payload
        });
    }


    static async updateVacancy(projectId: number, newProject: any): Promise<AxiosResponse<Project>> {
        return $api.put<Project>(`/vacancies/${projectId}`, { ...newProject});
    }

    static async deleteVacancy(projectId: number): Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/vacancies/${projectId}`);
    }



    static async getProjectRoles():
        Promise<AxiosResponse<ProjectRole[]>> {
        return $api.get<ProjectType[]>(`/projects/roles`);
    }

}

