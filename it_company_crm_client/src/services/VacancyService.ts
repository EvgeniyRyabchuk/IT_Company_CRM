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
        : Promise<AxiosResponse<Vacancy>> {
        return $api.post<Vacancy>(`/vacancies`, {
            ...payload
        });
    }


    static async updateVacancy(vacancyId: number, newVacancy: Vacancy):
        Promise<AxiosResponse<Vacancy>> {
        return $api.put<Vacancy>(`/vacancies/${vacancyId}`,
            { ...newVacancy});
    }

    static async deleteVacancy(vacancyId: number):
        Promise<AxiosResponse<string>> {
        return $api.delete<string>(`/vacancies/${vacancyId}`);
    }



}

