import $api from "../http";
import {AxiosResponse} from "axios";
import {PaginatedResponse} from "../types/global";
import {Project, ProjectHistory, ProjectRole, ProjectTag, ProjectType} from "../types/project";
import {PublicOrderInfo} from "../types/order";
import {Vacancy} from "../types/employeement";
import {PrimaryErrorAlert, PrimarySuccessAlert, showAxiosErrorAlert, showAxiosSuccessAlert} from "../utils/alert";

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
        try {
            const response = await $api.post<Vacancy>(`/vacancies`, {
                ...payload
            });

            showAxiosSuccessAlert(PrimarySuccessAlert.CREATED_VACANCY);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.CREATED_VACANCY}, err);
            throw err;
        }
    }

    static async updateVacancy(vacancyId: number, newVacancy: Vacancy):
        Promise<AxiosResponse<Vacancy>> {

        try {
            const response = await $api.put<Vacancy>(`/vacancies/${vacancyId}`,
                { ...newVacancy});

            showAxiosSuccessAlert(PrimarySuccessAlert.UPDATED_VACANCY);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.UPDATED_VACANCY}, err);
            throw err;
        }
    }

    static async deleteVacancy(vacancyId: number):
        Promise<AxiosResponse<string>> {

        try {
            const response = await $api.delete<string>(`/vacancies/${vacancyId}`);
            showAxiosSuccessAlert(PrimarySuccessAlert.DELETED_VACANCY);
            return response;
        }
        catch (err) {
            showAxiosErrorAlert({ primary: PrimaryErrorAlert.DELETED_VACANCY}, err);
            throw err;
        }
    }



}

